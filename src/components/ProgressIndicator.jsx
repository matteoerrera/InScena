function ProgressIndicator({ currentIndex, total }) {
  const percentage = ((currentIndex + 1) / total) * 100

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-400">
          Battuta {currentIndex + 1} di {total}
        </span>
        <span className="text-sm font-semibold text-slate-400">
          {Math.round(percentage)}%
        </span>
      </div>
      
      <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressIndicator
