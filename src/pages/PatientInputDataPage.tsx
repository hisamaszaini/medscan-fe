import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, UserPlus, Sparkles } from 'lucide-react';
import Header from '@/components/ui/Header';

export default function PatientDataInputPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { type } = location.state || {}; // ambil type dari menu screening

  // State untuk form
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  // Handle tombol lanjut
  const handleNext = () => {
    if (!name || !age || !gender) {
      alert('Mohon lengkapi semua data pasien.');
      return;
    }

    // Kirim data ke halaman upload image
    navigate('/screening/capture', {
      state: {
        type,
        patient: { name, age, gender }
      }
    });
  };

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
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-emerald-800 rounded-full mb-6 font-semibold border border-white/40">
                <Sparkles className="w-5 h-5 mr-2 text-emerald-600" />
                <span>Langkah 2 dari 4</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Input Data Pasien
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Masukkan informasi dasar pasien untuk melanjutkan proses screening.
              </p>
            </div>

            <div className="max-w-4xl mx-auto mt-16 bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 sm:p-12">
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                      <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Contoh: Budi Santoso"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-lg transition-colors duration-300 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300/50"
                      />
                    </div>

                    <div>
                      <label htmlFor="age" className="block text-lg font-semibold text-gray-700 mb-2">
                        Umur
                      </label>
                      <input
                        type="number"
                        id="age"
                        placeholder="Contoh: 35"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg text-lg transition-colors duration-300 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-300/50"
                      />
                    </div>

                    <div>
                      <label className="block text-lg font-semibold text-gray-700 mb-2">
                        Jenis Kelamin
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center p-4 bg-gray-50 border-2 border-gray-200 rounded-lg cursor-pointer transition-colors duration-300">
                          <input 
                            type="radio" 
                            name="gender" 
                            value="male" 
                            checked={gender === 'male'}
                            onChange={(e) => setGender(e.target.value)}
                            className="h-5 w-5 text-emerald-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500" 
                          />
                          <span className="ml-3 text-lg text-gray-800">Pria</span>
                        </label>
                        <label className="flex items-center p-4 bg-gray-50 border-2 border-gray-200 rounded-lg cursor-pointer transition-colors duration-300">
                          <input 
                            type="radio" 
                            name="gender" 
                            value="female" 
                            checked={gender === 'female'}
                            onChange={(e) => setGender(e.target.value)}
                            className="h-5 w-5 text-emerald-600 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500" 
                          />
                          <span className="ml-3 text-lg text-gray-800">Wanita</span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="hidden md:flex items-center justify-center p-12 bg-gradient-to-br from-emerald-50 to-teal-100 h-full">
                   <UserPlus className="w-48 h-48 text-emerald-400" strokeWidth={1} />
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto mt-8 flex justify-between items-center">
              <Link to="/screening/menu" className="flex items-center px-6 py-3 text-lg font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-300">
                <ChevronLeft className="w-5 h-5 mr-2" />
                Kembali
              </Link>
              <button 
                onClick={handleNext}
                className="group flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-bold transform transition-transform duration-300 hover:scale-105 shadow-lg shadow-emerald-500/30"
              >
                Lanjutkan
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

          </section>
        </main>
      </div>
    </div>
  );
}
