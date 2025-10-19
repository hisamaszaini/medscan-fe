import { Eye, Heart, User, Sparkles } from 'lucide-react';
import Header from '@/components/ui/Header';
import { ScreeningChoiceCard } from '@/components/ui/ScreeningChoiceCard';

export default function ScreeningMenuPage() {
  const screeningOptions = [
    {
      icon: <Eye />,
      title: "Diabetic Retinopathy",
      type: "diabetic_retinopathy",
      description:
        "Analisis citra retina untuk mendeteksi tanda kerusakan mata akibat diabetes.",
      color: "red",
      linkTo: "/screening/input-data",
    },
    {
      icon: <Heart />,
      title: "Anemia Detection",
      type: "anemia",
      description:
        "Deteksi potensi anemia secara non-invasif melalui analisis warna kuku tangan.",
      color: "pink",
      linkTo: "/screening/input-data",
    },
    {
      icon: <User />,
      title: "Malnutrition Screening",
      type: "malnutrisi",
      description:
        "Mendeteksi risiko malnutrisi pada anak-anak melalui analisis citra wajah.",
      color: "sky",
      linkTo: "/screening/input-data",
    },
  ] as const;

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