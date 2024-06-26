'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';
import TokenInput from './components/TokenInput';
import BuyOrder from './order/BuyOrder';
import SellOrder from './order/SellOrder';

interface OrderPanelProps{
  name: string,
  symbol: string,
  remoteTokenBalance: bigint,
  sourceTokenSymbol: string,
  sourceTokenBalance: bigint,
  onOrderCreated: (nativeTokensAmount: number, remoteTokensAmount: number) => void,
}

function OrderPanel({name, symbol, remoteTokenBalance, sourceTokenSymbol, sourceTokenBalance, onOrderCreated}: OrderPanelProps) {

    const [selectedState, setSelectedState] = useState<'Buy'|'Sell'>('Buy');


  return (
    <>
      <div className='w-full rounded-lg flex justify-around items-center content-center h-14' onClick={() => console.log(name)}>
        <button 
            className={'text-center text-2xl w-full rounded-tl-2xl h-full p-2 ' + (selectedState === 'Buy'?'':'hover:bg-neutral-900 bg-black')}
            onClick={() => setSelectedState('Buy')}>
                Buy
        </button>
        <button 
            className={'text-center text-2xl w-full rounded-tr-2xl h-full p-2 ' + (selectedState === 'Sell'?'':'hover:bg-neutral-900 bg-black')}
            onClick={() => setSelectedState('Sell')}>
                Sell
        </button>
      </div>
      {selectedState === 'Buy' ? 
        <BuyOrder offerTokenSymbol={'USDC'} offerTokenBalance={BigInt(sourceTokenBalance)} buyTokenSymbol={symbol} marketPrice={26.12} onOrderCreated={onOrderCreated}/>
        : 
        <SellOrder offerTokenSymbol={symbol} offerTokenBalance={BigInt(remoteTokenBalance)} buyTokenSymbol={sourceTokenSymbol} marketPrice={1/26.12} />
      }
    </>
  );
}

export default OrderPanel;
