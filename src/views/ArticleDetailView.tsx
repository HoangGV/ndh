import React, { useMemo, useEffect, useState, useRef } from 'react';
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Check, ListTree, User, ChevronDown, ChevronUp, Copy, BookOpen, X } from 'lucide-react';
import { marked, Marked } from 'marked';
import katex from 'katex';
import { Post, TocItem } from '../types';
import { POSTS } from '../data/posts';
import { TagBadge } from '../components/TagBadge';

interface ArticleDetailViewProps {
  slug: string;
  onNavigate: (path: string) => void;
}

// Helper to escape HTML characters in raw code blocks
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Process Markdown with LaTeX and Custom Code Blocks
function renderMarkdownWithLatexAndCode(rawContent: string): { html: string; toc: TocItem[] } {
  const headings: TocItem[] = [];

  // Extract headings for Table of Contents
  const lines = rawContent.split('\n');
  lines.forEach((line) => {
    const h2Match = line.match(/^##\s+(.*)$/);
    const h3Match = line.match(/^###\s+(.*)$/);
    if (h2Match) {
      const text = h2Match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s\u00C0-\u024F\u1EA0-\u1EF9]/gi, '')
        .replace(/\s+/g, '-');
      headings.push({ id, text, level: 2 });
    } else if (h3Match) {
      const text = h3Match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s\u00C0-\u024F\u1EA0-\u1EF9]/gi, '')
        .replace(/\s+/g, '-');
      headings.push({ id, text, level: 3 });
    }
  });

  // Step 1: Protect code blocks & inline code from LaTeX regex parsing
  const codeBlocks: string[] = [];
  const protectedContent = rawContent.replace(/(```[\s\S]*?```|`[^`\n]+`)/g, (match) => {
    const placeholder = `%%PROTECTED_CODE_TOKEN_${codeBlocks.length}%%`;
    codeBlocks.push(match);
    return placeholder;
  });

  // Step 2: Render block math $$ ... $$
  let mathProcessed = protectedContent.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      const rendered = katex.renderToString(math.trim(), {
        displayMode: true,
        throwOnError: false,
      });
      return `\n\n<div class="katex-block-wrapper my-6 p-4 overflow-x-auto text-center bg-[#FAFAF5] dark:bg-[#151922] brutal-border shadow-[3px_3px_0_#111] dark:shadow-[3px_3px_0_#60A5FA] select-all">${rendered}</div>\n\n`;
    } catch {
      return `\n\n<pre class="katex-error text-red-500 font-mono text-xs">${escapeHtml(math)}</pre>\n\n`;
    }
  });

  // Step 3: Render inline math $ ... $ (excluding escaped \$)
  mathProcessed = mathProcessed.replace(/(?<!\\)\$([^\$\n]+?)(?<!\\)\$/g, (_, math) => {
    try {
      const rendered = katex.renderToString(math.trim(), {
        displayMode: false,
        throwOnError: false,
      });
      return `<span class="katex-inline px-1 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-black dark:text-blue-100 font-serif">${rendered}</span>`;
    } catch {
      return `<code class="katex-error text-red-500">${escapeHtml(math)}</code>`;
    }
  });

  // Step 4: Restore protected code blocks
  const restored = mathProcessed.replace(/%%PROTECTED_CODE_TOKEN_(\d+)%%/g, (_, idx) => {
    return codeBlocks[Number(idx)];
  });

  // Step 5: Configure marked with Custom Code Renderer (Header + Language + Copy Button)
  const customMarked = new Marked();

  customMarked.use({
    renderer: {
      code(arg: any, langStr?: string) {
        const text = typeof arg === 'string' ? arg : arg.text || '';
        const lang = typeof arg === 'string' ? (langStr || 'text') : (arg.lang || 'text');
        const cleanLang = lang.trim().toLowerCase() || 'code';
        const encodedCode = encodeURIComponent(text);

        return `
          <div class="code-block-container my-6 brutal-border shadow-[3px_3px_0_#111] dark:shadow-[3px_3px_0_#60A5FA] overflow-hidden bg-[#0F1115] text-gray-100">
            <div class="flex items-center justify-between px-3.5 py-2 bg-[#1A1E26] border-b-2 border-black dark:border-white/20 select-none">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#FF6B9D] border border-black inline-block"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-[#FFD93D] border border-black inline-block"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-[#4ADE80] border border-black inline-block"></span>
                <span class="ml-2 font-mono text-[11px] font-bold uppercase tracking-wider text-gray-300">${escapeHtml(cleanLang)}</span>
              </div>
              <button
                type="button"
                class="copy-code-btn inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-bold bg-[#FFD93D] hover:bg-[#FFE57F] text-black brutal-border cursor-pointer transition-transform active:translate-x-[1px] active:translate-y-[1px]"
                data-code="${encodedCode}"
                title="Sao chép toàn bộ mã nguồn"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                <span class="copy-btn-text">Sao chép</span>
              </button>
            </div>
            <pre class="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed text-gray-200"><code>${escapeHtml(text)}</code></pre>
          </div>
        `;
      },
      heading(arg: any, levelNum?: number) {
        const text = typeof arg === 'string' ? arg : arg.text || '';
        const level = typeof arg === 'string' ? (levelNum || 1) : (arg.depth || 1);
        const plainText = text.replace(/<[^>]*>/g, '');
        const id = plainText
          .toLowerCase()
          .replace(/[^\w\s\u00C0-\u024F\u1EA0-\u1EF9]/gi, '')
          .replace(/\s+/g, '-');

        if (level === 1) {
          return `<h1 id="${id}" class="text-2xl sm:text-3xl font-black mt-8 mb-4 border-b-2 border-black dark:border-white/20 pb-2">${text}</h1>`;
        }
        if (level === 2) {
          return `<h2 id="${id}" class="text-xl sm:text-2xl font-extrabold mt-8 mb-3 text-[#4169E1] dark:text-[#60A5FA] flex items-center gap-2"><span>#</span><span>${text}</span></h2>`;
        }
        if (level === 3) {
          return `<h3 id="${id}" class="text-lg font-bold mt-6 mb-2 text-[#111111] dark:text-gray-100">${text}</h3>`;
        }
        return `<h${level} id="${id}" class="font-bold my-4">${text}</h${level}>`;
      }
    }
  });

  const parsedHtml = customMarked.parse(restored, { async: false }) as string;
  return { html: parsedHtml, toc: headings };
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  slug,
  onNavigate,
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [tocExpanded, setTocExpanded] = useState(true);
  const [showFloatingToc, setShowFloatingToc] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const postIndex = POSTS.findIndex((p) => p.slug === slug);
  const post = POSTS[postIndex];

  const prevPost = postIndex > 0 ? POSTS[postIndex - 1] : null;
  const nextPost = postIndex < POSTS.length - 1 ? POSTS[postIndex + 1] : null;

  // Compute parsed HTML with LaTeX & Code buttons
  const { toc, html: htmlContent } = useMemo(() => {
    if (!post) return { toc: [] as TocItem[], html: '' };
    return renderMarkdownWithLatexAndCode(post.content);
  }, [post]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Monitor scroll for floating TOC button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Event Delegation for Copy Buttons in Code Blocks
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleCopyClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.copy-code-btn') as HTMLElement | null;
      if (!target) return;

      const encoded = target.getAttribute('data-code');
      if (!encoded) return;

      const code = decodeURIComponent(encoded);
      navigator.clipboard.writeText(code).then(() => {
        const textSpan = target.querySelector('.copy-btn-text');
        const originalText = textSpan ? textSpan.textContent : 'Sao chép';

        target.classList.remove('bg-[#FFD93D]', 'hover:bg-[#FFE57F]');
        target.classList.add('bg-[#4ADE80]');
        if (textSpan) textSpan.textContent = '✓ Đã chép!';

        setTimeout(() => {
          target.classList.remove('bg-[#4ADE80]');
          target.classList.add('bg-[#FFD93D]', 'hover:bg-[#FFE57F]');
          if (textSpan) textSpan.textContent = originalText || 'Sao chép';
        }, 2000);
      });
    };

    container.addEventListener('click', handleCopyClick);
    return () => {
      container.removeEventListener('click', handleCopyClick);
    };
  }, [htmlContent]);

  if (!post) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#181B22] brutal-card max-w-lg mx-auto space-y-4">
        <h2 className="text-2xl font-black">Bài viết không tồn tại</h2>
        <p className="text-sm text-gray-500">
          Đường dẫn không hợp lệ hoặc bài viết đã được cập nhật lại slug.
        </p>
        <button
          onClick={() => onNavigate('/')}
          className="px-4 py-2 bg-[#FFD93D] text-black font-bold text-xs brutal-btn"
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const scrollToHeading = (id: string) => {
    setShowFloatingToc(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      {/* Back to Home Button & Share Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-white dark:bg-[#181B22] brutal-border shadow-[2px_2px_0_#111] dark:shadow-[2px_2px_0_#60A5FA] hover:bg-[#FFD93D] hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về danh sách bài viết</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-[#FFD93D] text-black brutal-border shadow-[2px_2px_0_#111] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
        >
          {copiedShare ? <Check className="w-4 h-4 text-green-700" /> : <Share2 className="w-4 h-4" />}
          <span>{copiedShare ? 'Đã sao chép link!' : 'Chia sẻ bài viết'}</span>
        </button>
      </div>

      {/* Header Container */}
      <header className="p-6 sm:p-8 bg-white dark:bg-[#181B22] brutal-card space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <TagBadge key={t} tag={t} onClick={() => onNavigate(`/tag/${t}`)} />
          ))}
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-[#111111] dark:text-white leading-tight">
          {post.title}
        </h1>

        <p className="text-base font-medium text-gray-600 dark:text-gray-300">
          {post.description}
        </p>

        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-500 dark:text-gray-400 pt-3 border-t border-black/10 dark:border-white/10">
          <span className="flex items-center gap-1.5 text-black dark:text-white">
            <User className="w-3.5 h-3.5 text-[#4169E1] dark:text-[#60A5FA]" />
            <span>Tác giả: Hoàng Lam</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Ngày đăng: {post.pubDate}</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Thời lượng đọc: ~{post.readingTimeMinutes} phút</span>
          </span>
        </div>
      </header>

      {/* RE-POSITIONED TABLE OF CONTENTS: Inline Accordion at the top of the article */}
      {toc.length > 0 && (
        <section className="bg-white dark:bg-[#181B22] brutal-card overflow-hidden">
          <div
            onClick={() => setTocExpanded(!tocExpanded)}
            className="flex items-center justify-between p-4 cursor-pointer bg-blue-50/70 dark:bg-[#1E2533] border-b-2 border-black dark:border-white/20 select-none hover:bg-blue-100/70 dark:hover:bg-[#252E40] transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-[#4169E1] text-white brutal-border">
                <ListTree className="w-4 h-4" />
              </div>
              <div>
                <span className="font-black text-sm text-[#111111] dark:text-white uppercase tracking-wider">
                  Mục lục nội dung
                </span>
                <span className="ml-2 px-2 py-0.5 text-[10px] font-black bg-[#FFD93D] text-black brutal-border rounded-none">
                  {toc.length} mục
                </span>
              </div>
            </div>
            <button
              type="button"
              className="p-1.5 bg-white dark:bg-[#181B22] brutal-border text-black dark:text-white"
              aria-label="Toggle Table of Contents"
            >
              {tocExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {tocExpanded && (
            <div className="p-5">
              <nav className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm">
                {toc.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => scrollToHeading(item.id)}
                    className={`flex items-start text-left p-2 rounded-none transition-all hover:bg-[#FFD93D]/20 hover:translate-x-1 ${
                      item.level === 3
                        ? 'pl-6 text-gray-600 dark:text-gray-400 font-normal text-xs'
                        : 'font-bold text-[#111111] dark:text-gray-200'
                    }`}
                  >
                    <span className="mr-2 text-[#4169E1] dark:text-[#60A5FA] font-black">
                      {item.level === 3 ? '↳' : '•'}
                    </span>
                    <span className="line-clamp-2">{item.text}</span>
                  </button>
                ))}
              </nav>
            </div>
          )}
        </section>
      )}

      {/* Main Content Area: FULL WIDTH (max-w-4xl) */}
      <main className="p-6 sm:p-10 bg-white dark:bg-[#181B22] brutal-card">
        {post.cover && (
          <div className="mb-8 overflow-hidden brutal-border max-h-[460px]">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Custom Styled Markdown Body with LaTeX & Code Blocks */}
        <div
          ref={contentRef}
          className="prose prose-slate dark:prose-invert max-w-none text-base sm:text-[17px] leading-relaxed
            [&>h1]:text-2xl [&>h1]:font-black [&>h1]:mt-8 [&>h1]:mb-4 [&>h1]:border-b-2 [&>h1]:border-black dark:[&>h1]:border-white/20 [&>h1]:pb-2
            [&>h2]:text-xl [&>h2]:font-extrabold [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:text-[#4169E1] dark:[&>h2]:text-[#60A5FA]
            [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-2
            [&>p]:my-4 [&>p]:leading-relaxed
            [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:my-4 [&>ul>li]:my-1.5
            [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:my-4 [&>ol>li]:my-1.5
            [&>blockquote]:border-l-[4px] [&>blockquote]:border-[#4169E1] [&>blockquote]:bg-blue-50/70 dark:[&>blockquote]:bg-[#1A2234] [&>blockquote]:p-4 [&>blockquote]:my-6 [&>blockquote]:italic [&>blockquote]:font-medium [&>blockquote]:brutal-border-r-none
            [&>table]:w-full [&>table]:border-collapse [&>table]:my-6 [&>table]:border-2 [&>table]:border-black dark:[&>table]:border-white/20
            [&>table_th]:bg-[#FFD93D] [&>table_th]:text-black [&>table_th]:p-3 [&>table_th]:border-2 [&>table_th]:border-black [&>table_th]:font-black [&>table_th]:text-xs [&>table_th]:uppercase
            [&>table_td]:p-3 [&>table_td]:border [&>table_td]:border-black/20 dark:[&>table_td]:border-white/20 [&>table_td]:text-xs sm:[&>table_td]:text-sm
            [&>hr]:border-t-2 [&>hr]:border-black/20 dark:[&>hr]:border-white/20 [&>hr]:my-8"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </main>

      {/* FLOATING QUICK TABLE OF CONTENTS BUTTON & DRAWER */}
      {toc.length > 0 && (
        <>
          <div
            className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
              hasScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <button
              onClick={() => setShowFloatingToc(!showFloatingToc)}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-[#4169E1] text-white font-black text-xs brutal-border shadow-[3px_3px_0_#111] hover:bg-[#3154b8] active:translate-x-[2px] active:translate-y-[2px]"
              aria-label="Xem nhanh mục lục"
            >
              <BookOpen className="w-4 h-4" />
              <span>Mục lục</span>
            </button>
          </div>

          {/* Quick TOC Popover Modal */}
          {showFloatingToc && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
              <div
                className="w-full max-w-md bg-white dark:bg-[#181B22] brutal-card shadow-[6px_6px_0_#111] dark:shadow-[6px_6px_0_#60A5FA] max-h-[80vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 bg-[#FFD93D] text-black border-b-2 border-black">
                  <div className="flex items-center gap-2 font-black text-sm uppercase">
                    <ListTree className="w-4 h-4" />
                    <span>Mục lục bài viết</span>
                  </div>
                  <button
                    onClick={() => setShowFloatingToc(false)}
                    className="p-1 hover:bg-black/10 rounded-none transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-4 overflow-y-auto space-y-1.5 flex-1">
                  {toc.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToHeading(item.id)}
                      className={`block w-full text-left p-2 rounded-none hover:bg-blue-50 dark:hover:bg-blue-950/30 text-xs sm:text-sm transition-all ${
                        item.level === 3
                          ? 'pl-6 text-gray-600 dark:text-gray-400'
                          : 'font-bold text-black dark:text-white'
                      }`}
                    >
                      • {item.text}
                    </button>
                  ))}
                </div>
                <div className="p-3 bg-gray-50 dark:bg-[#14171F] border-t-2 border-black dark:border-white/20 text-center">
                  <button
                    onClick={() => setShowFloatingToc(false)}
                    className="px-4 py-1.5 text-xs font-bold bg-white dark:bg-[#181B22] brutal-border hover:bg-[#FFD93D] hover:text-black transition-colors"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Previous / Next Article Navigation */}
      <nav className="flex flex-col sm:flex-row justify-between items-stretch gap-4 pt-6 border-t-2 border-black/10 dark:border-white/10">
        {prevPost ? (
          <button
            onClick={() => onNavigate(`/${prevPost.slug}`)}
            className="flex-1 p-4 bg-white dark:bg-[#181B22] brutal-card brutal-card-hover text-left flex items-center gap-3"
          >
            <div className="p-2 bg-[#FFD93D] text-black brutal-border shrink-0">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500">Bài trước</span>
              <p className="text-xs sm:text-sm font-bold line-clamp-1">{prevPost.title}</p>
            </div>
          </button>
        ) : (
          <div className="flex-1" />
        )}

        {nextPost ? (
          <button
            onClick={() => onNavigate(`/${nextPost.slug}`)}
            className="flex-1 p-4 bg-white dark:bg-[#181B22] brutal-card brutal-card-hover text-right flex items-center justify-end gap-3"
          >
            <div>
              <span className="text-[10px] uppercase font-bold text-gray-500">Bài tiếp theo</span>
              <p className="text-xs sm:text-sm font-bold line-clamp-1">{nextPost.title}</p>
            </div>
            <div className="p-2 bg-[#4ADE80] text-black brutal-border shrink-0">
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </article>
  );
};
