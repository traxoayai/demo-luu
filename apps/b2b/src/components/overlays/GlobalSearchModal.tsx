"use client";

import React, { useEffect, useRef } from "react";
import { Search, X, Clock, ArrowRight } from "lucide-react";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Small delay to allow CSS transitions before focusing, prevents iOS keyboard layout jumps
      setTimeout(() => inputRef.current?.focus(), 100);
      
      // Prevent body scroll when modal is open on mobile
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white md:bg-slate-900/40 md:backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full h-full md:h-auto md:max-h-[80vh] md:max-w-3xl mx-auto md:mt-24 bg-white md:rounded-2xl md:shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header / Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-slate-100 shrink-0 bg-white">
          <Search className="text-slate-400" size={20} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm tên thuốc, bệnh lý, hoạt chất..."
            className="flex-1 outline-none text-base md:text-sm text-slate-800 placeholder:text-slate-400 bg-transparent py-1"
          />
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 md:bg-white">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Lịch sử tìm kiếm</h4>
          <div className="space-y-1 mb-6">
            {["Amoxicillin", "Panadol Extra", "Khẩu trang y tế"].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 hover:bg-slate-100 rounded-xl cursor-pointer text-slate-700 transition-colors">
                <Clock size={16} className="text-slate-400 shrink-0" />
                <span className="text-sm flex-1">{item}</span>
                <ArrowRight size={16} className="text-slate-300" />
              </div>
            ))}
          </div>

          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Gợi ý phổ biến</h4>
          <div className="flex flex-wrap gap-2">
            {["Vitamin C", "Nước muối sinh lý", "Paracetamol", "Siro ho", "Băng cá nhân"].map((tag, idx) => (
              <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
