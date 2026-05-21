"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Building2,
  FileCheck,
  ShieldCheck,
  UserCircle,
  Phone,
  MessageCircle,
  Users,
  UserCog,
  Crown,
  MapPin,
  CreditCard,
  Bell,
  Settings,
  Lock,
  Smartphone,
  HelpCircle,
  Book,
  LogOut,
  ChevronRight,
  Camera,
  Star
} from "lucide-react";

export default function ProfilePage() {
  const [toast, setToast] = useState({ show: false, msg: "" });

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans text-slate-900">
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
          <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Trung tâm Điều khiển</h1>
        </div>
        <button onClick={() => showToast("Đăng xuất")} className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center transition-colors hover:bg-red-100 active:scale-95">
          <LogOut size={20} />
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-6">
        
        {/* User Hero Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative group cursor-pointer" onClick={() => showToast("Cập nhật Avatar")}>
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=HungLe" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white group-hover:scale-110 transition-transform">
              <Camera size={14} />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left z-10">
            <div className="inline-flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 shadow-sm shadow-yellow-500/30">
              <Crown size={12} /> Đại lý Vàng
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-1">Nhà Thuốc An Khang</h2>
            <p className="text-slate-500 font-medium text-sm md:text-base">Mã ĐD: NV-89230 • Dược sĩ: Lê Việt Hùng</p>
            
            <div className="mt-6 bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Mức xếp hạng hiện tại</p>
                <p className="text-sm font-black text-slate-800">42.500 / 50.000 <span className="text-xs font-medium text-slate-500">doanh số (tr)</span></p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 mb-1">Cần thêm 7.5tr để lên hạng</p>
                <div className="inline-flex items-center gap-1 text-orange-600 font-bold text-sm">
                  Kim Cương <ChevronRight size={16}/>
                </div>
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2.5 bg-slate-200 rounded-full mt-[-6px] overflow-hidden relative z-20 mx-4" style={{ width: 'calc(100% - 2rem)' }}>
              <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full w-[85%]"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Nhóm 1: Quản lý Hồ sơ & Pháp lý */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <h3 className="text-lg font-black text-slate-800">Hồ sơ & Pháp lý</h3>
            </div>
            
            <div className="space-y-2">
              <button onClick={() => showToast("Hồ sơ Nhà thuốc")} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group active:scale-[0.98]">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                  <Building2 size={18} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-slate-800">Hồ sơ Nhà thuốc / Pháp nhân</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Mã số thuế, Địa chỉ ĐKKD</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-600" />
              </button>
              
              <button onClick={() => showToast("Quản lý Giấy phép")} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group active:scale-[0.98]">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                  <FileCheck size={18} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-slate-800">Giấy phép GPP & ĐKKD</p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Đã duyệt (Hợp lệ)</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-600" />
              </button>
            </div>

            {/* Trình dược viên */}
            <div className="mt-6 bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
              <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Trình dược viên phụ trách</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=TDV" alt="TDV" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-800">Nguyễn Văn Tuấn</p>
                  <p className="text-[11px] font-medium text-slate-500">Khu vực Quận 1, TP.HCM</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => showToast("Đang gọi NV Tuấn")} className="w-9 h-9 bg-white text-blue-600 rounded-full shadow-sm flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors active:scale-95">
                    <Phone size={16} />
                  </button>
                  <button onClick={() => showToast("Chat với NV Tuấn")} className="w-9 h-9 bg-blue-600 text-white rounded-full shadow-sm flex items-center justify-center hover:bg-blue-700 transition-colors active:scale-95">
                    <MessageCircle size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Nhóm 2: Quản lý Nhân sự & Phân quyền */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
                <Users size={18} />
              </div>
              <h3 className="text-lg font-black text-slate-800">Nhân sự & Phân quyền</h3>
            </div>
            
            <div className="space-y-2">
              <button onClick={() => showToast("Quản lý Nhân viên quầy")} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group active:scale-[0.98]">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                  <UserCog size={18} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-slate-800">Nhân viên quầy (Sub-accounts)</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">3 tài khoản đang hoạt động</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-600" />
              </button>
            </div>
            
            <div className="mt-4 p-4 bg-orange-50 border border-orange-100 rounded-2xl">
              <p className="text-[13px] font-medium text-orange-800 leading-relaxed">
                <strong className="font-bold">Mẹo:</strong> Phân quyền nhân viên giúp bảo mật giá vốn và sổ công nợ. Nhân viên chỉ được xem giá bán lẻ và tạo giỏ hàng.
              </p>
            </div>
          </div>

          {/* Nhóm 3: Tài chính */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CreditCard size={18} />
              </div>
              <h3 className="text-lg font-black text-slate-800">Tài chính & Giao hàng</h3>
            </div>
            
            <div className="space-y-2">
              <button onClick={() => showToast("Đặc quyền Hạng")} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group active:scale-[0.98]">
                <div className="w-10 h-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                  <Star size={18} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-slate-800">Đặc quyền Hạng Vàng</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Xem chính sách chiết khấu sâu</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-600" />
              </button>
              
              <button onClick={() => showToast("Sổ địa chỉ")} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group active:scale-[0.98]">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                  <MapPin size={18} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-slate-800">Sổ địa chỉ giao hàng</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">2 địa chỉ (Nhà thuốc & Kho)</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-600" />
              </button>
              
              <button onClick={() => showToast("Tài khoản Ngân hàng")} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group active:scale-[0.98]">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                  <CreditCard size={18} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-slate-800">Tài khoản thanh toán & Đối soát</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Techcombank - ***6868</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-600" />
              </button>
            </div>
          </div>

          {/* Nhóm 4: Cài đặt */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center">
                <Settings size={18} />
              </div>
              <h3 className="text-lg font-black text-slate-800">Cài đặt & Hỗ trợ</h3>
            </div>
            
            <div className="space-y-2">
              <button onClick={() => showToast("Cài đặt Thông báo")} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group active:scale-[0.98]">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                  <Bell size={18} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-slate-800">Thông báo (Push Notifications)</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Đã bật cảnh báo Công nợ</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-600" />
              </button>
              
              <button onClick={() => showToast("Bảo mật & Thiết bị")} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group active:scale-[0.98]">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                  <Smartphone size={18} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-slate-800">Bảo mật & Quản lý thiết bị</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">2 thiết bị đang đăng nhập, Đổi Mật khẩu</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-600" />
              </button>
              
              <button onClick={() => showToast("Trung tâm hỗ trợ")} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group active:scale-[0.98]">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                  <HelpCircle size={18} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-bold text-slate-800">Trung tâm Hỗ trợ & Tài liệu</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">FAQ, Chính sách, Hợp đồng</p>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-600" />
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
