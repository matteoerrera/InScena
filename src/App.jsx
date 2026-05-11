import { useState, useEffect } from 'react'
import CharacterSelection from './components/CharacterSelection'
import ScriptPlayer from './components/ScriptPlayer'
import ScriptSelection from './components/ScriptSelection'

function App() {
  const [scriptsList, setScriptsList] = useState(null)
  const [selectedScript, setSelectedScript] = useState(null)
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

  // Carica lista copioni
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/scripts-list.json`)
      .then(res => res.json())
      .then(data => {
        setScriptsList(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Impossibile caricare la lista dei copioni')
        setLoading(false)
        console.error(err)
      })
  }, [])

  // Carica copione selezionato
  const loadScript = (scriptFile) => {
    setLoading(true)
    fetch(`${import.meta.env.BASE_URL}data/${scriptFile}`)
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
  }

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

  const handleBackToScripts = () => {
    setSelectedScript(null)
    setScriptData(null)
    setSelectedCharacter(null)
    localStorage.removeItem('inscena_selected_character')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 text-lg">Caricamento...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-6">
        <div className="text-center max-w-md">
          <p className="text-red-400 text-xl mb-4">⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
          >
            Riprova
          </button>
        </div>
      </div>
    )
  }

  // Mostra selezione copione
  if (!selectedScript) {
    return (
      <ScriptSelection
        scripts={scriptsList}
        onSelectScript={(script) => {
          setSelectedScript(script)
          loadScript(script.file)
        }}
      />
    )
  }

  // Mostra selezione personaggio
  if (!selectedCharacter && scriptData) {
    return (
      <CharacterSelection
        characters={scriptData.characters}
        metadata={scriptData.metadata}
        hideUserText={hideUserText}
        onSelect={handleCharacterSelect}
        onHideUserTextChange={handleHideUserTextChange}
        onBack={handleBackToScripts}
      />
    )
  }

  // Mostra player
  if (scriptData && selectedCharacter) {
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

  return null
}

export default App
