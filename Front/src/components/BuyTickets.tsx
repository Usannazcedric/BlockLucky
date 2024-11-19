import { useState } from 'react';
import { Ticket } from 'lucide-react';
import { 
  type BaseError,
  useWaitForTransactionReceipt, 
  useWriteContract 
} from 'wagmi'
import { abi } from '../components/abi'

interface BuyTicketsProps {
  jackpot: number;
  setJackpot: (value: number) => void;
}

export default function BuyTickets({ jackpot, setJackpot }: BuyTicketsProps) {
  const { 
    data: hash,
    error,
    isPending, 
    writeContract 
  } = useWriteContract();

  const [ticketCount, setTicketCount] = useState(1);  
  const ticketPrice = 0.0002;  
  const [showConfirmation, setShowConfirmation] = useState(false); // Gérer l'état de la pop-up
  const [confirmed, setConfirmed] = useState(false); // Gérer la confirmation de l'utilisateur
  
  const totalAmount = ticketCount * ticketPrice;

  const handleBuyTickets = async () => {
    if (confirmed) {
      try {
        await writeContract({
          address: '0x30378D3724A273FfcadcB086E54DB4E8Ea47de51',
          abi,
          functionName: 'enter', 
          value: BigInt(totalAmount * 1e18), 
        });

        setJackpot(jackpot + totalAmount);  
      } catch (err) {
        console.error("Erreur lors de l'achat des tickets:", err);
      }
    } else {
      setShowConfirmation(true); // Afficher la pop-up si l'utilisateur n'a pas confirmé
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmedTransaction } = useWaitForTransactionReceipt({ hash });

  return (
    <section className="max-w-4xl mx-auto my-20 p-8 bg-white/10 backdrop-blur-lg rounded-2xl" id="buy">
      <h2 className="text-3xl font-bold mb-8 text-center">Acheter des Tickets</h2>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 w-full">
          <label className="block text-gray-300 mb-2">Nombre de tickets</label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
              className="bg-pink-500/20 hover:bg-pink-500/30 w-10 h-10 rounded-lg flex items-center justify-center"
            >
              -
            </button>
            <input
              type="number"
              value={ticketCount}
              onChange={(e) => setTicketCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="bg-white/5 border border-white/20 rounded-lg p-2 w-20 text-center"
            />
            <button
              onClick={() => setTicketCount(ticketCount + 1)}
              className="bg-pink-500/20 hover:bg-pink-500/30 w-10 h-10 rounded-lg flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span>Prix par Ticket</span>
              <span>{ticketPrice} ETH</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span className="text-xl font-bold">{totalAmount.toFixed(2)} ETH</span>
            </div>

            <button
              onClick={handleBuyTickets}
              className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 py-3 rounded-lg flex items-center justify-center gap-2"
              disabled={isPending}
            >
              <Ticket className="w-5 h-5" />
              {isPending ? "Processing..." : "Acheter vos Tickets"}
            </button>
          </div>
        </div>
      </div>

      {isConfirming && <div className="mt-4 text-center">En attente de confirmation...</div>}
      {isConfirmedTransaction && <div className="mt-4 text-center text-green-500">Transaction confirmée.</div>}
      {error && <div className="mt-4 text-center text-red-500">Error: {(error as BaseError).shortMessage || error.message}</div>}

      {/* Pop-up de confirmation */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50">
          <div className="bg-white p-8 rounded-lg w-96 text-black">
            <h3 className="text-xl font-bold mb-4">Avertissement</h3>
            <p className="mb-4">Les jeux d'argent sont interdits pour les personnes de moins de 18 ans. Confirmez-vous avoir plus de 18 ans ?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg"
              >
                Annuler
              </button>
              <button
                onClick={() => { setConfirmed(true); setShowConfirmation(false); handleBuyTickets(); }}
                className="px-6 py-2 bg-pink-500 text-white rounded-lg"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
