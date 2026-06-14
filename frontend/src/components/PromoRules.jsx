import { useState } from 'react';
import { Save, Crown, Star, ShoppingCart, AlertTriangle, RotateCcw, Zap, ChevronDown, Loader2 } from 'lucide-react';

export default function PromoRules({ summary }) {
  const [isSaving, setIsSaving] = useState(false);

  const targetMegaVip = summary?.mega_vip || 18;
  const targetVip = summary?.vip || 52;
  const targetReguler = summary?.reguler || 145;
  const targetPasif = summary?.pasif || 85;

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("✅ Berhasil! Konfigurasi promosi telah disimpan ke dalam database.");
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manajemen Aturan Promosi</h2>
          <p className="text-sm text-slate-500 mt-1">
            Kelola strategi kampanye per segmen · 4 dari 4 promo aktif
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-xl text-right">
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Total Kuota Aktif</p>
            <p className="text-xl font-bold text-indigo-800 leading-none mt-1">850 <span className="text-sm">Voucher</span></p>
          </div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 rounded-xl text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex overflow-hidden">
        <MiniStat icon={Crown} title="Mega VIP" activeText={`Aktif · ${targetMegaVip} pelanggan`} color="amber" />
        <MiniStat icon={Star} title="VIP" activeText={`Aktif · ${targetVip} pelanggan`} color="emerald" />
        <MiniStat icon={ShoppingCart} title="Reguler" activeText={`Aktif · ${targetReguler} pelanggan`} color="blue" />
        <MiniStat icon={AlertTriangle} title="Pasif" activeText={`Aktif · ${targetPasif} pelanggan`} color="rose" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        <PromoCard 
          theme="amber"
          icon={Crown}
          cluster="KLASTER 2"
          segment="MEGA VIP"
          targetCount={targetMegaVip}
          title="Program Kemitraan Eksklusif B2B"
          badgeText="Bundle / Paket Korporat"
          defaultTitle="Program Kemitraan Eksklusif"
          defaultType="Bundle / Paket Korporat"
          defaultDiscount="15 %"
          defaultMinBuy="£ 500"
          defaultDays="90 hari"
          defaultQuota="50"
          defaultDesc="Penawaran eksklusif untuk mitra korporat: diskon volume 15%, dedicated account manager, dan akses laporan bisnis bulanan."
          estQuotaUsed="0"
        />

        <PromoCard 
          theme="emerald"
          icon={Star}
          cluster="KLASTER 3"
          segment="VIP"
          targetCount={targetVip}
          title="Akses Awal Produk & Reward Poin Ganda"
          badgeText="Akses Awal & Poin"
          defaultTitle="Akses Awal Produk & Reward Poin Ganda"
          defaultType="Akses Awal & Poin"
          defaultDiscount="Poin 2x Lipat"
          defaultMinBuy="£ 150"
          defaultDays="60 hari"
          defaultQuota="100"
          defaultDesc="Pelanggan VIP mendapatkan akses 48 jam lebih awal untuk produk baru, reward poin 2x lipat, dan diskon spesial 10%."
          estQuotaUsed="0"
        />

        <PromoCard 
          theme="blue"
          icon={ShoppingCart}
          cluster="KLASTER 0"
          segment="REGULER"
          targetCount={targetReguler}
          title="Voucher Gratis Ongkir + Diskon 20%"
          badgeText="Gratis Ongkir + Diskon"
          defaultTitle="Voucher Gratis Ongkir + Diskon 20%"
          defaultType="Gratis Ongkir + Diskon"
          defaultDiscount="20 %"
          defaultMinBuy="£ 50"
          defaultDays="30 hari"
          defaultQuota="500"
          defaultDesc="Dorong frekuensi pembelian dengan gratis ongkos kirim dan diskon 20% untuk pembelian minimal £ 50."
          estQuotaUsed="25"
        />

        <PromoCard 
          theme="rose"
          icon={AlertTriangle}
          cluster="KLASTER 1"
          segment="PASIF"
          targetCount={targetPasif}
          title="Voucher Win-Back Diskon £ 20"
          badgeText="Voucher Nominal (£)"
          defaultTitle="Voucher Win-Back Diskon £ 20"
          defaultType="Voucher Nominal (£)"
          defaultDiscount="£ 20"
          defaultMinBuy="£ 30"
          defaultDays="14 hari"
          defaultQuota="200"
          defaultDesc="Kampanye reaktivasi mendesak: voucher diskon £ 20 dengan masa berlaku 14 hari. Kirim melalui email + WhatsApp."
          estQuotaUsed="34"
        />

      </div>

      <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-2xl shadow-md shadow-indigo-100/50 border border-indigo-200 p-6 flex flex-col md:flex-row gap-5 items-start">
        <div className="bg-indigo-600 text-white p-3.5 rounded-xl shadow-sm shrink-0">
          <Zap size={24} className="fill-white/20" />
        </div>
        <div>
          <h3 className="font-bold text-indigo-900 text-lg mb-3">Tips Optimasi Promosi Cerdas</h3>
          <ul className="space-y-2 text-sm text-slate-700 list-none">
            <li className="flex items-start gap-2.5">
              <span className="text-indigo-500 font-bold mt-0.5">→</span>
              <span><strong className="text-indigo-900">Pelanggan Pasif:</strong> Tetapkan batas berlaku maksimal 14 hari untuk menciptakan urgensi <em>win-back</em>.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-indigo-500 font-bold mt-0.5">→</span>
              <span><strong className="text-indigo-900">Pelanggan Reguler:</strong> Kombinasikan gratis ongkir + diskon untuk mendorong peningkatan frekuensi ke level VIP.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-indigo-500 font-bold mt-0.5">→</span>
              <span><strong className="text-indigo-900">Pelanggan VIP:</strong> Berikan <em>reward</em> non-moneter (akses eksklusif, poin ganda) karena lebih efektif menjaga loyalitas tanpa memotong margin keuntungan.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-indigo-500 font-bold mt-0.5">→</span>
              <span><strong className="text-indigo-900">Pelanggan Mega VIP:</strong> Fokus pada nilai hubungan jangka panjang (kemitraan B2B, layanan prioritas), bukan sekadar diskon transaksional.</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
}

