import Head from 'next/head';

export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
        <header className="bg-purple-700 p-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">
            BlockLucky
          </div>
      
          <a href="/wallet">
            <button className="bg-purple-600 hover:bg-purple-800 shadow border-0 text-white font-bold py-2 px-4 rounded">
              Connecter le Wallet
            </button>
          </a>
    </header>
      
      <main className="px-4 py-10 max-w-6xl mx-auto">
      <section class="pt-20 text-center">

        <h1 class="mt-3 text-2xl md:text-4xl font-medium z-10">REVOLUTIONIZE YOUR</h1>
        <h2 class="text-2xl md:text-4xl font-medium">LOTTERY EXPERIENCE</h2>
        <h3 class="text-2xl mt-3 z-10 text-[#9F95B4] w-3/4 lg:w-7/12 xl:w-5/12 mx-auto">Welcome to the future of absolute transparency and fairness. No more guessing, only trustless gaming!</h3>
        <div class="mt-3">
          <div class="flex flex-row w-full place-content-center">
          <div className="inline-block overflow-hidden mt-3 font-sans text-sm text-rose-200 uppercase hover:cursor-pointer hover:border-amber-400 hover:text-white">
                <button className="bg-purple-600 text-white font-bold py-4 px-12 rounded-lg text-xl transition-all duration-300 transform hover:scale-105 hover:bg-purple-700 hover:shadow-2xl focus:outline-none">
                  START PLAYING
                </button>
              </div>
          </div>
        </div>
      
      </section>


      </main>

    </div>
  );
}
