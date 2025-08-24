import React from 'react';
import { Activity, Eye, Heart, User, ArrowRight, Sparkles, CheckCircle, Camera, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/ui/Header';

// Komponen Kartu Fitur (Sesuai gaya yang diberikan)
const FeatureCard = ({ icon, title, description, color, gradientFrom, gradientTo }) => (
  <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 group overflow-hidden cursor-pointer">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
    <div className="relative z-10">
      <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
        {React.cloneElement(icon, { className: "w-8 h-8 sm:w-10 sm:h-10 text-white" })}
      </div>
      <h4 className={`text-xl sm:text-2xl font-bold text-gray-800 mb-4 group-hover:text-${color}-600 transition-colors duration-300`}>{title}</h4>
      <p className="text-gray-600 leading-relaxed text-sm sm:text-base group-hover:text-gray-700 transition-colors duration-300">{description}</p>
      <div className={`mt-6 flex items-center text-${color}-600 font-semibold group-hover:translate-x-2 transition-transform duration-300`}>
        <span className="text-sm">Mulai Screening</span>
        <ArrowRight className="w-4 h-4 ml-2" />
      </div>
    </div>
  </div>
);


// --- [DIREVISI] Komponen Langkah Cara Kerja (Gaya Baru) ---
const HowItWorksStep = ({ number, icon, title, description }) => (
  <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 group overflow-hidden">
    {/* Latar gradien saat hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    {/* Nomor Langkah di Kiri Atas */}
    <div className="absolute top-6 left-6 w-12 h-12 bg-gray-100 group-hover:bg-white rounded-full flex items-center justify-center font-bold text-emerald-600 text-xl transition-colors duration-300 z-20">
      {number}
    </div>

    {/* Konten Utama */}
    <div className="relative z-10 pt-20">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
        {React.cloneElement(icon, { className: "w-8 h-8 sm:w-10 sm:h-10 text-white" })}
      </div>
      <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
        {title}
      </h4>
      <p className="text-gray-600 leading-relaxed text-sm sm:text-base group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>
    </div>
  </div>
);

// Komponen Utama Homepage
export default function MedScanAppUI() {
  const features = [
    { icon: <Eye />, title: 'Diabetic Retinopathy', description: 'Deteksi dini retinopati melalui analisis citra retina untuk mencegah kebutaan.', color: 'red', gradientFrom: 'from-red-50', gradientTo: 'to-orange-50' },
    { icon: <Heart />, title: 'Anemia Detection', description: 'Screening anemia non-invasif melalui analisis warna kuku dengan computer vision.', color: 'pink', gradientFrom: 'from-pink-50', gradientTo: 'to-red-50' },
    { icon: <User />, title: 'Malnutrition Screening', description: 'Analisis citra wajah untuk deteksi malnutrisi dan monitoring gizi optimal.', color: 'emerald', gradientFrom: 'from-emerald-50', gradientTo: 'to-teal-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-sky-200/30 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
        <div className="absolute top-1/3 right-[15%] w-72 h-72 bg-pink-200/20 rounded-full blur-3xl animate-pulse-slow delay-4000"></div>
      </div>

      <div className="relative z-10">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="text-center py-20 sm:py-32 px-4">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-emerald-800 rounded-full mb-6 font-semibold border border-white/40">
              <Sparkles className="w-5 h-5 mr-2 text-emerald-600" />
              <span>AI-Powered Medical Screening</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Deteksi Dini Penyakit <br /> dengan <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">AI Terdepan</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Screening cepat, akurat, dan terpercaya untuk berbagai kondisi kesehatan langsung dari genggaman Anda.
            </p>

            <Link
              to="/screening/menu"
              className="group relative inline-block bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-10 py-4 rounded-xl text-lg font-bold transform transition-transform duration-300 hover:scale-105 shadow-lg shadow-emerald-500/30"
            >
              Mulai Screening Sekarang
            </Link>

          </section>

          {/* Features Section */}
          <section className="py-20 sm:py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Layanan Screening Tersedia</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Teknologi canggih untuk deteksi dini berbagai kondisi kesehatan.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20 sm:py-24 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Proses Cepat 4 Langkah</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Dapatkan hasil analisis AI yang komprehensif dalam hitungan detik.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <HowItWorksStep number="1" icon={<CheckCircle />} title="Pilih Screening" description="Pilih jenis screening yang sesuai kebutuhan medis Anda." />
                <HowItWorksStep number="2" icon={<FileText />} title="Input Data" description="Masukkan data pasien untuk proses analisis yang akurat." />
                <HowItWorksStep number="3" icon={<Camera />} title="Capture Image" description="Ambil gambar sesuai panduan untuk kualitas optimal." />
                <HowItWorksStep number="4" icon={<Sparkles />} title="Dapatkan Hasil" description="Sistem AI kami akan menganalisis dan memberikan hasil." />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 sm:py-24 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-center p-12 sm:p-16 rounded-3xl shadow-2xl shadow-emerald-500/30">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Siap Menjaga Kesehatan Anda?</h2>
                <p className="text-lg text-emerald-100 mb-8 max-w-xl mx-auto">
                  Mulai langkah pertama Anda menuju deteksi dini dan kesehatan yang lebih baik dengan MedScan.
                </p>
                <button className="group bg-white text-emerald-700 px-10 py-4 rounded-xl text-lg font-bold hover:scale-105 transform transition-transform duration-300">
                  Mulai Screening Gratis
                  <ArrowRight className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-transparent mt-16">
          <div className="max-w-7xl mx-auto py-12 px-4 text-center text-gray-500">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">MedScan</span>
            </div>
            <p>© {new Date().getFullYear()} MedScan. Teknologi AI untuk masa depan kesehatan Indonesia.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}