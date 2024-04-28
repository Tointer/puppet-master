'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';
import TokenInput from '../components/TokenInput';
import { formatEther, maxUint256, parseEther } from 'viem';

interface BuyOrderProps{
    offerTokenSymbol: string,
    offerTokenBalance: bigint,
    buyTokenSymbol: string,
    marketPrice: number,
}

const truncate18Decimals = (number: bigint, decimals: number = 4): number => {
    return Number(number / 10n ** BigInt(18 - decimals)) / 10 ** decimals;
  };

function BuyOrder({offerTokenSymbol, offerTokenBalance, buyTokenSymbol, marketPrice}: BuyOrderProps) {

    const [tokenAmount, setTokenAmount] = useState<string>('');
    const [buyTokenAmount, setBuyTokenAmount] = useState<string>('');
    

    const onOfferAmountChanged = (value: string) => {
        setTokenAmount(value);
    }

    const onBuyAmountChanged = (value: string) => {
        setBuyTokenAmount(value);
    }

    const marketPriceAmount = truncate18Decimals(BigInt(tokenAmount) * 10n**18n) / marketPrice;

  return (
    <div className='h-1/2 flex flex-col justify-between'>
        <div className='w-full rounded-lg flex-col justify-between items-center py-6 px-12'>
            <div className='h-24'>
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between  w-full">
                        <label className="text-sm text-text-gray-300">
                        {offerTokenSymbol} offer amount
                        </label>
                        <p className="text-xs">
                            <span className="text-text-gray-300">Balance: </span>
                            {truncate18Decimals(offerTokenBalance??0n)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-1 h-12">
                <TokenInput value={tokenAmount} jumpValue={formatEther(offerTokenBalance??0n)} onChange={onOfferAmountChanged}/>
                </div>
            </div >
            <div className='h-12'>
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between  w-full">
                        <label className="text-sm text-text-gray-300">
                        {buyTokenSymbol} buy amount
                        </label>
                        <p className="text-xs">
                            <span className="text-text-gray-300">Market price: </span>
                            {marketPrice.toFixed(2)} {offerTokenSymbol}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-1 h-12">
                <TokenInput value={buyTokenAmount} jumpValue={marketPriceAmount.toFixed(3)} onChange={onBuyAmountChanged} jumpLabel='MARKET'/>
                </div>
            </div >
        </div>
        <div className='w-full rounded-lg flex justify-center items-center p-2'>
            <button className='bg-transparent border border-gray-600 hover:bg-gray-600/25 rounded-md px-8 py-1 text-xl font-sora'>Create order</button>
        </div>
    </div>
  );
}

export default BuyOrder;
