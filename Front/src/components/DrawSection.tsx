import { Trophy } from 'lucide-react';

export default function DrawSection() {
  const previousWinners = [
    { address: '0x1234...5678', prize: '12.5 ETH', date: '2024-03-10' },
    { address: '0x8765...4321', prize: '10.2 ETH', date: '2024-03-03' },
    { address: '0x9876...1234', prize: '8.7 ETH', date: '2024-02-25' },
  ];

  return (
    <section className="max-w-4xl mx-auto my-20" id="winners">
      <h2 className="text-3xl font-bold mb-8 text-center">Les précédents gagnants</h2>
      
      <div className="grid gap-4">
        {previousWinners.map((winner, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="font-mono">{winner.address}</p>
                <p className="text-sm text-gray-400">{winner.date}</p>
              </div>
            </div>
            <p className="text-xl font-bold text-pink-500">{winner.prize}</p>
          </div>
        ))}
      </div>
    </section>
  );
}