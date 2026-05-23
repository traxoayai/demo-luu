"use client";

import React, { useState } from 'react';
import { 
  Megaphone, Users, MessageSquarePlus, MessageSquare, 
  ThumbsUp, Pin, Plus, MoreHorizontal, FileText, 
  CheckCircle2, Clock, ShieldAlert, Image as ImageIcon
} from 'lucide-react';

export default function ForumView() {
  const [activeTab, setActiveTab] = useState<'announcements' | 'community' | 'feedback'>('announcements');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <main className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
            Diễn đàn & Thông báo
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Không gian giao tiếp, cập nhật tin tức và đóng góp ý kiến nội bộ Nam Việt.
          </p>
        </div>
        
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary-600 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-lg shadow-primary-500/30 active:scale-95"
        >
          <Plus size={18} />
          {activeTab === 'announcements' ? 'Tạo thông báo' : activeTab === 'community' ? 'Đăng bài viết' : 'Gửi góp ý'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6 max-w-2xl overflow-x-auto no-scrollbar shrink-0">
        <button
          onClick={() => setActiveTab('announcements')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'announcements' 
              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary shadow-sm border border-primary-100 dark:border-primary-900/30' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
          }`}
        >
          <Megaphone size={18} /> Nội quy & Thông báo
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'community' 
              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary shadow-sm border border-primary-100 dark:border-primary-900/30' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
          }`}
        >
          <Users size={18} /> Diễn đàn chung
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
            activeTab === 'feedback' 
              ? 'bg-primary-50 dark:bg-primary-900/20 text-primary shadow-sm border border-primary-100 dark:border-primary-900/30' 
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
          }`}
        >
          <MessageSquarePlus size={18} /> Góp ý & Khiếu nại
        </button>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          
          {/* TAB 1: ANNOUNCEMENTS */}
          {activeTab === 'announcements' && (
            <>
              {/* Pinned Announcement */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-5 shadow-sm relative group">
                <div className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
                  <MoreHorizontal size={20} />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-black px-2 py-1 rounded-md flex items-center gap-1">
                    <Pin size={12} /> QUAN TRỌNG
                  </span>
                  <span className="text-xs font-medium text-slate-500">Hôm nay, 08:30 AM</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Quy định mới về chấm công bằng FaceID tại khối kho bãi</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                  Bắt đầu từ ngày 01/11, toàn bộ nhân sự khối kho bãi sẽ áp dụng 100% hình thức chấm công qua FaceID. Yêu cầu các bộ phận cập nhật khuôn mặt trên hệ thống trước 25/10...
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <FileText size={16} /> 1 file đính kèm
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Users size={16} /> Đã xem: 145
                  </div>
                </div>
              </div>

              {/* Regular Announcement */}
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm relative group transition-hover hover:border-slate-200">
                <div className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal size={20} />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded-md">
                    Tin tức
                  </span>
                  <span className="text-xs font-medium text-slate-500">Hôm qua, 14:00 PM</span>
                </div>
                <h3 className="text-md font-bold text-slate-800 dark:text-white mb-2">Thông báo lịch nghỉ mát hè 2024</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                  Ban giám đốc trân trọng thông báo đến toàn thể CBNV lịch nghỉ mát thường niên năm 2024 tại Đà Nẵng. Thời gian từ ngày...
                </p>
              </div>
            </>
          )}

          {/* TAB 2: COMMUNITY */}
          {activeTab === 'community' && (
            <>
              {/* Post Input */}
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-4 shadow-sm mb-6">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full shrink-0"></div>
                  <div className="flex-1">
                    <input 
                      type="text" 
                      placeholder="Bạn đang nghĩ gì? Chia sẻ cùng mọi người nhé..." 
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 text-slate-800 dark:text-white"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg transition-colors">
                          <ImageIcon size={16} className="text-emerald-500" /> Ảnh/Video
                        </button>
                      </div>
                      <button className="bg-primary hover:bg-primary-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-colors shadow-sm">
                        Đăng bài
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feed Post */}
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm relative group">
                <div className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer">
                  <MoreHorizontal size={20} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">
                    T
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-white text-sm">Trần Văn Tùng <span className="text-slate-500 font-normal ml-1">đã đăng trong</span> Kho bãi</div>
                    <div className="text-xs text-slate-500">2 giờ trước</div>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">
                  Team Kho Thủ Đức hôm nay xuất sắc vượt KPI xử lý 500 đơn hàng B2B trước 16h chiều. Chúc mừng anh em!!! 🎉📦
                </p>
                <div className="flex items-center gap-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <button className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary transition-colors">
                    <ThumbsUp size={16} /> 24 Thích
                  </button>
                  <button className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-blue-500 transition-colors">
                    <MessageSquare size={16} /> 5 Bình luận
                  </button>
                </div>
              </div>
            </>
          )}

          {/* TAB 3: FEEDBACK */}
          {activeTab === 'feedback' && (
            <>
              {/* Feedback Ticket */}
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                      <CheckCircle2 size={12} /> Đã xử lý
                    </span>
                    <span className="text-xs font-medium text-slate-500">Ticket #FB-002 • 10/10/2023</span>
                  </div>
                  <div className="text-slate-400 cursor-pointer"><MoreHorizontal size={20} /></div>
                </div>
                <h3 className="text-md font-bold text-slate-800 dark:text-white mb-2">Đề xuất bổ sung lò vi sóng tại khu vực Pantry tầng 3</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                  Hiện tại số lượng nhân sự tầng 3 đông nhưng chỉ có 1 lò vi sóng, gây ùn tắc vào giờ nghỉ trưa. Đề nghị công ty trang bị thêm.
                </p>
              </div>

              {/* Pending Feedback */}
              <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                      <Clock size={12} /> Đang chờ duyệt
                    </span>
                    <span className="text-xs font-medium text-slate-500">Ticket #FB-003 • Vừa xong</span>
                  </div>
                  <div className="text-slate-400 cursor-pointer"><MoreHorizontal size={20} /></div>
                </div>
                <h3 className="text-md font-bold text-slate-800 dark:text-white mb-2">Kiến nghị về quy trình xin duyệt chi phí công tác</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">
                  Quy trình hiện tại qua quá nhiều bước trên giấy tờ, đề xuất số hóa toàn bộ lên hệ thống ERP để tiết kiệm thời gian...
                </p>
              </div>
            </>
          )}

        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert size={16} className="text-orange-500" /> Nội quy nổi bật
            </h3>
            <ul className="space-y-3">
              <li className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary cursor-pointer line-clamp-2">Sổ tay văn hóa doanh nghiệp Nam Việt 2024</li>
              <li className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary cursor-pointer line-clamp-2">Quy định về bảo mật thông tin nội bộ</li>
              <li className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary cursor-pointer line-clamp-2">Hướng dẫn sử dụng hệ thống ERP</li>
            </ul>
          </div>
        </div>
      </div>

      {/* MOCKUP CREATE MODAL */}
      {isCreateModalOpen && (
        <>
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100]" onClick={() => setIsCreateModalOpen(false)}></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl z-[110] p-6 animate-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
              {activeTab === 'announcements' ? 'Tạo thông báo mới' : activeTab === 'community' ? 'Viết bài mới' : 'Gửi góp ý/khiếu nại'}
            </h2>
            
            <div className="space-y-4">
              {activeTab !== 'community' && (
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Tiêu đề</label>
                  <input type="text" className="w-full border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary-500/20" placeholder="Nhập tiêu đề..." />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1.5">Nội dung</label>
                <textarea rows={5} className="w-full border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white outline-none focus:border-primary focus:ring-2 focus:ring-primary-500/20" placeholder="Nội dung chi tiết..."></textarea>
              </div>

              {activeTab === 'feedback' && (
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="anonymous" className="rounded text-primary focus:ring-primary" />
                  <label htmlFor="anonymous" className="text-sm font-medium text-slate-600 dark:text-slate-400">Gửi ẩn danh (Không hiện tên)</label>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary-600 shadow-md shadow-primary-500/30 transition-colors"
              >
                Đăng tải
              </button>
            </div>
          </div>
        </>
      )}

    </main>
  );
}
