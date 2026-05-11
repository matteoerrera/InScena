import { useState } from 'react'

function ScriptSelection({ scripts, onSelectScript }) {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <div className="max-w-4xl w-full animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            In Scena
          </h1>
          <p className="text-slate-400 text-lg md:text-xl mb-2">
            Il tuo compagno digitale per le prove teatrali
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-3 text-center">
            Scegli il copione
          </h2>
          <p className="text-slate-400 text-center">
            Seleziona quale scena vuoi provare
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scripts.map((script) => (
            <button
              key={script.id}
              onClick={() => onSelectScript(script)}
              onMouseEnter={() => setHoveredId(script.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group"
            >
              <div
                className={`
                  glass-effect rounded-3xl p-8 border-2 transition-all duration-300 
                  hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20
                  ${hoveredId === script.id ? 'border-purple-500/50 bg-white/10' : 'border-white/10'}
                `}
              >
                <div className="text-6xl mb-4 text-center">
                  {script.thumbnail}
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 text-center">
                  {script.title}
                </h3>

                <p className="text-slate-400 text-center text-sm mb-4">
                  {script.description}
                </p>

                <div className="flex items-center justify-center gap-2 text-sm text-purple-400 font-semibold">
                  <span>Inizia a provare</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>Porta il teatro sempre con te 🎭</p>
        </div>
      </div>
    </div>
  )
}

export default ScriptSelection
