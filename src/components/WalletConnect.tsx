import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useBalance } from 'wagmi';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address: address,
  });

  return (
    <div className="flex items-center gap-4">
      <ConnectButton />
      {isConnected && (
        <div className="text-sm text-gray-600">
          {balance && (
            <span>
              Balance: {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
