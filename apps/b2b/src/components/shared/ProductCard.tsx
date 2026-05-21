"use client";

import React from "react";
import { Plus } from "lucide-react";
import ProductInteractiveIcons from "./ProductInteractiveIcons";

interface Product {
  id: string | number;
  name: string;
  price: number;
  unit: string;
  image: string;
  oldPrice?: number;
  discount?: number;
  sku?: string;
  stock?: number;
}

interface ProductCardProps {
  product: Product;
  handleAddToCart: (name: string) => void;
  showToast: (msg: string) => void;
  layout?: "vertical" | "horizontal";
}

export default function ProductCard({
  product,
  handleAddToCart,
  showToast,
  layout = "vertical",
}: ProductCardProps) {
  if (layout === "horizontal") {
    // Layout ngang (dùng trong Top Nhập Nhiều - chính là "Có thể bạn Quan tâm" trên mobile)
    return (
      <div className="flex items-center gap-3 p-3 group hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 last:border-0 relative">
        <div className="w-14 h-14 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden shrink-0 p-1 relative">
          <img
            src={product.image}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
            alt={product.name}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-[13px] font-bold text-slate-800 line-clamp-1 mb-1 pr-14">
            {product.name}
          </h4>
          <div className="text-[14px] font-black text-orange-600">
            {product.price.toLocaleString()}{" "}
            <span className="text-[10px] font-medium text-slate-500">
              đ/{product.unit}
            </span>
          </div>
        </div>

        {/* Action Buttons Overlay (Horizontal) */}
        <ProductInteractiveIcons 
          productName={product.name}
          className="top-2 right-12 group"
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product.name);
          }}
          className="w-8 h-8 shrink-0 bg-slate-50 hover:bg-orange-500 text-slate-600 hover:text-white rounded-full flex items-center justify-center transition-all active:scale-75"
        >
          <Plus size={16} />
        </button>
      </div>
    );
  }

  // Layout dọc (dùng cho các lưới sản phẩm thông thường)
  return (
    <div className="bg-white rounded-2xl p-3 md:p-4 border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col group relative overflow-hidden">
      <ProductInteractiveIcons 
        productName={product.name}
        className="top-2 right-2"
      />

      {product.discount && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] md:text-xs font-black px-2 md:px-2.5 py-0.5 md:py-1 rounded-md shadow-sm z-10 group-hover:opacity-0 transition-opacity">
          -{product.discount}%
        </span>
      )}

      <div className="w-full aspect-square bg-slate-50 rounded-xl mb-3 flex items-center justify-center p-2 cursor-pointer relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {product.sku && (
        <div className="flex items-center justify-between mb-1 md:mb-2">
          <span className="text-[10px] md:text-xs font-mono text-slate-400 bg-slate-100 px-1 md:px-2 py-0.5 rounded">
            SKU: {product.sku}
          </span>
          {product.stock !== undefined && (
            <span className="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
              Còn {product.stock}
            </span>
          )}
        </div>
      )}

      <h4 className="text-xs md:text-sm font-bold text-slate-800 leading-snug line-clamp-2 mb-2 md:mb-3 flex-1 group-hover:text-blue-600 transition-colors cursor-pointer">
        {product.name}
      </h4>

      <div className="mt-auto pt-2 md:pt-3 border-t border-slate-100">
        {product.oldPrice && (
          <div className="text-[10px] md:text-xs text-slate-400 line-through mb-0.5 md:mb-1 font-medium">
            {product.oldPrice.toLocaleString()} đ
          </div>
        )}
        <div className="flex items-end justify-between">
          <div className="text-sm md:text-lg font-black text-slate-900 leading-none">
            {product.price.toLocaleString()}{" "}
            <span className="text-[9px] md:text-[10px] font-bold text-slate-500">
              đ/{product.unit}
            </span>
          </div>
          <button
            onClick={() => handleAddToCart(product.name)}
            className="w-7 h-7 md:w-8 md:h-8 bg-slate-100 hover:bg-slate-800 text-slate-600 hover:text-white rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0"
          >
            <Plus size={14} strokeWidth={2.5} className="md:w-4 md:h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
