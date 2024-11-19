import { useContractRead } from 'wagmi';
import { abi } from '../components/abi';
import { Timer } from 'lucide-react';

const contractAddress = '0x30378D3724A273FfcadcB086E54DB4E8Ea47de51';

interface HeroProps {
  jackpot: number;
  timeLeft: number;
}

export default function Hero({ timeLeft }: HeroProps) {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const { data: balance, isLoading, isError, error } = useContractRead({
    address: contractAddress,
    abi,
    functionName: 'getBalance'
  });

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur du chargement de la balance: {error?.message}</div>;

  return (
    <div className="text-center py-20 px-4">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
        La loterie de Noël
      </h1>
      <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
        Participez à EtherBay, la première loterie entièrement basée sur la blockchain, offrant une transparence totale !
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-full md:w-64">
          <h3 className="text-lg text-gray-300 mb-2">Montant actuel du Jackpot</h3>
          <p className="text-4xl font-bold text-pink-500">
            {balance ? (Number(balance) / 1e18).toFixed(5) : '0.0000'} ETH
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 w-full md:w-64">
          <h3 className="text-lg text-gray-300 mb-2">Temps restant avant le tirage au sort</h3>
          <div className="flex items-center justify-center gap-2">
            <Timer className="w-6 h-6 text-pink-500" />
            <p className="text-2xl font-bold">{formatTime(timeLeft)}</p>
          </div>
        </div>
      </div>

      <button
        className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105"
        onClick={() => {
          const section = document.getElementById('buy');
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        Acheter un Ticket
      </button>
    </div>
  );
}
