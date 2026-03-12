import { useState } from 'react'

function SpeedMenu({ currentSpeed, onChange }) {
  const [isOpen, setIsOpen] = useState(false)
  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full glass-effect hover:bg-white/10 transition-all duration-200 flex items-center justify-center text-slate-300 hover:text-white"
        title={`Velocità: ${currentSpeed}x`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-20" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-full right-0 mb-2 bg-slate-900/95 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-2xl z-30 min-w-[120px]">
            <div className="text-xs text-slate-400 px-3 py-1 mb-1">Velocità</div>
            {speedOptions.map((speed) => (
              <button
                key={speed}
                onClick={() => {
                  onChange(speed)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-between ${
                  currentSpeed === speed
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{speed}x</span>
                {currentSpeed === speed && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function AudioControls({ 
  isPlaying, 
  isUserLine,
  isLoading,
  error,
  currentTime,
  duration,
  playbackRate,
  showCountdown,
  countdownSeconds,
  onPlay, 
  onPause, 
  onSkipForward, 
  onSkipBackward,
  onPlaybackRateChange,
  onSeek
}) {
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (isUserLine) {
    return null
  }

  return (
    <div className="space-y-3">
      {error && (
        <div className="text-center text-amber-400 text-sm">
          {error}
        </div>
      )}

      {duration > 0 && (
        <div className="relative">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>{formatTime(currentTime)}</span>
            {showCountdown && (
              <div className="absolute left-1/2 -translate-x-1/2 animate-pulse">
                <span className="text-xs font-bold text-pink-400 whitespace-nowrap">
                  è il tuo turno tra {countdownSeconds}
                </span>
              </div>
            )}
            <span>{formatTime(duration)}</span>
          </div>
          <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - rect.left
              const percentage = x / rect.width
              onSeek(percentage * duration)
            }}
          >
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-100 group-hover:from-purple-400 group-hover:to-pink-400"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => onSkipBackward(10)}
          disabled={isLoading}
          className="w-12 h-12 rounded-full glass-effect hover:bg-white/10 transition-all duration-200 flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          title="Indietro 10s"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
          </svg>
        </button>

        <button
          onClick={isPlaying ? onPause : onPlay}
          disabled={isLoading}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
          ) : isPlaying ? (
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={() => onSkipForward(10)}
          disabled={isLoading}
          className="w-12 h-12 rounded-full glass-effect hover:bg-white/10 transition-all duration-200 flex items-center justify-center text-slate-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          title="Avanti 10s"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
          </svg>
        </button>

        <SpeedMenu 
          currentSpeed={playbackRate} 
          onChange={onPlaybackRateChange}
        />
      </div>
    </div>
  )
}

export default AudioControls
