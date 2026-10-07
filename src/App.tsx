import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DownloadsPage from './pages/DownloadsPage';
import ReleasesPage from './pages/ReleasesPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf9ff]">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<DownloadsPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/releases" element={<ReleasesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
