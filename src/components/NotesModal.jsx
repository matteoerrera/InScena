import { useState, useEffect } from 'react'

function NotesModal({ isOpen, onClose, lineId, initialNote, onSave }) {
  const [noteText, setNoteText] = useState(initialNote || '')

  useEffect(() => {
    setNoteText(initialNote || '')
  }, [initialNote, lineId])

  const handleSave = () => {
    onSave(lineId, noteText)
    onClose()
  }

  const handleDelete = () => {
    onSave(lineId, '')
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in">
        <div className="glass-effect border-2 border-white/20 rounded-3xl p-8 max-w-2xl w-full shadow-2xl animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              {initialNote ? 'Modifica nota' : 'Aggiungi nota'}
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

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Note per questa battuta
            </label>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Scrivi qui le tue note: indicazioni di regia, emozioni da trasmettere, movimenti, intenzioni..."
              className="w-full h-48 px-4 py-3 bg-slate-900/50 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 resize-none"
              autoFocus
            />
            <div className="text-xs text-slate-500 mt-2">
              {noteText.length} caratteri
            </div>
          </div>

          <div className="flex gap-3">
            {initialNote && (
              <button
                onClick={handleDelete}
                className="px-6 py-3 rounded-xl glass-effect hover:bg-red-500/20 border border-red-500/50 text-red-400 font-semibold transition-all duration-200 hover:scale-[1.02]"
              >
                Elimina nota
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-xl glass-effect hover:bg-white/10 text-slate-300 hover:text-white font-semibold transition-all duration-200"
            >
              Annulla
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold transition-all duration-200 hover:scale-[1.02] shadow-lg"
            >
              Salva nota
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotesModal
