import { useState } from 'react'

function SettingsModal({ isOpen, onClose, hideUserText, onHideUserTextChange }) {
  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in">
        <div className="glass-effect border-2 border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Impostazioni
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg glass-effect hover:bg-white/10 transition-all duration-200 flex items-center justify-center text-slate-400 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-900/50 rounded-2xl p-5 border border-white/10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Nascondi testo durante le tue battute
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Metti alla prova la tua memoria. Tieni premuto sullo schermo per sbirciare il testo.
                  </p>
                </div>
                <button
                  onClick={() => onHideUserTextChange(!hideUserText)}
                  className={`relative w-14 h-8 rounded-full transition-all duration-300 flex-shrink-0 ${
                    hideUserText 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                      : 'bg-slate-700'
                  }`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
                    hideUserText ? 'right-1' : 'left-1'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg"
          >
            Chiudi
          </button>
        </div>
      </div>
    </>
  )
}

function CharacterSelection({ characters, metadata, hideUserText, onSelect, onHideUserTextChange }) {
  const [hoveredId, setHoveredId] = useState(null)
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      <div className="max-w-4xl w-full animate-fade-in">
        <div className="text-center mb-12 relative">
          <button
            onClick={() => setShowSettings(true)}
            className="absolute top-0 right-0 w-12 h-12 rounded-xl glass-effect hover:bg-white/10 transition-all duration-200 flex items-center justify-center text-slate-400 hover:text-white"
            title="Impostazioni"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            In Scena
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-2">
            {metadata.title}
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {metadata.description}
          </p>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-slate-200 mb-2">
            Scegli il tuo personaggio
          </h2>
          <p className="text-slate-400">
            Interpreterai questo ruolo durante la scena
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character, index) => (
            <button
              key={character.id}
              onClick={() => onSelect(character)}
              onMouseEnter={() => setHoveredId(character.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative glass-effect rounded-3xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl min-h-[280px] flex flex-col items-center justify-center text-center animate-slide-up"
              style={{
                animationDelay: `${index * 100}ms`,
                borderColor: hoveredId === character.id ? character.color : 'transparent',
                borderWidth: '2px'
              }}
            >
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{ backgroundColor: character.color }}
              />
              
              <div className="relative z-10">
                <div 
                  className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold shadow-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: character.color }}
                >
                  {character.name.charAt(0)}
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {character.name}
                </h3>
                
                <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                  {character.description}
                </p>
                
                <div 
                  className="inline-block px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 group-hover:shadow-lg"
                  style={{ 
                    backgroundColor: `${character.color}20`,
                    color: character.color 
                  }}
                >
                  Seleziona
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center text-slate-500 text-sm">
          <p>Le battute degli altri personaggi saranno accompagnate da audio</p>
          <p>Le tue battute richiederanno la tua interpretazione</p>
        </div>
      </div>

      <SettingsModal 
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        hideUserText={hideUserText}
        onHideUserTextChange={onHideUserTextChange}
      />
    </div>
  )
}

export default CharacterSelection
