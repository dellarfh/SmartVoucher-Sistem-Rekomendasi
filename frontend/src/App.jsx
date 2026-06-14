import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardHome from './components/DashboardHome';
import CustomerTable from './components/CustomerTable';
import PromoRules from './components/PromoRules';
import InsightModel from './components/InsightModel';

// Otomatis deteksi lingkungan (Laptop vs Vercel)
const API_BASE_URL = import.meta.env.MODE === 'development' 
  ? 'http://127.0.0.1:5000' 
  : '/_backend';

function App() {
  const [summary, setSummary] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  useEffect(() => {
    // Memanggil API menggunakan variabel dinamis
    fetch(`${API_BASE_URL}/api/summary`)
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Gagal ambil ringkasan:", err));

    fetch(`${API_BASE_URL}/api/customers`)
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error("Gagal ambil data pelanggan:", err));
  }, []);

  return (
    <div className="flex h-screen bg-slate-50/50 font-sans overflow-hidden">
      
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} summary={summary} />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-6">

          {activeMenu === 'dashboard' && (
            <>
              <Header />
              <DashboardHome summary={summary} customers={customers} />
            </>
          )}
          
          {activeMenu === 'pelanggan' && <CustomerTable customers={customers} />}
          
          {activeMenu === 'promo' && <PromoRules summary={summary} />}
          
          {activeMenu === 'insight' && <InsightModel customers={customers} summary={summary} />}

        </div>
      </div>
    </div>
  );
}

export default App;