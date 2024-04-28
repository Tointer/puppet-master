'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

interface CoinPanelProps{
  name: string,
  symbol: string,
  balance: bigint,
  onClick: (self: {name: string, symbol: string, balance: bigint}) => void,
}

const truncate18Decimals = (number: bigint, decimals: number = 4): number => {
  return Number(number / 10n ** BigInt(18 - decimals)) / 10 ** decimals;
};

function CoinPanel({name, symbol, balance, onClick}: CoinPanelProps) {

  return (
    <>
      <div className='w-full rounded-lg flex justify-between items-center p-2 hover:bg-neutral-900' onClick={() => onClick({name, symbol, balance})}>
        <div className='flex items-center'>
            <div className='bg-white rounded-full w-10 h-10 mr-2'></div>
            <div className='flex flex-col'>
                <p>{name}</p>
                <p className='text-gray-700 text-sm'>{symbol}</p>
            </div>
        </div>
        <p className='text-center text-2xl'>{truncate18Decimals(balance)}</p>
      </div>
    </>
  );
}

export default CoinPanel;
