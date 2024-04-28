'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';
import TokenInput from '../components/TokenInput';

interface SellOrderProps{
  name: string,
  symbol: string,
  balance: bigint,
}

function SellOrder({name, symbol, balance}: SellOrderProps) {

    const [selectedState, setSelectedState] = useState<'Buy'|'Sell'>('Buy');


  return (
    <div className='w-full rounded-lg flex justify-between items-center p-2 hover:bg-neutral-900'>
        <div className='flex items-center'>
            <div className='bg-white rounded-full w-10 h-10 mr-2'></div>
            <div className='flex flex-col'>
                <p>{name}</p>
                <p className='text-gray-700 text-sm'>{symbol}</p>
            </div>
        </div>
        <TokenInput
            className='w-1/2'
            value=''
            maxValue={balance.toString()}
            onChange={(s) => console.log(s)}
        />
    </div>
  );
}

export default SellOrder;
