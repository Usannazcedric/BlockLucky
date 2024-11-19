import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BuyTickets from './components/BuyTickets';
import DrawSection from './components/DrawSection';
import ChooseWinner from './components/ChooseWinner';
import FAQ from './components/FAQ';
import Snowfall from 'react-snowfall'; // Importer la bibliothèque

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'BlockLucky',
  projectId: '57b9047a66717850926590793136b77d',
  chains: [sepolia],
  ssr: false,
});

const queryClient = new QueryClient();

function App() {
  const [jackpot, setJackpot] = useState(15.5);
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem('timeLeft');
    return savedTime ? parseInt(savedTime, 10) : 172800;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev > 0 ? prev - 1 : 172800;
        localStorage.setItem('timeLeft', newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white">
            <Snowfall /> {/* Ajouter l'effet de neige ici */}
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Hero jackpot={jackpot} timeLeft={timeLeft} />
              <BuyTickets jackpot={jackpot} setJackpot={setJackpot} />
              <ChooseWinner />
              <DrawSection />
              <FAQ />
            </main>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
