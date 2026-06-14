import { Users, Crown, Star, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardHome({ summary, customers }) {
  if (!summary || customers.length === 0) {
    return <div className="text-center text-slate-500 font-semibold animate-pulse mt-10">Memuat analisis dari backend...</div>;
  }

  // Data untuk Grafik Recharts
  const chartData = [
    { name: 'Mega VIP', value: summary.mega_vip, color: '#f59e0b' },
    { name: 'VIP', value: summary.vip, color: '#10b981' },
    { name: 'Reguler', value: summary.reguler, color: '#3b82f6' },
    { name: 'Pasif', value: summary.pasif, color: '#f43f5e' },
  ];

  const total = summary.total_pelanggan;

  // Desain Kotak Melayang (Tooltip) saat kursor menyentuh grafik
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percent = ((data.value / total) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 rounded-lg shadow-xl border border-slate-100 text-sm z-50">
          <p className="font-bold text-slate-800 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></span>
            {data.name}
          </p>
          <p className="text-slate-600 mt-1">{data.value} Pelanggan <span className="font-bold text-indigo-600">({percent}%)</span></p>
        </div>
      );
    }
    return null;
  };

  // Mengambil 5 pelanggan dengan nilai Monetary tertinggi
  const topCustomers = [...customers].sort((a, b) => b.Monetary - a.Monetary).slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* BARIS 1: Kartu Ringkasan Atas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Pelanggan Aktif" value={summary.total_pelanggan} icon={Users} color="text-blue-600" bg="bg-blue-50" subtitle="Telah dianalisis" />
        <MetricCard title="Mega VIP & VIP" value={summary.mega_vip + summary.vip} icon={Crown} color="text-emerald-600" bg="bg-emerald-50" subtitle="Loyalitas tinggi" />
        <MetricCard title="Pelanggan Reguler" value={summary.reguler} icon={Star} color="text-indigo-600" bg="bg-indigo-50" subtitle="Mayoritas transaksi" />
        <MetricCard title="Pasif / Churn Risk" value={summary.pasif} icon={AlertTriangle} color="text-rose-600" bg="bg-rose-50" subtitle="Perlu strategi win-back" />
      </div>

      {/* BARIS 2: Tata Letak 3 Kolom Sejajar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* KOLOM 1 (Kiri): Distribusi Segmen (Grafik + Keterangan) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-between">
          <div className="w-full text-left mb-2">
            <h3 className="font-bold text-slate-800 text-lg">Distribusi Segmen</h3>
            <p className="text-xs text-slate-500">Porsi 4 klaster pelanggan (K-Means)</p>
          </div>
          
          {/* Grafik Donat Melayang */}
          <div className="w-full h-52 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} className="transition-all hover:opacity-80 outline-none" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
              </PieChart>
            </ResponsiveContainer>
            {/* Teks di tengah lubang donat */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-bold text-slate-800">{total}</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase">Total</span>
            </div>
          </div>

          {/* Keterangan Warna (Legend) */}
          <div className="w-full grid grid-cols-2 gap-y-3 mt-4 px-2">
            {chartData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></span>
                <span className="font-medium text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* KOLOM 2 (Tengah): Profil Segmen RFM */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="font-bold text-slate-800 text-lg mb-5">Profil Segmen RFM</h3>
          <div className="space-y-3.5 flex-1 flex flex-col justify-center">
            <ProfileCard bg="bg-amber-50" border="border-amber-200" title="Mega VIP / B2B" titleColor="text-amber-700" desc="R: Baru, F: Sangat Tinggi, M: Sangat Tinggi" />
            <ProfileCard bg="bg-emerald-50" border="border-emerald-200" title="VIP / Pelanggan Setia" titleColor="text-emerald-700" desc="R: Baru, F: Tinggi, M: Tinggi" />
            <ProfileCard bg="bg-blue-50" border="border-blue-200" title="Reguler / Mayoritas" titleColor="text-blue-700" desc="R: Sedang, F: Sedang, M: Sedang" />
            <ProfileCard bg="bg-rose-50" border="border-rose-200" title="Pasif / Churn Risk" titleColor="text-rose-700" desc="R: Lama (>90 hari), F: Rendah, M: Rendah" />
          </div>
        </div>

        {/* KOLOM 3 (Kanan): Tabel Top Pelanggan */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="mb-4">
            <h3 className="font-bold text-slate-800 text-lg">Top 5 Pelanggan Berdasarkan Revenue</h3>
            <p className="text-xs text-slate-500">Daftar pelanggan bernilai tertinggi</p>
          </div>
          
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-400 border-b border-slate-100 uppercase text-[9px] tracking-wider">
                <tr>
                  <th className="pb-2 font-semibold">ID</th>
                  <th className="pb-2 font-semibold">Segmen</th>
                  <th className="pb-2 font-semibold text-center">Freq</th>
                  <th className="pb-2 font-semibold text-right">Belanja</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {topCustomers.map((cust, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 font-bold text-slate-700 text-xs">{cust.CustomerID}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                        cust.Klaster === 2 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {cust.Klaster === 2 ? 'Mega VIP' : 'VIP'}
                      </span>
                    </td>
                    <td className="py-3.5 text-center text-slate-600 font-medium text-xs">{cust.Frequency}x</td>
                    <td className="py-3.5 font-bold text-indigo-900 text-right text-xs">£{cust.Monetary.toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

// Sub-komponen Pembantu
function MetricCard({ title, value, icon: Icon, color, bg, subtitle }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-3">
        <div className={`${bg} ${color} p-2.5 rounded-xl`}><Icon size={20} strokeWidth={2} /></div>
      </div>
      <div>
        <h3 className="text-3xl font-bold tracking-tight text-slate-800">{value}</h3>
        <p className="text-xs font-semibold text-slate-500 mt-1">{title}</p>
        <p className={`text-[10px] mt-2 font-medium ${color}`}>{subtitle}</p>
      </div>
    </div>
  );
}

function ProfileCard({ bg, border, title, titleColor, desc }) {
  return (
    <div className={`${bg} border ${border} p-3 rounded-xl`}>
      <h4 className={`font-bold text-sm ${titleColor}`}>{title}</h4>
      <p className={`text-[11px] mt-1 opacity-80 ${titleColor}`}>{desc}</p>
    </div>
  );
}