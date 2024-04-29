'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import CoinPanel from './CoinPanel';
import OrderPanel from './OrderPanel';
import Image from 'next/image'
import { useState } from 'react';
import { 
  useWriteScrollMockTokenMint,
  useReadScrollMockTokenBalanceOf,
} from '../src/generated'
import { formatEther, maxUint256, parseEther } from 'viem';

function App() {
  const { address } = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  interface CoinParams{
    name: string,
    symbol: string,
    balance: bigint,
    iconPath: string,
  }

  //selected coin useState
  const [selectedCoin, setSelectedCoin] = useState<{name: string, symbol: string, balance: bigint} | undefined>();
  const [allTokens, setAllTokens] = useState<CoinParams[]>([{name: 'GMX from Arbitrum', symbol: 'GMX', balance: 0n * 10n**17n, iconPath: '/gmx_icon.webp'}, {name: 'BALD from Base', symbol: 'BALD', balance: 0n, iconPath: '/bald_icon.webp'}]);


  function onCoinClick(coin: {name: string, symbol: string, balance: bigint}){
    setSelectedCoin(coin);
  }

  function onOrderCreated(nativeTokensAmount: number, remoteTokensAmount: number){
    if(selectedCoin === undefined) return;
    const allCoins = allTokens;
    allCoins[0].balance += parseEther(remoteTokensAmount.toString());
    

    setAllTokens([...allCoins]);
  }

  return (
    <div className='flex items-center w-full place-content-center mt-8 gap-8'>
      <div className='h-full flex flex-col justify-around'>
        <div className='flex flex-col m-8 border border-gray-100 w-[400px] h-[600px] items-center p-5 rounded-2xl'>
          <div className='mb-2'><ConnectKitButton /></div>
          {allTokens.map((coin: CoinParams) => <CoinPanel name={coin.name} symbol={coin.symbol} balance={coin.balance} key={coin.symbol} iconPath={coin.iconPath} onClick={onCoinClick} />)}
        </div>
      
      </div>
      <div
      className='w-[400px] h-[600px] bg-contain bg-no-repeat bg-center'
      style={{backgroundImage: `url('/puppet-hand.png')`}}
      >
        <div 
        className={'h-full w-full bg-black rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 border border-gray-100 transition-opacity duration-500 ease-out' 
          + (address && selectedCoin !== undefined ? ' opacity-100 visible' : ' opacity-0 invisible')
        }
        >
          <OrderPanel name={selectedCoin?.name??''} symbol={selectedCoin?.symbol??''} remoteTokenBalance={selectedCoin?.balance??0n} sourceTokenSymbol={'USDC'} sourceTokenBalance={10n**19n} onOrderCreated={onOrderCreated} />
        </div>
      </div>
    </div>
  );
}

export default App;
