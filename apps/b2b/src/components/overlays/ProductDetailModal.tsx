"use client";

import React, { useState } from "react";
import { X, ShoppingCart, Star, ShieldCheck, Truck, Clock } from "lucide-react";
import ProductInteractiveIcons from "../shared/ProductInteractiveIcons";

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

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (name: string) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
}: ProductDetailModalProps) {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:p-6 md:p-12">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl relative z-10 w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-0 md:zoom-in-95 duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-slate-100 transition-colors shadow-sm text-slate-600 active:scale-95"
        >
          <X size={24} />
        </button>

        {/* Product Image Area */}
        <div className="w-full md:w-1/2 bg-slate-50 relative flex items-center justify-center p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-100 shrink-0 min-h-[300px] md:min-h-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply drop-shadow-xl hover:scale-105 transition-transform duration-500"
          />
          <ProductInteractiveIcons
            productName={product.name}
            className="top-6 right-6 md:top-8 md:right-8"
          />
          {product.discount && (
            <span className="absolute top-6 left-6 md:top-8 md:left-8 bg-red-500 text-white text-sm font-black px-3 py-1.5 rounded-lg shadow-lg">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Product Info Area */}
        <div className="w-full md:w-1/2 flex flex-col bg-white overflow-y-auto">
          <div className="p-6 md:p-10 flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {product.stock !== undefined && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                  Còn {product.stock} {product.unit}
                </span>
              )}
              {product.sku && (
                <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                  SKU: {product.sku}
                </span>
              )}
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 flex items-center gap-1">
                <ShieldCheck size={14} /> Chính hãng 100%
              </span>
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-4 leading-tight">
              {product.name}
            </h2>

            <div className="flex items-center gap-4 mb-6 text-sm">
              <div className="flex items-center text-amber-400">
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current" />
                <Star size={16} className="fill-current text-slate-200" />
                <span className="text-slate-500 ml-2 font-medium">
                  (128 đánh giá)
                </span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-slate-500 font-medium">Đã bán 1.2k+</span>
            </div>

            <div className="flex items-end gap-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex flex-col">
                {product.oldPrice && (
                  <span className="text-sm md:text-base font-semibold text-slate-400 line-through mb-1">
                    {product.oldPrice.toLocaleString()} đ
                  </span>
                )}
                <div className="text-4xl md:text-5xl font-black text-orange-600 tracking-tight">
                  {product.price.toLocaleString()}{" "}
                  <span className="text-lg md:text-xl font-bold text-slate-500">
                    đ/{product.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-slate-200 mb-6">
              <button
                onClick={() => setActiveTab("info")}
                className={`pb-3 font-bold text-sm transition-colors relative ${activeTab === "info" ? "text-blue-600" : "text-slate-500 hover:text-slate-800"}`}
              >
                Thông tin
                {activeTab === "info" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("usage")}
                className={`pb-3 font-bold text-sm transition-colors relative ${activeTab === "usage" ? "text-blue-600" : "text-slate-500 hover:text-slate-800"}`}
              >
                Cách dùng
                {activeTab === "usage" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("shipping")}
                className={`pb-3 font-bold text-sm transition-colors relative ${activeTab === "shipping" ? "text-blue-600" : "text-slate-500 hover:text-slate-800"}`}
              >
                Giao hàng
                {activeTab === "shipping" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
                )}
              </button>
            </div>

            <div className="min-h-[120px] text-slate-600 text-sm leading-relaxed">
              {activeTab === "info" && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p>
                    Sản phẩm <strong>{product.name}</strong> đạt chuẩn y tế chất
                    lượng cao, an toàn tuyệt đối cho người sử dụng. Được sản
                    xuất trên dây chuyền công nghệ hiện đại khép kín.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mt-2 text-slate-500">
                    <li>Thành phần tự nhiên, không gây kích ứng</li>
                    <li>Kiểm định lâm sàng khắt khe</li>
                    <li>Đóng gói vô trùng, hút chân không</li>
                  </ul>
                </div>
              )}
              {activeTab === "usage" && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p>
                    Sử dụng theo đúng chỉ định của bác sĩ hoặc chuyên gia y tế.
                    Vui lòng đọc kỹ hướng dẫn trước khi sử dụng.
                  </p>
                  <div className="bg-amber-50 text-amber-800 p-3 rounded-xl border border-amber-100 text-xs font-medium flex gap-2">
                    <Clock size={16} className="shrink-0" />
                    <span>
                      Hạn sử dụng: 24 tháng kể từ ngày sản xuất. Bảo quản nơi
                      khô ráo, thoáng mát.
                    </span>
                  </div>
                </div>
              )}
              {activeTab === "shipping" && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-start gap-3">
                    <Truck className="text-blue-500 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-700">
                        Miễn phí giao hàng
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        Cho mọi đơn hàng từ 500k toàn quốc
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Footer CTA */}
          <div className="p-6 border-t border-slate-100 bg-white sticky bottom-0">
            <button
              onClick={() => {
                onAddToCart(product.name);
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-4 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-xl shadow-orange-500/20"
            >
              <ShoppingCart size={24} /> Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
