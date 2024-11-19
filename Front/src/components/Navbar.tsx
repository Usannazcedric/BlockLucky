import { Ticket } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
  // Fonction utilitaire pour défiler vers un élément avec un ID donné
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Ticket className="w-8 h-8 text-pink-500" />
            <span className="text-xl font-bold">EtherBay Loterie</span>
          </div>
          <div className="flex items-center space-x-6">
            <button
              className="hover:text-pink-400 transition"
              onClick={() => scrollToSection('faq')}
            >
              FAQ
            </button>
            <button
              className="hover:text-pink-400 transition"
              onClick={() => scrollToSection('winners')}
            >
              Gagnants
            </button>
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
