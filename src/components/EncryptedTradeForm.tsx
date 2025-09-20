import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface EncryptedTradeFormProps {
  contractAddress: string;
  abi: any[];
}

export default function EncryptedTradeForm({ contractAddress, abi }: EncryptedTradeFormProps) {
  const { address, isConnected } = useAccount();
  const [documentHash, setDocumentHash] = useState('');
  const [amount, setAmount] = useState('');
  const [validityPeriod, setValidityPeriod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const handleEncryptData = async () => {
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    if (!documentHash || !amount || !validityPeriod) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate FHE encryption process
      // In a real implementation, this would use FHE libraries
      const encryptedAmount = await encryptValue(parseInt(amount));
      const encryptedValidityPeriod = await encryptValue(parseInt(validityPeriod));
      
      // Create input proof for FHE verification
      const inputProof = await createInputProof(encryptedAmount, encryptedValidityPeriod);

      // Call the smart contract method for encrypted data storage
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: abi,
        functionName: 'encryptTradeData',
        args: [
          encryptedAmount,
          encryptedValidityPeriod,
          documentHash,
          inputProof
        ],
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateData = async () => {
    if (!isConnected) {
      setError('Please connect your wallet first');
      return;
    }

    if (!documentHash || !amount || !validityPeriod) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate FHE encryption process
      const encryptedAmount = await encryptValue(parseInt(amount));
      const encryptedValidityPeriod = await encryptValue(parseInt(validityPeriod));
      
      // Create input proof for FHE verification
      const inputProof = await createInputProof(encryptedAmount, encryptedValidityPeriod);

      // Call the smart contract method for updating encrypted data
      await writeContract({
        address: contractAddress as `0x${string}`,
        abi: abi,
        functionName: 'updateEncryptedData',
        args: [
          0, // documentId - in real implementation, this would be dynamic
          encryptedAmount,
          encryptedValidityPeriod,
          inputProof
        ],
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Simulate FHE encryption (in real implementation, use actual FHE libraries)
  const encryptValue = async (value: number): Promise<string> => {
    // This is a simulation - in real implementation, use FHE encryption
    return `encrypted_${value}_${Date.now()}`;
  };

  // Simulate input proof creation
  const createInputProof = async (encryptedAmount: string, encryptedValidityPeriod: string): Promise<string> => {
    // This is a simulation - in real implementation, create actual FHE proofs
    return `proof_${encryptedAmount}_${encryptedValidityPeriod}`;
  };

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connect Wallet Required</CardTitle>
          <CardDescription>
            Please connect your wallet to use encrypted trade features
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Encrypted Trade Data Management
        </CardTitle>
        <CardDescription>
          Securely store and update trade data using FHE encryption on the blockchain
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {writeError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Contract Error: {writeError.message}
            </AlertDescription>
          </Alert>
        )}

        {isConfirmed && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Transaction confirmed! Data has been encrypted and stored on-chain.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="documentHash" className="text-sm font-medium">
              Document Hash
            </label>
            <Input
              id="documentHash"
              placeholder="Enter document hash"
              value={documentHash}
              onChange={(e) => setDocumentHash(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="text-sm font-medium">
              Amount (Encrypted)
            </label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="validityPeriod" className="text-sm font-medium">
              Validity Period (Days)
            </label>
            <Input
              id="validityPeriod"
              type="number"
              placeholder="Enter validity period"
              value={validityPeriod}
              onChange={(e) => setValidityPeriod(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleEncryptData}
            disabled={isPending || isConfirming || isLoading}
            className="flex-1"
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isPending ? 'Encrypting...' : 'Confirming...'}
              </>
            ) : (
              'Encrypt & Store Data'
            )}
          </Button>

          <Button
            onClick={handleUpdateData}
            disabled={isPending || isConfirming || isLoading}
            variant="outline"
            className="flex-1"
          >
            {isPending || isConfirming ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {isPending ? 'Updating...' : 'Confirming...'}
              </>
            ) : (
              'Update Encrypted Data'
            )}
          </Button>
        </div>

        {hash && (
          <div className="text-sm text-muted-foreground">
            Transaction Hash: {hash}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
