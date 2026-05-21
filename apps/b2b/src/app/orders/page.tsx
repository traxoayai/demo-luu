"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  Package,
  Truck,
  RotateCcw,
  ShoppingCart,
  Calendar,
  Wallet,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText
} from "lucide-react";
import Link from "next/link";

// --- MOCK DATA ---
const ORDERS_MOCK = [
  {
    id: "#NV-10293",
    date: "20/05/2026",
    total: 12500000,
    shippingStatus: "Đang giao",
    paymentStatus: "Ghi nợ",
    itemsCount: 15,
  },
  {
    id: "#NV-10292",
    date: "18/05/2026",
    total: 5300000,
    shippingStatus: "Đã giao",
    paymentStatus: "Đã thanh toán",
    itemsCount: 8,
  },
  {
    id: "#NV-10285",
    date: "15/05/2026",
    total: 2150000,
    shippingStatus: "Chờ xác nhận",
    paymentStatus: "Chưa thanh toán",
    itemsCount: 3,
  },
  {
    id: "#NV-10270",
    date: "10/05/2026",
    total: 8900000,
    shippingStatus: "Đã giao",
    paymentStatus: "Ghi nợ",
    itemsCount: 12,
  },
];

export default function OrdersPage() {
  const [toast, setToast] = useState({ show: false, msg: "" });

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2000);
  };

  const getShippingBadge = (status: string) => {
    switch (status) {
      case "Đã giao":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Đang giao":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Chờ xác nhận":
        return "bg-amber-100 text-amber-700 border-amber-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getShippingIcon = (status: string) => {
    switch (status) {
      case "Đã giao":
        return <CheckCircle2 size={14} className="mr-1" />;
      case "Đang giao":
        return <Truck size={14} className="mr-1" />;
      case "Chờ xác nhận":
        return <Clock size={14} className="mr-1" />;
      default:
        return <Package size={14} className="mr-1" />;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "Đã thanh toán":
        return "text-emerald-600 bg-emerald-50";
      case "Ghi nợ":
        return "text-orange-600 bg-orange-50";
      case "Chưa thanh toán":
        return "text-red-600 bg-red-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-900">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-4">
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <header className="bg-white sticky top-0 z-40 border-b border-slate-100 px-4 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full flex items-center justify-center transition-colors active:scale-95">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Quản lý Đơn hàng</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => showToast("Mở bộ lọc")} className="w-10 h-10 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center transition-colors hover:bg-slate-100 active:scale-95">
            <Filter size={20} />
          </button>
          <button onClick={() => showToast("Mở tìm kiếm")} className="w-10 h-10 bg-slate-50 text-slate-600 rounded-full flex items-center justify-center transition-colors hover:bg-slate-100 active:scale-95">
            <Search size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pt-6">
        {/* Tabs giả lập */}
        <div className="flex overflow-x-auto gap-2 mb-6 no-scrollbar pb-2">
          {["Tất cả", "Chờ xác nhận", "Đang giao", "Đã giao", "Đã hủy"].map((tab, idx) => (
            <button
              key={tab}
              onClick={() => showToast(`Lọc: ${tab}`)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all active:scale-95 border ${
                idx === 0
                  ? "bg-slate-800 text-white border-slate-800 shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Order List */}
        <div className="space-y-4">
          {ORDERS_MOCK.map((order) => (
            <div key={order.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-black text-slate-800">{order.id}</span>
                    <span className={`flex items-center px-2 py-0.5 rounded-md text-xs font-bold border ${getShippingBadge(order.shippingStatus)}`}>
                      {getShippingIcon(order.shippingStatus)}
                      {order.shippingStatus}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1"><Calendar size={14}/> {order.date}</span>
                    <span className="flex items-center gap-1"><Package size={14}/> {order.itemsCount} sản phẩm</span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-5 gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Tổng tiền</p>
                  <p className="text-xl md:text-2xl font-black text-orange-600 leading-none">{order.total.toLocaleString()} đ</p>
                </div>
                <div className="flex items-center gap-2">
                  <Wallet size={16} className="text-slate-400" />
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getPaymentBadge(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                <button
                  onClick={() => showToast(`Đang theo dõi: ${order.id}`)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
                >
                  <Truck size={16} /> Theo dõi vận đơn
                </button>
                <button
                  onClick={() => showToast(`Xem Hóa Đơn VAT cho: ${order.id}`)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95"
                >
                  <FileText size={16} /> Xem Hóa Đơn VAT
                </button>
                <button
                  onClick={() => showToast(`Yêu cầu đổi trả cho: ${order.id}`)}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 border border-slate-200"
                >
                  <RotateCcw size={16} /> Đổi/Trả
                </button>
                <button
                  onClick={() => showToast(`Đã thêm ${order.id} vào giỏ hàng`)}
                  className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-md shadow-orange-500/30 md:ml-auto mt-2 md:mt-0"
                >
                  <ShoppingCart size={16} /> Mua lại
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
