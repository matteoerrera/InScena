import { useEffect, useRef, useState, useCallback } from 'react'

export function useAudioPlayer(currentLine, selectedCharacter, playbackRate, onLineEnd) {
  const audioRef = useRef(new Audio())
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const isUserLine = currentLine?.characterId === selectedCharacter?.id

  useEffect(() => {
    const audio = audioRef.current

    const handleEnded = () => {
      setIsPlaying(false)
      if (!isUserLine && onLineEnd) {
        setTimeout(onLineEnd, 500)
      }
    }

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
      setIsLoading(false)
    }

    const handleCanPlay = () => {
      setIsLoading(false)
    }

    const handleError = (e) => {
      console.warn('Audio error:', e)
      setError('Audio non disponibile')
      setIsLoading(false)
      setIsPlaying(false)
    }

    const handleLoadStart = () => {
      setIsLoading(true)
      setError(null)
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('loadstart', handleLoadStart)

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('loadstart', handleLoadStart)
    }
  }, [isUserLine, onLineEnd])

  useEffect(() => {
    const audio = audioRef.current
    audio.playbackRate = playbackRate
  }, [playbackRate])

  useEffect(() => {
    const audio = audioRef.current
    
    audio.pause()
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setError(null)
    
    if (!currentLine) return

    if (isUserLine) {
      return
    }

    if (currentLine.audio) {
      setIsLoading(true)
      audio.src = currentLine.audio
      audio.load()
      
      audio.play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch(err => {
          console.warn('Autoplay failed:', err)
          setIsLoading(false)
          setError('Premi play per ascoltare')
        })
    }
  }, [currentLine, isUserLine])

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!isUserLine && currentLine?.audio) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error('Play failed:', err)
          setError('Impossibile riprodurre audio')
        })
    }
  }, [currentLine, isUserLine])

  const pause = useCallback(() => {
    const audio = audioRef.current
    audio.pause()
    setIsPlaying(false)
  }, [])

  const skipForward = useCallback((seconds = 10) => {
    const audio = audioRef.current
    audio.currentTime = Math.min(audio.currentTime + seconds, audio.duration)
  }, [])

  const skipBackward = useCallback((seconds = 10) => {
    const audio = audioRef.current
    audio.currentTime = Math.max(audio.currentTime - seconds, 0)
  }, [])

  const seek = useCallback((time) => {
    const audio = audioRef.current
    audio.currentTime = time
  }, [])

  return {
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
  }
}
