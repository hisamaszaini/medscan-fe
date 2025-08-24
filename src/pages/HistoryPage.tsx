import { Link } from 'react-router-dom';
import { Search, Eye, Heart, User, FileText, Download, ChevronRight } from 'lucide-react';
import Header from '@/components/ui/Header';

// --- [Komponen Baru] Kartu Riwayat ---
const HistoryCard = ({ record }) => {
  const statusStyles = {
    'Risiko Tinggi': 'bg-red-100 text-red-700',
    'Risiko Rendah': 'bg-amber-100 text-amber-700',
    'Normal': 'bg-emerald-100 text-emerald-700',
  };
  const iconMap = {
    'Diabetic Retinopathy': <Eye className="w-6 h-6 text-white" />,
    'Anemia Detection': <Heart className="w-6 h-6 text-white" />,
    'Malnutrition Screening': <User className="w-6 h-6 text-white" />,
  };
  const iconBg = {
    'Diabetic Retinopathy': 'bg-red-500',
    'Anemia Detection': 'bg-pink-500',
    'Malnutrition Screening': 'bg-sky-500',
  }

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Ikon */}
        <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${iconBg[record.type]}`}>
          {iconMap[record.type]}
        </div>
        {/* Info Utama */}
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{record.type}</h3>
              <p className="text-gray-600">Pasien: {record.patient}</p>
              <p className="text-sm text-gray-500 mt-1">{record.date}</p>
            </div>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${statusStyles[record.status]}`}>{record.status}</span>
          </div>
           {/* Aksi */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3 border-t border-gray-200 pt-4">
            <Link to={record.detailsUrl} className="flex-1 text-center px-4 py-2 font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
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

// --- [Halaman Utama] Riwayat Screening ---
export default function HistoryPage() {
  const historyData = [
    { id: 1, type: 'Diabetic Retinopathy', patient: 'Budi Santoso', date: '17 Agustus 2025', status: 'Risiko Rendah', detailsUrl: '/screening/result' },
    { id: 2, type: 'Anemia Detection', patient: 'Siti Aminah', date: '12 Juli 2025', status: 'Normal', detailsUrl: '#' },
    { id: 3, type: 'Malnutrition Screening', patient: 'Putra Wijaya', date: '02 Juni 2025', status: 'Risiko Tinggi', detailsUrl: '#' },
    { id: 4, type: 'Diabetic Retinopathy', patient: 'Budi Santoso', date: '15 Mei 2025', status: 'Normal', detailsUrl: '#' },
  ];
  
  // const historyData = []; // Uncomment untuk melihat tampilan "Empty State"

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased relative overflow-x-hidden">
      {/* Latar Belakang Ambien */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-sky-200/30 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>
      
      <div className="relative z-10">
        <Header />

        <main>
          <section className="py-20 sm:py-24 px-4">
            <div className="max-w-5xl mx-auto">
              {/* Judul dan Filter */}
              <div className="text-center sm:text-left">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  Riwayat Screening
                </h1>
                <p className="text-lg text-gray-600">
                  Lihat, kelola, dan unduh semua hasil screening yang pernah Anda lakukan.
                </p>
              </div>
              
              {/* Opsi Filter dan Pencarian */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari berdasarkan nama pasien..."
                    className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300/50"
                  />
                </div>
                <select className="px-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300/50">
                  <option>Semua Jenis</option>
                  <option>Diabetic Retinopathy</option>
                  <option>Anemia Detection</option>
                  <option>Malnutrition Screening</option>
                </select>
              </div>

              {/* Daftar Riwayat */}
              <div className="mt-12 space-y-6">
                {historyData.length > 0 ? (
                  historyData.map(record => <HistoryCard key={record.id} record={record} />)
                ) : (
                  // Tampilan "Empty State" jika tidak ada data
                  <div className="text-center py-16 px-6 bg-white/60 backdrop-blur-md rounded-2xl">
                    <FileText className="w-24 h-24 mx-auto text-gray-300" strokeWidth={1} />
                    <h3 className="mt-4 text-2xl font-bold text-gray-700">Belum Ada Riwayat</h3>
                    <p className="mt-2 text-gray-500">Anda belum pernah melakukan screening. Mulai sekarang untuk melihat riwayat Anda di sini.</p>
                    <Link to="/screening-menu" className="mt-6 inline-block bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-xl text-lg font-bold transform transition-transform duration-300 hover:scale-105 shadow-lg">
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