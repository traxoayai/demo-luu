"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  ShoppingCart,
  Zap,
  Menu,
  ChevronRight,
  PhoneCall,
  DownloadCloud,
  ChevronDown,
  Gift,
  Users,
  BookOpen,
  History,
  FileText,
} from "lucide-react";

interface Category {
  id: number;
  name: string;
  icon: React.ElementType;
  color: string;
  bg: string;
}

interface DesktopHeaderProps {
  isScrolled: boolean;
  cartCount: number;
  isMegaMenuOpen: boolean;
  setIsMegaMenuOpen: (isOpen: boolean) => void;
  CATEGORIES: Category[];
}

export default function DesktopHeader({
  isScrolled,
  cartCount,
  isMegaMenuOpen,
  setIsMegaMenuOpen,
  CATEGORIES,
}: DesktopHeaderProps) {
  return (
    <header className="w-full flex flex-col bg-white sticky top-0 z-50 shadow-sm border-b border-slate-200">
      <div
        className={`bg-slate-100 flex items-center justify-between px-8 text-[11px] font-medium text-slate-600 overflow-hidden transition-all duration-300 ease-in-out ${isScrolled ? "h-0 opacity-0" : "h-8 opacity-100"}`}
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 hover:text-orange-600 cursor-pointer">
            <PhoneCall size={12} /> Hotline: 1900 6669
          </span>
          <span className="flex items-center gap-1 hover:text-orange-600 cursor-pointer">
            <DownloadCloud size={12} /> Tải ứng dụng B2B
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-orange-600 cursor-pointer">
            Quy định Tích điểm
          </span>
          <span className="hover:text-orange-600 cursor-pointer">
            Chính sách Bán Hàng
          </span>
          <span className="hover:text-orange-600 cursor-pointer">
            Chính sách vận chuyển
          </span>
          <span className="hover:text-orange-600 cursor-pointer">
            Hướng dẫn Sử dụng
          </span>
          <div className="w-px h-3 bg-slate-300"></div>
          <span className="flex items-center gap-1 font-bold text-slate-800 cursor-pointer">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=HungLe"
              className="w-4 h-4 rounded-full bg-slate-200"
              alt="Ava"
            />
            Lê Việt Hùng (Nhà Thuốc An Khang)
          </span>
        </div>
      </div>

      <div className="h-20 px-8 flex items-center justify-between gap-8">
        <div className="flex items-center gap-2 cursor-pointer shrink-0 group">
          <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:rotate-[360deg] transition-transform duration-700 bg-white overflow-hidden border-2 border-slate-100">
            <img
              src="/logo.png"
              alt="Logo Nam Viet"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-2xl tracking-tight leading-none text-slate-800">
              NAM VIỆT
            </span>
            <span className="text-[10px] font-bold text-orange-600 tracking-widest uppercase">
              Pharma B2B
            </span>
          </div>
        </div>

        <div className="flex-1 max-w-3xl relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Tìm kiếm hơn 10.000 sản phẩm theo tên, hoạt chất, bệnh ..."
            className="w-full h-12 pl-12 pr-24 bg-slate-50 border-2 border-slate-100 focus:border-orange-500 focus:bg-white rounded-xl text-sm font-medium outline-none transition-all placeholder:text-slate-400"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors">
            Tìm kiếm
          </button>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <Link
            href="/quick-order"
            className="flex flex-col items-center gap-1 cursor-pointer text-slate-600 hover:text-orange-600 transition-colors group"
          >
            <div className="relative">
              <Zap
                size={22}
                className="group-hover:fill-orange-100 transition-colors"
              />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Đặt thần tốc
            </span>
          </Link>

          <Link href="/orders" className="flex flex-col items-center gap-1 cursor-pointer text-slate-600 hover:text-orange-600 transition-colors">
            <FileText size={22} />
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Đơn hàng
            </span>
          </Link>

          <div className="flex flex-col items-center gap-1 cursor-pointer text-slate-600 hover:text-orange-600 transition-colors relative">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Thông báo
            </span>
          </div>
          <Link
            href="/cart"
            className="flex flex-col items-center gap-1 cursor-pointer text-slate-600 hover:text-orange-600 transition-colors relative"
          >
            <div className="relative">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider mt-1">
              Giỏ hàng
            </span>
          </Link>
        </div>
      </div>

      <div className="h-12 bg-white flex items-center px-8 gap-6 relative border-t border-slate-100">
        <div
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
          className="h-full flex items-center"
        >
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white h-9 px-4 rounded-lg font-bold text-sm transition-colors">
            <Menu size={18} /> Danh Mục Sản Phẩm <ChevronDown size={14} />
          </button>

          {isMegaMenuOpen && (
            <div className="absolute top-12 left-8 w-[800px] bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden flex z-50 animate-in slide-in-from-top-2 duration-200">
              <div className="w-1/3 bg-slate-50 border-r border-slate-100 p-2">
                {CATEGORIES.slice(0, 6).map((cat, idx) => (
                  <div
                    key={cat.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${idx === 0 ? "bg-white text-orange-600 shadow-sm font-bold" : "text-slate-600 hover:bg-slate-100 font-medium"}`}
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <cat.icon
                        size={16}
                        className={
                          idx === 0 ? "text-orange-500" : "text-slate-400"
                        }
                      />{" "}
                      {cat.name}
                    </div>
                    <ChevronRight
                      size={14}
                      className={
                        idx === 0 ? "text-orange-500" : "text-slate-300"
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="w-2/3 p-6 grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <h4 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">
                    Hô hấp
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li className="hover:text-orange-600 cursor-pointer">
                      Thuốc ho & Long đờm
                    </li>
                    <li className="hover:text-orange-600 cursor-pointer">
                      Thuốc giãn phế quản
                    </li>
                    <li className="hover:text-orange-600 cursor-pointer">
                      Xịt mũi, nhỏ mũi
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-3 border-b border-slate-100 pb-2">
                    Cảm cúm & Dị ứng
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-500">
                    <li className="hover:text-orange-600 cursor-pointer">
                      Giảm đau, hạ sốt
                    </li>
                    <li className="hover:text-orange-600 cursor-pointer">
                      Kháng Histamin
                    </li>
                    <li className="hover:text-orange-600 cursor-pointer">
                      Thuốc nhỏ mắt dị ứng
                    </li>
                  </ul>
                </div>
                <div className="col-span-2 mt-4 bg-orange-50 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-orange-100 transition-colors border border-orange-100">
                  <div>
                    <p className="text-orange-800 font-bold text-sm mb-1">
                      Mùa lạnh đến rồi!
                    </p>
                    <p className="text-orange-600 text-xs">
                      Nhập sỉ Combo Hô Hấp giảm ngay 5%
                    </p>
                  </div>
                  <img
                    src="https://placehold.co/60x60/ffffff/f97316?text=Promo"
                    className="rounded mix-blend-multiply"
                    alt="Promo"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <nav className="flex gap-6 text-sm font-bold text-slate-600">
          <Link
            href="/quick-order"
            className="hover:text-orange-600 cursor-pointer flex items-center gap-1"
          >
            <Zap size={16} className="text-orange-500" /> Đặt hàng nhanh
          </Link>
          <span className="hover:text-orange-600 cursor-pointer flex items-center gap-1">
            <History size={16} className="text-orange-500" /> Tạo đơn Tự động
            (Lịch sử)
          </span>
          <span className="hover:text-orange-600 cursor-pointer flex items-center gap-1">
            <Gift size={16} className="text-red-500" /> Khuyến mãi
          </span>
          <span className="hover:text-orange-600 cursor-pointer">
            Sản phẩm mới
          </span>
          <Link
            href="/community"
            className="hover:text-orange-600 cursor-pointer flex items-center gap-1"
          >
            <Users size={16} className="text-blue-500" /> Giao lưu & Kết nối
          </Link>
          <span className="hover:text-orange-600 cursor-pointer flex items-center gap-1">
            <BookOpen size={16} className="text-emerald-500" /> Khóa học & Kiến
            thức
          </span>
        </nav>
      </div>
    </header>
  );
}
