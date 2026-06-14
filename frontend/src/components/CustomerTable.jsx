import { useState } from 'react';
import { Search, Crown, Star, ShoppingCart, AlertTriangle, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CustomerTable({ customers }) {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [activeFilter, setActiveFilter] = useState("Semua"); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Logika Penyaringan Data
  const filteredCustomers = customers.filter(cust => {
    const matchSearch = cust.CustomerID.toString().includes(searchTerm);
    const matchSegment = activeFilter === "Semua" ? true : cust.Klaster.toString() === activeFilter;
    return matchSearch && matchSegment;
  });

  // Logika Paginasi (Membagi Halaman)
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  // Mengubah halaman ke 1 setiap kali filter berubah
  const handleFilterChange = (val) => {
    setActiveFilter(val);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* HEADER HALAMAN */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Customer Recommendation</h2>
          <p className="text-sm text-slate-500 mt-1">
            {filteredCustomers.length} dari {customers.length} pelanggan 
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
        
        {/* BARIS KENDALI (Pencarian & Filter Pilihan) */}
        <div className="p-4 border-b border-slate-100 flex flex-col xl:flex-row justify-between items-center gap-4 bg-slate-50/50">
          
          {/* Pencarian */}
          <div className="relative w-full xl:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari ID pelanggan..." 
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white shadow-sm"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
          </div>

          {/* Deretan Tombol Filter */}
          <div className="flex items-center gap-3 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 scrollbar-hide">
            <div className="flex items-center gap-2 text-slate-500 mr-2">
              <Filter size={16} />
              <span className="text-sm font-medium">Filter:</span>
            </div>
            
            <FilterButton label="Semua" value="Semua" active={activeFilter} onClick={handleFilterChange} />
            <FilterButton label="Mega VIP" value="2" icon={Crown} colorClass="text-amber-600" active={activeFilter} onClick={handleFilterChange} />
            <FilterButton label="VIP" value="3" icon={Star} colorClass="text-emerald-600" active={activeFilter} onClick={handleFilterChange} />
            <FilterButton label="Reguler" value="0" icon={ShoppingCart} colorClass="text-blue-500" active={activeFilter} onClick={handleFilterChange} />
            <FilterButton label="Pasif" value="1" icon={AlertTriangle} colorClass="text-rose-500" active={activeFilter} onClick={handleFilterChange} />
          </div>
        </div>

        {/* TABEL DATA */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white text-slate-400 border-b border-slate-100 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Customer ID</th>
                <th className="px-6 py-4">Segmen</th>
                <th className="px-6 py-4">Recency (Hari)</th>
                <th className="px-6 py-4">Frequency</th>
                <th className="px-6 py-4">Monetary (£)</th>
                <th className="px-6 py-4">Rekomendasi Promo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700">
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">Data tidak ditemukan.</td>
                </tr>
              ) : (
                currentData.map((cust, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                    {/* Kolom ID */}
                    <td className="px-6 py-4 font-semibold text-slate-800">{cust.CustomerID}</td>
                    
                    {/* Kolom Segmen (Badge) - Warna Tetap Dipertahankan */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        cust.Klaster === 2 ? 'bg-amber-100 text-amber-700' :
                        cust.Klaster === 3 ? 'bg-emerald-100 text-emerald-700' :
                        cust.Klaster === 0 ? 'bg-blue-100 text-blue-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {cust.Klaster === 2 && <Crown size={12} />}
                        {cust.Klaster === 3 && <Star size={12} />}
                        {cust.Klaster === 2 ? 'Mega VIP' : cust.Klaster === 3 ? 'VIP' : cust.Klaster === 0 ? 'Reguler' : 'Pasif'}
                      </span>
                    </td>
                    
                    {/* Kolom Recency - Dibuat Netral */}
                    <td className="px-6 py-4 font-medium text-slate-700">{cust.Recency}</td>
                    
                    {/* Kolom Frequency - Dibuat Netral */}
                    <td className="px-6 py-4 font-medium text-slate-700">{cust.Frequency}x</td>
                    
                    {/* Kolom Monetary - Dibuat Netral */}
                    <td className="px-6 py-4 font-medium text-slate-700">£ {cust.Monetary.toFixed(2)}</td>
                    
                    {/* Kolom Rekomendasi Promo - Menggunakan Hitam Pekat */}
                    <td className="px-6 py-4 font-medium text-black truncate max-w-[200px] xl:max-w-xs transition-colors" title={cust.Rekomendasi_Promosi}>
                      {cust.Rekomendasi_Promosi}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* FOOTER PAGINASI */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 bg-white">
          <span>
            Menampilkan {currentData.length > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + itemsPerPage, filteredCustomers.length)} dari {filteredCustomers.length}
          </span>
          
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-md hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              
              {/* Menampilkan nomor halaman */}
              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum = currentPage - 2 + i;
                    if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                  }
                  
                  return (
                    <button 
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-7 h-7 flex items-center justify-center rounded-md font-medium transition-colors ${
                        currentPage === pageNum ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-md hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// Sub-komponen Tombol Filter
function FilterButton({ label, value, icon: Icon, colorClass, active, onClick }) {
  const isActive = active === value;
  
  return (
    <button
      onClick={() => onClick(value)}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border shrink-0 ${
        isActive 
          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' 
          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
      }`}
    >
      {Icon && <Icon size={14} className={isActive ? 'text-white/80' : colorClass} strokeWidth={2.5} />}
      {label}
    </button>
  );
}