import { Cpu, Layers, Activity, Database, GitCommit, Target, CheckCircle2, Crown, Star, ShoppingCart, AlertTriangle } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';

export default function InsightModel({ customers, summary }) {
  // Warna standar klaster
  const COLORS = {
    2: '#f59e0b', // Mega VIP (Amber)
    3: '#10b981', // VIP (Emerald)
    0: '#3b82f6', // Reguler (Blue)
    1: '#f43f5e', // Pasif (Rose)
  };

  const NAMES = {
    2: 'Mega VIP',
    3: 'VIP',
    0: 'Reguler',
    1: 'Pasif'
  };

  // Menyiapkan data untuk Scatter Plot dari prop 'customers'
  const scatterData = customers.map(c => ({
    id: c.CustomerID,
    recency: c.Recency,
    frequency: c.Frequency,
    monetary: c.Monetary,
    klaster: c.Klaster
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-xl border border-slate-100 text-sm z-50">
          <p className="font-bold text-slate-800 flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[data.klaster] }}></span>
            {NAMES[data.klaster]}
          </p>
          <p className="text-slate-600">Customer ID: <span className="font-semibold text-slate-800">{data.id}</span></p>
          <p className="text-slate-600">Recency: <span className="font-semibold text-slate-800">{data.recency} hari</span></p>
          <p className="text-slate-600">Frequency: <span className="font-semibold text-slate-800">{data.frequency}x</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      
      {/* HEADER HALAMAN */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Insight Model Machine Learning</h2>
        <p className="text-sm text-slate-500 mt-1">
          Analisis performa K-Means Clustering pada dataset RFM
        </p>
      </div>

      {/* SEGMEN 1: KONFIGURASI & METRIK EVALUASI */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 mb-6 text-indigo-700">
          <Cpu size={20} />
          <h3 className="font-bold text-lg">Konfigurasi Model</h3>
        </div>

        {/* 6 Kartu Metrik */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          <MetricBadge icon={Cpu} label="Algoritma" value="K-Means" color="indigo" />
          <MetricBadge icon={Layers} label="Jumlah Klaster (K)" value="4" color="purple" />
          <MetricBadge icon={Activity} label="Silhouette Score" value="0.616" color="emerald" />
          <MetricBadge icon={Database} label="Data Points" value={summary?.total_pelanggan || 300} color="blue" />
          <MetricBadge icon={GitCommit} label="Iterasi" value="47" color="amber" />
          <MetricBadge icon={Target} label="Inertia (WCSS)" value="842.37" color="rose" />
        </div>

        {/* 2 Kotak Info (Fitur & Pre-processing) - Dataset Sumber Dihapus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoBox title="FITUR / VARIABEL INPUT">
            <ul className="space-y-2 text-sm text-slate-600 font-medium mt-3">
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Recency (R)</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Frequency (F)</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Monetary (M)</li>
            </ul>
          </InfoBox>
          <InfoBox title="PRE-PROCESSING">
            <div className="flex items-center gap-2 mt-3 mb-2">
              <CheckCircle2 size={16} className="text-emerald-500" />
              <span className="font-mono text-sm bg-slate-100 px-2 py-0.5 rounded text-slate-700">StandardScaler</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Normalisasi Z-score agar skala R, F, M setara sebelum diproses menggunakan perhitungan jarak K-Means.
            </p>
          </InfoBox>
        </div>
      </div>

      {/* SEGMEN 2: VISUALISASI & INTERPRETASI */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* KIRI: Scatter Plot */}
        <div className="xl:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Visualisasi Klaster: Recency vs Frequency</h3>
            <p className="text-xs text-slate-500">Setiap titik = 1 pelanggan · Ukuran titik ≈ Nilai Monetary</p>
          </div>
          
          <div className="flex-1 w-full min-h-[350px]">
            {scatterData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="recency" name="Recency" unit=" hari" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <YAxis type="number" dataKey="frequency" name="Frequency" unit="x" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
                  <ZAxis type="number" dataKey="monetary" range={[40, 400]} name="Monetary" />
                  <Tooltip content={<CustomTooltip />} cursor={{strokeDasharray: '3 3'}} />
                  <Scatter data={scatterData} fill="#8884d8" fillOpacity={0.7}>
                    {scatterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.klaster]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">Memuat visualisasi...</div>
            )}
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-4">
            <LegendItem color="bg-amber-500" label="Mega VIP" />
            <LegendItem color="bg-emerald-500" label="VIP" />
            <LegendItem color="bg-blue-500" label="Reguler" />
            <LegendItem color="bg-rose-500" label="Pasif" />
          </div>
        </div>

        {/* KANAN: Tabel Centroid & Interpretasi */}
        <div className="xl:col-span-4 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="mb-4">
              <h3 className="font-bold text-slate-800 text-lg">Pusat Klaster (Centroid)</h3>
              <p className="text-xs text-slate-500">Nilai rata-rata setiap segmen</p>
            </div>
            <table className="w-full text-left text-sm">
              <thead className="text-slate-400 border-b border-slate-100 uppercase text-[9px] tracking-wider font-bold">
                <tr>
                  <th className="pb-2">Segmen</th>
                  <th className="pb-2 text-right">R̄ (Hari)</th>
                  <th className="pb-2 text-right">F̄ (Kali)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <CentroidRow color="bg-blue-500" name="Reguler" r="65.4" f="5.8" m="2.3jt" textColor="text-blue-600" />
                <CentroidRow color="bg-rose-500" name="Pasif" r="198.2" f="1.4" m="185rb" textColor="text-rose-600" />
                <CentroidRow color="bg-amber-500" name="Mega VIP" r="12.1" f="34.7" m="128.5jt" textColor="text-amber-600" />
                <CentroidRow color="bg-emerald-500" name="VIP" r="28.3" f="14.2" m="18.8jt" textColor="text-emerald-600" />
              </tbody>
            </table>

            <div className="mt-8 mb-3">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Interpretasi Model</p>
            </div>
            <div className="space-y-2.5">
              <InterpCard bg="bg-amber-50" icon={Crown} color="text-amber-600" text="Volume & nilai transaksi tertinggi → prioritas retensi B2B" />
              <InterpCard bg="bg-emerald-50" icon={Star} color="text-emerald-600" text="Loyal & aktif → fokus reward dan up-sell" />
              <InterpCard bg="bg-blue-50" icon={ShoppingCart} color="text-blue-600" text="Basis terbesar → potensi naik ke VIP dengan dorongan diskon" />
              <InterpCard bg="bg-rose-50" icon={AlertTriangle} color="text-rose-600" text="Inaktif lama → win-back mendesak sebelum churn permanen" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Sub-Komponen Pembantu
function MetricBadge({ icon: Icon, label, value, color }) {
  const colors = {
    indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
    purple: "text-purple-600 bg-purple-50 border-purple-100",
    emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
    blue: "text-blue-600 bg-blue-50 border-blue-100",
    amber: "text-amber-600 bg-amber-50 border-amber-100",
    rose: "text-rose-600 bg-rose-50 border-rose-100",
  };

  return (
    <div className={`p-4 rounded-xl border ${colors[color]} flex flex-col justify-center items-center text-center`}>
      <Icon size={20} className="mb-2 opacity-80" />
      <h4 className="text-xl font-bold mb-0.5">{value}</h4>
      <p className="text-[10px] font-semibold uppercase tracking-wider opacity-80">{label}</p>
    </div>
  );
}

function InfoBox({ title, children }) {
  return (
    <div className="bg-slate-50 border border-slate-100 p-5 rounded-xl">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
      {children}
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span> {label}
    </div>
  );
}

function CentroidRow({ color, name, r, f, textColor }) {
  return (
    <tr>
      <td className="py-3 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${color}`}></span>
        <span className="font-semibold text-slate-700 text-xs">{name}</span>
      </td>
      <td className={`py-3 text-right font-bold text-xs ${textColor}`}>{r}</td>
      <td className={`py-3 text-right font-bold text-xs ${textColor}`}>{f}</td>
    </tr>
  );
}

function InterpCard({ bg, icon: Icon, color, text }) {
  return (
    <div className={`${bg} p-3 rounded-xl flex items-start gap-3`}>
      <div className={`mt-0.5 ${color}`}><Icon size={16} /></div>
      <p className="text-[11px] font-medium text-slate-700 leading-snug">{text}</p>
    </div>
  );
}