import React, { useState } from 'react';
import { Link2, Play, Pause, MoreVertical, Eye, Heart, MessageSquare, Clock, Plus, Sparkles, Check, RefreshCw } from 'lucide-react';

export default function VideoComparison({ 
  videos, 
  onAddVideo, 
  processingState, 
  setProcessingState 
}) {
  const [urlInput, setUrlInput] = useState('');
  const [playingId, setPlayingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    
    // Simulate analyzing state
    setProcessingState('analyzing');
    
    setTimeout(() => {
      setProcessingState('complete');
      onAddVideo({
        id: `video-c-${Date.now()}`,
        title: `Video C: AI and the Next Decade`,
        creator: 'Future Tech Lab',
        followers: '680k followers',
        durationText: '10m 15s',
        views: '320k',
        likes: '45k',
        comments: '1.8k',
        duration: '10:15',
        engagement: 9.2,
        color: 'indigo',
        thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-typing-on-a-laptop-43232-large.mp4',
      });
      setUrlInput('');
    }, 2500);
  };

  const togglePlay = (id) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  return (
    <div className="w-full lg:w-3/5 flex flex-col gap-6">
      {/* Title */}
      <h1 className="text-xl font-bold tracking-wider text-white uppercase flex items-center gap-2">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-extrabold">📺</span>
        Video Analytics & Comparison
      </h1>

      {/* Add New Video Card */}
      <div className="bg-[#121424] border border-[#1f223a] rounded-xl p-5 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-[#2b3052]">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold tracking-wide text-gray-200 uppercase">
            Add New Video
          </h2>
          
          {/* Status Indicators */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className={`flex items-center gap-1.5 transition-all duration-300 ${
              processingState === 'analyzing' ? 'text-purple-400 font-semibold' : 'text-gray-500'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                processingState === 'analyzing' ? 'bg-purple-500 animate-pulse' : 'bg-gray-700'
              }`} />
              {processingState === 'analyzing' ? (
                <span className="flex items-center gap-1">
                  <RefreshCw size={12} className="animate-spin" /> Analyzing...
                </span>
              ) : 'Analyzing...'}
            </span>
            
            <span className={`flex items-center gap-1.5 transition-all duration-300 ${
              processingState === 'complete' ? 'text-teal-400 font-semibold' : 'text-gray-500'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                processingState === 'complete' ? 'bg-teal-500 shadow-[0_0_8px_#0d9488]' : 'bg-gray-700'
              }`} />
              Complete
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label htmlFor="videoUrl" className="block text-xs text-[#8e92b2]">
            Enter Video URL (YouTube, TikTok, etc.)
          </label>
          <div className="flex gap-3">
            <div className="relative flex-grow">
              <Link2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="videoUrl"
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Drop URL"
                disabled={processingState === 'analyzing'}
                className="w-full pl-10 pr-4 py-2.5 bg-[#171a2e] border border-[#2b3052] rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={processingState === 'analyzing'}
              className="px-6 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] active:scale-95 disabled:scale-100 disabled:opacity-50 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-purple-500/20 transition-all duration-150 flex items-center gap-2"
            >
              {processingState === 'analyzing' ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Process Video
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {videos.map((video) => {
          const isPlaying = playingId === video.id;
          const isPurple = video.color === 'purple';
          const isTeal = video.color === 'teal';
          const isIndigo = video.color === 'indigo';
          
          let cardBorderClass = "border-[#1f223a] hover:border-gray-700";
          let accentGlowClass = "";
          let creatorBadgeBg = "bg-purple-900/30 text-purple-300";
          let progressBg = "bg-[#7c3aed]";
          
          if (isPurple) {
            cardBorderClass = "border-purple-600/80 shadow-[0_0_15px_rgba(124,58,237,0.15)]";
            accentGlowClass = "animate-pulse-glow-purple";
            creatorBadgeBg = "bg-purple-950/40 text-purple-300 border border-purple-800/40";
            progressBg = "bg-gradient-to-r from-purple-600 to-indigo-500";
          } else if (isTeal) {
            cardBorderClass = "border-teal-600/80 shadow-[0_0_15px_rgba(13,148,136,0.15)]";
            accentGlowClass = "animate-pulse-glow-teal";
            creatorBadgeBg = "bg-teal-950/40 text-teal-300 border border-teal-800/40";
            progressBg = "bg-gradient-to-r from-teal-600 to-emerald-500";
          } else if (isIndigo) {
            cardBorderClass = "border-indigo-600/80 shadow-[0_0_15px_rgba(99,102,241,0.15)]";
            creatorBadgeBg = "bg-indigo-950/40 text-indigo-300 border border-indigo-800/40";
            progressBg = "bg-gradient-to-r from-indigo-600 to-purple-500";
          }

          return (
            <div 
              key={video.id} 
              className={`bg-[#121424] border rounded-2xl p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-300 ${cardBorderClass} ${accentGlowClass}`}
            >
              <div>
                {/* Card Header */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold tracking-wide text-gray-200 flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-ping' : 'bg-gray-500'}`} />
                    {video.id === 'video-a' ? 'Video A' : video.id === 'video-b' ? 'Video B' : 'Video C'}
                  </span>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>

                {/* Video Player Box */}
                <div 
                  onClick={() => togglePlay(video.id)}
                  className={`group relative aspect-video rounded-xl overflow-hidden cursor-pointer bg-[#0b0c16] border ${
                    isPurple ? 'border-purple-500/30' : isTeal ? 'border-teal-500/30' : 'border-indigo-500/30'
                  } transition-all duration-300 hover:shadow-lg`}
                >
                  {isPlaying ? (
                    <video
                      src={video.videoUrl}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  {/* Dark overlay with play/pause */}
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
                    isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
                  }`}>
                    <div className="p-3 bg-black/60 rounded-full text-white backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
                      {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" className="ml-0.5" />}
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <span className="absolute bottom-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 bg-black/85 text-white tracking-wider rounded border border-white/10 backdrop-blur-sm">
                    {video.duration}
                  </span>
                </div>

                {/* Video Description */}
                <div className="mt-4 space-y-3">
                  <h3 className="text-base font-bold text-white tracking-tight leading-snug hover:text-purple-300 transition-colors">
                    {video.title}
                  </h3>
                  
                  {/* Creator */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block">Creator</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${creatorBadgeBg}`}>
                        {video.creator}
                      </span>
                      <span className="text-xs text-[#8e92b2]">{video.followers}</span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-4 gap-2 mt-5">
                  <div className="bg-[#171a2e] border border-[#1f223a] rounded-lg p-2 text-center transition-all duration-150 hover:bg-[#1c2038]">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">Views</span>
                    <span className="text-sm font-bold text-white flex items-center justify-center gap-1">
                      <Eye size={12} className="text-gray-400" />
                      {video.views}
                    </span>
                  </div>
                  
                  <div className="bg-[#171a2e] border border-[#1f223a] rounded-lg p-2 text-center transition-all duration-150 hover:bg-[#1c2038]">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">Likes</span>
                    <span className="text-sm font-bold text-white flex items-center justify-center gap-1">
                      <Heart size={12} className="text-gray-400" />
                      {video.likes}
                    </span>
                  </div>

                  <div className="bg-[#171a2e] border border-[#1f223a] rounded-lg p-2 text-center transition-all duration-150 hover:bg-[#1c2038]">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">Comments</span>
                    <span className="text-sm font-bold text-white flex items-center justify-center gap-1">
                      <MessageSquare size={12} className="text-gray-400" />
                      {video.comments}
                    </span>
                  </div>

                  <div className="bg-[#171a2e] border border-[#1f223a] rounded-lg p-2 text-center transition-all duration-150 hover:bg-[#1c2038]">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block mb-0.5">Duration</span>
                    <span className="text-sm font-bold text-white flex items-center justify-center gap-1">
                      <Clock size={12} className="text-gray-400" />
                      <span className="whitespace-nowrap">{video.durationText}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Engagement Rate */}
              <div className="mt-5 border-t border-[#1f223a] pt-4">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Engagement Rate</span>
                  <span className="font-bold text-white flex items-center gap-1">
                    <Sparkles size={11} className={isPurple ? 'text-purple-400' : isTeal ? 'text-teal-400' : 'text-indigo-400'} />
                    Engagement Rate: {video.engagement}%
                  </span>
                </div>
                <div className="h-2 w-full bg-[#171a2e] rounded-full overflow-hidden border border-[#1f223a]">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out`} 
                    style={{ width: `${Math.min(video.engagement * 10, 100)}%` }}
                  >
                    <div className={`h-full w-full ${progressBg}`} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
