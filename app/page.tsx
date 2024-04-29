'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import CoinPanel from './CoinPanel';
import OrderPanel from './OrderPanel';
import Image from 'next/image'
import { useState } from 'react';

function App() {
  const account = useAccount();
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

  function onCoinClick(coin: {name: string, symbol: string, balance: bigint}){
    setSelectedCoin(coin);
  }

  const coins = [{name: 'GMX from Arbitrum', symbol: 'GMX', balance: 0n * 10n**17n, iconPath: '/gmx_icon.webp'}, {name: 'BALD from Base', symbol: 'BALD', balance: 0n, iconPath: '/bald_icon.webp'}];

  return (
    <div className='flex items-center w-full place-content-center mt-8 gap-8'>
      <div className='flex flex-col m-8 border border-gray-100 w-[400px] h-[600px] items-center p-5 rounded-2xl'>
        <div className='mb-2'><ConnectKitButton /></div>
        {coins.map((coin: CoinParams) => <CoinPanel name={coin.name} symbol={coin.symbol} balance={coin.balance} key={coin.symbol} iconPath={coin.iconPath} onClick={onCoinClick} />)}
      </div>
      <div
      className='w-[400px] h-[600px] bg-contain bg-no-repeat bg-center'
      style={{backgroundImage: `url('/puppet-hand.png')`}}
      >
        <div 
        className={'h-full w-full bg-black rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 border border-gray-100 transition-opacity duration-500 ease-out' 
          + (account && selectedCoin !== undefined ? ' opacity-100 visible' : ' opacity-0 invisible')
        }
        >
          <OrderPanel name={selectedCoin?.name??''} symbol={selectedCoin?.symbol??''} remoteTokenBalance={selectedCoin?.balance??0n} sourceTokenSymbol={'USDC'} sourceTokenBalance={10n**19n} />
        </div>
      </div>
    </div>
  );
}

export default App;
