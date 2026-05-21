"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  Wallet,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Download,
  Calendar,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

// --- MOCK DATA ---
const DEBT_TRANSACTIONS = [
  {
    id: "TXN-001",
    date: "20/05/2026",
    description: "Mua đơn hàng #NV-10293",
    type: "debit", // phát sinh
    amount: 12500000,
    balance: 52500000,
  },
  {
    id: "TXN-002",
    date: "19/05/2026",
    description: "Thanh toán CK Vietcombank",
    type: "credit", // thanh toán
    amount: 15000000,
    balance: 40000000,
  },
  {
    id: "TXN-003",
    date: "15/05/2026",
    description: "Mua đơn hàng #NV-10285",
    type: "debit",
    amount: 2150000,
    balance: 55000000,
  },
  {
    id: "TXN-004",
    date: "10/05/2026",
    description: "Mua đơn hàng #NV-10270",
    type: "debit",
    amount: 8900000,
    balance: 52850000,
  },
  {
    id: "TXN-005",
    date: "05/05/2026",
    description: "Chuyển khoản thanh toán kỳ trước",
    type: "credit",
    amount: 43950000,
    balance: 43950000,
  },
];

export default function DebtPage() {
  const [toast, setToast] = useState({ show: false, msg: "" });

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2000);
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
      <header className="bg-slate-900 sticky top-0 z-40 px-4 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors active:scale-95">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-xl md:text-2xl font-black tracking-tight">Sổ Công Nợ</h1>
        </div>
        <button onClick={() => showToast("Đang tải báo cáo...")} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors active:scale-95">
          <Download size={20} />
        </button>
      </header>

      {/* Hero Section - Tài chính */}
      <div className="bg-slate-900 px-4 pb-12 pt-6 rounded-b-[2.5rem] shadow-xl relative z-30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 shadow-2xl relative overflow-hidden border border-slate-100">
            {/* Background decoration */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-orange-50 rounded-full blur-3xl"></div>
            
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 mb-2 relative z-10">
              <Wallet size={16} className="text-orange-500" /> Tổng dư nợ hiện tại
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-6 relative z-10">
              52.500.000 <span className="text-xl text-slate-500 font-semibold">đ</span>
            </h2>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 relative z-10">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1">Hạn mức cho phép</p>
                <p className="text-lg font-black text-slate-800">100 Tr</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1">
                  Hạn thanh toán tới <AlertTriangle size={12} className="text-amber-500"/>
                </p>
                <p className="text-lg font-black text-red-600">05/06/2026</p>
              </div>
            </div>

            <button
              onClick={() => showToast("Chuyển đến màn hình Thanh toán")}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black text-lg py-4 rounded-2xl shadow-lg shadow-orange-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 relative z-10 group"
            >
              Thanh toán nợ ngay <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Table */}
      <main className="max-w-4xl mx-auto px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-black text-slate-800">Sổ cái dòng tiền</h3>
          <button onClick={() => showToast("Lọc thời gian")} className="text-sm font-bold text-blue-600 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg active:scale-95 transition-transform">
            <Calendar size={14} /> Tháng này
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <th className="p-4 font-bold">Ngày</th>
                  <th className="p-4 font-bold">Diễn giải</th>
                  <th className="p-4 font-bold text-right">Phát sinh</th>
                  <th className="p-4 font-bold text-right">Thanh toán</th>
                  <th className="p-4 font-bold text-right">Dư nợ cuối</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {DEBT_TRANSACTIONS.map((txn, idx) => (
                  <tr key={txn.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-600 whitespace-nowrap">{txn.date}</td>
                    <td className="p-4 font-bold text-slate-800">
                      <div className="flex items-center gap-2">
                        {txn.type === 'debit' ? (
                          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                            <TrendingUp size={12} className="text-red-600" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                            <TrendingDown size={12} className="text-emerald-600" />
                          </div>
                        )}
                        <span className="line-clamp-1">{txn.description}</span>
                      </div>
                    </td>
                    <td className="p-4 text-right font-black text-red-600 whitespace-nowrap">
                      {txn.type === 'debit' ? `+ ${txn.amount.toLocaleString()}` : "-"}
                    </td>
                    <td className="p-4 text-right font-black text-emerald-600 whitespace-nowrap">
                      {txn.type === 'credit' ? `+ ${txn.amount.toLocaleString()}` : "-"}
                    </td>
                    <td className="p-4 text-right font-black text-slate-900 whitespace-nowrap">
                      {txn.balance.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
