import { useState, useEffect, type JSX } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, User, FileText, Download, ChevronRight } from 'lucide-react';
import Header from '@/components/ui/Header';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// --- Card untuk tiap record riwayat ---
const HistoryCard = ({ record }: { record: any }) => {
  const statusStyles: Record<string, string> = {
    'Risiko Tinggi': 'bg-red-100 text-red-700',
    'Risiko Rendah': 'bg-amber-100 text-amber-700',
    'Normal': 'bg-emerald-100 text-emerald-700',
  };

  const iconMap: Record<string, JSX.Element> = {
    'Diabetic Retinopathy': <Eye className="w-6 h-6 text-white" />,
    'Anemia Detection': <Heart className="w-6 h-6 text-white" />,
    'Malnutrition Screening': <User className="w-6 h-6 text-white" />,
  };

  const iconBg: Record<string, string> = {
    'Diabetic Retinopathy': 'bg-red-500',
    'Anemia Detection': 'bg-pink-500',
    'Malnutrition Screening': 'bg-sky-500',
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${iconBg[record.model]}`}>
          {iconMap[record.model]}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{record.model}</h3>
              <p className="text-gray-600">Pasien: {record.user?.name}</p>
              <p className="text-sm text-gray-500 mt-1">{record.created_at}</p>
            </div>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${statusStyles[record.category] || 'bg-gray-100 text-gray-700'}`}>
              {record.category || 'Tidak diketahui'}
            </span>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 border-t border-gray-200 pt-4">
            <Link
              to="/screening/result"
              state={{ result: record.result }}
              className="flex-1 text-center px-4 py-2 font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              Lihat Detail <ChevronRight className="w-4 h-4" />
            </Link>
            <button className="flex-1 text-center px-4 py-2 font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Modal Login ---
const LoginModal = ({ onLogin }: { onLogin: () => void }) => {
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
        credentials: 'include', // ⚡ kirim cookie
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        onLogin(); // login berhasil
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
      <div className="bg-white rounded-2xl p-8 w-96 shadow-xl">
        <h3 className="text-2xl font-bold mb-4">Login Admin</h3>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-emerald-500 text-white py-2 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
};

// --- Halaman Utama Riwayat ---
export default function HistoryPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/history`, {
          credentials: 'include', // ⚡ kirim cookie
        });
        if (res.status === 401) {
          setIsLoggedIn(false);
          return;
        }
        if (!res.ok) throw new Error('Failed to fetch history');
        const data = await res.json();
        setHistoryData(data.history || []);
        setIsLoggedIn(true);
      } catch (err) {
        console.error(err);
        alert('Gagal memuat data riwayat');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (!isLoggedIn) return <LoginModal onLogin={() => setIsLoggedIn(true)} />;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased relative overflow-x-hidden">
      {/* Background ambient */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-sky-200/30 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>

      <div className="relative z-10">
        <Header />

        <main>
          <section className="py-20 sm:py-24 px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center sm:text-left">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Riwayat Screening
                </h1>
                <p className="text-lg text-gray-600">
                  Lihat, kelola, dan unduh semua hasil screening yang pernah dilakukan.
                </p>
              </div>

              <div className="mt-12 space-y-6">
                {loading ? (
                  <p className="text-center text-gray-500">Memuat data...</p>
                ) : historyData.length > 0 ? (
                  historyData.map(record => <HistoryCard key={record.created_at} record={record} />)
                ) : (
                  <div className="text-center py-16 px-6 bg-white/60 backdrop-blur-md rounded-2xl">
                    <FileText className="w-24 h-24 mx-auto text-gray-300" strokeWidth={1} />
                    <h3 className="mt-4 text-2xl font-bold text-gray-700">Belum Ada Riwayat</h3>
                    <p className="mt-2 text-gray-500">Anda belum pernah melakukan screening.</p>
                    <Link
                      to="/screening-menu"
                      className="mt-6 inline-block bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl text-lg font-bold hover:scale-105 transform transition-transform shadow-lg"
                    >
                      Mulai Screening Baru
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
