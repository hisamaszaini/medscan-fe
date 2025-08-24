import { Link } from 'react-router-dom';
import { Sparkles, User, Calendar, ShieldCheck, AlertTriangle, Download, Search, Home } from 'lucide-react';
import Header from '@/components/ui/Header';

// --- [Halaman Utama] Hasil Screening ---
export default function ScreeningResultPage() {
  const resultData = {
    patientName: 'Budi Santoso',
    patientAge: 35,
    screeningType: 'Screening Diabetic Retinopathy',
    date: '17 Agustus 2025',
    status: 'Risiko Rendah Terdeteksi',
    statusColor: 'text-amber-600',
    statusIcon: <AlertTriangle className="w-16 h-16 text-amber-500" strokeWidth={1.5} />,
    confidence: 92.5,
    summary: 'Model AI kami mendeteksi adanya beberapa indikator awal yang mengarah pada risiko rendah retinopati diabetik. Gejala ini belum tentu berbahaya namun memerlukan perhatian.',
    recommendation: 'Disarankan untuk menjadwalkan konsultasi dengan dokter spesialis mata dalam 3-6 bulan ke depan untuk pemantauan lebih lanjut dan menjaga pola hidup sehat.',
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-sky-200/30 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>
      
      <div className="relative z-10">
        <Header />

        <main>
          <section className="py-20 sm:py-24 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Hasil Screening Anda
              </h1>
              <p className="text-lg text-gray-600">
                Dihasilkan pada {resultData.date}
              </p>
            </div>
            
            {/* Kartu Hasil */}
            <div className="max-w-4xl mx-auto mt-12 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <div className="p-8 sm:p-10">
                {/* Header Kartu: Info Pasien */}
                <div className="pb-6 border-b border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{resultData.patientName}</h2>
                      <p className="text-gray-600">{resultData.patientAge} Tahun</p>
                    </div>
                    <div className="text-right">
                       <p className="font-semibold text-emerald-700">{resultData.screeningType}</p>
                    </div>
                  </div>
                </div>

                {/* Body Kartu: Hasil Utama */}
                <div className="text-center py-10">
                  <div className="flex justify-center mb-4">
                    {resultData.statusIcon}
                  </div>
                  <h3 className={`text-3xl sm:text-4xl font-bold ${resultData.statusColor}`}>{resultData.status}</h3>
                  <p className="max-w-2xl mx-auto mt-4 text-gray-600 text-lg">{resultData.summary}</p>
                  <div className="mt-6 inline-flex items-center bg-gray-100 rounded-full px-4 py-2">
                    <Sparkles className="w-5 h-5 mr-2 text-emerald-600" />
                    <span className="font-semibold text-gray-700">Tingkat Keyakinan AI: {resultData.confidence}%</span>
                  </div>
                </div>

                {/* Footer Kartu: Rekomendasi & Aksi */}
                <div className="pt-6 space-y-6">
                  {/* Disclaimer Penting */}
                  <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700 font-bold">
                          PENTING: Hasil ini bukan diagnosis medis. Ini adalah alat screening awal. Wajib konsultasikan hasil ini dengan dokter profesional untuk diagnosis yang akurat.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rekomendasi */}
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 mb-2">Rekomendasi Tindak Lanjut</h4>
                    <p className="text-gray-600">{resultData.recommendation}</p>
                  </div>

                  {/* Tombol Aksi */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-4">
                    <button className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-emerald-700 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors duration-300">
                      <Download className="w-5 h-5"/>
                      Download Hasil (PDF)
                    </button>
                     <button className="w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors duration-300">
                      <Search className="w-5 h-5"/>
                      Cari Dokter Terdekat
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
                <Link to="/" className="group flex items-center justify-center mx-auto w-fit bg-gray-800 text-white px-8 py-4 rounded-xl text-lg font-bold transform transition-transform duration-300 hover:scale-105 shadow-lg">
                    Kembali ke Menu Utama
                    <Home className="w-5 h-5 ml-3 transform group-hover:rotate-12 transition-transform duration-300" />
                </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}