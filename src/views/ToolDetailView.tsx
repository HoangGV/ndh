import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Trash2,
  Sparkles,
  AlertTriangle,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Tool } from '../types';
import { TOOLS } from '../data/tools';

interface ToolDetailViewProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ToolDetailView: React.FC<ToolDetailViewProps> = ({ slug, onNavigate }) => {
  const tool = TOOLS.find((t) => t.slug === slug);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // POMODORO STATE
  const [mode, setMode] = useState<'work' | 'short' | 'long'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [taskName, setTaskName] = useState('');

  // WORD COUNTER STATE
  const [text, setText] = useState('');
  const [copiedText, setCopiedText] = useState(false);

  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, audioCtx.currentTime + 0.25); // G5
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {}
  };

  // Pomodoro Timer Effect
  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playChime();
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
      if (mode === 'work') setCompletedSessions((c) => c + 1);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode: 'work' | 'short' | 'long') => {
    setIsRunning(false);
    setMode(newMode);
    if (newMode === 'work') setTimeLeft(25 * 60);
    if (newMode === 'short') setTimeLeft(5 * 60);
    if (newMode === 'long') setTimeLeft(15 * 60);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (mode === 'work') setTimeLeft(25 * 60);
    if (mode === 'short') setTimeLeft(5 * 60);
    if (mode === 'long') setTimeLeft(15 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Word Counter Calculations
  const cleanTrimmed = text.trim();
  const wordCount = cleanTrimmed ? cleanTrimmed.split(/\s+/).length : 0;
  const charWithSpaces = text.length;
  const charWithoutSpaces = text.replace(/\s+/g, '').length;
  const sentenceCount = cleanTrimmed ? (cleanTrimmed.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || 1 : 0;
  const paragraphCount = cleanTrimmed ? cleanTrimmed.split(/\n+/).filter(Boolean).length : 0;
  const readingTimeMin = Math.ceil(wordCount / 200) || 1;
  const speakingTimeMin = Math.ceil(wordCount / 130) || 1;

  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  if (!tool) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#181B22] brutal-card max-w-lg mx-auto space-y-4">
        <h2 className="text-2xl font-black">Công cụ không tồn tại</h2>
        <button
          onClick={() => onNavigate('/tool')}
          className="px-4 py-2 bg-[#FFD93D] text-black font-bold text-xs brutal-btn"
        >
          Quay lại danh mục công cụ
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#FAFAF5] dark:bg-[#0F1115] p-4 overflow-y-auto' : ''}`}>
      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => {
            if (isFullscreen) setIsFullscreen(false);
            onNavigate('/tool');
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white dark:bg-[#181B22] brutal-border shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#60A5FA] hover:bg-[#FFD93D] hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về danh mục công cụ</span>
        </button>

        <div className="flex items-center gap-2">
          {tool.type === 'embed' && (
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#FFD93D] text-black brutal-border shadow-[2px_2px_0_#111] hover:translate-x-[-1px] hover:translate-y-[-1px]"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
            </button>
          )}

          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white dark:bg-[#181B22] text-black dark:text-white brutal-border shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#60A5FA] hover:translate-x-[-1px] hover:translate-y-[-1px]"
          >
            <span>Mở tab mới</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Tool Information Banner */}
      <div className="p-6 bg-white dark:bg-[#181B22] brutal-card space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-[#4ADE80] text-black brutal-border">
            {tool.category}
          </span>
          <span className="text-xs font-bold text-gray-500">
            {tool.type === 'internal' ? 'Công cụ nội bộ NDH' : 'Công cụ nhúng trực tuyến'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#111111] dark:text-white">
          {tool.name}
        </h1>
        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
          {tool.description}
        </p>
      </div>

      {/* INTERNAL TOOL 1: POMODORO FOCUS */}
      {tool.slug === 'pomodoro-focus' && (
        <div className="max-w-2xl mx-auto p-6 sm:p-10 bg-white dark:bg-[#181B22] brutal-card space-y-8">
          <div className="flex items-center justify-center gap-2 p-1.5 bg-[#FAFAF5] dark:bg-[#12151C] brutal-border">
            <button
              onClick={() => switchMode('work')}
              className={`px-4 py-2 text-xs sm:text-sm font-black transition-all ${
                mode === 'work'
                  ? 'bg-[#4169E1] text-white brutal-border shadow-[2px_2px_0_#111]'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              🍅 Tập trung (25m)
            </button>
            <button
              onClick={() => switchMode('short')}
              className={`px-4 py-2 text-xs sm:text-sm font-black transition-all ${
                mode === 'short'
                  ? 'bg-[#4ADE80] text-black brutal-border shadow-[2px_2px_0_#111]'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              ☕ Nghỉ ngắn (5m)
            </button>
            <button
              onClick={() => switchMode('long')}
              className={`px-4 py-2 text-xs sm:text-sm font-black transition-all ${
                mode === 'long'
                  ? 'bg-[#FF9F43] text-black brutal-border shadow-[2px_2px_0_#111]'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              🛋️ Nghỉ dài (15m)
            </button>
          </div>

          <div className="text-center py-6 bg-[#FAFAF5] dark:bg-[#12151C] brutal-border shadow-[4px_4px_0_#111] dark:shadow-[4px_4px_0_#60A5FA]">
            <div className="font-mono text-6xl sm:text-8xl font-black tracking-tight text-[#111111] dark:text-white select-none">
              {formatTime(timeLeft)}
            </div>
            <p className="text-xs font-bold text-gray-500 mt-2">
              {isRunning ? 'ĐANG ĐẾM NGƯỢC · GIỮ SỰ TẬP TRUNG NHÉ!' : 'SẴN SÀNG KHỞI ĐỘNG'}
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-black uppercase text-gray-700 dark:text-gray-300">
              Mục tiêu phiên này của bạn:
            </label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Ví dụ: Ôn tập chương 3 Giải tích, Đọc xong bài viết Astro..."
              className="w-full px-3.5 py-2 text-sm font-bold bg-[#FAFAF5] dark:bg-[#12151C] brutal-border outline-hidden"
            />
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-8 py-3 text-sm sm:text-base font-black brutal-btn flex items-center gap-2 ${
                isRunning ? 'bg-[#FF6B9D] text-black' : 'bg-[#FFD93D] text-black'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              <span>{isRunning ? 'Tạm dừng' : 'Bắt đầu'}</span>
            </button>

            <button
              onClick={resetTimer}
              className="p-3 bg-white dark:bg-[#12151C] text-black dark:text-white brutal-btn"
              title="Đặt lại đồng hồ"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-3 bg-white dark:bg-[#12151C] text-black dark:text-white brutal-btn"
              title={soundEnabled ? 'Tắt âm báo' : 'Bật âm báo'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-[#4169E1]" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
            </button>
          </div>

          <div className="p-3 bg-[#4ADE80]/20 border-2 border-[#111111] dark:border-white/20 flex items-center justify-between text-xs font-bold">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#4ADE80]" />
              <span>Số phiên hoàn thành hôm nay:</span>
            </span>
            <span className="bg-[#4ADE80] text-black px-2.5 py-0.5 brutal-border">
              {completedSessions} chu kỳ
            </span>
          </div>
        </div>
      )}

      {/* INTERNAL TOOL 2: WORD & TEXT COUNTER */}
      {tool.slug === 'word-counter' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Số từ', val: wordCount, color: 'bg-[#FFD93D]' },
              { label: 'Ký tự (gồm dấu cách)', val: charWithSpaces, color: 'bg-[#4ADE80]' },
              { label: 'Ký tự (không dấu cách)', val: charWithoutSpaces, color: 'bg-[#38BDF8]' },
              { label: 'Số câu', val: sentenceCount, color: 'bg-[#FF6B9D]' },
              { label: 'Thời gian đọc', val: `~${readingTimeMin}p`, color: 'bg-[#FF9F43]' },
              { label: 'Thời gian nói', val: `~${speakingTimeMin}p`, color: 'bg-[#A78BFA]' },
            ].map((m, i) => (
              <div key={i} className={`p-3.5 ${m.color} text-black brutal-card`}>
                <div className="text-[11px] font-bold text-black/80">{m.label}</div>
                <div className="text-2xl font-black mt-1 font-mono">{m.val}</div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-white dark:bg-[#181B22] brutal-card space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 dark:border-white/10 pb-3">
              <div className="text-xs font-black uppercase tracking-wider text-gray-500">
                Nhập hoặc dán văn bản cần phân tích
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <button
                  onClick={() => setText(text.toUpperCase())}
                  className="px-2 py-1 bg-gray-100 dark:bg-[#141820] border border-black dark:border-white/20 hover:bg-[#FFD93D] hover:text-black"
                >
                  IN HOA
                </button>
                <button
                  onClick={() => setText(text.toLowerCase())}
                  className="px-2 py-1 bg-gray-100 dark:bg-[#141820] border border-black dark:border-white/20 hover:bg-[#4ADE80] hover:text-black"
                >
                  in thường
                </button>
                <button
                  onClick={() => {
                    const titleCase = text.replace(
                      /\w\S*/g,
                      (t) => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase()
                    );
                    setText(titleCase);
                  }}
                  className="px-2 py-1 bg-gray-100 dark:bg-[#141820] border border-black dark:border-white/20 hover:bg-[#38BDF8] hover:text-black"
                >
                  Hoa Đầu Từ
                </button>
                <button
                  onClick={() => setText(text.replace(/\s+/g, ' ').trim())}
                  className="px-2 py-1 bg-gray-100 dark:bg-[#141820] border border-black dark:border-white/20 hover:bg-[#FF9F43] hover:text-black"
                >
                  Dọn khoảng cách
                </button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="Gõ hoặc dán nội dung bài viết, tiểu luận, văn bản vào đây để bắt đầu đếm số từ tức thì..."
              className="w-full p-4 bg-[#FAFAF5] dark:bg-[#12151C] brutal-border font-mono text-sm leading-relaxed outline-hidden resize-y placeholder:text-gray-400"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={copyTextToClipboard}
                  disabled={!text}
                  className="px-3.5 py-1.5 text-xs font-bold bg-[#4ADE80] text-black brutal-btn flex items-center gap-1.5 disabled:opacity-40"
                >
                  {copiedText ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText ? 'Đã sao chép!' : 'Sao chép'}</span>
                </button>
                <button
                  onClick={() => setText('')}
                  disabled={!text}
                  className="px-3.5 py-1.5 text-xs font-bold bg-[#FF6B9D] text-black brutal-btn flex items-center gap-1.5 disabled:opacity-40"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa hết</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EMBED TOOLS */}
      {tool.type === 'embed' && (
        <div className="space-y-4">
          <div className="p-3.5 bg-blue-50 dark:bg-[#152238] border-2 border-[#4169E1] flex items-start gap-2.5 text-xs text-gray-700 dark:text-gray-200">
            <Info className="w-4 h-4 text-[#4169E1] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Lưu ý nhúng an toàn: </span>
              <span>{tool.embedNotice}</span>
            </div>
          </div>

          <div className="relative w-full h-[75vh] min-h-[500px] bg-white dark:bg-[#141820] brutal-border shadow-[6px_6px_0_#111] dark:shadow-[6px_6px_0_#60A5FA] overflow-hidden">
            {iframeError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-[#181B22] space-y-4">
                <AlertTriangle className="w-10 h-10 text-[#FF9F43]" />
                <h3 className="text-lg font-black">Nhà cung cấp chặn nhúng iframe</h3>
                <p className="text-xs text-gray-500 max-w-md">
                  Trang web đích thiết lập chính sách bảo mật X-Frame-Options để ngăn nhúng trên trang khác. Vui lòng mở trực tiếp trên tab mới.
                </p>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#FFD93D] text-black font-extrabold text-xs brutal-btn inline-flex items-center gap-1.5"
                >
                  <span>Mở trang web gốc</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <iframe
                src={tool.url}
                title={tool.name}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                onError={() => setIframeError(true)}
                className="w-full h-full border-none"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
