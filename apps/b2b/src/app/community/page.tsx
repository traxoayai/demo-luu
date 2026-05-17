'use client';

import React, { useState } from 'react';
import { ChevronLeft, Search, Heart, MessageCircle, Share2, MoreHorizontal, Image as ImageIcon, Send, Verified, Users, FileText } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});

  const toggleLike = (id: number) => {
    setLikes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const POSTS = [
    {
      id: 1,
      author: {
        name: 'Admin Nam Việt',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
        verified: true,
        role: 'Quản trị viên',
      },
      time: '2 giờ trước',
      content: '🎉 CẬP NHẬT CHÍNH SÁCH BÁN HÀNG QUÝ 3/2026 🎉\n\nKính gửi Quý Nhà Thuốc, Nam Việt xin trân trọng thông báo chương trình siêu khuyến mãi tháng 6. Tất cả các đơn hàng trên 5 triệu đều được giảm giá trực tiếp 5% và tặng kèm bộ quà tặng y tế cao cấp.\n\nHãy lên đơn ngay hôm nay!',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
      stats: { likes: 124, comments: 45 },
    },
    {
      id: 2,
      author: {
        name: 'Nhà thuốc Phương Mai',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PhuongMai',
        verified: false,
        role: 'Đối tác hạng Vàng',
      },
      time: '5 giờ trước',
      content: 'Có nhà thuốc nào ở khu vực Cầu Giấy, Hà Nội đang chia lô thuốc ho Bảo Thanh không ạ? Mình đang cần gấp 2 thùng để phục vụ khách đợt giao mùa này. Ib mình nhé, xin cảm ơn!',
      image: null,
      stats: { likes: 12, comments: 8 },
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-32 md:pb-10 font-sans text-slate-900 selection:bg-orange-200">
      
      {/* HEADER */}
      <header className="bg-white sticky top-0 z-40 border-b border-slate-100 px-4 py-3 md:px-8 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full flex items-center justify-center transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <div>
             <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">Cộng đồng Dược</h1>
             <p className="text-[11px] font-medium text-slate-500">12.500+ nhà thuốc tham gia</p>
          </div>
        </div>
        <button className="w-10 h-10 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-full flex items-center justify-center transition-colors">
           <Search size={20} />
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-3xl mx-auto px-4 pt-6 space-y-6">
         
         {/* CREATE POST BOX */}
         <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm">
            <div className="flex gap-3">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=HungLe" className="w-10 h-10 rounded-full bg-slate-100 shrink-0" alt="Avatar" />
               <div className="flex-1">
                  <textarea 
                     placeholder="Chia sẻ kinh nghiệm, hỏi đáp hoặc tìm nguồn hàng..." 
                     className="w-full bg-slate-50 rounded-2xl border border-slate-100 p-3 text-sm font-medium text-slate-800 outline-none focus:border-blue-300 focus:bg-white transition-all resize-none min-h-[80px]"
                  />
                  <div className="flex justify-between items-center mt-3">
                     <div className="flex gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold hover:bg-blue-100 transition-colors">
                           <ImageIcon size={14} /> Ảnh
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold hover:bg-emerald-100 transition-colors">
                           <FileText size={14} /> Tài liệu
                        </button>
                     </div>
                     <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm transition-colors">
                        Đăng <Send size={14} />
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* FEED */}
         <div className="space-y-6">
            {POSTS.map(post => (
               <div key={post.id} className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm">
                  
                  {/* Post Header */}
                  <div className="flex justify-between items-start mb-4">
                     <div className="flex gap-3">
                        <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover bg-slate-100" />
                        <div>
                           <h3 className="font-bold text-slate-800 text-[15px] flex items-center gap-1">
                              {post.author.name} 
                              {post.author.verified && <Verified size={14} className="text-blue-500" />}
                           </h3>
                           <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-0.5">
                              <span>{post.time}</span>
                              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                              <span className={post.author.verified ? 'text-blue-600' : 'text-slate-500'}>{post.author.role}</span>
                           </div>
                        </div>
                     </div>
                     <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={20} />
                     </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-[15px] text-slate-700 leading-relaxed whitespace-pre-wrap mb-4">
                     {post.content}
                  </p>

                  {/* Post Image */}
                  {post.image && (
                     <div className="w-full rounded-2xl overflow-hidden mb-4 border border-slate-100">
                        <img src={post.image} alt="Post image" className="w-full h-auto object-cover max-h-[400px]" />
                     </div>
                  )}

                  {/* Post Stats */}
                  <div className="flex justify-between items-center text-xs font-medium text-slate-500 pb-3 border-b border-slate-100 mb-3">
                     <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">
                           <Heart size={10} className="text-orange-500 fill-orange-500" />
                        </div>
                        {post.stats.likes + (likes[post.id] ? 1 : 0)} lượt thích
                     </div>
                     <div>{post.stats.comments} bình luận</div>
                  </div>

                  {/* Post Actions */}
                  <div className="flex justify-between gap-2">
                     <button 
                        onClick={() => toggleLike(post.id)}
                        className={`flex-1 flex justify-center items-center gap-2 py-2 rounded-xl text-sm font-bold transition-colors ${likes[post.id] ? 'text-orange-600 bg-orange-50' : 'text-slate-500 hover:bg-slate-50'}`}
                     >
                        <Heart size={18} className={likes[post.id] ? 'fill-orange-600' : ''} /> 
                        {likes[post.id] ? 'Đã thích' : 'Thích'}
                     </button>
                     <button className="flex-1 flex justify-center items-center gap-2 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                        <MessageCircle size={18} /> Bình luận
                     </button>
                     <button className="flex-1 flex justify-center items-center gap-2 py-2 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-colors">
                        <Share2 size={18} /> Chia sẻ
                     </button>
                  </div>
               </div>
            ))}
         </div>

      </main>
    </div>
  );
}
