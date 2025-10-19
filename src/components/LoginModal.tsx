import { useState } from 'react';
const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function LoginModal({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        onLogin();
      } else {
        alert(data.message || 'Login gagal');
      }
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 w-96 shadow-xl border border-white/20">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Login Admin</h3>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-emerald-300/50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-bold hover:scale-105 transform transition-transform duration-300 shadow-lg shadow-emerald-400/30"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}
