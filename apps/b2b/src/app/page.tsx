"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  ShoppingCart,
  Grid,
  User,
  Zap,
  ChevronRight,
  Plus,
  Heart,
  TrendingUp,
  Activity,
  ShieldPlus,
  Pill,
  CheckCircle2,
  Wallet,
  Sun,
  ScanBarcode,
  FileText,
  Bot,
  X,
  Star,
  Gift,
  Users,
  BookOpen,
  Package,
  History,
  Clock,
} from "lucide-react";
import Link from "next/link";
import ChatbotSheet from "../components/overlays/ChatbotSheet";
import DesktopHeader from "../components/layout/DesktopHeader";
import MobileBottomNav from "../components/layout/MobileBottomNav";
import ProductCard from "../components/shared/ProductCard";

// --- MOCK DATA ---
const BANNERS = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
    tag: "Chương trình Tích Lũy Quý 2",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=2079&auto=format&fit=crop",
    tag: "Độc Quyền Phân Phối",
  },
];

const CATEGORIES = [
  {
    id: 1,
    name: "Hô hấp & Cảm cúm",
    icon: Activity,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    id: 2,
    name: "Kháng sinh",
    icon: Pill,
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
  {
    id: 3,
    name: "Giảm đau, Hạ sốt",
    icon: ShieldPlus,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
  {
    id: 4,
    name: "Vitamin & Khoáng",
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    id: 5,
    name: "Tiêu hóa",
    icon: ScanBarcode,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    id: 6,
    name: "Da liễu",
    icon: Star,
    color: "text-pink-500",
    bg: "bg-pink-50",
  },
  {
    id: 7,
    name: "Mẹ & Bé",
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    id: 8,
    name: "Thiết bị y tế",
    icon: FileText,
    color: "text-teal-500",
    bg: "bg-teal-50",
  },
];

const FLASH_SALE = [
  {
    id: "FS1",
    name: "Cao dán Salonpas Hisamitsu (10h x 20 miếng)",
    sku: "842",
    price: 227700,
    oldPrice: 253000,
    stock: 6,
    discount: 10,
    image:
      "https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202509/dau-gio-phat-linh-5ml-thumb-638924930249897112-600x600013023.jpg",
  },
  {
    id: "FS2",
    name: "Lincomycin 500mg TW1 (10 vỉ x 10v)",
    sku: "SP105",
    price: 133509,
    oldPrice: 150000,
    stock: 72,
    discount: 11,
    image:
      "https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202605/dau-gio-xanh-con-o-3ml-thumb135416.jpg",
  },
  {
    id: "FS3",
    name: "Panadol Extra Đỏ (Hộp 15 vỉ x 10 viên)",
    sku: "PN123",
    price: 185000,
    oldPrice: 200000,
    stock: 500,
    discount: 7,
    image:
      "https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202510/panadol-extra-new-h-180v-thumb-638938066993898228-600x600102856.jpg",
  },
  {
    id: "FS4",
    name: "Siro Ho Astex (Chai 90ml)",
    sku: "AT09",
    price: 45000,
    oldPrice: 50000,
    stock: 15,
    discount: 10,
    image:
      "https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/10245/327225/cao-dan-salonsip-gel-patch-hop-8-bao-3-mieng-thumb-638792755913157852-600x600.jpg",
  },
  {
    id: "FS5",
    name: "Berocca Performance Tuýp 10 viên",
    sku: "BR01",
    price: 85000,
    oldPrice: 90000,
    stock: 30,
    discount: 5,
    image:
      "https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/Products/Images/9921/218987/dau-gio-nau-pharmedic-3ml-thumb01-600x600.jpg",
  },
];

const TOP_PRODUCTS = [
  {
    id: "T1",
    name: "Vitamin PP 500mg Pharbaco (10 vỉ)",
    price: 635100,
    unit: "Hộp",
    image:
      "https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdn.tgdd.vn/Products/Images/11298/278991/may-huyet-ap-dien-tu-do-bap-tay-jumper-jpd-ha300-thumb-1-1-600x600.jpg",
  },
  {
    id: "T2",
    name: "Tiffy Dey (25 vỉ * 4v) Thai Nakorn",
    price: 110400,
    unit: "Hộp",
    image:
      "https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/6562/334734/kem-duong-cho-da-ton-thuong-bioderma-cicabio-creme-tuyp-40ml-thumb01-638767885312580919-600x600.jpg",
  },
  {
    id: "T3",
    name: "Cephalexin 500mg (10 vỉ x 10v)",
    price: 123970,
    unit: "Hộp",
    image:
      "https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/11478/332088/vien-uong-bo-sung-canxi-spring-leaf-liquid-calcium-plus-vitamin-d3-lo-60v-new-thumb-638676076243786141-600x600.jpg",
  },
  {
    id: "T4",
    name: "Berocca Performance Tuýp 10 viên",
    price: 85000,
    unit: "Tuýp",
    image:
      "https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/mwg-static/ankhang/Products/Images/4585/215632/yen-song-yen-isomalt-hop-6-lo-70ml-thumb-638712576685851030-600x600.jpg",
  },
  {
    id: "T5",
    name: "Paracetamol 500mg",
    price: 35000,
    unit: "Hộp",
    image:
      "https://img.tgdd.vn/imgt/ankhang/f_webp,fit_outside,quality_95/https://cdnv2.tgdd.vn/pim/cdn/images/202511/dau-ca-costar-omega-3-duong-chat-cho-mat-thumb-1-600x600105633.jpg",
  },
];

export default function B2BStorefront() {
  const [activeTab, setActiveTab] = useState("home");
  const [cartCount, setCartCount] = useState(12);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBotMessage, setShowBotMessage] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showDebtPopup, setShowDebtPopup] = useState(false);
  const [showRevenuePopup, setShowRevenuePopup] = useState(false);
  const [showVouchersPopup, setShowVouchersPopup] = useState(false);

  // Auto-slide banner
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // AI message popup
    const botTimer = setTimeout(() => {
      setShowBotMessage(true);
      setTimeout(() => setShowBotMessage(false), 8000);
    }, 1500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(botTimer);
    };
  }, []);

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 2000);
  };

  const toggleFabMenu = () => {
    setIsFabOpen(!isFabOpen);
  };

  const handleAddToCart = (productName: string) => {
    setCartCount((prev) => prev + 1);
    showToast(`Đã thêm ${productName} vào giỏ!`);
  };

  return (
    <div className="font-sans text-slate-900 bg-slate-50 min-h-screen overflow-x-hidden pb-24 md:pb-0 relative">
      {/* =========================================
          MOBILE ONLY UI (HIDDEN ON MD)
      ========================================= */}
      <div className="md:hidden flex flex-col min-h-screen">
        {/* FLOATING SEARCH BAR */}
        <div className="fixed top-6 left-4 z-[48]">
          <button
            onClick={() => showToast("Mở tìm kiếm")}
            className="flex items-center gap-2 bg-black/30 backdrop-blur-md border border-white/20 text-white pl-3 pr-4 py-2.5 rounded-full shadow-lg active:scale-95 transition-transform"
          >
            <Search size={18} strokeWidth={2.5} />
            <span className="text-sm font-medium opacity-90">Tìm kiếm...</span>
          </button>
        </div>

        {/* NOTIFICATION BELL */}
        <div className="fixed top-6 right-4 z-[48]">
          <button
            onClick={() => showToast("Mở thông báo")}
            className="w-10 h-10 bg-black/30 backdrop-blur-md border border-white/20 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform relative"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-transparent"></span>
          </button>
        </div>

        {/* MOBILE MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto w-full">
          {/* COVER BANNER */}
          <div className="relative w-full h-[280px] bg-slate-800">
            {BANNERS.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentBanner ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-slate-900/90 z-10"></div>
                <img
                  src={banner.img}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {/* Dots Banner */}
            <div className="absolute bottom-16 left-4 flex gap-1.5 z-20">
              {BANNERS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${idx === currentBanner ? "w-4 bg-orange-500" : "w-1.5 bg-white/40"}`}
                ></div>
              ))}
            </div>
          </div>

          {/* THẺ TÀI CHÍNH */}
          <div className="px-4 relative z-30 -mt-10 mb-6">
            <div className="bg-slate-900 rounded-3xl p-5 text-white shadow-2xl shadow-slate-900/30 border border-slate-700/50 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -mr-10 -mt-10 blur-xl pointer-events-none"></div>

              <div className="flex justify-between items-start mb-5 relative z-10">
                <div>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-0.5 flex items-center gap-1.5">
                    <Wallet size={12} className="text-orange-400" /> Điểm Tích
                    Lũy
                  </p>
                  <h2 className="text-[28px] font-black tracking-tight leading-none mt-1">
                    5000
                    <span className="text-base text-slate-400 ml-1 font-semibold">
                      điểm
                    </span>
                  </h2>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-700/50 relative z-10 bg-slate-800/30 -mx-5 -mb-5 px-5 pb-5 mt-2 rounded-b-3xl">
                <div
                  className="flex-1 cursor-pointer group"
                  onClick={() => setShowDebtPopup(true)}
                >
                  <p className="text-[11px] text-slate-400 mb-1">Công nợ</p>
                  <p className="text-base font-black text-white leading-none">5 triệu</p>
                </div>
                <div className="w-px h-10 bg-slate-700 mt-1"></div>
                <div
                  className="flex-1 cursor-pointer group"
                  onClick={() => setShowVouchersPopup(true)}
                >
                  <p className="text-[11px] text-slate-400 mb-1">Vouchers</p>
                  <p className="text-base font-black text-emerald-400 leading-none">
                    12 mã
                  </p>
                </div>
                <div className="w-px h-10 bg-slate-700 mt-1"></div>
                <div
                  className="flex-1 cursor-pointer group"
                  onClick={() => setShowRevenuePopup(true)}
                >
                  <p className="text-[11px] text-slate-400 mb-1">Doanh thu</p>
                  <p className="text-base font-black text-orange-400 leading-none">85 tr</p>
                </div>
              </div>
            </div>
          </div>

          {/* DANH MỤC NHANH */}
          <div className="mb-6 mt-4">
            <div className="px-4 flex justify-between items-center mb-3">
              <h3 className="font-bold text-slate-800 text-lg">
                Danh mục tại Dược Nam Việt
              </h3>
              <button className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center active:scale-95 transition-transform">
                Xem tất cả <ChevronRight size={14} />
              </button>
            </div>
            <div className="flex overflow-x-auto gap-3 px-4 pb-2 no-scrollbar">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => showToast(`Mở: ${cat.name}`)}
                  className="flex flex-col items-center gap-2 w-[72px] shrink-0 cursor-pointer group"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-200 group-hover:-translate-y-1 group-active:scale-90 ${cat.bg}`}
                  >
                    <cat.icon className={cat.color} size={24} strokeWidth={2} />
                  </div>
                  <span className="text-[10px] text-slate-600 font-semibold text-center leading-tight">
                    {cat.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* FLASH SALE */}
          <div className="bg-orange-50/50 py-6 border-y border-orange-100 mb-6">
            <div className="px-4 flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-br from-orange-400 to-red-500 p-1.5 rounded-lg text-white animate-pulse shadow-sm shadow-orange-200">
                  <Zap size={18} fill="currentColor" />
                </div>
                <h3 className="font-black text-slate-800 text-xl italic">
                  Giờ Vàng Giá Tốt
                </h3>
              </div>
              <button className="text-xs font-bold text-orange-600 flex items-center active:scale-95 transition-transform">
                Xem thêm <ChevronRight size={14} />
              </button>
            </div>

            <div className="flex overflow-x-auto gap-4 px-4 pb-4 no-scrollbar">
              {FLASH_SALE.map((item) => (
                <div
                  key={item.id}
                  className="w-[220px] shrink-0 bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex flex-col group"
                >
                  <div className="relative w-full h-28 bg-slate-50 rounded-xl mb-3 flex items-center justify-center p-2 cursor-pointer overflow-hidden">
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm z-10">
                      -{item.discount}%
                    </span>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-slate-400">
                      SKU: {item.sku}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                      Còn {item.stock}
                    </span>
                  </div>
                  <h4 className="text-[13px] font-bold text-slate-800 leading-snug line-clamp-2 mb-2 flex-1 cursor-pointer">
                    {item.name}
                  </h4>
                  <div className="flex items-end justify-between mt-auto pt-2 border-t border-slate-100">
                    <div>
                      <div className="text-[10px] text-slate-400 line-through mb-0.5">
                        {item.oldPrice.toLocaleString()} đ
                      </div>
                      <div className="text-base font-black text-orange-600 leading-none">
                        {item.price.toLocaleString()}{" "}
                        <span className="text-[11px] font-bold text-slate-500">
                          đ/hộp
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item.name)}
                      className="w-8 h-8 bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white rounded-full flex items-center justify-center transition-all active:scale-75 shadow-sm"
                    >
                      <Plus size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TOP SẢN PHẨM */}
          <div className="px-4 pb-10">
            <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-500" /> Có thể bạn sẽ cần
            </h3>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {TOP_PRODUCTS.slice(0, 3).map((prod, idx) => (
                <div
                  key={prod.id}
                  className={`flex items-center gap-3 p-3 group hover:bg-slate-50 transition-colors cursor-pointer ${idx !== 2 ? "border-b border-slate-100" : ""}`}
                >
                  <div className="w-14 h-14 bg-slate-50 rounded-xl border border-slate-100 overflow-hidden shrink-0 p-1">
                    <img
                      src={prod.image}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                      alt={prod.name}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[13px] font-bold text-slate-800 line-clamp-1 mb-1">
                      {prod.name}
                    </h4>
                    <div className="text-[14px] font-black text-orange-600">
                      {prod.price.toLocaleString()}{" "}
                      <span className="text-[10px] font-medium text-slate-500">
                        đ/{prod.unit}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(prod.name);
                    }}
                    className="w-8 h-8 shrink-0 bg-slate-50 hover:bg-orange-500 text-slate-600 hover:text-white rounded-full flex items-center justify-center transition-all active:scale-75"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SẢN PHẨM THEO MÙA (MOBILE) */}
          <div className="px-4 pb-10">
            <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
              <Sun size={20} className="text-amber-500" /> Sản phẩm theo Mùa
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {TOP_PRODUCTS.map((prod) => (
                <div
                  key={`m-season-${prod.id}`}
                  className="bg-white rounded-2xl p-3 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all flex flex-col group"
                >
                  <div className="w-full aspect-square bg-slate-50 rounded-xl mb-3 flex items-center justify-center p-2 cursor-pointer overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2 mb-2 flex-1 cursor-pointer">
                    {prod.name}
                  </h4>

                  <div className="flex items-end justify-between mt-auto pt-2 border-t border-slate-100">
                    <div className="text-sm font-black text-slate-900 leading-none">
                      {prod.price.toLocaleString()}{" "}
                      <span className="text-[9px] font-bold text-slate-500">
                        đ/{prod.unit}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(prod.name)}
                      className="w-7 h-7 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0"
                    >
                      <Plus size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NHÀ THUỐC NÀO CŨNG CẦN (MOBILE) */}
          <div className="px-4 pb-10">
            <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
              <Pill size={20} className="text-emerald-500" /> Nhà thuốc nào cũng
              cần
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {TOP_PRODUCTS.map((prod) => (
                <div
                  key={`m-pharmacy-${prod.id}`}
                  className="bg-white rounded-2xl p-3 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all flex flex-col group"
                >
                  <div className="w-full aspect-square bg-slate-50 rounded-xl mb-3 flex items-center justify-center p-2 cursor-pointer overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2 mb-2 flex-1 cursor-pointer">
                    {prod.name}
                  </h4>

                  <div className="flex items-end justify-between mt-auto pt-2 border-t border-slate-100">
                    <div className="text-sm font-black text-slate-900 leading-none">
                      {prod.price.toLocaleString()}{" "}
                      <span className="text-[9px] font-bold text-slate-500">
                        đ/{prod.unit}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(prod.name)}
                      className="w-7 h-7 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0"
                    >
                      <Plus size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BÁC SĨ NÀO CŨNG CẦN (MOBILE) */}
          <div className="px-4 pb-10">
            <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
              <ShieldPlus size={20} className="text-blue-500" /> Bác Sĩ nào cũng
              cần
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {TOP_PRODUCTS.map((prod) => (
                <div
                  key={`m-doctor-${prod.id}`}
                  className="bg-white rounded-2xl p-3 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all flex flex-col group"
                >
                  <div className="w-full aspect-square bg-slate-50 rounded-xl mb-3 flex items-center justify-center p-2 cursor-pointer overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2 mb-2 flex-1 cursor-pointer">
                    {prod.name}
                  </h4>

                  <div className="flex items-end justify-between mt-auto pt-2 border-t border-slate-100">
                    <div className="text-sm font-black text-slate-900 leading-none">
                      {prod.price.toLocaleString()}{" "}
                      <span className="text-[9px] font-bold text-slate-500">
                        đ/{prod.unit}
                      </span>
                    </div>
                    <button
                      onClick={() => handleAddToCart(prod.name)}
                      className="w-7 h-7 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0"
                    >
                      <Plus size={14} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <MobileBottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cartCount={cartCount}
          isFabOpen={isFabOpen}
          toggleFabMenu={toggleFabMenu}
        />
      </div>

      {/* =========================================
          DESKTOP ONLY UI (HIDDEN ON MOBILE)
      ========================================= */}
      <div className="hidden md:flex flex-col h-screen">
        {/* E-COMMERCE HEADER */}
        <DesktopHeader
          isScrolled={isScrolled}
          cartCount={cartCount}
          isMegaMenuOpen={isMegaMenuOpen}
          setIsMegaMenuOpen={setIsMegaMenuOpen}
          CATEGORIES={CATEGORIES}
        />

        {/* DESKTOP MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto custom-scrollbar relative pb-10">
          {/* HERO BANNER & FINANCIAL RIBBON */}
          <div className="relative">
            <div className="relative w-full h-[320px] lg:h-[400px] bg-slate-900">
              {BANNERS.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentBanner ? "opacity-100" : "opacity-0"}`}
                >
                  <img
                    src={banner.img}
                    alt="Banner"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
              ))}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] lg:w-[90%] max-w-6xl z-20">
              <div className="bg-white/80 backdrop-blur-xl border border-white rounded-2xl shadow-xl shadow-slate-900/10 p-5 lg:p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4 md:border-r border-slate-300/50 pr-8 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                      Điểm Tích Lũy chưa Sử Dụng
                    </p>
                    <h2 className="text-2xl lg:text-3xl font-black text-slate-900 leading-none">
                      5.000{" "}
                      <span className="text-base text-slate-500 font-semibold">
                        Điểm
                      </span>
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-4 lg:gap-8 flex-1 justify-center md:justify-start overflow-hidden">
                  <div
                    className="cursor-pointer group shrink-0"
                    onClick={() => setShowDebtPopup(true)}
                  >
                    <p className="text-xs font-semibold text-slate-500 mb-1 group-hover:text-slate-800 transition-colors">
                      Công nợ
                    </p>
                    <p className="text-base lg:text-lg font-black text-slate-800">
                      5.000.000 đ
                    </p>
                  </div>
                  <div className="w-px h-8 bg-slate-300/50"></div>
                  <div
                    className="cursor-pointer group shrink-0"
                    onClick={() => setShowVouchersPopup(true)}
                  >
                    <p className="text-xs font-semibold text-slate-500 mb-1 group-hover:text-slate-800 transition-colors">
                      Vouchers của bạn
                    </p>
                    <p className="text-base lg:text-lg font-black text-emerald-600">
                      12{" "}
                      <span className="text-xs font-medium text-slate-500">
                        Vouchers
                      </span>
                    </p>
                  </div>
                  <div className="w-px h-8 bg-slate-300/50"></div>
                  <div
                    className="cursor-pointer group shrink-0"
                    onClick={() => setShowRevenuePopup(true)}
                  >
                    <p className="text-xs font-semibold text-slate-500 mb-1 group-hover:text-slate-800 transition-colors">
                      Đơn hàng trong tháng
                    </p>
                    <p className="text-base lg:text-lg font-black text-orange-600">
                      85 Triệu
                    </p>
                  </div>
                </div>

                <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 whitespace-nowrap shrink-0">
                  Xem Đối Soát
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-[1400px] mx-auto px-8 mt-12 space-y-12 relative z-30">
            {/* DANH MỤC CỦA BẠN */}
            <section>
              <h3 className="font-black text-slate-800 text-2xl mb-6 tracking-tight">
                Danh mục tại Dược Nam Việt
              </h3>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => showToast(`Mở: ${cat.name}`)}
                    className="flex flex-col items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 bg-white border border-slate-100`}
                    >
                      <cat.icon
                        className={cat.color}
                        size={32}
                        strokeWidth={1.5}
                      />
                    </div>
                    <span className="text-sm text-slate-700 font-semibold text-center leading-tight group-hover:text-orange-600 transition-colors">
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* FLASH SALE */}
            <section className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 lg:p-8 shadow-lg shadow-orange-500/20">
              <div className="flex justify-between items-center mb-6 text-white">
                <div className="flex items-center gap-4">
                  <Zap
                    size={32}
                    fill="currentColor"
                    className="animate-pulse"
                  />
                  <h3 className="font-black text-2xl lg:text-3xl italic tracking-tight">
                    FLASH SALE SỈ
                  </h3>
                  <div className="ml-4 flex gap-2 items-center bg-black/20 backdrop-blur px-4 py-2 rounded-xl border border-white/20">
                    <span className="font-bold text-sm hidden sm:block">
                      Kết thúc sau:
                    </span>
                    <span className="bg-white text-red-600 font-black px-2 py-1 rounded shadow-sm">
                      02
                    </span>
                    <span>:</span>
                    <span className="bg-white text-red-600 font-black px-2 py-1 rounded shadow-sm">
                      45
                    </span>
                    <span>:</span>
                    <span className="bg-white text-red-600 font-black px-2 py-1 rounded shadow-sm">
                      12
                    </span>
                  </div>
                </div>
                <button className="text-sm font-bold bg-white/20 hover:bg-white/30 backdrop-blur px-5 py-2.5 rounded-xl transition-colors">
                  Xem tất cả
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {FLASH_SALE.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all flex flex-col group relative"
                  >
                    <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-sm z-10">
                      GIẢM {item.discount}%
                    </span>

                    <div className="w-full aspect-square bg-slate-50 rounded-xl mb-4 flex items-center justify-center p-2 cursor-pointer overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-white text-slate-800 font-bold text-xs px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          Xem nhanh
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        SKU: {item.sku}
                      </span>
                      <span className="text-xs font-bold text-emerald-600">
                        Còn {item.stock}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2 mb-4 flex-1 cursor-pointer hover:text-orange-600 transition-colors">
                      {item.name}
                    </h4>

                    <div className="mt-auto">
                      <div className="text-xs text-slate-400 line-through mb-1 font-medium">
                        {item.oldPrice.toLocaleString()} đ
                      </div>
                      <div className="flex items-end justify-between">
                        <div className="text-lg lg:text-xl font-black text-red-600 leading-none">
                          {item.price.toLocaleString()}{" "}
                          <span className="text-xs font-bold text-slate-500">
                            đ/hộp
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(item.name)}
                          className="w-10 h-10 bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white rounded-xl flex items-center justify-center transition-all active:scale-95 border border-orange-200 hover:border-transparent shrink-0"
                        >
                          <ShoppingCart size={18} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* TOP BÁN CHẠY và CÓ THỂ BẠN CẦN*/}
            <section className="mb-10">
              <h3 className="font-black text-slate-800 text-2xl mb-6 tracking-tight flex items-center gap-2">
                <TrendingUp className="text-orange-500" size={28} /> Có thể bạn
                Cần
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {TOP_PRODUCTS.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    handleAddToCart={handleAddToCart}
                    showToast={showToast}
                    layout="vertical"
                  />
                ))}
              </div>
            </section>

            {/* SẢN PHẨM THEO MÙA */}
            <section className="mb-10">
              <h3 className="font-black text-slate-800 text-2xl mb-6 tracking-tight flex items-center gap-2">
                <Sun className="text-amber-500" size={28} /> Sản phẩm theo Mùa
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {TOP_PRODUCTS.map((prod) => (
                  <div
                    key={`season-${prod.id}`}
                    className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col group"
                  >
                    <div className="w-full aspect-square bg-slate-50 rounded-xl mb-3 flex items-center justify-center p-2 cursor-pointer overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2 mb-3 flex-1 group-hover:text-blue-600 transition-colors cursor-pointer">
                      {prod.name}
                    </h4>

                    <div className="flex items-end justify-between mt-auto pt-3 border-t border-slate-100">
                      <div className="text-lg font-black text-slate-900 leading-none">
                        {prod.price.toLocaleString()}{" "}
                        <span className="text-[10px] font-bold text-slate-500">
                          đ/{prod.unit}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(prod.name)}
                        className="w-8 h-8 bg-slate-100 hover:bg-slate-800 text-slate-600 hover:text-white rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0"
                      >
                        <Plus size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* NHÀ THUỐC NÀO CŨNG CẦN */}
            <section className="mb-10">
              <h3 className="font-black text-slate-800 text-2xl mb-6 tracking-tight flex items-center gap-2">
                <Pill className="text-emerald-500" size={28} /> Nhà thuốc nào
                cũng cần
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {TOP_PRODUCTS.map((prod) => (
                  <div
                    key={`pharmacy-${prod.id}`}
                    className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col group"
                  >
                    <div className="w-full aspect-square bg-slate-50 rounded-xl mb-3 flex items-center justify-center p-2 cursor-pointer overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2 mb-3 flex-1 group-hover:text-blue-600 transition-colors cursor-pointer">
                      {prod.name}
                    </h4>

                    <div className="flex items-end justify-between mt-auto pt-3 border-t border-slate-100">
                      <div className="text-lg font-black text-slate-900 leading-none">
                        {prod.price.toLocaleString()}{" "}
                        <span className="text-[10px] font-bold text-slate-500">
                          đ/{prod.unit}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(prod.name)}
                        className="w-8 h-8 bg-slate-100 hover:bg-slate-800 text-slate-600 hover:text-white rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0"
                      >
                        <Plus size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* BÁC SĨ NÀO CŨNG CẦN */}
            <section>
              <h3 className="font-black text-slate-800 text-2xl mb-6 tracking-tight flex items-center gap-2">
                <ShieldPlus className="text-blue-500" size={28} /> Bác Sĩ nào
                cũng cần
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {TOP_PRODUCTS.map((prod) => (
                  <div
                    key={`doctor-${prod.id}`}
                    className="bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all flex flex-col group"
                  >
                    <div className="w-full aspect-square bg-slate-50 rounded-xl mb-3 flex items-center justify-center p-2 cursor-pointer overflow-hidden">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 leading-snug line-clamp-2 mb-3 flex-1 group-hover:text-blue-600 transition-colors cursor-pointer">
                      {prod.name}
                    </h4>

                    <div className="flex items-end justify-between mt-auto pt-3 border-t border-slate-100">
                      <div className="text-lg font-black text-slate-900 leading-none">
                        {prod.price.toLocaleString()}{" "}
                        <span className="text-[10px] font-bold text-slate-500">
                          đ/{prod.unit}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddToCart(prod.name)}
                        className="w-8 h-8 bg-slate-100 hover:bg-slate-800 text-slate-600 hover:text-white rounded-full flex items-center justify-center transition-all active:scale-95 shrink-0"
                      >
                        <Plus size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* OVERLAY CHO MENU TRUNG TÂM (FAB MENU) */}
      {isFabOpen && (
        <div
          className="fixed inset-0 z-[55] bg-slate-900/60 backdrop-blur-sm transition-opacity md:hidden"
          onClick={toggleFabMenu}
        >
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col gap-3 items-end w-max pb-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFabMenu();
                showToast("Mở Chính sách và Hướng dẫn");
              }}
              className="flex items-center gap-3 animate-in slide-in-from-bottom-12 fade-in duration-200 delay-200"
            >
              <span className="bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                Chính sách và Hướng dẫn
              </span>
              <div className="w-10 h-10 rounded-full bg-slate-500 text-white flex items-center justify-center shadow-lg">
                <FileText size={18} />
              </div>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFabMenu();
                showToast("Mở Khóa học & Kiến thức");
              }}
              className="flex items-center gap-3 animate-in slide-in-from-bottom-10 fade-in duration-200 delay-[160ms]"
            >
              <span className="bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                Khóa học & Kiến thức
              </span>
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                <BookOpen size={18} />
              </div>
            </button>

            <Link
              href="/community"
              onClick={(e) => {
                e.stopPropagation();
                toggleFabMenu();
              }}
              className="flex items-center gap-3 animate-in slide-in-from-bottom-8 fade-in duration-200 delay-[120ms]"
            >
              <span className="bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                Giao lưu & Kết nối
              </span>
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg">
                <Users size={18} />
              </div>
            </Link>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFabMenu();
                showToast("Xem Sản phẩm mới");
              }}
              className="flex items-center gap-3 animate-in slide-in-from-bottom-6 fade-in duration-200 delay-[80ms]"
            >
              <span className="bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                Sản phẩm mới
              </span>
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg">
                <Star size={18} />
              </div>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFabMenu();
                showToast("Mở Khuyến mãi");
              }}
              className="flex items-center gap-3 animate-in slide-in-from-bottom-4 fade-in duration-200 delay-[40ms]"
            >
              <span className="bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                Khuyến mãi
              </span>
              <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg">
                <Gift size={18} />
              </div>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFabMenu();
                showToast("Mở Tạo đơn Tự động");
              }}
              className="flex items-center gap-3 animate-in slide-in-from-bottom-2 fade-in duration-200"
            >
              <span className="bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                Tạo đơn Tự động
              </span>
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg">
                <History size={18} />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* DANH MỤC MOBILE MODAL */}
      {activeTab === "categories" && (
        <div className="fixed inset-0 z-[45] bg-white pt-24 pb-24 px-4 overflow-y-auto animate-in fade-in slide-in-from-bottom-10 md:hidden">
          <h2 className="text-xl font-black text-slate-800 mb-6">
            Tất cả Danh mục
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  showToast(`Mở: ${cat.name}`);
                  setActiveTab("home");
                }}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 active:scale-95 transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.bg}`}
                >
                  <cat.icon className={cat.color} size={24} strokeWidth={1.5} />
                </div>
                <span className="text-[11px] text-slate-700 font-bold text-center leading-tight">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TOAST CHUNG (Hoạt động cho cả Mobile và Desktop) */}
      {toast.show && (
        <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-slate-900 text-white px-6 py-3.5 rounded-full text-sm font-bold shadow-2xl flex items-center gap-3 whitespace-nowrap">
            <CheckCircle2 size={20} className="text-emerald-400" /> {toast.msg}
          </div>
        </div>
      )}

      {/* AI ASSISTANT WIDGET (CHUNG CHO CẢ MOBILE & DESKTOP) */}
      <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-[100] flex flex-col items-end gap-3 pointer-events-none">
        {showBotMessage && (
          <div className="bg-amber-50 border border-amber-200 text-amber-900 text-lg font-large px-4 py-3 rounded-2xl rounded-br-none shadow-2xl shadow-orange-500/20 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-[250px] pointer-events-auto">
            Chào Anh. Hãy <em className="font-bold">Chat</em> với em. Em có thể
            hỗ trợ Tạo Đơn Hàng, Tra cứu các thông tin nhanh chóng. 👋
          </div>
        )}
        <button
          onClick={() => setIsChatOpen(true)}
          className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-tr from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-orange-500/30 active:scale-90 transition-transform pointer-events-auto ${showBotMessage ? "animate-none" : "animate-bounce hover:animate-none"}`}
        >
          <Bot size={24} className="md:w-7 md:h-7" />
          <span className="absolute top-0 right-0 w-3 h-3 bg-white border-2 border-orange-500 rounded-full"></span>
        </button>
      </div>

      <ChatbotSheet isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      {/* DEBT POPUP */}
      {showDebtPopup && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-sm shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowDebtPopup(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-1"
            >
              <X size={20} />
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-800">
                Thông tin công nợ
              </h3>
              <p className="text-sm text-slate-500 mt-2">
                Nợ của Quý khách hiện tại là:
              </p>
              <div className="text-3xl font-black text-red-600 my-2">
                5.000.000 đ
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Quét mã QR sau để thanh toán nhanh:
              </p>
              <div className="w-40 h-40 mx-auto bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center p-2">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                  alt="QR Code"
                  className="w-full h-full opacity-80 mix-blend-multiply"
                />
              </div>
            </div>
            <Link
              href="/debt"
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 active:scale-95 transition-all shadow-md"
            >
              <History size={18} /> Xem lịch sử thanh toán
            </Link>
          </div>
        </div>
      )}

      {/* VOUCHERS POPUP */}
      {showVouchersPopup && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowVouchersPopup(false)}
          ></div>
          <div className="bg-slate-50 w-full rounded-t-3xl p-6 relative z-10 animate-in slide-in-from-bottom flex flex-col h-[85vh] max-w-md mx-auto md:max-w-xl md:h-[80vh] md:rounded-3xl md:mb-10 md:shadow-2xl">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6 md:hidden"></div>
            <button
              onClick={() => setShowVouchersPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-300 transition-colors"
            >
              <X size={16} />
            </button>
            <div className="text-center mb-6 shrink-0">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                <Gift size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-800">
                Kho Vouchers
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Bạn đang có <span className="font-bold text-emerald-600">12 mã</span> khả dụng
              </p>
            </div>
            
            <div className="overflow-y-auto flex-1 -mx-2 px-2 no-scrollbar space-y-4">
              {[
                { type: "freeship", title: "Freeship Đơn từ 3 Triệu", desc: "Giảm tối đa 50k phí vận chuyển", code: "FS3M50K", exp: "30/05/2026" },
                { type: "discount", title: "Giảm 5% Hóa Đơn Hô Hấp", desc: "Tối đa 200k cho nhóm Hô hấp", code: "HOHAP5", exp: "25/05/2026" },
                { type: "discount", title: "Giảm 100k Đơn Đầu Tiên", desc: "Dành riêng cho khách hàng mới", code: "NEW100", exp: "31/12/2026" },
                { type: "freeship", title: "Freeship 100%", desc: "Dành cho Đại lý Vàng (Đơn > 5Tr)", code: "GOLD-FS", exp: "30/06/2026" },
                { type: "discount", title: "Giảm 10% TPCN", desc: "Nhóm Thực phẩm chức năng", code: "TPCN10", exp: "15/06/2026" },
                { type: "freeship", title: "Freeship Đơn từ 1 Triệu", desc: "Giảm tối đa 30k phí vận chuyển", code: "FS1M30K", exp: "15/06/2026" },
                { type: "discount", title: "Giảm 50k Toàn Sàn", desc: "Đơn tối thiểu 2 Triệu", code: "ALL50K", exp: "20/05/2026" },
                { type: "discount", title: "Giảm 5% Combo Mẹ & Bé", desc: "Tối đa 150k", code: "MOM5", exp: "01/06/2026" },
                { type: "discount", title: "Tặng 500 Điểm Tích Lũy", desc: "Khi mua SP bất kỳ thuộc nhóm Da liễu", code: "POINT500", exp: "30/05/2026" },
                { type: "freeship", title: "Freeship Cuối Tuần", desc: "Giảm tối đa 40k. Áp dụng T7, CN", code: "WEEKEND-FS", exp: "31/05/2026" },
                { type: "discount", title: "Giảm 2% Hàng Kê Đơn", desc: "Áp dụng danh mục cho phép", code: "RX2", exp: "30/06/2026" },
                { type: "discount", title: "Hoàn Tiền 100k", desc: "Vào ví công nợ. Đơn từ 10 Triệu", code: "CASH100", exp: "15/06/2026" },
              ].map((v, i) => (
                <div key={i} className="flex bg-white rounded-2xl shadow-sm overflow-hidden relative group">
                  <div className={`w-2 shrink-0 ${v.type === "freeship" ? "bg-blue-500" : "bg-emerald-500"}`}></div>
                  <div className="p-4 flex-1 flex flex-col justify-between relative border-y border-r border-slate-100 rounded-r-2xl">
                    <div className="absolute top-1/2 -left-1 w-2 h-4 bg-slate-50 rounded-r-full -translate-y-1/2 border-y border-r border-slate-100"></div>
                    <div className="absolute top-1/2 -right-1 w-2 h-4 bg-slate-50 rounded-l-full -translate-y-1/2 border-y border-l border-slate-100"></div>

                    <div>
                      <div className="flex justify-between items-start mb-1 gap-2">
                        <h4 className="font-bold text-slate-800 text-sm">{v.title}</h4>
                        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200 shrink-0">{v.code}</span>
                      </div>
                      <p className="text-xs text-slate-500 pr-4">{v.desc}</p>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100 border-dashed">
                      <span className="text-[10px] font-medium text-red-500 flex items-center gap-1"><Clock size={10} /> HSD: {v.exp}</span>
                      <button 
                        onClick={() => {
                          showToast(`Đã áp dụng mã ${v.code}`);
                          setShowVouchersPopup(false);
                        }}
                        className="text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 px-4 py-1.5 rounded-lg active:scale-95 transition-all shadow-sm shadow-orange-500/20"
                      >
                        Dùng ngay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* REVENUE POPUP */}
      {showRevenuePopup && (
        <div className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-sm shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowRevenuePopup(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-1"
            >
              <X size={20} />
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-black text-slate-800">
                Doanh thu tháng này
              </h3>
              <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mt-4">
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  Chúc mừng bạn đã có tổng đơn hàng trong tháng là{" "}
                  <strong className="text-orange-600">85 triệu</strong> và{" "}
                  <strong className="text-emerald-600">5.000 điểm</strong> chưa
                  sử dụng.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <Link
                href="/orders"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3.5 rounded-xl hover:from-orange-600 hover:to-red-600 active:scale-95 transition-all shadow-md shadow-orange-500/20"
              >
                <Package size={18} /> Xem danh sách đơn hàng
              </Link>
              <button
                onClick={() => {
                  setShowRevenuePopup(false);
                  showToast("Mở đổi quà");
                }}
                className="w-full flex items-center justify-center gap-2 bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl border border-slate-200 hover:bg-slate-100 active:scale-95 transition-all"
              >
                <Gift size={18} /> Dùng điểm đổi quà
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
