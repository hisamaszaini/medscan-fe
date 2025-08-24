import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './index.css';
import ScreeningMenuPage from './pages/ScreeningMenuPage';
import PatientDataInputPage from './pages/PatientInputDataPage';
import ImageCapturePage from './pages/ImageCapturePage';
import ScreeningResultPage from './pages/ScreeningResultPage';
import HistoryPage from './pages/HistoryPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/screening/menu" element={<ScreeningMenuPage />} />
        <Route path="/screening/input-data" element={<PatientDataInputPage />} />
        <Route path="/screening/capture" element={<ImageCapturePage />} />
        <Route path="/screening/result" element={<ScreeningResultPage />} />
        <Route path="/screening/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
