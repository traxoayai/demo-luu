"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import ProductInteractiveIcons from "../../components/shared/ProductInteractiveIcons";

export default function ProductDetailPage() {
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

      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8">
          
          {/* Product Image Area */}
          <div className="w-full md:w-1/2 aspect-square bg-slate-50 rounded-2xl relative flex items-center justify-center group overflow-hidden border border-slate-100 p-8">
            <img 
              src="https://placehold.co/400x400/e2e8f0/64748b?text=Product+Image" 
              alt="Product" 
              className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            />
            {/* Interactive Icons Component */}
            <ProductInteractiveIcons 
              productName="Sản phẩm Demo"
              className="top-4 right-4"
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="mb-2">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Còn hàng</span>
              <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded ml-2">SKU: NV-1001</span>
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2">Gạc Phẫu Thuật An Lành (10cm x 10cm x 8 lớp)</h2>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Sản phẩm đạt chuẩn y tế, độ thấm hút cao, an toàn cho mọi loại vết thương. Sản xuất trên dây chuyền công nghệ hiện đại.
            </p>
            
            <div className="flex items-end gap-3 mb-8">
              <span className="text-3xl font-black text-orange-600">49.000 đ</span>
              <span className="text-sm font-medium text-slate-400 line-through mb-1">65.000 đ</span>
            </div>

            <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-4 rounded-xl font-bold transition-all active:scale-95 shadow-md shadow-orange-500/30">
              <ShoppingCart size={20} /> Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
