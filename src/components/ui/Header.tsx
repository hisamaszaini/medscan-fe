import { Activity, History } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="sticky top-4 z-50 max-w-6xl mx-auto">
    <div className="flex justify-between items-center bg-white/70 backdrop-blur-xl p-4 rounded-2xl shadow-subtle border border-gray-100/80 mx-4 sm:mx-0">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">MedScan</h1>
      </div>
      <Link to="/screening/history" className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors duration-300">
        <History className="w-5 h-5 text-emerald-700" />
        <span className="font-semibold text-emerald-700 hidden sm:block">Riwayat</span>
      </Link>
    </div>
  </header>
);

export default Header;