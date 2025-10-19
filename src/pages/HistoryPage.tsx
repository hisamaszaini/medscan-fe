import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import Header from '@/components/ui/Header';
import HistoryCard from '@/components/HistoryCard';
import LoginModal from '@/components/LoginModal';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function HistoryPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const fetchHistory = async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/history?page=${page}&limit=${limit}`, {
        credentials: 'include',
      });
      if (res.status === 401) {
        setIsLoggedIn(false);
        return;
      }
      if (!res.ok) throw new Error('Failed to fetch history');
      const data = await res.json();
      setHistoryData(data.history || []);
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      console.error(err);
      alert('Gagal memuat data riwayat');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [page, limit, isLoggedIn, reloadTrigger]);

  if (!isLoggedIn)
    return (
      <LoginModal
        onLogin={() => {
          setIsLoggedIn(true);
          setReloadTrigger((prev) => prev + 1);
        }}
      />
    );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased relative overflow-x-hidden">
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
                  Lihat dan kelola semua hasil screening yang pernah dilakukan.
                </p>
              </div>

              <div className="mt-12 space-y-6">
                {loading ? (
                  <p className="text-center text-gray-500">Memuat data...</p>
                ) : historyData.length > 0 ? (
                  <>
                    {historyData.map((record) => (
                      <HistoryCard key={record.created_at} record={record} />
                    ))}

                    {/* Pagination */}
                    <div className="flex justify-center gap-2 mt-6">
                      <button
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        disabled={page <= 1}
                        onClick={() => setPage((prev) => prev - 1)}
                      >
                        Prev
                      </button>
                      <span className="px-3 py-1">
                        {page} / {totalPages}
                      </span>
                      <button
                        className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        disabled={page >= totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16 px-6 bg-white/60 backdrop-blur-md rounded-2xl">
                    <FileText className="w-24 h-24 mx-auto text-gray-300" strokeWidth={1} />
                    <h3 className="mt-4 text-2xl font-bold text-gray-700">Belum Ada Riwayat</h3>
                    <p className="mt-2 text-gray-500">Anda belum pernah melakukan screening.</p>
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
