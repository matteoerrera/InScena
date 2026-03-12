import { useState } from 'react'

function DialogueCard({ character, line, isUserLine, hideUserText }) {
  const [isRevealing, setIsRevealing] = useState(false)

  const shouldHideText = isUserLine && hideUserText && !isRevealing

  const handlePressStart = () => {
    if (isUserLine && hideUserText) {
      setIsRevealing(true)
    }
  }

  const handlePressEnd = () => {
    if (isUserLine && hideUserText) {
      setIsRevealing(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <div 
        className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500"
        style={{
          borderColor: character.color,
          borderWidth: '2px',
          boxShadow: `0 0 80px ${character.color}30`
        }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg flex-shrink-0"
            style={{ backgroundColor: character.color }}
          >
            {character.name.charAt(0)}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-bold text-white truncate">
              {character.name}
            </h3>
            {isUserLine && (
              <span className="inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/30 text-purple-300 border border-purple-500/50">
                Il tuo turno
              </span>
            )}
          </div>
        </div>

        <div 
          className={`text-slate-100 text-xl md:text-2xl leading-relaxed font-medium transition-all duration-300 select-none ${
            shouldHideText ? 'cursor-pointer' : ''
          }`}
          onMouseDown={handlePressStart}
          onMouseUp={handlePressEnd}
          onMouseLeave={handlePressEnd}
          onTouchStart={handlePressStart}
          onTouchEnd={handlePressEnd}
        >
          {shouldHideText ? (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-3">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-slate-300 mb-2">
                Testo nascosto
              </p>
              <p className="text-sm text-slate-500">
                Tieni premuto per sbirciare
              </p>
            </div>
          ) : (
            line.text
          )}
        </div>

        {line.scene && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <span className="text-slate-500 text-sm uppercase tracking-wider">
              Scena: {line.scene}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default DialogueCard
