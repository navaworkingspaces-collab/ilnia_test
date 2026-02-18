import { useState } from 'react';

export default function App() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async () => {
    setResult(null);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/sum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ a: Number(a), b: Number(b) }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Server error');
      } else {
        setResult(data.sum);
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
        placeholder="a"
      />
      <input
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
        placeholder="b"
      />
      <button onClick={handleCalculate} disabled={loading}>
        {loading ? 'Calculating...' : 'Calculate'}
      </button>

      {result !== null && <p>Result: {result}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
