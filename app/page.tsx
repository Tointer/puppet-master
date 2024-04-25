'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import CoinPanel from './CoinPanel';
import Image from 'next/image'
import { useState } from 'react';

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  interface CoinParams{
    name: string,
    symbol: string,
    balance: number,
  }

  //selected coin useState
  const [selectedCoin, setSelectedCoin] = useState<string>('');

  function onCoinClick(name: string){
    setSelectedCoin(name);
  }

  const coins = [{name: 'GMX from Arbitrum', symbol: 'GMX', balance: 120.2}, {name: 'BALD from Base', symbol: 'BALD', balance: 0}];

  return (
    <div className='flex items-center w-full place-content-center mt-8 gap-8'>
      <div className='flex flex-col m-8 border border-gray-100 w-[400px] h-[600px] items-center p-5 rounded-2xl'>
        <div className='mb-2'><ConnectKitButton /></div>
        {coins.map((coin: CoinParams) => <CoinPanel name={coin.name} symbol={coin.symbol} balance={coin.balance} key={coin.symbol} onClick={onCoinClick} />)}
      </div>
      <div
      className='w-[400px] h-[600px] bg-contain bg-no-repeat bg-center'
      style={{backgroundImage: `url('/puppet-hand.png')`}}
      >
        {account && selectedCoin !== '' && 
          <div className='h-full w-full bg-black rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-10 border border-gray-100'></div>
        }
      </div>
    </div>
  );
}

export default App;
