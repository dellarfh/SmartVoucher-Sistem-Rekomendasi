import { LayoutDashboard, Users, Tags, LineChart, LogOut } from 'lucide-react';

export default function Sidebar({ activeMenu, setActiveMenu, summary }) {
  return (
    <div className="w-64 bg-[#0f172a] text-slate-300 flex flex-col h-screen shadow-2xl z-20 sticky top-0 shrink-0">
      
      {/* Bagian Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/30">
            <LineChart size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">SmartVoucher</h1>
            <p className="text-[10px] text-slate-400 tracking-widest uppercase mt-0.5">Sistem Sains Data</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide py-4">
        {/* Menu Utama */}
        <div className="px-4 mb-8">
          <p className="text-xs font-bold text-slate-500 mb-3 px-2 tracking-wider">MENU UTAMA</p>
          <nav className="space-y-1">
            <MenuButton id="dashboard" icon={LayoutDashboard} label="Dashboard" sub="Ringkasan & overview" active={activeMenu} set={setActiveMenu} />
            <MenuButton id="pelanggan" icon={Users} label="Data Pelanggan" sub="Tabel & detail segmen" active={activeMenu} set={setActiveMenu} />
            <MenuButton id="promo" icon={Tags} label="Manajemen Promo" sub="Aturan & strategi" active={activeMenu} set={setActiveMenu} />
            <MenuButton id="insight" icon={LineChart} label="Insight Model" sub="Performa K-Means" active={activeMenu} set={setActiveMenu} />
          </nav>
        </div>

        {/* Segmen Aktif (Indikator Real-time) */}
        <div className="px-4 mb-8">
          <p className="text-xs font-bold text-slate-500 mb-3 px-2 tracking-wider">SEGMEN AKTIF</p>
          <div className="space-y-3 px-2">
            <SegmentRow color="bg-amber-500" label="Mega VIP" count={summary?.mega_vip || 0} countColor="text-amber-500" />
            <SegmentRow color="bg-emerald-500" label="VIP" count={summary?.vip || 0} countColor="text-emerald-500" />
            <SegmentRow color="bg-blue-500" label="Reguler" count={summary?.reguler || 0} countColor="text-blue-500" />
            <SegmentRow color="bg-rose-500" label="Pasif" count={summary?.pasif || 0} countColor="text-rose-500" />
          </div>
        </div>
      </div>

      {/* Profil Admin */}
      <div className="p-4 border-t border-slate-800 bg-[#0f172a] mt-auto">
        <div className="flex items-center gap-3 hover:bg-slate-800 p-2 rounded-xl cursor-pointer transition-colors">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
            DA
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-white truncate">Admin SmartVoucher</p>
            <p className="text-[11px] text-slate-400 truncate">adminsv@gmail.com</p>
          </div>
          <LogOut size={16} className="text-slate-500 hover:text-rose-400 transition-colors" />
        </div>
      </div>
    </div>
  );
}

// Sub-komponen Tombol Menu
function MenuButton({ id, icon: Icon, label, sub, active, set }) {
  const isActive = active === id;
  return (
    <button
      onClick={() => set(id)}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left ${
        isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/40' : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'
      }`}
    >
      <div className={`${isActive ? 'text-white' : 'text-slate-400'}`}><Icon size={20} strokeWidth={isActive ? 2.5 : 2} /></div>
      <div>
        <p className={`text-sm font-semibold ${isActive ? 'text-white' : ''}`}>{label}</p>
        <p className={`text-[10px] ${isActive ? 'text-indigo-200' : 'text-slate-500'}`}>{sub}</p>
      </div>
    </button>
  );
}

// Sub-komponen Baris Segmen
function SegmentRow({ color, label, count, countColor }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-3">
        <span className={`w-2 h-2 rounded-full shadow-sm ${color}`}></span>
        <span className="text-slate-300 font-medium">{label}</span>
      </div>
      <span className={`font-bold ${countColor}`}>{count}</span>
    </div>
  );
}