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
  AlertTriangle,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TOOLS } from '../data/tools';

interface ToolDetailViewProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ToolDetailView: React.FC<ToolDetailViewProps> = ({ slug, onNavigate }) => {
  const tool = TOOLS.find((t) => t.slug === slug);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // Pomodoro state
  const [mode, setMode] = useState<'work' | 'short' | 'long'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [taskName, setTaskName] = useState('');

  // Word counter state
  const [text, setText] = useState('');
  const [copiedText, setCopiedText] = useState(false);

  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(783.99, audioCtx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch {
      // Ignore audio autoplay restrictions
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;
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
    return () => {
      if (timer) clearInterval(timer);
    };
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

  // Word counter metrics
  const cleanTrimmed = text.trim();
  const wordCount = cleanTrimmed ? cleanTrimmed.split(/\s+/).length : 0;
  const charWithSpaces = text.length;
  const charWithoutSpaces = text.replace(/\s+/g, '').length;
  const sentenceCount = cleanTrimmed
    ? (cleanTrimmed.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || 1
    : 0;
  const readingTimeMin = Math.ceil(wordCount / 200) || 1;
  const speakingTimeMin = Math.ceil(wordCount / 130) || 1;

  const copyTextToClipboard = () => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  if (!tool) {
    return (
      <div className="max-w-lg mx-auto py-12 px-6 text-center bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl space-y-4">
        <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
          Công cụ không tồn tại
        </h2>
        <button
          type="button"
          onClick={() => onNavigate('/tool')}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-[#4168E1] hover:bg-[#3154C4] dark:bg-[#5B7FF0] dark:hover:bg-[#7695F5] text-white transition-colors cursor-pointer"
        >
          Quay lại danh mục công cụ
        </button>
      </div>
    );
  }

  return (
    <div
      className={`space-y-6 ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-[#F8FAFC] dark:bg-[#0B1120] p-4 sm:p-6 overflow-y-auto'
          : ''
      }`}
    >
      {/* Top Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            if (isFullscreen) setIsFullscreen(false);
            onNavigate('/tool');
          }}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748B] dark:text-[#94A3B8] hover:text-[#4168E1] dark:hover:text-[#5B7FF0] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về danh mục công cụ</span>
        </button>

        <div className="flex items-center gap-2">
          {tool.type === 'embed' && (
            <button
              type="button"
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] transition-colors cursor-pointer"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
              <span>{isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}</span>
            </button>
          )}

          {tool.type !== 'internal' && (
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] transition-colors"
            >
              <span>Mở tab mới</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Tool Information Header */}
      <section className="pb-5 border-b border-[#E2E8F0] dark:border-[#1E293B] space-y-2">
        <div className="flex items-center gap-2 text-xs text-[#64748B] dark:text-[#94A3B8]">
          <span className="font-medium text-[#4168E1] dark:text-[#5B7FF0]">
            {tool.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {tool.type === 'internal'
              ? 'Công cụ nội bộ Người Đồng Hành'
              : 'Công cụ nhúng trực tuyến'}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
          {tool.name}
        </h1>
        <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] max-w-3xl leading-relaxed">
          {tool.description}
        </p>
      </section>

      {/* Internal Tool 1: Pomodoro Focus */}
      {tool.slug === 'pomodoro-focus' && (
        <section className="max-w-2xl mx-auto p-6 sm:p-10 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl space-y-8">
          {/* Mode Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(
              [
                { id: 'work', label: 'Tập trung (25 phút)' },
                { id: 'short', label: 'Nghỉ ngắn (5 phút)' },
                { id: 'long', label: 'Nghỉ dài (15 phút)' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => switchMode(item.id)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm border transition-colors cursor-pointer ${
                  mode === item.id
                    ? 'bg-[#4168E1] dark:bg-[#5B7FF0] text-white border-[#4168E1] dark:border-[#5B7FF0] font-semibold'
                    : 'bg-[#F8FAFC] dark:bg-[#0B1120] text-[#64748B] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#334155] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] font-medium'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Timer Display */}
          <div className="text-center py-8 border-y border-[#E2E8F0] dark:border-[#1E293B]">
            <div className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] tabular-nums select-none">
              {formatTime(timeLeft)}
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] mt-3">
              {isRunning ? 'Đang đếm ngược · Giữ sự tập trung' : 'Sẵn sàng khởi động phiên làm việc'}
            </p>
          </div>

          {/* Task Input */}
          <div className="space-y-2">
            <label
              htmlFor="pomodoro-task"
              className="block text-xs font-medium text-[#64748B] dark:text-[#94A3B8]"
            >
              Mục tiêu phiên này
            </label>
            <input
              id="pomodoro-task"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Ví dụ: Ôn tập chương 3, hoàn thành bài tập..."
              className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#64748B] dark:placeholder:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#334155] rounded-lg focus:border-[#4168E1] dark:focus:border-[#5B7FF0] outline-hidden transition-colors"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setIsRunning((prev) => !prev)}
              className="px-7 py-2.5 rounded-lg text-sm font-semibold bg-[#4168E1] hover:bg-[#3154C4] dark:bg-[#5B7FF0] dark:hover:bg-[#7695F5] text-white inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              {isRunning ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              <span>{isRunning ? 'Tạm dừng' : 'Bắt đầu'}</span>
            </button>

            <button
              type="button"
              onClick={resetTimer}
              className="p-2.5 rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#111827] text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] transition-colors cursor-pointer"
              title="Đặt lại đồng hồ"
              aria-label="Đặt lại đồng hồ"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="p-2.5 rounded-lg border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#111827] text-[#64748B] dark:text-[#94A3B8] hover:text-[#0F172A] dark:hover:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] transition-colors cursor-pointer"
              title={soundEnabled ? 'Tắt âm báo' : 'Bật âm báo'}
              aria-label={soundEnabled ? 'Tắt âm báo' : 'Bật âm báo'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#4168E1] dark:text-[#5B7FF0]" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Session Counter */}
          <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8]">
            <span>Số phiên hoàn thành hôm nay</span>
            <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC] tabular-nums">
              {completedSessions} chu kỳ
            </span>
          </div>
        </section>
      )}

      {/* Internal Tool 2: Word Counter */}
      {tool.slug === 'word-counter' && (
        <section className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Số từ', val: wordCount },
              { label: 'Ký tự (có khoảng trắng)', val: charWithSpaces },
              { label: 'Ký tự (không khoảng trắng)', val: charWithoutSpaces },
              { label: 'Số câu', val: sentenceCount },
              { label: 'Thời gian đọc', val: `~${readingTimeMin} phút` },
              { label: 'Thời gian nói', val: `~${speakingTimeMin} phút` },
            ].map((metric) => (
              <div
                key={metric.label}
                className="p-4 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl"
              >
                <div className="text-xs text-[#64748B] dark:text-[#94A3B8]">
                  {metric.label}
                </div>
                <div className="text-2xl font-bold text-[#0F172A] dark:text-[#F8FAFC] mt-1 tabular-nums">
                  {metric.val}
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 sm:p-6 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0] dark:border-[#1E293B]">
              <span className="text-xs font-medium text-[#64748B] dark:text-[#94A3B8]">
                Nhập hoặc dán văn bản cần phân tích
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setText(text.toUpperCase())}
                  className="px-2.5 py-1 rounded-md border border-[#E2E8F0] dark:border-[#334155] text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] transition-colors cursor-pointer"
                >
                  Chữ in hoa
                </button>
                <button
                  type="button"
                  onClick={() => setText(text.toLowerCase())}
                  className="px-2.5 py-1 rounded-md border border-[#E2E8F0] dark:border-[#334155] text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] transition-colors cursor-pointer"
                >
                  Chữ thường
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const titleCase = text.replace(
                      /\w\S*/g,
                      (t) => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase()
                    );
                    setText(titleCase);
                  }}
                  className="px-2.5 py-1 rounded-md border border-[#E2E8F0] dark:border-[#334155] text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] transition-colors cursor-pointer"
                >
                  Viết hoa đầu từ
                </button>
                <button
                  type="button"
                  onClick={() => setText(text.replace(/\s+/g, ' ').trim())}
                  className="px-2.5 py-1 rounded-md border border-[#E2E8F0] dark:border-[#334155] text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] transition-colors cursor-pointer"
                >
                  Dọn khoảng trắng
                </button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="Gõ hoặc dán nội dung bài viết, tiểu luận, văn bản vào đây để đếm số từ tức thì..."
              className="w-full p-4 bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC] placeholder:text-[#64748B] dark:placeholder:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#334155] rounded-lg text-sm leading-relaxed focus:border-[#4168E1] dark:focus:border-[#5B7FF0] outline-hidden resize-y transition-colors"
            />

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={copyTextToClipboard}
                disabled={!text}
                className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium bg-[#4168E1] hover:bg-[#3154C4] dark:bg-[#5B7FF0] dark:hover:bg-[#7695F5] text-white inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                {copiedText ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedText ? 'Đã sao chép' : 'Sao chép'}</span>
              </button>

              <button
                type="button"
                onClick={() => setText('')}
                disabled={!text}
                className="px-4 py-2 rounded-lg text-xs sm:text-sm font-medium border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] inline-flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Xóa hết</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Embed Tools */}
      {tool.type === 'embed' && (
        <section className="space-y-4">
          {tool.embedNotice && (
            <div className="p-4 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl flex items-start gap-2.5 text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8]">
              <Info className="w-4 h-4 text-[#4168E1] dark:text-[#5B7FF0] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                  Lưu ý nhúng an toàn:{' '}
                </span>
                <span>{tool.embedNotice}</span>
              </div>
            </div>
          )}

          <div className="relative w-full h-[75vh] min-h-[500px] bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl overflow-hidden">
            {iframeError ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <AlertTriangle className="w-8 h-8 text-[#64748B] dark:text-[#94A3B8]" />
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#F8FAFC]">
                  Nhà cung cấp chặn nhúng iframe
                </h3>
                <p className="text-sm text-[#64748B] dark:text-[#94A3B8] max-w-md">
                  Trang web đích thiết lập chính sách bảo mật ngăn nhúng trên trang khác. Vui lòng mở trực tiếp trên tab mới.
                </p>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[#4168E1] hover:bg-[#3154C4] dark:bg-[#5B7FF0] dark:hover:bg-[#7695F5] text-white inline-flex items-center gap-1.5 transition-colors"
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
        </section>
      )}
    </div>
  );
};
