"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Printer,
  FileText,
  RotateCcw,
  MapPin,
  User,
  Phone,
  CheckCircle2,
  Package,
  Truck,
  CreditCard,
  QrCode
} from "lucide-react";

// --- MOCK DATA ---
const ORDER_DATA = {
  id: "#NV-10293",
  date: "20/05/2026 - 14:30",
  status: "Đang giao", // Đặt hàng -> Đã xác nhận -> Đang giao -> Đã giao
  customer: {
    company: "Bệnh viện Phú Mỹ",
    taxCode: "0101234567",
    name: "Nguyễn Ngọc Lan", // Tên liên hệ
    phone: "0988123456", // Số ĐT liên hệ
    address: "Hòa Lạc; Xã Hòa Lạc; Huyện Hữu Lũng; Lạng Sơn",
    note: "Giao trong giờ hành chính",
  },
  shipping: {
    method: "Giao hàng tiêu chuẩn",
    shipperName: "Nguyễn Văn A",
    shipperPhone: "0912345678",
    note: "Gọi điện trước khi giao 30 phút",
  },
  items: [
    {
      id: 1,
      image: "https://placehold.co/100x100/e2e8f0/64748b?text=Gac",
      name: "Gạc Phẫu Thuật An Lành (10cm x 10cm x 8 lớp)",
      batch: "151225",
      exp: "16/12/27",
      unit: "Bịch",
      qty: 1,
      price: 49000,
      total: 49000
    },
    {
      id: 2,
      image: "https://placehold.co/100x100/e2e8f0/64748b?text=Med",
      name: "Medrol 16mg Pfizer /3 vỉ x 10v",
      batch: "LK8040",
      exp: "13/06/27",
      unit: "Hộp",
      qty: 1,
      price: 125000,
      total: 125000
    },
    {
      id: 3,
      image: "https://placehold.co/100x100/e2e8f0/64748b?text=Dafilon",
      name: "Chỉ khâu vết thương Dafilon 2/0",
      batch: "625043",
      exp: "21/01/30",
      unit: "Cái",
      qty: 2,
      price: 20000,
      total: 40000
    },
    {
      id: 4,
      image: "https://placehold.co/100x100/e2e8f0/64748b?text=BomTiem",
      name: "Bơm tiêm 5cc Vinahancook",
      batch: "070426",
      exp: "07/04/31",
      unit: "Hộp",
      qty: 1,
      price: 76500,
      total: 76500
    }
  ],
  summary: {
    subtotal: 290500,
    discount: 0,
    shipping: 0,
    total: 290500,
    paid: 0, // Đã thanh toán
    debt: 290500, // Ghi nợ / Cần thanh toán
    paymentStatus: "Chưa thanh toán"
  }
};

const TIMELINE = [
  { status: "Đặt hàng", time: "20/05 14:30", done: true },
  { status: "Đã xác nhận", time: "20/05 15:10", done: true },
  { status: "Đang giao", time: "21/05 08:00", done: true },
  { status: "Đã giao", time: "Dự kiến 22/05", done: false },
];

