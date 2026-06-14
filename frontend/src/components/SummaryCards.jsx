import { Users, Crown, Star, AlertTriangle } from 'lucide-react';

export default function SummaryCards({ summary }) {
  if (!summary) {
    return <div className="text-center text-blue-500 font-semibold animate-pulse">Memuat metrik...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Kartu diubah menggunakan border-blue-100 dan teks bernuansa biru */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex justify-between">
        <div><p className="text-sm font-medium text-blue-500">Total Pelanggan</p><h3 className="text-3xl font-bold text-blue-900 mt-1">{summary.total_pelanggan}</h3></div>
        <div className="bg-blue-100 p-3 rounded-lg text-blue-600 h-fit"><Users size={24} /></div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex justify-between">
        <div><p className="text-sm font-medium text-blue-500">Mega VIP (B2B)</p><h3 className="text-3xl font-bold text-blue-900 mt-1">{summary.mega_vip}</h3></div>
        <div className="bg-amber-100 p-3 rounded-lg text-amber-600 h-fit"><Crown size={24} /></div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex justify-between">
        <div><p className="text-sm font-medium text-blue-500">Pelanggan Setia (VIP)</p><h3 className="text-3xl font-bold text-blue-900 mt-1">{summary.vip}</h3></div>
        <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600 h-fit"><Star size={24} /></div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 flex justify-between">
        <div><p className="text-sm font-medium text-blue-500">Pelanggan Pasif</p><h3 className="text-3xl font-bold text-blue-900 mt-1">{summary.pasif}</h3></div>
        <div className="bg-rose-100 p-3 rounded-lg text-rose-600 h-fit"><AlertTriangle size={24} /></div>
      </div>
    </div>
  );
}