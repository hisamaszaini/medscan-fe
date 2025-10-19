import { ArrowRight } from "lucide-react";
import React, { type ReactElement } from "react";

interface FeatureCardProps {
    icon: ReactElement<{ className?: string }>;
    title: string;
    description: string;
    color: string;
    gradientFrom: string;
    gradientTo: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color, gradientFrom, gradientTo }) => (
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