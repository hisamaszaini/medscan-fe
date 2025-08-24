import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Heart, User, ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/ui/Header';

// --- [DIREVISI] Objek Varian Warna untuk memastikan Tailwind mendeteksinya ---
const colorVariants = {
  red: {
    gradient: 'from-red-50 to-orange-50',
    icon: 'from-red-500 to-red-600',
    textHover: 'group-hover:text-red-600',
    button: 'bg-red-500 hover:bg-red-600',
  },
  pink: {
    gradient: 'from-pink-50 to-red-50',
    icon: 'from-pink-500 to-pink-600',
    textHover: 'group-hover:text-pink-600',
    button: 'bg-pink-500 hover:bg-pink-600',
  },
  sky: {
    gradient: 'from-sky-50 to-blue-50',
    icon: 'from-sky-500 to-sky-600',
    textHover: 'group-hover:text-sky-600',
    button: 'bg-sky-500 hover:bg-sky-600',
  },
};

// --- [DIREVISI] Komponen Kartu Pilihan Screening ---
const ScreeningChoiceCard = ({ icon, title, description, color, linkTo }) => {
  const variants = colorVariants[color] || colorVariants.sky; // Fallback ke sky jika warna tidak ditemukan

  return (
    <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 group overflow-hidden flex flex-col">
      <div className={`absolute inset-0 bg-gradient-to-br ${variants.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className="relative z-10 flex flex-col flex-grow">
        <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${variants.icon} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
          {React.cloneElement(icon, { className: "w-8 h-8 sm:w-10 sm:h-10 text-white" })}
        </div>
        <div className="flex-grow">
          <h4 className={`text-xl sm:text-2xl font-bold text-gray-800 mb-4 ${variants.textHover} transition-colors duration-300`}>{title}</h4>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base group-hover:text-gray-700 transition-colors duration-300">{description}</p>
        </div>
        <Link 
          to={linkTo} 
          className={`mt-8 block w-full text-center text-white font-bold py-3 px-6 rounded-lg shadow-md ${variants.button} transition-colors duration-300`}
        >
          Mulai Screening
        </Link>
      </div>
    </div>
  );
};

// --- [Halaman Utama] Menu Screening ---
export default function ScreeningMenuPage() {
  const screeningOptions = [
    { 
      icon: <Eye />, 
      title: 'Diabetic Retinopathy', 
      description: 'Analisis citra retina untuk mendeteksi tanda kerusakan mata akibat diabetes.', 
      color: 'red', 
      linkTo: '/screening/input-data'
    },
    { 
      icon: <Heart />, 
      title: 'Anemia Detection', 
      description: 'Deteksi potensi anemia secara non-invasif melalui analisis warna kuku tangan.', 
      color: 'pink', 
      linkTo: '/screening/input-data'
    },
    { 
      icon: <User />, 
      title: 'Malnutrition Screening', 
      description: 'Mendeteksi risiko malnutrisi pada anak-anak melalui analisis citra wajah.', 
      color: 'sky', 
      linkTo: '/screening/input-data'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased relative overflow-x-hidden">
      {/* Latar Belakang Ambien */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-sky-200/30 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
        <div className="absolute top-1/3 right-[15%] w-72 h-72 bg-pink-200/20 rounded-full blur-3xl animate-pulse-slow delay-4000"></div>
      </div>
      
      <div className="relative z-10">
        <Header />

        <main>
          <section className="py-20 sm:py-24 px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-emerald-800 rounded-full mb-6 font-semibold border border-white/40">
                <Sparkles className="w-5 h-5 mr-2 text-emerald-600" />
                <span>Langkah 1 dari 4</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Pilih Jenis <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">Screening</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Pilih salah satu layanan di bawah ini untuk memulai proses deteksi dini.
              </p>
            </div>
            
            <div className="max-w-7xl mx-auto mt-16">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {screeningOptions.map((option, index) => (
                  <ScreeningChoiceCard key={index} {...option} />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}