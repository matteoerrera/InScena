import { useState, useMemo, useEffect } from 'react'
import { useAudioPlayer } from '../hooks/useAudioPlayer'
import DialogueCard from './DialogueCard'
import AudioControls from './AudioControls'
import ProgressIndicator from './ProgressIndicator'
import EndScreen from './EndScreen'
import NotesModal from './NotesModal'

function ScriptPlayer({ scriptData, selectedCharacter, playbackRate, hideUserText, onPlaybackRateChange, onBackToSelection }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [isSceneComplete, setIsSceneComplete] = useState(false)
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('inscena_notes')
    return saved ? JSON.parse(saved) : {}
  })
  const [showNotesModal, setShowNotesModal] = useState(false)

  useEffect(() => {
    localStorage.setItem('inscena_notes', JSON.stringify(notes))
  }, [notes])

  const handleSaveNote = (lineId, noteText) => {
    setNotes(prev => ({
      ...prev,
      [lineId]: noteText
    }))
  }

  const lines = scriptData.lines
  const currentLine = lines[currentLineIndex]
  const nextLine = currentLineIndex < lines.length - 1 ? lines[currentLineIndex + 1] : null
  
  const currentCharacter = scriptData.characters.find(
    c => c.id === currentLine?.characterId
  )

  const currentLineNote = notes[currentLine?.id] || ''

  const isNextLineUserLine = useMemo(() => {
    return nextLine?.characterId === selectedCharacter.id
  }, [nextLine, selectedCharacter.id])

  const goToNextLine = () => {
    if (currentLineIndex < lines.length - 1) {
      setCurrentLineIndex(prev => prev + 1)
    } else {
      setIsSceneComplete(true)
    }
  }

  const goToPreviousLine = () => {
    if (currentLineIndex > 0) {
      setCurrentLineIndex(prev => prev - 1)
    }
  }

  const handleRestart = () => {
    setCurrentLineIndex(0)
    setIsSceneComplete(false)
  }

  const handleChangeCharacter = () => {
    setCurrentLineIndex(0)
    setIsSceneComplete(false)
    onBackToSelection()
  }

  const {
    isPlaying,
    currentTime,
    duration,
    isLoading,
    error,
    isUserLine,
    play,
    pause,
    skipForward,
    skipBackward,
    seek
  } = useAudioPlayer(currentLine, selectedCharacter, playbackRate, goToNextLine)

  const timeRemaining = duration - currentTime
  const shouldShowCountdown = !isUserLine && isNextLineUserLine && timeRemaining > 0 && timeRemaining <= 10 && duration > 0
  const countdownSeconds = Math.ceil(timeRemaining)

  if (isSceneComplete) {
    return (
      <EndScreen
        scriptTitle={scriptData.metadata.title}
        characterName={selectedCharacter.name}
        onRestart={handleRestart}
        onChangeCharacter={handleChangeCharacter}
      />
    )
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <header className="glass-effect border-b border-white/10 backdrop-blur-xl flex-shrink-0">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleChangeCharacter}
                className="w-10 h-10 rounded-lg glass-effect hover:bg-white/10 transition-all duration-200 flex items-center justify-center text-slate-300 hover:text-white"
                title="Torna alla selezione"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div>
                <h1 className="text-lg md:text-xl font-bold text-white">
                  {scriptData.metadata.title}
                </h1>
                <p className="text-sm text-slate-400">
                  Interpreti: <span style={{ color: selectedCharacter.color }} className="font-semibold">{selectedCharacter.name}</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="px-4 py-2 rounded-lg glass-effect hover:bg-white/10 transition-all duration-200 text-sm font-semibold text-slate-300 hover:text-white flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Ricomincia
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col items-center justify-center min-h-full p-6 py-12">
          <ProgressIndicator currentIndex={currentLineIndex} total={lines.length} />

          <DialogueCard
            character={currentCharacter}
            line={currentLine}
            isUserLine={isUserLine}
            hideUserText={hideUserText}
          />
        </div>
      </main>

      <footer className="glass-effect border-t border-white/10 backdrop-blur-xl flex-shrink-0">
        <div className="max-w-6xl mx-auto px-6 py-4">
          {isUserLine && (
            <div className="mb-4 space-y-3">
              {currentLineNote && (
                <div className="glass-effect border border-purple-500/30 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {currentLineNote}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowNotesModal(true)}
                  className="px-6 py-4 rounded-xl glass-effect hover:bg-white/10 text-slate-300 hover:text-white font-semibold transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                  title={currentLineNote ? 'Modifica nota' : 'Aggiungi nota'}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span className="hidden sm:inline">
                    {currentLineNote ? 'Modifica nota' : 'Aggiungi nota'}
                  </span>
                  <span className="sm:hidden">
                    {currentLineNote ? 'Modifica' : 'Nota'}
                  </span>
                </button>

                <button
                  onClick={goToNextLine}
                  className="flex-1 px-8 py-5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg transition-all duration-200 hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3"
                >
                  <span>Ho Finito</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <AudioControls
            isPlaying={isPlaying}
            isUserLine={isUserLine}
            isLoading={isLoading}
            error={error}
            currentTime={currentTime}
            duration={duration}
            playbackRate={playbackRate}
            showCountdown={shouldShowCountdown}
            countdownSeconds={countdownSeconds}
            onPlay={play}
            onPause={pause}
            onSkipForward={skipForward}
            onSkipBackward={skipBackward}
            onPlaybackRateChange={onPlaybackRateChange}
            onSeek={seek}
          />

          <div className="flex gap-3 mt-4">
            <button
              onClick={goToPreviousLine}
              disabled={currentLineIndex === 0}
              className="flex-1 px-6 py-4 rounded-xl glass-effect hover:bg-white/10 text-slate-300 hover:text-white font-semibold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-[1.02] flex items-center justify-center gap-2 min-h-[56px]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Battuta Precedente</span>
              <span className="sm:hidden">Precedente</span>
            </button>

            <button
              onClick={goToNextLine}
              disabled={currentLineIndex === lines.length - 1}
              className="flex-1 px-6 py-4 rounded-xl glass-effect hover:bg-white/10 text-slate-300 hover:text-white font-semibold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-[1.02] flex items-center justify-center gap-2 min-h-[56px]"
            >
              <span className="hidden sm:inline">Salta Battuta</span>
              <span className="sm:hidden">Salta</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </footer>

      <NotesModal
        isOpen={showNotesModal}
        onClose={() => setShowNotesModal(false)}
        lineId={currentLine?.id}
        initialNote={currentLineNote}
        onSave={handleSaveNote}
      />
    </div>
  )
}

export default ScriptPlayer
