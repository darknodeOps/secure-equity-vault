import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { useContract } from '@/hooks/useContract';
import { fheEncryption, FHEEncryptedData } from '@/lib/fhe';
import { Loader2, Shield, Eye, EyeOff, Lock, Unlock } from 'lucide-react';

interface EncryptedDataManagerProps {
  onDataEncrypted?: (data: FHEEncryptedData) => void;
  onDataDecrypted?: (value: number) => void;
}

export function EncryptedDataManager({ onDataEncrypted, onDataDecrypted }: EncryptedDataManagerProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [encryptedData, setEncryptedData] = useState<FHEEncryptedData | null>(null);
  const [decryptedValue, setDecryptedValue] = useState<number | null>(null);
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [showDecrypted, setShowDecrypted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { createAsset, investInAsset, isPending, isConfirmed } = useContract();

  useEffect(() => {
    // Initialize FHE system on component mount
    const initFHE = async () => {
      try {
        await fheEncryption.initialize();
        setSuccess('FHE system initialized successfully');
      } catch (err) {
        setError('Failed to initialize FHE system');
      }
    };
    initFHE();
  }, []);

  const handleEncrypt = async () => {
    if (!inputValue || isNaN(Number(inputValue))) {
      setError('Please enter a valid number');
      return;
    }

    setIsEncrypting(true);
    setError(null);
    setSuccess(null);

    try {
      const value = Number(inputValue);
      const encrypted = await fheEncryption.encryptNumber(value);
      setEncryptedData(encrypted);
      setSuccess(`Value ${value} encrypted successfully`);
      onDataEncrypted?.(encrypted);
    } catch (err) {
      setError('Failed to encrypt value');
      console.error('Encryption error:', err);
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleDecrypt = async () => {
    if (!encryptedData) {
      setError('No encrypted data to decrypt');
      return;
    }

    setIsDecrypting(true);
    setError(null);
    setSuccess(null);

    try {
      const decrypted = await fheEncryption.decryptNumber(encryptedData);
      setDecryptedValue(decrypted);
      setShowDecrypted(true);
      setSuccess('Value decrypted successfully');
      onDataDecrypted?.(decrypted);
    } catch (err) {
      setError('Failed to decrypt value');
      console.error('Decryption error:', err);
    } finally {
      setIsDecrypting(false);
    }
  };

  const handleCreateAsset = async () => {
    if (!encryptedData) {
      setError('Please encrypt a value first');
      return;
    }

    try {
      await createAsset(
        'Test Asset',
        'A test asset created with encrypted data',
        'EQUITY',
        Number(inputValue),
        Number(inputValue) / 100 // Price per share
      );
      setSuccess('Asset creation transaction submitted');
    } catch (err) {
      setError('Failed to create asset');
      console.error('Asset creation error:', err);
    }
  };

  const handleInvest = async () => {
    if (!encryptedData) {
      setError('Please encrypt a value first');
      return;
    }

    try {
      await investInAsset(0, Number(inputValue)); // Assuming asset ID 0
      setSuccess('Investment transaction submitted');
    } catch (err) {
      setError('Failed to invest in asset');
      console.error('Investment error:', err);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            FHE Data Encryption Manager
          </CardTitle>
          <CardDescription>
            Encrypt and decrypt sensitive financial data using Fully Homomorphic Encryption
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input Section */}
          <div className="space-y-2">
            <label htmlFor="value-input" className="text-sm font-medium">
              Enter Value to Encrypt
            </label>
            <div className="flex gap-2">
              <Input
                id="value-input"
                type="number"
                placeholder="Enter a number (e.g., 1000)"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={handleEncrypt}
                disabled={isEncrypting || !inputValue}
                className="min-w-[120px]"
              >
                {isEncrypting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Encrypting...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Encrypt
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Encrypted Data Display */}
          {encryptedData && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Encrypted Data</label>
              <div className="p-3 bg-muted rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    FHE Encrypted
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDecrypt}
                    disabled={isDecrypting}
                  >
                    {isDecrypting ? (
                      <>
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Decrypting...
                      </>
                    ) : (
                      <>
                        <Unlock className="h-3 w-3 mr-1" />
                        Decrypt
                      </>
                    )}
                  </Button>
                </div>
                <div className="text-xs font-mono break-all text-muted-foreground">
                  Data: {Array.from(encryptedData.data).map(b => b.toString(16).padStart(2, '0')).join('')}
                </div>
                <div className="text-xs font-mono break-all text-muted-foreground mt-1">
                  Proof: {Array.from(encryptedData.proof).map(b => b.toString(16).padStart(2, '0')).join('')}
                </div>
              </div>
            </div>
          )}

          {/* Decrypted Value Display */}
          {decryptedValue !== null && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Decrypted Value</label>
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-md">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-green-700 dark:text-green-300">
                    {showDecrypted ? decryptedValue : '••••••'}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDecrypted(!showDecrypted)}
                  >
                    {showDecrypted ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {encryptedData && (
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleCreateAsset}
                disabled={isPending}
                className="flex-1"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating Asset...
                  </>
                ) : (
                  'Create Asset with Encrypted Data'
                )}
              </Button>
              <Button
                onClick={handleInvest}
                disabled={isPending}
                variant="outline"
                className="flex-1"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Investing...
                  </>
                ) : (
                  'Invest with Encrypted Amount'
                )}
              </Button>
            </div>
          )}

          {/* Status Messages */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}
          {isConfirmed && (
            <Alert>
              <AlertDescription>
                Transaction confirmed! Your encrypted data has been submitted to the blockchain.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
