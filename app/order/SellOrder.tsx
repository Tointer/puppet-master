'use client';

import { useAccount, useConnect, useWaitForTransactionReceipt } from 'wagmi';
import { useState, useEffect } from 'react';
import TokenInput from '../components/TokenInput';
import { formatEther, maxUint256, parseEther } from 'viem';
import { 
    useWritePuppetHubLockAndInitiateOrder,
    useWriteScrollMockTokenApprove,
    useWriteScrollMockTokenMint,
    useReadScrollMockTokenAllowance,
    useReadScrollMockTokenBalanceOf,
  } from '../../src/generated';
  import {contracts} from '@/lib/wagmiConfig';
  import { Loader2 } from "lucide-react"


interface SellOrderProps{
    offerTokenSymbol: string,
    offerTokenBalance: bigint,
    buyTokenSymbol: string,
    marketPrice: number,
}

const truncate18Decimals = (number: bigint, decimals: number = 4): number => {
    return Number(number / 10n ** BigInt(18 - decimals)) / 10 ** decimals;
  };

function SellOrder({offerTokenSymbol, offerTokenBalance, buyTokenSymbol, marketPrice}: SellOrderProps) {

    const { address } = useAccount();
    const [tokenAmount, setTokenAmount] = useState<string>('');
    const [buyTokenAmount, setBuyTokenAmount] = useState<string>('');

    const {
        data: createOrderHash,
        writeContract: createOrderWriteContract,
        isPending: isPEndingCreateOrder,
        error: createOrderError,
    } = useWritePuppetHubLockAndInitiateOrder();

    const {
        data: mintHash,
        writeContract: mintWriteContract,
        isPending: isPendingMint,
    } = useWriteScrollMockTokenMint();
    const mintTx = useWaitForTransactionReceipt({hash: mintHash});

    const createOrderTx = useWaitForTransactionReceipt({hash: createOrderHash});

    const createOrder = async () => {
        const offerTokenAmountParsed = parseEther(tokenAmount);
        const buyTokenAmountParsed = parseEther(buyTokenAmount);

        if(address === undefined){
            return;
        }

        const order = {
            receiver: address!,
            tokenIn: contracts.scrollMockToken.address!,
            tokenOut: contracts.scrollMockToken.address!,
            chainIn: 40170,
            chainOut: 40231,
            amountIn: offerTokenAmountParsed,
            minAmountOut: buyTokenAmountParsed,
            deadline: BigInt(Math.floor(Date.now() / 1000) + 60 * 1000),
        }

        createOrderWriteContract({args: [order]});
    }


    useEffect(() => {
        if(createOrderTx.isSuccess){
           setTokenAmount('');
            setBuyTokenAmount('');
        }
    }, [createOrderTx.isSuccess])


    const createOrderLoading = createOrderTx.isLoading || isPEndingCreateOrder;
    

    const onOfferAmountChanged = (value: string) => {
        setTokenAmount(value);
    }

    const onBuyAmountChanged = (value: string) => {
        setBuyTokenAmount(value);
    }

    const marketPriceAmount = (Number.parseFloat(tokenAmount) / marketPrice);

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
        <div className='w-full rounded-lg flex justify-center items-center p-2 mt-6'>
            <button disabled={createOrderLoading} className='bg-transparent border border-gray-600 hover:bg-gray-600/25 rounded-md px-8 py-1 text-xl font-sora flex justify-center items-center' onClick={createOrder}>
                {createOrderLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create order
            </button>
        </div>
    </div>
  );
}

export default SellOrder;
