function EndScreen({ scriptTitle, characterName, onRestart, onChangeCharacter }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <div className="max-w-2xl w-full text-center animate-fade-in">
        <div className="glass-effect rounded-3xl p-12 shadow-2xl">
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 flex items-center justify-center animate-pulse-slow">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Scena Completata!
            </h2>
            
            <p className="text-xl text-slate-300 mb-2">
              Hai interpretato <span className="font-semibold text-purple-400">{characterName}</span>
            </p>
            
            <p className="text-slate-400">
              in "{scriptTitle}"
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={onRestart}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-xl min-h-[56px] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Ricomincia Scena
            </button>

            <button
              onClick={onChangeCharacter}
              className="px-8 py-4 rounded-xl glass-effect hover:bg-white/10 text-white font-semibold text-lg transition-all duration-200 hover:scale-105 min-h-[56px] flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Cambia Personaggio
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-slate-500 text-sm">
              Ottimo lavoro! Continua ad esercitarti per perfezionare la tua interpretazione.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EndScreen
