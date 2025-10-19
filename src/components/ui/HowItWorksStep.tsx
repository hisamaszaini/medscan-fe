import React, { type ReactElement } from "react";

interface HowItWorksStepProps {
  number: string;
  icon: ReactElement<{ className?: string }>;
  title: string;
  description: string;
}

export const HowItWorksStep: React.FC<HowItWorksStepProps> = ({ number, icon, title, description }) => (
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