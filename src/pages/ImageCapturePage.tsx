import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, Camera, Sparkles, CheckCircle, XCircle } from 'lucide-react';
import Header from '@/components/ui/Header';

// --- [Halaman Utama] Capture Gambar ---
export default function ImageCapturePage() {
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
            <div className="max-w-5xl mx-auto text-center">
              {/* Indikator Langkah */}
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-emerald-800 rounded-full mb-6 font-semibold border border-white/40">
                <Sparkles className="w-5 h-5 mr-2 text-emerald-600" />
                <span>Langkah 3 dari 4</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Ambil Gambar
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Posisikan subjek sesuai panduan untuk mendapatkan hasil analisis yang akurat.
              </p>
            </div>
            
            {/* Konten Capture */}
            <div className="max-w-7xl mx-auto mt-16">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                
                {/* Kolom Kiri: Kamera & Tombol Capture */}
                <div className="flex flex-col items-center">
                  <div className="w-full bg-black rounded-3xl aspect-video shadow-2xl relative overflow-hidden flex items-center justify-center">
                    {/* Placeholder untuk live feed kamera */}
                    <div className="text-center text-gray-400">
                      <Camera className="w-24 h-24 mx-auto" strokeWidth={1} />
                      <p>Pratinjau Kamera Akan Tampil di Sini</p>
                    </div>
                    {/* Overlay/Garis Bantu */}
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-3/4 h-3/4 border-4 border-dashed border-white/50 rounded-3xl"></div>
                    </div>
                  </div>
                  <button className="mt-8 w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center group transform hover:scale-110 transition-transform duration-300">
                    <div className="w-20 h-20 bg-emerald-500 rounded-full group-hover:bg-emerald-600 transition-colors"></div>
                  </button>
                </div>

                {/* Kolom Kanan: Panduan */}
                <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Panduan Pengambilan Gambar</h3>
                  
                  {/* Do's */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold flex items-center text-emerald-700 mb-3">
                      <CheckCircle className="w-6 h-6 mr-3" />
                      Pastikan
                    </h4>
                    <ul className="space-y-3 list-inside text-gray-600">
                      <li className="flex items-start">
                        <span className="mr-2 text-emerald-500">✔</span>
                        <span>Pencahayaan di dalam ruangan cukup dan merata.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-emerald-500">✔</span>
                        <span>Posisi kamera stabil dan tidak goyang.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-emerald-500">✔</span>
                        <span>Gambar terlihat jelas dan fokus pada subjek.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Don'ts */}
                  <div>
                    <h4 className="text-lg font-semibold flex items-center text-red-700 mb-3">
                      <XCircle className="w-6 h-6 mr-3" />
                      Hindari
                    </h4>
                    <ul className="space-y-3 list-inside text-gray-600">
                      <li className="flex items-start">
                          <span className="mr-2 text-red-500">✖</span>
                          <span>Gambar yang buram atau tidak fokus.</span>
                      </li>
                      <li className="flex items-start">
                          <span className="mr-2 text-red-500">✖</span>
                          <span>Cahaya yang terlalu terang (silau) atau terlalu gelap.</span>
                      </li>
                      <li className="flex items-start">
                          <span className="mr-2 text-red-500">✖</span>
                          <span>Posisi subjek terpotong atau di luar area panduan.</span>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>

            {/* Tombol Navigasi */}
            <div className="max-w-7xl mx-auto mt-12 flex justify-between items-center">
              <Link to="/screening/input-data" className="flex items-center px-6 py-3 text-lg font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-300">
                <ChevronLeft className="w-5 h-5 mr-2" />
                Kembali
              </Link>
              <Link to="/screening/result" className="group flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-bold transform transition-transform duration-300 hover:scale-105 shadow-lg shadow-emerald-500/30">
                Selesai & Lihat Hasil
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

          </section>
        </main>
      </div>
    </div>
  );
}