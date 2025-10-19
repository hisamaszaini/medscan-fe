import { useState, type JSX } from 'react';
import { Eye, Heart, User, FileText, ChevronDown, ChevronUp } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL;
export default function HistoryCard({ record }: { record: any }) {
  const [open, setOpen] = useState(false);

  // Tentukan status
  let statusText = 'Tidak Terdeteksi';
  let statusColor = 'bg-gray-100 text-gray-700';

  const hasResult = Array.isArray(record.result)
    ? record.result.length > 0
    : record.result?.class !== undefined;

  if (hasResult) {
    const isPositive = Array.isArray(record.result)
      ? record.result.some((r: any) => r.class === 1)
      : record.result.class === 1;

    if (isPositive) {
      statusText = `Positif ${record.category}`;
      statusColor = 'bg-red-100 text-red-700';
    } else {
      statusText = `Negatif ${record.category}`;
      statusColor = 'bg-emerald-100 text-emerald-700';
    }
  }

  const iconMap: Record<string, JSX.Element> = {
    'Diabetic Retinopathy': <Eye className="w-6 h-6 text-white" />,
    'Anemia': <Heart className="w-6 h-6 text-white" />,
    'Malnutrisi': <User className="w-6 h-6 text-white" />,
  };
  const iconBg: Record<string, string> = {
    'Diabetic Retinopathy': 'bg-red-500',
    'Anemia': 'bg-pink-500',
    'Malnutrisi': 'bg-sky-500',
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center ${iconBg[record.category] || 'bg-gray-400'}`}>
          {iconMap[record.category] || <FileText className="w-6 h-6 text-white" />}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{record.user?.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{record.created_at}</p>
            </div>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${statusColor}`}>
              {statusText}
            </span>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="mt-4 flex items-center justify-between w-full text-left px-4 py-2 bg-gray-100/60 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            <span>{open ? 'Tutup Detail' : 'Lihat Detail'}</span>
            {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {open && (
            <div className="mt-4 space-y-4 border-t border-gray-200 pt-4">
              {record.image_path && (
                <img
                  src={`${API_BASE_URL}/${record.image_path}`}
                  alt="Hasil Screening"
                  className="w-full max-w-md mx-auto rounded-xl shadow-md"
                />
              )}

              <div className="space-y-2">
                {Array.isArray(record.result) ? (
                  record.result.map((r: any, idx: number) => (
                    <div key={idx} className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                      <p><strong>Class:</strong> {r.class}</p>
                      <p><strong>Confidence:</strong> {(r.conf * 100).toFixed(2)}%</p>
                      <p><strong>Bounding Box:</strong> [{r.xyxy.join(', ')}]</p>
                    </div>
                  ))
                ) : record.result?.class !== undefined ? (
                  <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <p><strong>Class:</strong> {record.result.class}</p>
                    <p><strong>Confidence:</strong> {(record.result.confidence * 100).toFixed(2)}%</p>
                    <p><strong>Bounding Box:</strong> [{record.result.bbox.join(', ')}]</p>
                  </div>
                ) : (
                  <p className="text-gray-500">Tidak ada hasil terdeteksi.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
