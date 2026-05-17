'use client';

import React, { useState } from 'react';
import { 
  Search, ShoppingCart, Minus, Plus, 
  Filter, ScanBarcode, Gift, Pill, 
  Tag, AlertTriangle, PackageCheck,
  Info, X, Ticket, ChevronUp, Trash2, 
  CheckCircle2, Percent, ChevronLeft
} from 'lucide-react';
import Link from 'next/link';

// --- MOCK DATA ---
const BASE_PRODUCTS = [
  {
    id: 1,
    name: 'Tránh Thai New Choice Nam Hà (25 vỉ x 28v)',
    unit: 'Hộp',
    price: 248440,
    stock: 40,
    expiry: '09/2030',
    image: 'https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/4611/334731/vien-uong-tranh-thai-new-choice-new-choice-25-vi-x-28-vien-thumb01-638767909191018593-600x600.jpg',
    qty: 0,
    ingredient: 'Levonorgestrel, Ethinylestradiol',
    promo: { type: 'gift', text: 'Mua 10 tặng 1' }
  },
  {
    id: 2,
    name: 'Thuốc ho Methorphan Traphaco (10 vỉ x 10v)',
    unit: 'Hộp',
    price: 83000,
    stock: 120,
    expiry: '12/2026',
    image: 'https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/10245/327225/cao-dan-salonsip-gel-patch-hop-8-bao-3-mieng-thumb-638792755913157852-600x600.jpg',
    qty: 5,
    ingredient: 'Dextromethorphan, Loratadin',
    promo: null
  },
  {
    id: 3,
    name: 'Siro Ho Astex (Chai 90ml)',
    unit: 'Chai',
    price: 45000,
    stock: 5,
    expiry: '01/2025',
    image: 'https://cdn.tgdd.vn/Products/Images/9921/218987/dau-gio-nau-pharmedic-3ml-thumb01-600x600.jpg',
    qty: 0,
    isLowStock: true,
    ingredient: 'Tần dày lá, Núc nác, Cineol',
    promo: null
  },
  {
    id: 4,
    name: 'Panadol Extra Đỏ (Hộp 15 vỉ x 10 viên)',
    unit: 'Hộp',
    price: 185000,
    stock: 500,
    expiry: '10/2028',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTejcjXCkTh8ncMSToEfQM_4AjhRc6x0MT3zg&s',
    qty: 10,
    ingredient: 'Paracetamol 500mg, Caffeine 65mg',
    promo: { type: 'gift', text: 'Tặng 1 áo mưa khi mua 50 hộp' }
  },
  {
    id: 5,
    name: 'Khẩu trang y tế Nam Việt (4 lớp)',
    unit: 'Hộp',
    price: 35000,
    stock: 800,
    expiry: '12/2027',
    image: 'https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202605/dau-gio-xanh-con-o-3ml-thumb135416.jpg',
    qty: 0,
    ingredient: 'Vải kháng khuẩn',
    promo: null
  },
  {
    id: 6,
    name: 'Máy đo huyết áp điện tử Jumper JPD-HA300',
    unit: 'Cái',
    price: 650000,
    stock: 12,
    expiry: 'N/A',
    image: 'https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/Products/Images/11298/278991/may-huyet-ap-dien-tu-do-bap-tay-jumper-jpd-ha300-thumb-1-1-600x600.jpg',
    qty: 0,
    ingredient: 'Thiết bị y tế',
    promo: { type: 'discount', text: 'Giảm 50K' }
  }
];

const PRODUCTS = Array.from({ length: 30 }).map((_, index) => {
  const base = BASE_PRODUCTS[index % BASE_PRODUCTS.length];
  return {
    ...base,
    id: index + 1,
    name: `${base.name} - Lô ${index + 1}`,
    // Tăng qty ngẫu nhiên cho một số sản phẩm đầu tiên để test giỏ hàng
    qty: index === 1 ? 5 : index === 3 ? 10 : 0 
  };
});

