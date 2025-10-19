import type { ReactElement } from "react";
import React from "react";
import { Link } from "react-router-dom";

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
} as const;

type ColorVariant = keyof typeof colorVariants;

interface ScreeningChoiceCardProps {
    icon: ReactElement<{className?: string}>;
    title: string;
    description: string;
    type: string;
    color?: ColorVariant
    linkTo: string;
}

export const ScreeningChoiceCard: React.FC<ScreeningChoiceCardProps> = ({ icon, title, description, type, color = "sky", linkTo }) => {
  const variants = colorVariants[color] || colorVariants.sky;

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
          state={{ type }}
          className={`mt-8 block w-full text-center text-white font-bold py-3 px-6 rounded-lg shadow-md ${variants.button} transition-colors duration-300`}
        >
          Mulai Screening
        </Link>
      </div>
    </div>
  );
};