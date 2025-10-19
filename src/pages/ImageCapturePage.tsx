import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, Camera, Sparkles, Upload } from 'lucide-react';
import Header from '@/components/ui/Header';

type ScreeningType = 'diabetic_retinopathy' | 'anemia' | 'malnutrisi';

export default function ImageCapturePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, patient } = (location.state || {}) as { type?: ScreeningType; patient?: any };

  const [image, setImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const guides: Record<ScreeningType, { title: string; description: string }> = {
    diabetic_retinopathy: {
      title: 'Diabetic Retinopathy',
      description:
        'Pastikan retina terlihat jelas dan pencahayaan cukup untuk analisis kerusakan mata akibat diabetes.',
    },
    anemia: {
      title: 'Anemia Detection',
      description:
        'Fokus pada kuku tangan. Pastikan pencahayaan merata untuk mendeteksi warna dan tanda anemia.',
    },
    malnutrisi: {
      title: 'Malnutrition Screening',
      description:
        'Fokus pada wajah subjek, terutama pipi dan dagu. Pastikan pencahayaan merata untuk analisis malnutrisi.',
    },
  };

  const currentGuide = type ? guides[type] : { title: '', description: '' };

  useEffect(() => {
    if (!videoRef.current) return;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error('Error accessing webcam:', err);
        alert('Tidak bisa mengakses webcam. Pastikan browser memiliki izin kamera.');
      });

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track: MediaStreamTrack) => track.stop());
      }
    };
  }, []);

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext('2d');
    if (!context) {
      console.error('Gagal mendapatkan context 2D dari canvas.');
      return;
    }

    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    const dataUrl = canvasRef.current.toDataURL('image/png');
    setImage(dataUrl);

    stopCamera();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);

      stopCamera();
    }
  };

  const handleNext = () => {
    if (!image) {
      alert('Silakan ambil atau upload gambar terlebih dahulu.');
      return;
    }
    navigate('/screening/result', {
      state: { type, patient, image },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased relative overflow-x-hidden">
      {/* Background efek blur */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-sky-200/30 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
      </div>

      <div className="relative z-10">
        <Header />
        <main>
          <section className="py-20 sm:py-24 px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm text-emerald-800 rounded-full mb-6 font-semibold border border-white/40">
                <Sparkles className="w-5 h-5 mr-2 text-emerald-600" />
                <span>Langkah 3 dari 4</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                Ambil atau Upload Gambar
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {currentGuide.description ||
                  'Posisikan subjek sesuai panduan untuk mendapatkan hasil analisis yang akurat.'}
              </p>
            </div>

            <div className="max-w-7xl mx-auto mt-16 grid lg:grid-cols-2 gap-12 items-start">
              {/* Kolom Kamera/Preview */}
              <div className="flex flex-col items-center">
                <div className="w-full bg-black rounded-3xl aspect-video shadow-2xl relative overflow-hidden flex items-center justify-center">
                  {image ? (
                    <img
                      src={image}
                      alt="Captured"
                      className="object-cover w-full h-full rounded-3xl"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      className="w-full h-full rounded-3xl object-cover"
                    />
                  )}
                </div>

                {/* Tombol Kamera */}
                <div className="mt-8 flex gap-4">
                  <button
                    onClick={handleCapture}
                    className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center group transform hover:scale-110 transition-transform duration-300"
                  >
                    <div className="w-20 h-20 bg-emerald-500 rounded-full group-hover:bg-emerald-600 transition-colors flex items-center justify-center">
                      <Camera className="w-10 h-10 text-white" />
                    </div>
                  </button>

                  {/* Tombol Upload */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center group transform hover:scale-110 transition-transform duration-300"
                  >
                    <div className="w-20 h-20 bg-sky-500 rounded-full group-hover:bg-sky-600 transition-colors flex items-center justify-center">
                      <Upload className="w-10 h-10 text-white" />
                    </div>
                  </button>
                </div>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />

                <canvas ref={canvasRef} width={640} height={480} className="hidden"></canvas>
              </div>

              {/* Kolom Panduan */}
              <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {currentGuide.title || 'Panduan Pengambilan Gambar'}
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Pencahayaan cukup dan merata.</li>
                  <li>Kamera stabil dan fokus pada subjek.</li>
                  <li>Subjek terlihat jelas dan sesuai area panduan.</li>
                </ul>
              </div>
            </div>

            {/* Navigasi */}
            <div className="max-w-7xl mx-auto mt-12 flex justify-between items-center">
              <Link
                to="/screening/input-data"
                className="flex items-center px-6 py-3 text-lg font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Kembali
              </Link>
              <button
                onClick={handleNext}
                className="group flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl text-lg font-bold transform transition-transform duration-300 hover:scale-105 shadow-lg shadow-emerald-500/30"
              >
                Selesai & Lihat Hasil
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