const VOUCHERS = [
  { id: 'v1', code: 'NAMVIET50', title: 'Giảm 50.000đ', desc: 'Cho đơn từ 2.000.000đ', discount: 50000, minOrder: 2000000 },
  { id: 'v2', code: 'FREESHIP', title: 'Miễn phí vận chuyển', desc: 'Tối đa 30.000đ, cho đơn từ 1.000.000đ', discount: 30000, minOrder: 1000000 },
];

export default function QuickOrderPage() {
  const [products, setProducts] = useState(PRODUCTS);
  
  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVoucherOpen, setIsVoucherOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<{ id: string, code: string, title: string, desc: string, discount: number, minOrder: number } | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<any>(null);

  // Cart calculations
  const totalAmount = products.reduce((sum, p) => sum + (p.price * p.qty), 0);
  const cartItems = products.filter(p => p.qty > 0);
  const totalItemCount = cartItems.length;
  
  const discountAmount = selectedVoucher ? selectedVoucher.discount : 0;
  const finalAmount = Math.max(0, totalAmount - discountAmount);

  // Auto remove voucher if total drops below requirement
  if (selectedVoucher && totalAmount < selectedVoucher.minOrder) {
     setSelectedVoucher(null);
  }

  const updateQty = (id: number, delta: number) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        const newQty = Math.max(0, p.qty + delta);
        return { ...p, qty: newQty };
      }
      return p;
    }));
  };

  const removeProduct = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, qty: 0 } : p));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32 lg:pb-24 flex flex-col font-sans relative selection:bg-orange-200">
      
      {/* 1. HEADER TÌM KIẾM */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
           <Link href="/" className="w-10 h-10 shrink-0 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full flex items-center justify-center transition-colors">
               <ChevronLeft size={24} />
           </Link>
           <h1 className="hidden md:block text-xl font-black text-slate-800 tracking-tight mr-4">Đặt hàng nhanh</h1>
           <div className="flex gap-2 flex-1 max-w-3xl">
             <div className="relative flex-1 group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={18} />
               <input type="text" placeholder="Gõ tên, SKU, hoạt chất..." className="w-full pl-9 pr-10 py-2.5 md:py-3 bg-slate-100 border border-transparent focus:bg-white focus:border-orange-500 rounded-xl text-sm font-medium outline-none transition-all placeholder:text-slate-400" />
               <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-orange-600 rounded-md"><ScanBarcode size={20} /></button>
             </div>
             <button className="w-11 h-11 md:w-[46px] md:h-[46px] shrink-0 flex items-center justify-center bg-slate-100 rounded-xl text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"><Filter size={20} /></button>
           </div>
        </div>
      </header>

      {/* 2. DANH SÁCH SẢN PHẨM */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {products.map((p) => {
          const inCart = p.qty > 0;
          return (
            <div key={p.id} className={`bg-white rounded-2xl p-3 flex gap-3 transition-all ${inCart ? 'border-2 border-orange-400 shadow-md ring-4 ring-orange-50' : 'border border-slate-200 shadow-sm'}`}>
              
              {/* Ảnh & Nút Chi tiết */}
              <div className="w-24 md:w-28 shrink-0 flex flex-col gap-2">
                <div className="w-24 h-24 md:w-28 md:h-28 bg-white rounded-xl border border-slate-100 overflow-hidden p-1.5 relative cursor-pointer group">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                  <span className="absolute bottom-0 left-0 right-0 bg-slate-800/80 text-white text-[9px] font-bold text-center py-0.5 backdrop-blur-sm">{p.unit}</span>
                </div>
                <button onClick={() => setSelectedProductDetail(p)} className="w-full flex items-center justify-center gap-1 py-1.5 bg-orange-50/50 hover:bg-orange-50 text-orange-600 rounded-lg transition-colors border border-orange-200 hover:border-orange-300 active:scale-95">
                   <Info size={12} strokeWidth={2.5} />
                   <span className="text-[9px] font-bold uppercase tracking-wider">Chi tiết</span>
                </button>
              </div>

              {/* Thông tin */}
              <div className="flex-1 flex flex-col min-w-0">
                <h3 className="text-[13px] font-bold text-slate-800 leading-snug line-clamp-2 mb-1">{p.name}</h3>
                <div className="flex items-start gap-1 mb-1.5">
                  <Pill size={12} className="text-slate-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-slate-500 line-clamp-1 leading-tight font-medium">{p.ingredient}</p>
                </div>

                {p.promo && (
                  <div className="mb-2 w-fit">
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border ${p.promo.type === 'gift' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                      {p.promo.type === 'gift' ? <Gift size={10}/> : <Tag size={10}/>} {p.promo.text}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 mb-2">
                  {p.isLowStock 
                    ? <span className="text-[10px] text-red-600 font-bold flex items-center gap-0.5 bg-red-50 px-1 rounded"><AlertTriangle size={10}/> Kho: {p.stock}</span>
                    : <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1 rounded">Kho: {p.stock}</span>
                  }
                </div>

                {/* Giá & Stepper */}
                <div className="flex items-end justify-between mt-auto pt-1">
                  <div className="flex flex-col">
                    {inCart && <span className="text-[9px] font-bold text-orange-600 uppercase tracking-wider mb-0.5">Đã chọn: {p.qty}</span>}
                    <div className="text-[15px] font-black text-slate-900 leading-none">
                      {p.price.toLocaleString()} <span className="text-xs font-semibold text-slate-500 underline decoration-slate-300 decoration-wavy">đ</span>
                    </div>
                  </div>
                  
                  {inCart ? (
                    <div className="flex items-center bg-white rounded-lg h-8 border-2 border-orange-400 shadow-sm overflow-hidden shrink-0">
                      <button onClick={() => updateQty(p.id, -1)} className="w-8 h-full flex items-center justify-center text-orange-600 hover:bg-orange-50 active:bg-orange-100"><Minus size={16} strokeWidth={3}/></button>
                      <input type="number" value={p.qty} readOnly className="w-10 h-full bg-orange-50 text-center text-sm font-black text-orange-700 outline-none border-x border-orange-100" />
                      <button onClick={() => updateQty(p.id, 1)} className="w-8 h-full flex items-center justify-center text-orange-600 hover:bg-orange-50 active:bg-orange-100"><Plus size={16} strokeWidth={3}/></button>
                    </div>
                  ) : (
                    <button onClick={() => updateQty(p.id, 1)} className="h-8 px-4 shrink-0 bg-white text-orange-600 font-black text-xs rounded-lg border border-slate-200 hover:border-orange-500 hover:text-orange-600 active:bg-orange-50 transition-all shadow-sm flex items-center gap-1">
                      <ShoppingCart size={14} strokeWidth={2.5}/> Chọn
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        </div>
        <div className="text-center pt-8 pb-12 flex items-center justify-center gap-2 text-slate-400">
           <PackageCheck size={16}/> <p className="text-[11px] font-medium uppercase tracking-wider">Đã hiển thị toàn bộ 30 sản phẩm</p>
        </div>
      </main>

      {/* 3. ULTIMATE STICKY CHECKOUT FOOTER (RESPONSIVE) */}
      <footer className={`fixed bottom-0 left-0 w-full transition-transform duration-300 z-40 ${totalItemCount > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
        
        {/* VOUCHER HOOK (MOBILE) */}
        <div 
          onClick={() => setIsVoucherOpen(true)}
          className={`md:hidden mx-4 -mb-2 relative z-0 flex items-center justify-between px-4 py-2.5 rounded-t-xl cursor-pointer transition-colors border-t border-x border-dashed ${
            selectedVoucher 
              ? 'bg-emerald-50 border-emerald-300 text-emerald-700' 
              : 'bg-orange-50 border-orange-300 text-orange-700 hover:bg-orange-100'
          }`}
        >
           <div className="flex items-center gap-2">
              <Ticket size={16} className={selectedVoucher ? 'text-emerald-500' : 'text-orange-500'} />
              <span className="text-xs font-bold">
                 {selectedVoucher ? `Đã áp dụng: ${selectedVoucher.code}` : 'Bạn có 2 mã ưu đãi!'}
              </span>
           </div>
           {selectedVoucher ? (
              <span className="text-xs font-black">- {selectedVoucher.discount.toLocaleString()}đ</span>
           ) : (
              <ChevronUp size={16} className="text-orange-400 rotate-90" />
           )}
        </div>

        <div className="bg-white md:rounded-t-3xl shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.15)] border-t border-slate-200 p-4 md:py-5 pb-safe relative z-10 w-full">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
             
             {/* Left: Voucher Hook (Desktop) + Cart Info */}
             <div className="flex items-center gap-6 flex-1">
                {/* VOUCHER HOOK (DESKTOP) */}
                <div 
                  onClick={() => setIsVoucherOpen(true)}
                  className={`hidden md:flex items-center gap-4 px-5 py-3 rounded-2xl cursor-pointer transition-colors border-2 border-dashed ${
                    selectedVoucher 
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100' 
                      : 'bg-orange-50 border-orange-300 text-orange-700 hover:bg-orange-100'
                  }`}
                >
                   <div className="flex items-center gap-2">
                      <Ticket size={20} className={selectedVoucher ? 'text-emerald-500' : 'text-orange-500'} />
                      <span className="text-sm font-bold">
                         {selectedVoucher ? `Đã áp dụng Voucher: ${selectedVoucher.code}` : 'Bạn có 2 mã ưu đãi. Áp dụng ngay!'}
                      </span>
                   </div>
                   {selectedVoucher ? (
                      <span className="text-sm font-black">- {selectedVoucher.discount.toLocaleString()}đ</span>
                   ) : (
                      <ChevronUp size={18} className="text-orange-400 rotate-90" />
                   )}
                </div>

                {/* Cart Info */}
                <div onClick={() => setIsCartOpen(true)} className="flex-1 md:flex-none relative cursor-pointer group p-2 md:p-3 md:bg-slate-50 md:rounded-2xl rounded-xl hover:bg-slate-100 transition-colors">
                   <div className="flex items-center gap-1.5 mb-1">
                      <div className="relative">
                         <ShoppingCart size={18} className="text-slate-600" />
                         <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">
                            {totalItemCount}
                         </span>
                      </div>
                      <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                         Giỏ hàng <ChevronUp size={12} className="text-slate-400 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                   </div>
                   <div className="text-xl md:text-2xl font-black text-orange-600 leading-none group-hover:text-orange-700 transition-colors">
                      {finalAmount.toLocaleString()} <span className="text-sm font-semibold">đ</span>
                   </div>
                   {selectedVoucher && (
                      <div className="text-[10px] md:text-xs font-bold text-slate-400 mt-1 line-through decoration-slate-300">
                         Gốc: {totalAmount.toLocaleString()} đ
                      </div>
                   )}
                </div>
             </div>

             {/* Right: Big CTA */}
             <Link href="/cart" className="w-[140px] md:w-[200px] h-[52px] md:h-[64px] bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-95 text-white font-black rounded-xl md:rounded-2xl shadow-lg shadow-orange-200 transition-all flex flex-col items-center justify-center leading-none border border-orange-400">
                <span className="text-sm md:text-lg mb-0.5 md:mb-1 tracking-wide">ĐẶT NGAY</span>
                <span className="text-[9px] md:text-xs font-medium text-orange-100 opacity-90">({totalItemCount} mặt hàng)</span>
             </Link>
          </div>
        </div>
      </footer>

      {/* --- 4. MINI CART BOTTOM SHEET (Xem nhanh đơn hàng) --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          <div className="w-full md:max-w-md mx-auto md:mb-8 bg-slate-50 rounded-t-3xl md:rounded-3xl relative z-10 animate-in slide-in-from-bottom flex flex-col max-h-[85vh] shadow-2xl">
             
             {/* Header Mini Cart */}
             <div className="p-4 border-b border-slate-200 bg-white rounded-t-3xl md:rounded-t-3xl shrink-0 flex justify-between items-center z-20">
                <div>
                   <h3 className="text-lg font-black text-slate-800">Sản phẩm đã chọn</h3>
                   <p className="text-[11px] font-medium text-slate-500">Tổng cộng: {totalItemCount} mặt hàng</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"><X size={20}/></button>
             </div>

             {/* Cart Items List */}
             <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {cartItems.map(p => (
                   <div key={`cart-${p.id}`} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex gap-3">
                      <img src={p.image} alt={p.name} className="w-16 h-16 rounded-lg border border-slate-100 object-contain p-1" />
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                         <div className="flex justify-between items-start gap-2">
                            <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">{p.name}</h4>
                            <button onClick={() => removeProduct(p.id)} className="text-slate-300 hover:text-red-500 p-1 -m-1 transition-colors"><Trash2 size={14}/></button>
                         </div>
                         <div className="flex justify-between items-end mt-2">
                            <span className="text-sm font-black text-orange-600">{p.price.toLocaleString()}đ</span>
                            
                            {/* Stepper Thu Nhỏ trong Giỏ */}
                            <div className="flex items-center bg-slate-50 rounded-lg h-7 border border-slate-200 overflow-hidden shrink-0">
                              <button onClick={() => updateQty(p.id, -1)} className="w-7 h-full flex items-center justify-center text-slate-600 hover:bg-slate-200"><Minus size={14}/></button>
                              <input type="number" value={p.qty} readOnly className="w-8 h-full bg-transparent text-center text-xs font-bold text-slate-800 outline-none border-x border-slate-200" />
                              <button onClick={() => updateQty(p.id, 1)} className="w-7 h-full flex items-center justify-center text-orange-600 hover:bg-orange-100"><Plus size={14}/></button>
                            </div>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* --- 5. VOUCHER BOTTOM SHEET --- */}
      {isVoucherOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsVoucherOpen(false)}></div>
          <div className="w-full md:max-w-md bg-white rounded-t-3xl md:rounded-3xl p-5 md:p-6 relative z-10 animate-in slide-in-from-bottom md:zoom-in-95 shadow-2xl">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-slate-800">Kho Voucher của bạn</h3>
                <button onClick={() => setIsVoucherOpen(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors"><X size={20}/></button>
             </div>

             <div className="space-y-3 mb-6">
                {VOUCHERS.map((v) => {
                  const isEligible = totalAmount >= v.minOrder;
                  const isSelected = selectedVoucher?.id === v.id;
                  
                  return (
                    <div 
                      key={v.id}
                      onClick={() => {
                         if(isEligible) {
                            setSelectedVoucher(isSelected ? null : v);
                            setIsVoucherOpen(false);
                         }
                      }}
                      className={`relative w-full flex items-center p-4 rounded-xl border-2 transition-all ${
                        !isEligible ? 'border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed' :
                        isSelected ? 'border-emerald-500 bg-emerald-50 cursor-pointer' : 'border-slate-200 bg-white hover:border-orange-200 cursor-pointer'
                      }`}
                    >
                       <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 shrink-0 ${isSelected ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                          <Percent size={24} strokeWidth={2.5}/>
                       </div>
                       <div className="flex-1 text-left">
                          <div className="font-black text-sm text-slate-800">{v.title}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{v.desc}</div>
                          {!isEligible && (
                             <div className="text-[10px] text-red-500 font-semibold mt-1">
                                Mua thêm {(v.minOrder - totalAmount).toLocaleString()}đ để dùng
                             </div>
                          )}
                       </div>
                       
                       {/* Radio Button Style */}
                       {isEligible && (
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-300'}`}>
                             {isSelected && <CheckCircle2 size={14} strokeWidth={3}/>}
                          </div>
                       )}
                    </div>
                  );
                })}
             </div>
          </div>
        </div>
      )}

      {/* --- 6. PRODUCT DETAIL MODAL --- */}
      {selectedProductDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setSelectedProductDetail(null)}></div>
          <div className="w-full max-w-md bg-white rounded-[2rem] overflow-hidden relative z-10 animate-in zoom-in-95 shadow-2xl flex flex-col max-h-[90vh]">
            <button onClick={() => setSelectedProductDetail(null)} className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors z-20"><X size={20}/></button>
            
            <div className="relative aspect-[4/3] w-full bg-white flex-shrink-0 p-8 border-b border-slate-100">
               <img src={selectedProductDetail.image} alt={selectedProductDetail.name} className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
               <div className="mb-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">{selectedProductDetail.unit}</span>
                  {selectedProductDetail.isLowStock && <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded uppercase">Sắp hết hàng</span>}
               </div>
               <h2 className="text-xl font-black text-slate-800 leading-tight mb-2">{selectedProductDetail.name}</h2>
               <div className="flex items-center gap-3 mb-6">
                  <div className="text-2xl font-black text-orange-600">{selectedProductDetail.price.toLocaleString()}đ</div>
                  <div className="text-sm font-semibold text-slate-400 line-through">{(selectedProductDetail.price * 1.1).toLocaleString()}đ</div>
               </div>
               
               {selectedProductDetail.promo && (
                  <div className="mb-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-100 rounded-2xl flex items-center gap-3">
                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shadow-sm shrink-0">
                        {selectedProductDetail.promo.type === 'gift' ? <Gift size={20}/> : <Tag size={20}/>}
                     </div>
                     <div>
                        <div className="font-bold text-slate-800 text-sm">{selectedProductDetail.promo.text}</div>
                        <div className="text-[11px] text-slate-500 font-medium">Chương trình áp dụng đến hết tháng này</div>
                     </div>
                  </div>
               )}

               <div className="space-y-3">
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                     <span className="text-sm text-slate-500 font-medium">Hoạt chất chính</span>
                     <span className="text-sm text-slate-800 font-bold text-right max-w-[60%]">{selectedProductDetail.ingredient}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                     <span className="text-sm text-slate-500 font-medium">Hạn sử dụng (Date)</span>
                     <span className="text-sm text-slate-800 font-bold">{selectedProductDetail.expiry}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                     <span className="text-sm text-slate-500 font-medium">Tồn kho hiện tại</span>
                     <span className="text-sm text-slate-800 font-bold">{selectedProductDetail.stock} {selectedProductDetail.unit.toLowerCase()}</span>
                  </div>
                  <div className="flex justify-between py-2.5 border-b border-slate-100">
                     <span className="text-sm text-slate-500 font-medium">Nhà sản xuất</span>
                     <span className="text-sm text-slate-800 font-bold">Dược phẩm Nam Việt</span>
                  </div>
               </div>
            </div>
            
            <div className="p-4 bg-white border-t border-slate-100 shrink-0">
               {selectedProductDetail.qty > 0 ? (
                  <div className="flex items-center justify-between gap-4">
                     <div className="flex items-center bg-slate-50 rounded-xl h-[52px] border border-slate-200 overflow-hidden flex-1 max-w-[160px]">
                        <button onClick={() => updateQty(selectedProductDetail.id, -1)} className="w-12 h-full flex items-center justify-center text-slate-600 hover:bg-slate-200"><Minus size={18}/></button>
                        <input type="number" value={selectedProductDetail.qty} readOnly className="w-full h-full bg-transparent text-center text-base font-black text-slate-800 outline-none border-x border-slate-200" />
                        <button onClick={() => updateQty(selectedProductDetail.id, 1)} className="w-12 h-full flex items-center justify-center text-orange-600 hover:bg-orange-100"><Plus size={18}/></button>
                     </div>
                     <button onClick={() => setSelectedProductDetail(null)} className="flex-1 h-[52px] bg-slate-800 hover:bg-slate-900 active:scale-95 text-white font-bold rounded-xl transition-all shadow-lg">
                        Xong
                     </button>
                  </div>
               ) : (
                  <button onClick={() => updateQty(selectedProductDetail.id, 1)} className="w-full h-[52px] bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-95 text-white font-bold rounded-xl shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2">
                     <ShoppingCart size={18} /> Thêm vào giỏ hàng
                  </button>
               )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
