import { useState, useEffect } from 'react'
import CharacterSelection from './components/CharacterSelection'
import ScriptPlayer from './components/ScriptPlayer'

function App() {
  const [scriptData, setScriptData] = useState(null)
  const [selectedCharacter, setSelectedCharacter] = useState(null)
  const [playbackRate, setPlaybackRate] = useState(() => {
    const saved = localStorage.getItem('inscena_playback_rate')
    return saved ? parseFloat(saved) : 1.0
  })
  const [hideUserText, setHideUserText] = useState(() => {
    const saved = localStorage.getItem('inscena_hide_user_text')
    return saved === 'true'
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/data/script.json')
      .then(res => res.json())
      .then(data => {
        setScriptData(data)
        setLoading(false)
        
        const savedCharId = localStorage.getItem('inscena_selected_character')
        if (savedCharId) {
          const char = data.characters.find(c => c.id === savedCharId)
          if (char) setSelectedCharacter(char)
        }
      })
      .catch(err => {
        setError('Impossibile caricare il copione')
        setLoading(false)
        console.error(err)
      })
  }, [])

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character)
    localStorage.setItem('inscena_selected_character', character.id)
  }

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate)
    localStorage.setItem('inscena_playback_rate', rate.toString())
  }

  const handleHideUserTextChange = (value) => {
    setHideUserText(value)
    localStorage.setItem('inscena_hide_user_text', value.toString())
  }

  const handleBackToSelection = () => {
    setSelectedCharacter(null)
    localStorage.removeItem('inscena_selected_character')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-slow">
          <div className="text-2xl font-bold text-purple-400">Caricamento...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="glass-effect rounded-2xl p-8 max-w-md text-center">
          <div className="text-red-400 text-xl font-semibold mb-2">Errore</div>
          <div className="text-slate-300">{error}</div>
        </div>
      </div>
    )
  }

  if (!selectedCharacter) {
    return (
      <CharacterSelection
        characters={scriptData.characters}
        metadata={scriptData.metadata}
        hideUserText={hideUserText}
        onSelect={handleCharacterSelect}
        onHideUserTextChange={handleHideUserTextChange}
      />
    )
  }

  return (
    <ScriptPlayer
      scriptData={scriptData}
      selectedCharacter={selectedCharacter}
      playbackRate={playbackRate}
      hideUserText={hideUserText}
      onPlaybackRateChange={handlePlaybackRateChange}
      onBackToSelection={handleBackToSelection}
    />
  )
}

export default App
