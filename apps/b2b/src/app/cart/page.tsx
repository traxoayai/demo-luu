'use client';

import React, { useState } from 'react';
import { ChevronLeft, Trash2, Plus, Minus, Ticket, MapPin, ShieldCheck, CheckCircle2, AlertCircle, Truck } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({
    1: 10,
    2: 5,
  });

  const updateQuantity = (id: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 0) + delta)
    }));
  };

  const CART_ITEMS = [
    { id: 1, name: 'Amoxicillin 500mg', sku: 'AMX-500', unit: 'Hộp 10 vỉ', price: 45000, img: 'https://cdn.thegioididong.com/Products/Images/10026/230085/amoxicillin-500mg-brawn-h-100v-2-1.jpg', stock: 120 },
    { id: 2, name: 'Panadol Extra Đỏ', sku: 'PND-EXT', unit: 'Hộp 15 vỉ', price: 125000, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTejcjXCkTh8ncMSToEfQM_4AjhRc6x0MT3zg&s', stock: 120 },
  ];

  const subtotal = CART_ITEMS.reduce((sum, item) => sum + item.price * (quantities[item.id] || 1), 0);
  const discount = 25000;
  const total = subtotal - discount;

  return (
    <div className="min-h-screen bg-slate-50 pb-32 md:pb-10 font-sans text-slate-900 selection:bg-orange-200">
      
      {/* HEADER */}
      <header className="bg-white sticky top-0 z-40 border-b border-slate-100 px-4 py-4 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full flex items-center justify-center transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Giỏ hàng của bạn</h1>
        </div>
        <div className="text-sm font-bold text-slate-500"><span className="text-orange-600">{CART_ITEMS.length}</span> sản phẩm</div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* CỘT TRÁI: DANH SÁCH SẢN PHẨM */}
          <div className="flex-1 space-y-4">
             {CART_ITEMS.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex gap-4 md:gap-6 relative overflow-hidden group">
                   
                   {/* Ảnh sản phẩm */}
                   <div className="w-36 h-36 md:w-32 md:h-32 bg-slate-50 rounded-2xl flex items-center justify-center p-2 shrink-0 border border-slate-100">
                      <img src={item.img} alt={item.name} className="max-h-full object-cover mix-blend-multiply rounded-xl" />
                   </div>

                   {/* Thông tin */}
                   <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                         <div className="flex justify-between items-start gap-4">
                            <h3 className="font-bold text-slate-800 text-base md:text-lg leading-snug line-clamp-2 pr-6">{item.name}</h3>
                            <button className="text-slate-400 hover:text-red-500 absolute top-4 right-4 md:relative md:top-0 md:right-0 transition-colors bg-slate-50 md:bg-transparent w-8 h-8 rounded-full flex items-center justify-center">
                               <Trash2 size={18} />
                            </button>
                         </div>
                         <p className="text-xs font-medium text-slate-500 mt-1">SKU: <span className="text-slate-700">{item.sku}</span> • {item.unit}</p>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-4">
                         <div className="text-lg md:text-xl font-black text-orange-600">
                            {item.price.toLocaleString()} <span className="text-xs font-bold text-slate-500">đ</span>
                         </div>
                         
                         {/* Bộ đếm số lượng */}
                         <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-full border border-slate-200 w-max">
                            <button 
                               onClick={() => updateQuantity(item.id, -1)}
                               className="w-8 h-8 md:w-9 md:h-9 bg-white text-slate-700 rounded-full flex items-center justify-center shadow-sm hover:text-orange-600 active:scale-90 transition-all border border-slate-100"
                            >
                               <Minus size={16} strokeWidth={2.5} />
                            </button>
                            <input 
                               type="number" 
                               value={quantities[item.id] || 1} 
                               readOnly
                               className="w-10 text-center bg-transparent font-black text-slate-800 text-base outline-none"
                            />
                            <button 
                               onClick={() => updateQuantity(item.id, 1)}
                               className="w-8 h-8 md:w-9 md:h-9 bg-white text-slate-700 rounded-full flex items-center justify-center shadow-sm hover:text-orange-600 active:scale-90 transition-all border border-slate-100"
                            >
                               <Plus size={16} strokeWidth={2.5} />
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
             ))}

             <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex gap-3 items-start text-blue-800">
                <AlertCircle size={20} className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">Đơn hàng của bạn đã đạt điều kiện nhận <strong>miễn phí giao hàng</strong> toàn quốc.</p>
             </div>
          </div>

          {/* CỘT PHẢI: TÓM TẮT ĐƠN HÀNG */}
          <div className="w-full lg:w-[400px] shrink-0">
             <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg shadow-slate-200/50 sticky top-24">
                <h3 className="text-lg font-black text-slate-800 mb-5">Tóm tắt thanh toán</h3>

                <div className="space-y-4 mb-6 pb-6 border-b border-slate-100 text-sm font-medium">
                   <div className="flex justify-between text-slate-600">
                      <span>Tổng tiền hàng ({CART_ITEMS.length} sp)</span>
                      <span className="text-slate-900 font-bold">{subtotal.toLocaleString()} đ</span>
                   </div>
                   <div className="flex justify-between text-slate-600">
                      <span>Phí giao hàng</span>
                      <span className="text-emerald-600 font-bold">Miễn phí</span>
                   </div>
                   <div className="flex justify-between text-slate-600">
                      <span>Chiết khấu trực tiếp</span>
                      <span className="text-red-500 font-bold">- {discount.toLocaleString()} đ</span>
                   </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                   <span className="text-sm font-bold text-slate-500">Tổng thanh toán</span>
                   <div className="text-right">
                      <div className="text-2xl font-black text-orange-600 leading-none mb-1">{total.toLocaleString()} đ</div>
                      <div className="text-[10px] text-slate-400 font-medium">Đã bao gồm VAT</div>
                   </div>
                </div>

                {/* Khuyến mãi */}
                <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3 mb-6 border border-slate-100 cursor-pointer hover:border-orange-300 transition-colors group">
                   <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Ticket size={20} />
                   </div>
                   <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-800">Nam Việt Voucher</h4>
                      <p className="text-xs font-medium text-emerald-600">Đã áp dụng giảm 25.000đ</p>
                   </div>
                   <ChevronLeft size={20} className="text-slate-400 rotate-180" />
                </div>

                {/* Địa chỉ giao */}
                <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3 mb-3 border border-slate-100 cursor-pointer hover:border-blue-300 transition-colors">
                   <MapPin size={20} className="text-blue-500 mt-1 shrink-0" />
                   <div>
                      <h4 className="text-sm font-bold text-slate-800">Nhà thuốc An Khang (Chi nhánh 1)</h4>
                      <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">123 Nguyễn Thị Minh Khai, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh</p>
                   </div>
                </div>

                {/* Vận chuyển */}
                <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3 mb-6 border border-slate-100 cursor-pointer hover:border-emerald-300 transition-colors">
                   <Truck size={20} className="text-emerald-500 mt-0.5 shrink-0" />
                   <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-800">Giao hàng Tiêu chuẩn</h4>
                      <p className="text-xs font-medium text-slate-500 mt-1 leading-relaxed">Nhận hàng dự kiến: 20/05 - 21/05/2026</p>
                   </div>
                   <span className="text-sm font-bold text-emerald-600">Miễn phí</span>
                </div>

                <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black text-lg py-4 rounded-full shadow-xl shadow-orange-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                   Tiến hành Đặt hàng <CheckCircle2 size={20} />
                </button>
                <div className="flex items-center justify-center gap-2 mt-4 text-xs font-medium text-slate-400">
                   <ShieldCheck size={14} className="text-emerald-500" /> Thanh toán an toàn, bảo mật 100%
                </div>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
