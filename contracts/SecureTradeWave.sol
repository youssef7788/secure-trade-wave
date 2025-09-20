// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecureTradeWave is SepoliaConfig {
    using FHE for *;
    
    struct TradeDocument {
        euint32 documentId;
        euint32 amount;
        euint32 validityPeriod;
        bool isVerified;
        bool isActive;
        string documentHash;
        address issuer;
        address beneficiary;
        uint256 timestamp;
    }
    
    struct LetterOfCredit {
        euint32 lcId;
        euint32 creditAmount;
        euint32 utilizedAmount;
        euint32 expiryDays;
        bool isConfirmed;
        bool isActive;
        string termsHash;
        address applicant;
        address beneficiary;
        address issuingBank;
        uint256 issueDate;
    }
    
    struct Invoice {
        euint32 invoiceId;
        euint32 invoiceAmount;
        euint32 paidAmount;
        bool isVerified;
        bool isPaid;
        string invoiceHash;
        address seller;
        address buyer;
        uint256 dueDate;
    }
    
    struct TradeSettlement {
        euint32 settlementId;
        euint32 settlementAmount;
        euint32 fees;
        bool isCompleted;
        string transactionHash;
        address payer;
        address payee;
        uint256 settlementDate;
    }
    
    mapping(uint256 => TradeDocument) public tradeDocuments;
    mapping(uint256 => LetterOfCredit) public lettersOfCredit;
    mapping(uint256 => Invoice) public invoices;
    mapping(uint256 => TradeSettlement) public settlements;
    mapping(address => euint32) public userReputation;
    mapping(address => euint32) public bankReputation;
    
    uint256 public documentCounter;
    uint256 public lcCounter;
    uint256 public invoiceCounter;
    uint256 public settlementCounter;
    
    address public owner;
    address public verifier;
    
    event DocumentCreated(uint256 indexed documentId, address indexed issuer, string documentHash);
    event LetterOfCreditIssued(uint256 indexed lcId, address indexed applicant, address indexed beneficiary);
    event InvoiceCreated(uint256 indexed invoiceId, address indexed seller, address indexed buyer);
    event SettlementCompleted(uint256 indexed settlementId, address indexed payer, address indexed payee);
    event DocumentVerified(uint256 indexed documentId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function createTradeDocument(
        string memory _documentHash,
        address _beneficiary,
        externalEuint32 amount,
        externalEuint32 validityPeriod,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(bytes(_documentHash).length > 0, "Document hash cannot be empty");
        require(_beneficiary != address(0), "Invalid beneficiary address");
        
        uint256 documentId = documentCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalValidityPeriod = FHE.fromExternal(validityPeriod, inputProof);
        
        tradeDocuments[documentId] = TradeDocument({
            documentId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            validityPeriod: internalValidityPeriod,
            isVerified: false,
            isActive: true,
            documentHash: _documentHash,
            issuer: msg.sender,
            beneficiary: _beneficiary,
            timestamp: block.timestamp
        });
        
        emit DocumentCreated(documentId, msg.sender, _documentHash);
        return documentId;
    }
    
    function issueLetterOfCredit(
        address _beneficiary,
        address _issuingBank,
        externalEuint32 creditAmount,
        externalEuint32 expiryDays,
        string memory _termsHash,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(_beneficiary != address(0), "Invalid beneficiary address");
        require(_issuingBank != address(0), "Invalid issuing bank address");
        require(bytes(_termsHash).length > 0, "Terms hash cannot be empty");
        
        uint256 lcId = lcCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalCreditAmount = FHE.fromExternal(creditAmount, inputProof);
        euint32 internalExpiryDays = FHE.fromExternal(expiryDays, inputProof);
        
        lettersOfCredit[lcId] = LetterOfCredit({
            lcId: FHE.asEuint32(0), // Will be set properly later
            creditAmount: internalCreditAmount,
            utilizedAmount: FHE.asEuint32(0),
            expiryDays: internalExpiryDays,
            isConfirmed: false,
            isActive: true,
            termsHash: _termsHash,
            applicant: msg.sender,
            beneficiary: _beneficiary,
            issuingBank: _issuingBank,
            issueDate: block.timestamp
        });
        
        emit LetterOfCreditIssued(lcId, msg.sender, _beneficiary);
        return lcId;
    }
    
    function createInvoice(
        address _buyer,
        externalEuint32 invoiceAmount,
        uint256 _dueDate,
        string memory _invoiceHash,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(_buyer != address(0), "Invalid buyer address");
        require(_dueDate > block.timestamp, "Due date must be in the future");
        require(bytes(_invoiceHash).length > 0, "Invoice hash cannot be empty");
        
        uint256 invoiceId = invoiceCounter++;
        
        // Convert external encrypted value to internal
        euint32 internalInvoiceAmount = FHE.fromExternal(invoiceAmount, inputProof);
        
        invoices[invoiceId] = Invoice({
            invoiceId: FHE.asEuint32(0), // Will be set properly later
            invoiceAmount: internalInvoiceAmount,
            paidAmount: FHE.asEuint32(0),
            isVerified: false,
            isPaid: false,
            invoiceHash: _invoiceHash,
            seller: msg.sender,
            buyer: _buyer,
            dueDate: _dueDate
        });
        
        emit InvoiceCreated(invoiceId, msg.sender, _buyer);
        return invoiceId;
    }
    
    function processSettlement(
        uint256 _documentId,
        externalEuint32 settlementAmount,
        externalEuint32 fees,
        string memory _transactionHash,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(tradeDocuments[_documentId].issuer != address(0), "Document does not exist");
        require(tradeDocuments[_documentId].isActive, "Document is not active");
        require(tradeDocuments[_documentId].isVerified, "Document must be verified");
        require(bytes(_transactionHash).length > 0, "Transaction hash cannot be empty");
        
        uint256 settlementId = settlementCounter++;
        
        // Convert external encrypted values to internal
        euint32 internalSettlementAmount = FHE.fromExternal(settlementAmount, inputProof);
        euint32 internalFees = FHE.fromExternal(fees, inputProof);
        
        settlements[settlementId] = TradeSettlement({
            settlementId: FHE.asEuint32(0), // Will be set properly later
            settlementAmount: internalSettlementAmount,
            fees: internalFees,
            isCompleted: true,
            transactionHash: _transactionHash,
            payer: tradeDocuments[_documentId].issuer,
            payee: tradeDocuments[_documentId].beneficiary,
            settlementDate: block.timestamp
        });
        
        // Mark document as inactive after settlement
        tradeDocuments[_documentId].isActive = false;
        
        emit SettlementCompleted(settlementId, tradeDocuments[_documentId].issuer, tradeDocuments[_documentId].beneficiary);
        return settlementId;
    }
    
    function verifyDocument(uint256 documentId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify documents");
        require(tradeDocuments[documentId].issuer != address(0), "Document does not exist");
        
        tradeDocuments[documentId].isVerified = isVerified;
        emit DocumentVerified(documentId, isVerified);
    }
    
    function confirmLetterOfCredit(uint256 lcId, bool isConfirmed) public {
        require(msg.sender == lettersOfCredit[lcId].issuingBank, "Only issuing bank can confirm");
        require(lettersOfCredit[lcId].applicant != address(0), "Letter of credit does not exist");
        
        lettersOfCredit[lcId].isConfirmed = isConfirmed;
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is a bank or regular user based on context
        if (lettersOfCredit[lcCounter - 1].issuingBank == user) {
            bankReputation[user] = reputation;
        } else {
            userReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getDocumentInfo(uint256 documentId) public view returns (
        string memory documentHash,
        bool isVerified,
        bool isActive,
        address issuer,
        address beneficiary,
        uint256 timestamp
    ) {
        TradeDocument storage doc = tradeDocuments[documentId];
        return (
            doc.documentHash,
            doc.isVerified,
            doc.isActive,
            doc.issuer,
            doc.beneficiary,
            doc.timestamp
        );
    }
    
    function getLetterOfCreditInfo(uint256 lcId) public view returns (
        bool isConfirmed,
        bool isActive,
        string memory termsHash,
        address applicant,
        address beneficiary,
        address issuingBank,
        uint256 issueDate
    ) {
        LetterOfCredit storage lc = lettersOfCredit[lcId];
        return (
            lc.isConfirmed,
            lc.isActive,
            lc.termsHash,
            lc.applicant,
            lc.beneficiary,
            lc.issuingBank,
            lc.issueDate
        );
    }
    
    function getInvoiceInfo(uint256 invoiceId) public view returns (
        bool isVerified,
        bool isPaid,
        string memory invoiceHash,
        address seller,
        address buyer,
        uint256 dueDate
    ) {
        Invoice storage invoice = invoices[invoiceId];
        return (
            invoice.isVerified,
            invoice.isPaid,
            invoice.invoiceHash,
            invoice.seller,
            invoice.buyer,
            invoice.dueDate
        );
    }
    
    function getSettlementInfo(uint256 settlementId) public view returns (
        bool isCompleted,
        string memory transactionHash,
        address payer,
        address payee,
        uint256 settlementDate
    ) {
        TradeSettlement storage settlement = settlements[settlementId];
        return (
            settlement.isCompleted,
            settlement.transactionHash,
            settlement.payer,
            settlement.payee,
            settlement.settlementDate
        );
    }
    
    function getUserReputation(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userReputation[user]) - will be decrypted off-chain
    }
    
    function getBankReputation(address bank) public view returns (uint8) {
        return 0; // FHE.decrypt(bankReputation[bank]) - will be decrypted off-chain
    }
}
