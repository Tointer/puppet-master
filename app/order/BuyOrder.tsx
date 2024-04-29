'use client';

import { useAccount, useConnect, useDisconnect, useBalance, useWaitForTransactionReceipt } from 'wagmi';
import { useEffect, useState } from 'react';
import TokenInput from '../components/TokenInput';
import { formatEther, maxUint256, parseEther } from 'viem';
import { 
    useWritePuppetHubLockAndInitiateOrder,
    useWriteScrollMockTokenApprove,
    useWriteScrollMockTokenMint,
    useReadScrollMockTokenAllowance,
    useReadScrollMockTokenBalanceOf,
  } from '../../src/generated'
  import {contracts} from '@/lib/wagmiConfig';
  import { Loader2 } from "lucide-react"

interface BuyOrderProps{
    offerTokenSymbol: string,
    offerTokenBalance: bigint,
    buyTokenSymbol: string,
    marketPrice: number,
    onOrderCreated: (nativeTokensAmount: number, remoteTokensAmount: number) => void,
}

const truncate18Decimals = (number: bigint, decimals: number = 4): number => {
    return Number(number / 10n ** BigInt(18 - decimals)) / 10 ** decimals;
  };

function BuyOrder({offerTokenSymbol, offerTokenBalance, buyTokenSymbol, marketPrice, onOrderCreated}: BuyOrderProps) {
    const { address } = useAccount();
    const [tokenAmount, setTokenAmount] = useState<string>('');
    const [buyTokenAmount, setBuyTokenAmount] = useState<string>('');

    const {data: allowance, refetch: allowanceRefetch} = useReadScrollMockTokenAllowance({args: [address!, contracts.puppetHub.address!]})
    const {data: offerTokenUserBalance, refetch: offerTokenUserBalanceRefetch} = useReadScrollMockTokenBalanceOf({args: [address!]})

    const {
        data: createOrderHash,
        writeContract: createOrderWriteContract,
        isPending: isPEndingCreateOrder,
        error: createOrderError,
    } = useWritePuppetHubLockAndInitiateOrder();

    const {
        data: approveHash,
        writeContract: approveWriteContract,
        isPending: isPendingApprove,
    } = useWriteScrollMockTokenApprove();
    const approveTx = useWaitForTransactionReceipt({hash: approveHash});

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

        if(allowance === undefined || allowance < offerTokenAmountParsed){
            approveWriteContract({args: [contracts.puppetHub.address!, maxUint256]});
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

    const mintTokens = () => {
        mintWriteContract({args: [address!, parseEther('7007')]});
    }

    useEffect(() => {
        if(createOrderTx.isSuccess){
            onOrderCreated(Number.parseFloat(tokenAmount), Number.parseFloat(buyTokenAmount));
            setTokenAmount('');
            setBuyTokenAmount('');
            offerTokenUserBalanceRefetch();
        }
    }, [createOrderTx.isSuccess])

    useEffect(() => {
        if(approveTx.isSuccess){
            //sleep 1 sec
            allowanceRefetch().then(() => createOrder());
        }
    }, [approveTx.isSuccess])

    useEffect(() => {
        if(mintTx.isSuccess){
            offerTokenUserBalanceRefetch();
        }
    }, [mintTx.isSuccess])

    const createOrderLoading = createOrderTx.isLoading || isPEndingCreateOrder || isPendingApprove || approveTx.isLoading;
    

    const onOfferAmountChanged = (value: string) => {
        setTokenAmount(value);
    }

    const onBuyAmountChanged = (value: string) => {
        setBuyTokenAmount(value);
    }

    const marketPriceAmount = (Number.parseFloat(tokenAmount) / marketPrice);

  return (
    <div className='w-[400px] h-[520px]  flex flex-col justify-between'>
        <div className='w-full rounded-lg flex-col justify-between items-center py-6 px-12'>
            <div className='h-24'>
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between  w-full">
                        <label className="text-sm text-text-gray-300">
                        {offerTokenSymbol} offer amount
                        </label>
                        <p className="text-xs">
                            <span className="text-text-gray-300">Balance: </span>
                            {truncate18Decimals(offerTokenUserBalance??0n)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-1 h-12">
                <TokenInput value={tokenAmount} jumpValue={formatEther(offerTokenUserBalance??0n)} onChange={onOfferAmountChanged}/>
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
        <div className='h-full flex flex-col justify-end'>
          <button onClick={mintTokens} className='bg-transparent border border-gray-600 hover:bg-gray-600/25 rounded-md px-8 py-1 text-xs font-sora flex justify-center items-center'>Mint testnet USDC</button>
          <p className='text-xs text-center'>Some functionalities is mocked to show how it will work with actual solvers, but protocol is fully functional</p>
        </div>
    </div>
  );
}

export default BuyOrder;