export default function OrderDetailPage() {
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
      <header className="bg-white sticky top-0 z-40 border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/debt" className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full flex items-center justify-center transition-colors active:scale-95">
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h1 className="text-lg md:text-xl font-black text-slate-800 tracking-tight leading-none">
              Chi tiết đơn hàng
            </h1>
            <p className="text-[11px] font-medium text-slate-500 mt-0.5">{ORDER_DATA.id}</p>
          </div>
        </div>
        
        {/* Desktop Buttons in Header */}
        <div className="hidden md:flex items-center gap-2">
          <button 
            onClick={() => showToast("Yêu cầu đổi trả đã được ghi nhận")}
            className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-sm"
          >
            <RotateCcw size={16} /> Đổi trả
          </button>
          
          <button 
            onClick={() => showToast("Đang tải Hóa Đơn VAT...")}
            className="flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-sm"
          >
            <FileText size={16} /> HĐ VAT
          </button>
          
          <button 
            onClick={() => {
              showToast("Đang kết nối máy in...");
              setTimeout(() => window.print(), 500);
            }}
            className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 shadow-md shadow-orange-500/30"
          >
            <Printer size={16} /> In
          </button>
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto px-4 pt-6 space-y-6 print:px-0 print:pt-0">
        
        {/* Order Status Journey */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm print:hidden">
          <h3 className="text-sm font-black text-slate-800 mb-6 uppercase tracking-wider">Hành trình đơn hàng</h3>
          <div className="flex justify-between relative max-w-3xl mx-auto">
            {/* Đường gạch ngang nền */}
            <div className="absolute top-4 left-0 w-full h-1 bg-slate-100 -z-10 rounded-full translate-y-1/2"></div>
            {/* Đường gạch ngang progress */}
            <div className="absolute top-4 left-0 w-[66%] h-1 bg-emerald-500 -z-10 rounded-full translate-y-1/2 transition-all"></div>
            
            {TIMELINE.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${step.done ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                  {idx === 0 ? <Package size={14} /> : 
                   idx === 1 ? <CheckCircle2 size={14} /> :
                   idx === 2 ? <Truck size={14} /> : <MapPin size={14} />}
                </div>
                <div className="text-center">
                  <p className={`text-[11px] font-bold ${step.done ? 'text-emerald-700' : 'text-slate-500'}`}>{step.status}</p>
                  <p className="text-[9px] text-slate-400 mt-0.5 whitespace-nowrap">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Thông tin Khách hàng & Vận chuyển */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 print:block print:space-y-6">
          {/* Thông tin Khách hàng */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0">
            <h2 className="text-xl font-black text-slate-800 mb-4 print:text-2xl text-center print:mb-8 print:block hidden">
              ĐƠN ĐẶT HÀNG / PHIẾU GIAO HÀNG
            </h2>
            <h3 className="text-sm font-black text-slate-800 mb-4 uppercase tracking-wider flex items-center gap-2 print:hidden">
              <User size={16} className="text-blue-500"/> Thông tin khách hàng
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl print:bg-transparent print:p-0 print:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 print:inline print:mr-2">Tên cơ sở:</p>
                <p className="text-sm font-bold text-slate-800 print:inline print:text-base">{ORDER_DATA.customer.company}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 print:inline print:mr-2">Mã số thuế:</p>
                <p className="text-sm font-bold text-slate-800 print:inline print:text-base">{ORDER_DATA.customer.taxCode}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 print:inline print:mr-2">Người liên hệ:</p>
                <p className="text-sm font-bold text-slate-800 print:inline print:text-base">{ORDER_DATA.customer.name}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 print:inline print:mr-2">Điện thoại:</p>
                <p className="text-sm font-bold text-slate-800 print:inline print:text-base">{ORDER_DATA.customer.phone}</p>
              </div>
              <div className="md:col-span-2 lg:col-span-4 pt-3 mt-1 border-t border-slate-200/60 print:border-none print:pt-0 print:mt-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 print:inline print:mr-2">Địa chỉ giao:</p>
                <p className="text-sm font-medium text-slate-800 print:inline print:text-base">{ORDER_DATA.customer.address}</p>
              </div>
            </div>
          </div>

          {/* Thông tin Vận chuyển */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm print:hidden">
            <h3 className="text-sm font-black text-slate-800 mb-4 uppercase tracking-wider flex items-center gap-2">
              <Truck size={16} className="text-orange-500"/> Thông tin vận chuyển
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl">
              <div className="lg:col-span-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Hình thức VC</p>
                <p className="text-sm font-bold text-slate-800">{ORDER_DATA.shipping.method}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Tên Shipper</p>
                <p className="text-sm font-bold text-slate-800">{ORDER_DATA.shipping.shipperName}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">SĐT Shipper</p>
                <p className="text-sm font-bold text-slate-800">{ORDER_DATA.shipping.shipperPhone}</p>
              </div>
              <div className="md:col-span-2 lg:col-span-4 pt-3 mt-1 border-t border-slate-200/60">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ghi chú giao hàng</p>
                <p className="text-sm font-medium text-slate-600 italic">{ORDER_DATA.shipping.note}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chi tiết Sản phẩm */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0">
          <h3 className="text-sm font-black text-slate-800 mb-4 uppercase tracking-wider print:hidden">Danh sách hàng hóa</h3>
          
          {/* Desktop/Print Table */}
          <div className="hidden md:block print:block overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-800 print:border-collapse">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-800 border-b border-slate-800">
                  <th className="p-3 border-r border-slate-800 text-center w-12 font-black">STT</th>
                  <th className="p-3 border-r border-slate-800 text-center font-black w-20 print:hidden">Ảnh</th>
                  <th className="p-3 border-r border-slate-800 font-black">Tên hàng hóa, quy cách</th>
                  <th className="p-3 border-r border-slate-800 text-center font-black w-20">ĐVT</th>
                  <th className="p-3 border-r border-slate-800 text-center font-black w-16">SL</th>
                  <th className="p-3 border-r border-slate-800 text-right font-black w-28">Đơn giá</th>
                  <th className="p-3 text-right font-black w-32">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {ORDER_DATA.items.map((item, index) => (
                  <tr key={item.id} className="border-b border-slate-800 hover:bg-slate-50">
                    <td className="p-3 border-r border-slate-800 text-center font-medium">{index + 1}</td>
                    <td className="p-3 border-r border-slate-800 print:hidden text-center">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover mx-auto border border-slate-200" />
                    </td>
                    <td className="p-3 border-r border-slate-800">
                      <p className="font-bold text-slate-900">{item.name}</p>
                      <p className="text-[10px] text-slate-500 mt-1">Lô: {item.batch} | HSD: {item.exp}</p>
                    </td>
                    <td className="p-3 border-r border-slate-800 text-center">{item.unit}</td>
                    <td className="p-3 border-r border-slate-800 text-center font-black">{item.qty}</td>
                    <td className="p-3 border-r border-slate-800 text-right">{item.price.toLocaleString()}</td>
                    <td className="p-3 text-right font-black">{item.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile List View */}
          <div className="md:hidden space-y-4 print:hidden">
            {ORDER_DATA.items.map((item, index) => (
              <div key={item.id} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex gap-3 mb-2">
                  <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0" />
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm leading-snug">{item.name}</p>
                    <p className="text-[10px] font-medium text-slate-400 mt-1">Lô: {item.batch} • HSD: {item.exp}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl ml-[3.25rem]">
                  <div className="text-xs text-slate-500 font-medium">
                    {item.price.toLocaleString()}đ <span className="mx-1">x</span> <span className="font-bold text-slate-800">{item.qty} {item.unit}</span>
                  </div>
                  <div className="text-sm font-black text-slate-900">
                    {item.total.toLocaleString()} đ
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary & QR */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0 print:border-t print:rounded-none flex flex-col md:flex-row gap-8 justify-between items-start">
          
          <div className="w-full md:w-1/3 text-center order-2 md:order-1 print:order-1">
            <h4 className="text-xs font-black uppercase tracking-widest text-slate-800 mb-3 print:text-sm">Quét mã thanh toán</h4>
            <div className="w-40 h-40 mx-auto bg-slate-100 rounded-xl border-2 border-slate-200 p-2 flex items-center justify-center relative overflow-hidden">
              {/* Dummy QR */}
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=pay:0372286687:290500" alt="QR Code" className="w-full h-full mix-blend-multiply" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                <QrCode size={16} className="text-orange-600"/>
              </div>
            </div>
            <p className="text-[11px] font-bold text-slate-600 mt-3">Timo - 0965637788</p>
            <p className="text-[10px] font-medium text-slate-500 uppercase">LE VIET HUNG</p>
          </div>

          <div className="w-full md:w-2/3 order-1 md:order-2 print:order-2">
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex justify-between items-center">
                <span className="font-medium">Cộng tiền hàng:</span>
                <span className="font-bold text-slate-800">{ORDER_DATA.summary.subtotal.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Chiết khấu:</span>
                <span className="font-bold text-slate-800">- {ORDER_DATA.summary.discount.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Phí vận chuyển:</span>
                <span className="font-bold text-slate-800">+ {ORDER_DATA.summary.shipping.toLocaleString()} đ</span>
              </div>
              
              <div className="border-t border-slate-200 border-dashed pt-3 mt-3"></div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Thanh toán đơn này:</span>
                <span className="font-black text-slate-900">{ORDER_DATA.summary.total.toLocaleString()} đ</span>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-2xl flex justify-between items-center border border-orange-100 mt-4 print:bg-transparent print:border-none print:p-0 print:pt-4 print:border-t print:border-slate-800 print:rounded-none">
                <div>
                  <span className="font-black text-orange-800 uppercase tracking-wider print:text-black block mb-1">Tổng cộng phải trả:</span>
                  <span className="text-[10px] font-bold bg-orange-200 text-orange-800 px-2 py-0.5 rounded print:hidden">{ORDER_DATA.summary.paymentStatus}</span>
                </div>
                <span className="text-2xl font-black text-orange-600 print:text-black">{ORDER_DATA.summary.debt.toLocaleString()} đ</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Bottom Actions */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-3 z-50 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] pb-safe print:hidden">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          <button 
            onClick={() => showToast("Yêu cầu đổi trả đã được ghi nhận")}
            className="flex-1 flex flex-col items-center justify-center gap-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 p-2 rounded-xl text-[10px] font-bold transition-all active:scale-95 shadow-sm"
          >
            <RotateCcw size={16} /> Đổi trả
          </button>
          
          <button 
            onClick={() => showToast("Đang tải Hóa Đơn VAT...")}
            className="flex-1 flex flex-col items-center justify-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 p-2 rounded-xl text-[10px] font-bold transition-all active:scale-95 shadow-sm"
          >
            <FileText size={16} /> HĐ VAT
          </button>
          
          <button 
            onClick={() => {
              showToast("Đang kết nối máy in...");
              setTimeout(() => window.print(), 500);
            }}
            className="flex-[1.5] flex flex-col items-center justify-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white p-2 rounded-xl text-[10px] font-bold transition-all active:scale-95 shadow-md shadow-orange-500/30"
          >
            <Printer size={16} /> In Phiếu
          </button>
        </div>
      </div>
    </div>
  );
}
