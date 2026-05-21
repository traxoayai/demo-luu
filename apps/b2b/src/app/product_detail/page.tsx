"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ShoppingCart, Star, ShieldCheck, Truck, Clock } from "lucide-react";
import ProductInteractiveIcons from "../../components/shared/ProductInteractiveIcons";

export default function ProductDetailPage() {
  const [activeTab, setActiveTab] = useState("info");

  const product = {
    name: "Gạc Phẫu Thuật An Lành (10cm x 10cm x 8 lớp)",
    price: 49000,
    oldPrice: 65000,
    unit: "Hộp",
    stock: 150,
    sku: "NV-1001",
    discount: 24,
    image: "https://placehold.co/800x800/f8fafc/64748b?text=Anh+San+Pham"
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white sticky top-0 z-40 border-b border-slate-100 px-4 py-4 flex items-center shadow-sm">
        <Link href="/" className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full flex items-center justify-center transition-colors active:scale-95">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-lg md:text-xl font-black text-slate-800 tracking-tight leading-none ml-3">
          Chi tiết sản phẩm
        </h1>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 pt-6 space-y-6">
        <div className="bg-white rounded-3xl shadow-xl flex flex-col md:flex-row overflow-hidden border border-slate-200">
          
          {/* Product Image Area */}
          <div className="w-full md:w-1/2 bg-slate-50 relative flex items-center justify-center p-8 md:p-16 border-b md:border-b-0 md:border-r border-slate-100 min-h-[400px]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
            {/* Interactive Icons */}
            <ProductInteractiveIcons 
              productName={product.name}
              className="top-6 right-6 md:top-8 md:right-8"
            />
            {product.discount && (
              <span className="absolute top-6 left-6 md:top-8 md:left-8 bg-red-500 text-white text-sm md:text-base font-black px-4 py-2 rounded-xl shadow-lg">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 flex flex-col p-6 md:p-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs md:text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                Còn {product.stock} {product.unit}
              </span>
              <span className="text-xs md:text-sm font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                SKU: {product.sku}
              </span>
              <span className="text-xs md:text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 flex items-center gap-1">
                <ShieldCheck size={16} /> Chính hãng 100%
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-slate-800 mb-6 leading-tight">
              {product.name}
            </h2>

            <div className="flex items-center gap-4 mb-8 text-sm md:text-base">
              <div className="flex items-center text-amber-400">
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current text-slate-200" />
                <span className="text-slate-500 ml-2 font-semibold">(128 đánh giá)</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
              <span className="text-slate-500 font-semibold">Đã bán 1.2k+</span>
            </div>
            
            <div className="flex items-end gap-6 mb-10 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100">
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-semibold text-slate-400 line-through mb-1">
                  {product.oldPrice.toLocaleString()} đ
                </span>
                <div className="text-5xl md:text-6xl font-black text-orange-600 tracking-tight">
                  {product.price.toLocaleString()}{" "}
                  <span className="text-xl md:text-2xl font-bold text-slate-500">
                    đ/{product.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-200 mb-8">
              <button 
                onClick={() => setActiveTab("info")}
                className={`pb-4 font-bold text-base md:text-lg transition-colors relative ${activeTab === "info" ? "text-blue-600" : "text-slate-500 hover:text-slate-800"}`}
              >
                Thông tin
                {activeTab === "info" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />}
              </button>
              <button 
                onClick={() => setActiveTab("usage")}
                className={`pb-4 font-bold text-base md:text-lg transition-colors relative ${activeTab === "usage" ? "text-blue-600" : "text-slate-500 hover:text-slate-800"}`}
              >
                Cách dùng
                {activeTab === "usage" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />}
              </button>
              <button 
                onClick={() => setActiveTab("shipping")}
                className={`pb-4 font-bold text-base md:text-lg transition-colors relative ${activeTab === "shipping" ? "text-blue-600" : "text-slate-500 hover:text-slate-800"}`}
              >
                Giao hàng
                {activeTab === "shipping" && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full" />}
              </button>
            </div>

            <div className="min-h-[160px] text-slate-600 text-base md:text-lg leading-relaxed mb-10">
              {activeTab === "info" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p>Sản phẩm <strong>{product.name}</strong> đạt chuẩn y tế chất lượng cao, an toàn tuyệt đối cho người sử dụng. Được sản xuất trên dây chuyền công nghệ hiện đại khép kín.</p>
                  <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-500">
                    <li>Thành phần tự nhiên, không gây kích ứng</li>
                    <li>Kiểm định lâm sàng khắt khe</li>
                    <li>Đóng gói vô trùng, hút chân không</li>
                  </ul>
                </div>
              )}
              {activeTab === "usage" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p>Sử dụng theo đúng chỉ định của bác sĩ hoặc chuyên gia y tế. Vui lòng đọc kỹ hướng dẫn trước khi sử dụng.</p>
                  <div className="bg-amber-50 text-amber-800 p-4 rounded-2xl border border-amber-100 font-medium flex gap-3">
                    <Clock size={24} className="shrink-0 text-amber-600" />
                    <span>Hạn sử dụng: 24 tháng kể từ ngày sản xuất. Bảo quản nơi khô ráo, thoáng mát.</span>
                  </div>
                </div>
              )}
              {activeTab === "shipping" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-start gap-4">
                    <Truck size={32} className="text-blue-500 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800 text-lg">Miễn phí giao hàng</p>
                      <p className="text-slate-500 mt-1">Cho mọi đơn hàng từ 500k toàn quốc. Thời gian nhận hàng dự kiến từ 1-3 ngày làm việc.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-5 rounded-2xl font-black text-xl transition-all active:scale-95 shadow-2xl shadow-orange-500/30">
              <ShoppingCart size={28} /> Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
