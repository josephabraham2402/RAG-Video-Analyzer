import React, { useState } from 'react';
import VideoComparison from './components/VideoComparison';
import AnalysisChat from './components/AnalysisChat';

const INITIAL_VIDEOS = [
  {
    id: 'video-a',
    title: 'Video A: The Future of Tech',
    creator: 'Alex Tech',
    followers: '1.2M followers',
    durationText: '8m 34s',
    views: '1.5M',
    likes: '120k',
    comments: '4.5k',
    duration: '8:34',
    engagement: 7.8,
    color: 'purple',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-playing-video-game-with-headphones-40081-large.mp4',
  },
  {
    id: 'video-b',
    title: 'Video B: Reviewing the new device',
    creator: 'Gadget Guru',
    followers: '950k followers',
    durationText: '12m 15s',
    views: '890k',
    likes: '78k',
    comments: '3.1k',
    duration: '12:15',
    engagement: 6.4,
    color: 'teal',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-smartphone-with-green-screen-39722-large.mp4',
  }
];

const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    role: 'user',
    content: 'How does the pacing compare in Video B vs Video A?'
  },
  {
    id: 'msg-2',
    role: 'assistant',
    content: 'Video B [Video B] has a much slower, narrative pacing compared to Video A [Video A], which moves quickly from point to point. Video A [Video A] covers five features in the first 3 minutes, while Video B [Video B] focuses on one deep dive during that time. The average scene duration in Video A [Video A] is 4 seconds versus 12 seconds in Video B [Video B].\n\n(Source: Transcription data analysis [Video A] [Video B]).'
  }
];

const SUGGESTED_PROMPTS = [
  'Compare visual styles',
  'What are the main topics?',
  'Analyze audience reception',
  'List key arguments',
  'How do they differ in pacing?'
];

const MOCK_ANSWERS = {
  'compare visual styles': 
    'Video A [Video A] utilizes a high-contrast, professional studio lighting setup with a shallow depth of field, putting absolute focus on the speaker. In contrast, Video B [Video B] is shot in a bright room with ambient natural light, conveying an open, daily lifestyle-oriented review format. The color tone in Video A [Video A] is slightly warmer, whereas Video B [Video B] uses a cooler, modern tech tone.\n\n(Source: Computer vision analysis [Video A] [Video B]).',
  
  'what are the main topics?': 
    'Video A [Video A] addresses high-level technical metrics: processor lithography, silicon power efficiency, and hardware neural engines. Video B [Video B] shifts the spotlight to user experience: tactile keyboard feel, camera color profiles, display glare, and overall product value.\n\n(Source: Semantic transcription indexing [Video A] [Video B]).',
  
  'analyze audience reception': 
    'The overall sentiment for both products is positive but reflects different demographics. Video A [Video A] sparks enthusiast-level discussions in the comments regarding custom computing benchmarks (7.8% engagement rate), while Video B [Video B] triggers mass-market conversations on price-to-performance, warranty, and color options (6.4% engagement rate).\n\n(Source: Comment sentiment analysis [Video A] [Video B]).',
  
  'list key arguments': 
    '• In Video A [Video A], the presenter argues that dedicated silicon blocks for AI workflows are the single most important factor for purchasing tech this year.\n• In Video B [Video B], the reviewer counter-argues that software optimization is more critical than hardware bumps, advising viewers to prioritize battery life and daily ergonomics instead.\n\n(Source: Speech-to-text semantic summaries [Video A] [Video B]).',
  
  'how do they differ in pacing?': 
    'Video B [Video B] has a much slower, narrative pacing compared to Video A [Video A], which moves quickly from point to point. Video A [Video A] covers five features in the first 3 minutes, while Video B [Video B] focuses on one deep dive during that time. The average scene duration in Video A [Video A] is 4 seconds versus 12 seconds in Video B [Video B].\n\n(Source: Transcription data analysis [Video A] [Video B]).'
};

export default function App() {
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isStreaming, setIsStreaming] = useState(false);
  const [processingState, setProcessingState] = useState('idle'); // idle, analyzing, complete

  const handleSendMessage = (text) => {
    // Add user message
    const userMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: text
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsStreaming(true);

    // Simulate AI thinking and streaming
    setTimeout(() => {
      let replyContent = `I have received your inquiry: "${text}". After scanning the active indexes of the video comparison corpus, here are the key findings:\n\n• For Video A [Video A], the script details core technical specifications, while for Video B [Video B], the focus is practical user benchmarks.\n\nLet me know if I should delve deeper into specific segments!`;
      
      const normalizedQuery = text.trim().toLowerCase();
      if (MOCK_ANSWERS[normalizedQuery]) {
        replyContent = MOCK_ANSWERS[normalizedQuery];
      } else {
        // Try fuzzy match
        const foundKey = Object.keys(MOCK_ANSWERS).find(key => normalizedQuery.includes(key) || key.includes(normalizedQuery));
        if (foundKey) {
          replyContent = MOCK_ANSWERS[foundKey];
        }
      }

      // Check if we have Video C added, adjust source citation dynamically!
      if (videos.length > 2) {
        replyContent = replyContent.replace('Source: Transcription data analysis [Video A] [Video B]', 'Source: Transcription data analysis [Video A] [Video B] [Video C]');
        replyContent = replyContent.replace('[Video A] [Video B]', '[Video A] [Video B] [Video C]');
      }

      setIsStreaming(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-ai-${Date.now()}`,
          role: 'assistant',
          content: replyContent
        }
      ]);
    }, 2000);
  };

  const handleAddVideo = (newVideo) => {
    setVideos((prev) => [...prev, newVideo]);
  };

  return (
    <main className="min-h-screen bg-[#0b0c16] text-white p-4 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Visual background ambient blobs for luxury feel */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-teal-950/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Main Two-Panel Layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch">
        
        {/* Left Panel - Video Analytics & Comparison */}
        <VideoComparison 
          videos={videos}
          onAddVideo={handleAddVideo}
          processingState={processingState}
          setProcessingState={setProcessingState}
        />

        {/* Right Panel - Analysis Chat Panel */}
        <AnalysisChat 
          messages={messages}
          onSendMessage={handleSendMessage}
          isStreaming={isStreaming}
          suggestedPrompts={SUGGESTED_PROMPTS}
        />
        
      </div>
    </main>
  );
}
