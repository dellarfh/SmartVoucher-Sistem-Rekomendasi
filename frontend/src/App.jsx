import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardHome from './components/DashboardHome';
import CustomerTable from './components/CustomerTable';
import PromoRules from './components/PromoRules';
import InsightModel from './components/InsightModel';

function App() {
  const [summary, setSummary] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [activeMenu, setActiveMenu] = useState('dashboard');

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/summary')
      .then((res) => res.json())
      .then((data) => setSummary(data))
      .catch((err) => console.error("Gagal ambil ringkasan:", err));

    fetch('http://127.0.0.1:5000/api/customers')
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error("Gagal ambil data pelanggan:", err));
  }, []);

  return (
    <div className="flex h-screen bg-slate-50/50 font-sans overflow-hidden">
      
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} summary={summary} />

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* Logika Navigasi: Header sekarang digabung ke dalam kondisi dashboard */}
          {activeMenu === 'dashboard' && (
            <>
              <Header />
              <DashboardHome summary={summary} customers={customers} />
            </>
          )}
          
          {activeMenu === 'pelanggan' && <CustomerTable customers={customers} />}
          
          {activeMenu === 'promo' && <PromoRules summary={summary} />}
          
          {/* Bagian Insight Model yang sudah terhubung dengan komponennya */}
          {activeMenu === 'insight' && <InsightModel customers={customers} summary={summary} />}

        </div>
      </div>
    </div>
  );
}

export default App;