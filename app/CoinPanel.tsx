'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

interface CoinPanelProps{
  name: string,
  symbol: string,
  balance: number,
  onClick: (name: string) => void,
}

function CoinPanel({name, symbol, balance, onClick}: CoinPanelProps) {


  return (
    <>
      <div className='w-full rounded-lg flex justify-between items-center p-2 hover:bg-neutral-900' onClick={() => onClick(name)}>
        <div className='flex items-center'>
            <div className='bg-white rounded-full w-10 h-10 mr-2'></div>
            <div className='flex flex-col'>
                <p>{name}</p>
                <p className='text-gray-700 text-sm'>{symbol}</p>
            </div>
        </div>
        <p className='text-center text-2xl'>{balance.toString()}</p>
      </div>
    </>
  );
}

export default CoinPanel;