function MiniStat({ icon: Icon, title, activeText, color }) {
  const colors = {
    amber: "text-amber-500",
    emerald: "text-emerald-500",
    blue: "text-blue-500",
    rose: "text-rose-500",
  };
  
  return (
    <div className="flex-1 p-4 border-r border-slate-200 last:border-r-0 flex items-center gap-3">
      <Icon size={20} className={colors[color]} />
      <div>
        <p className={`text-sm font-bold ${colors[color]}`}>{title}</p>
        <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1 mt-0.5">
          <span className={`w-1.5 h-1.5 rounded-full bg-${color}-500 inline-block`}></span>
          {activeText}
        </p>
      </div>
    </div>
  );
}

function PromoCard({ 
  theme, icon: Icon, cluster, segment, targetCount, title, badgeText,
  defaultTitle, defaultType, defaultDiscount, defaultMinBuy, defaultDays, defaultQuota, defaultDesc,
  estQuotaUsed
}) {
  
  // STATE: Menyimpan nilai batas kuota agar bisa diubah dan bereaksi
  const [quotaLimit, setQuotaLimit] = useState(defaultQuota);

  // PERHITUNGAN DINAMIS: Menghitung persentase berdasarkan nilai kuota yang diketik
  const used = parseInt(estQuotaUsed) || 0;
  const limit = parseInt(quotaLimit) || 1; // Mencegah pembagian dengan nol
  const dynamicPercent = Math.min(100, (used / limit) * 100).toFixed(1);

  const themes = {
    amber: { bg: "bg-amber-100", border: "border-amber-300", text: "text-amber-800", fill: "bg-amber-600", light: "bg-amber-200 text-amber-900" },
    emerald: { bg: "bg-emerald-100", border: "border-emerald-300", text: "text-emerald-800", fill: "bg-emerald-600", light: "bg-emerald-200 text-emerald-900" },
    blue: { bg: "bg-blue-100", border: "border-blue-300", text: "text-blue-800", fill: "bg-blue-600", light: "bg-blue-200 text-blue-900" },
    rose: { bg: "bg-rose-100", border: "border-rose-300", text: "text-rose-800", fill: "bg-rose-600", light: "bg-rose-200 text-rose-900" }
  };

  const t = themes[theme];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      <div className={`${t.bg} border-b ${t.border} p-5 flex items-start gap-4`}>
        <div className={`mt-1 ${t.text}`}><Icon size={28} /></div>
        <div className="flex-1">
          <p className={`text-[10px] font-bold tracking-wider uppercase mb-1 ${t.text}`}>{cluster} · {segment}</p>
          <h3 className={`text-lg font-bold leading-tight mb-2 ${t.text}`}>{title}</h3>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 ${t.light}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current"></span> {badgeText}
            </span>
            <span className="text-[11px] text-slate-600 font-medium">Target: {targetCount} pelanggan</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button className={`px-3 py-1.5 rounded-full text-[11px] font-bold text-white flex items-center gap-1.5 ${t.fill} hover:opacity-90 transition-opacity`}>
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span> Aktif
          </button>
          <button className="text-slate-400 hover:text-slate-700 transition-colors"><RotateCcw size={16} /></button>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-5">
        
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Judul Promosi" defaultValue={defaultTitle} />
          <div className="space-y-1.5 relative">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tipe Promosi</label>
            <div className="relative">
              <select className="w-full pl-3 pr-10 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer font-medium" defaultValue={defaultType}>
                <option value="% Diskon Persen (%)">% Diskon Persen (%)</option>
                <option value="Voucher Nominal (£)">Voucher Nominal (£)</option>
                <option value="Gratis Ongkir + Diskon">Gratis Ongkir + Diskon</option>
                <option value="Akses Awal & Poin">Akses Awal & Poin</option>
                <option value="Bundle / Paket Korporat">Bundle / Paket Korporat</option>
                <option value="Reward Poin">Reward Poin</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Besar Diskon / Benefit" defaultValue={defaultDiscount} />
          <FormInput label="Minimum Pembelian" defaultValue={defaultMinBuy} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Masa Berlaku (Hari)" defaultValue={defaultDays} />
          
          {/* KOTAK INPUT DINAMIS: Nilainya terikat pada state 'quotaLimit' */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Batas Kuota Penggunaan</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              value={quotaLimit}
              onChange={(e) => setQuotaLimit(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Deskripsi Kampanye</label>
          <textarea 
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[80px] resize-none leading-relaxed font-medium"
            defaultValue={defaultDesc}
          ></textarea>
        </div>

        <div className="mt-auto bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="flex justify-between items-end mb-2">
            <p className="text-[11px] font-bold text-slate-500">Status Penggunaan Kuota</p>
            <p className="text-[11px] font-bold">
              <span className={t.text}>{used} Kuota</span> <span className="text-slate-400">/ {quotaLimit} Maksimal</span>
            </p>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 mb-2 overflow-hidden">
            <div className={`h-1.5 rounded-full ${t.fill}`} style={{ width: `${dynamicPercent === '0.0' ? 2 : dynamicPercent}%` }}></div>
          </div>
          <p className="text-[10px] text-slate-600 font-medium">
            {dynamicPercent}% kuota terpakai dari target {targetCount} pelanggan
          </p>
        </div>

      </div>
    </div>
  );
}

function FormInput({ label, defaultValue }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</label>
      <input 
        type="text" 
        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
        defaultValue={defaultValue}
      />
    </div>
  );
}