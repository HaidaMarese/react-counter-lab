import React, { useState, useEffect } from 'react'

const AdvancedCounter = () => {
  const [count, setCount] = useState(0)
  const [history, setHistory] = useState([0])
  const [step, setStep] = useState(1)
  const [savedMessage, setSavedMessage] = useState('')

  useEffect(() => {
    const saved = parseInt(localStorage.getItem('count'), 10)
    if (!isNaN(saved)) {
      setCount(saved)
      setHistory([saved])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('count', count)
    setSavedMessage('Changes saved.')
    const timeout = setTimeout(() => setSavedMessage(''), 1500)
    return () => clearTimeout(timeout)
  }, [count])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowUp') increment()
      if (e.key === 'ArrowDown') decrement()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [step])

  const increment = () => {
    setCount(prev => {
      const newCount = prev + Number(step)
      setHistory(prevHistory => [...prevHistory, newCount])
      return newCount
    })
  }

  const decrement = () => {
    setCount(prev => {
      const newCount = prev - Number(step)
      setHistory(prevHistory => [...prevHistory, newCount])
      return newCount
    })
  }

  const reset = () => {
    setCount(0)
    setHistory([0])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b2f] via-[#2b213a] to-[#1e1b2f] text-white flex flex-col items-center justify-center px-4 py-8">
      
      <div className="bg-[#2e1f41] rounded-xl shadow-2xl w-[420px] max-w-lg p-8 border border-[#4b3861]">

        <h1 className="text-sm text-center text-purple-200 font-semibold uppercase tracking-widest mb-3">
          Counter
        </h1>

        <p className="text-3xl text-center font-bold mb-6 text-white">
          Current Count: {count}
        </p>

        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={increment}
            className="bg-[#3b82f6] hover:bg-[#2563eb] transition px-4 py-2 rounded shadow text-white"
          >
            Increment
          </button>
          <button
            onClick={decrement}
            className="bg-[#10b981] hover:bg-[#059669] transition px-4 py-2 rounded shadow text-white"
          >
            Decrement
          </button>
          <button
            onClick={reset}
            className="bg-[#ef4444] hover:bg-[#dc2626] transition px-4 py-2 rounded shadow text-white"
          >
            Reset
          </button>
        </div>

        <div className="mb-4 text-center">
          <label className="block text-sm text-purple-300 mb-1">Step Value:</label>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(e.target.value)}
            className="w-24 text-center bg-[#3a2b52] text-white px-2 py-1 rounded border border-[#5a4076]"
          />
        </div>

        {savedMessage && (
          <p className="text-green-400 text-xs text-center mb-4">{savedMessage}</p>
        )}

        <div className="text-sm overflow-y-auto max-h-32 bg-[#3a2b52] p-2 rounded text-white border border-[#5a4076]">
          <h2 className="font-semibold mb-1 text-purple-200">Count History:</h2>
          <ul className="list-disc pl-4 space-y-1">
            {history.map((val, idx) => (
              <li key={idx}>{val}</li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="text-xs text-purple-400 mt-6"> &copy; 2025 HaidaM. All rights reserved.</footer>
    </div>
  )
}

export default AdvancedCounter
