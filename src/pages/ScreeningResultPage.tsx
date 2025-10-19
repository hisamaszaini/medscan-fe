import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Sparkles, AlertTriangle, Home } from 'lucide-react';
import Header from '@/components/ui/Header';

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface Patient {
  name: string;
  age: number;
  gender: string;
}

interface Detection {
  class: number;
  conf: number;
}

interface ResultData {
  category: string;
  detections?: Detection[];
  image_path?: string;
  date?: string;
  user?: Patient;
}

export default function ScreeningResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, patient, image } = location.state || {};

  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  function dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  useEffect(() => {
    if (!image || !type || !patient) {
      alert('Data pasien atau gambar tidak ditemukan.');
      navigate('/screening-menu');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('name', patient.name);
    formData.append('age', patient.age.toString());
    formData.append('gender', patient.gender);
    formData.append('image', dataURLtoFile(image, `${type}.png`));
    formData.append('type', type);

    const timeoutId = setTimeout(() => {
      setLoading(false);
      alert('Proses inferensi sedang berlangsung, mohon tunggu beberapa saat lagi atau coba ulangi nanti.');
    }, 20000);

    fetch(`${API_BASE_URL}/api/${type}`, {
      method: 'POST',
      body: formData,
    })
      .then(async (res) => {
        clearTimeout(timeoutId);
        if (!res.ok) throw new Error('Gagal menerima respons dari server');
        const data: ResultData = await res.json();
        setResultData(data);
        setLoading(false);
      })
      .catch((err) => {
        clearTimeout(timeoutId);
        console.error(err);
        alert('Terjadi kesalahan saat mengirim data ke server.');
        setLoading(false);
      });

    return () => clearTimeout(timeoutId);
  }, [image, type, patient, navigate]);

  if (loading || !resultData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Mengirim data dan menunggu hasil...</p>
      </div>
    );
  }

  // Hitung status & summary
  let status = '';
  let summary = '';
  let confidence = 0;

  const detection = resultData.detections?.[0];

  if (!detection) {
    status = 'Gagal Deteksi';
    summary = 'AI gagal mendeteksi apapun dari gambar ini.';
    confidence = 0;
  } else {
    if (detection.class === 0) {
      status = 'Normal';
      summary = 'Hasil normal, tidak ada abnormalitas.';
    } else if (detection.class === 1) {
      status = resultData.category || 'Terkena';
      summary = `Terdeteksi ${status} pada gambar.`;
    } else {
      status = resultData.category || 'Terkena';
      summary = `Terdeteksi ${status} pada gambar.`;
    }
    confidence = Math.round(detection.conf * 10000) / 100; // 2 decimal
  }

  const statusInfo: Record<string, { color: string; icon: React.ReactNode }> = {
    Normal: { color: 'text-emerald-600', icon: <Sparkles className="w-16 h-16 text-emerald-500" /> },
    Malnutrisi: { color: 'text-red-600', icon: <AlertTriangle className="w-16 h-16 text-red-500" strokeWidth={1.5} /> },
    Anemia: { color: 'text-amber-600', icon: <AlertTriangle className="w-16 h-16 text-amber-500" strokeWidth={1.5} /> },
    'Diabetic Retinopathy': { color: 'text-rose-600', icon: <AlertTriangle className="w-16 h-16 text-rose-500" strokeWidth={1.5} /> },
    'Gagal Deteksi': { color: 'text-gray-600', icon: <AlertTriangle className="w-16 h-16 text-gray-500" strokeWidth={1.5} /> },
  };

  const currentStatus = statusInfo[status] || { color: 'text-gray-700', icon: <AlertTriangle className="w-16 h-16 text-gray-500" /> };

  const imageUrl = resultData.image_path ? `${API_BASE_URL}/api/${resultData.image_path}` : null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased relative overflow-x-hidden">
      <Header />
      <main>
        <section className="py-20 sm:py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Hasil Screening Anda
            </h1>
            <p className="text-lg text-gray-600">
              Dihasilkan pada {resultData.date || new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="max-w-4xl mx-auto mt-12 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8">
            <div className="text-center py-10">
              <div className="flex justify-center mb-4">{currentStatus.icon}</div>
              <h3 className={`text-3xl sm:text-4xl font-bold ${currentStatus.color}`}>{status}</h3>
              <p className="max-w-2xl mx-auto mt-4 text-gray-600 text-lg">{summary}</p>
            </div>

            {imageUrl && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center">Gambar Hasil Deteksi</h4>
                <img
                  src={imageUrl}
                  alt="Hasil Deteksi"
                  className="rounded-2xl shadow-md border border-gray-200 mx-auto max-h-[480px] object-contain"
                />
              </div>
            )}

            <div className="mt-6 inline-flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Sparkles className="w-5 h-5 mr-2 text-emerald-600" />
              <span className="font-semibold text-gray-700">Tingkat Keyakinan AI: {confidence}%</span>
            </div>

            <div className="mt-6 text-left">
              <h4 className="font-bold text-lg text-gray-800 mb-2">Data Pasien</h4>
              <p className="text-gray-600">Nama: {resultData.user?.name || '-'}</p>
              <p className="text-gray-600">Umur: {resultData.user?.age || '-'}</p>
              <p className="text-gray-600">Jenis Kelamin: {resultData.user?.gender || '-'}</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/"
              className="group flex items-center justify-center mx-auto w-fit bg-gray-800 text-white px-8 py-4 rounded-xl text-lg font-bold transform transition-transform duration-300 hover:scale-105 shadow-lg"
            >
              Kembali ke Menu Utama
              <Home className="w-5 h-5 ml-3 transform group-hover:rotate-12 transition-transform duration-300" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
