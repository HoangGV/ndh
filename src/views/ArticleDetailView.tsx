import React, { useMemo, useEffect, useState, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Share2,
  Check,
  ListTree,
  BookOpen,
  X,
} from 'lucide-react';
import { Marked } from 'marked';
import katex from 'katex';
import { TocItem } from '../types';
import { POSTS } from '../data/posts';
import { CoverImage } from '../components/CoverImage';

interface ArticleDetailViewProps {
  slug: string;
  onNavigate: (path: string) => void;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u00C0-\u024F\u1EA0-\u1EF9]/gi, '')
    .replace(/\s+/g, '-');
}

function renderMarkdownWithLatexAndCode(rawContent: string): {
  html: string;
  toc: TocItem[];
} {
  const headings: TocItem[] = [];

  // Extract headings for Table of Contents (skip fenced code blocks)
  const lines = rawContent.split('\n');
  let inCodeFence = false;
  lines.forEach((line) => {
    if (line.trim().startsWith('```')) {
      inCodeFence = !inCodeFence;
      return;
    }
    if (inCodeFence) return;

    const h2Match = line.match(/^##\s+(.*)$/);
    const h3Match = line.match(/^###\s+(.*)$/);
    if (h2Match) {
      const text = h2Match[1].trim();
      headings.push({ id: slugifyHeading(text), text, level: 2 });
    } else if (h3Match) {
      const text = h3Match[1].trim();
      headings.push({ id: slugifyHeading(text), text, level: 3 });
    }
  });

  // Step 1: Protect code blocks & inline code from LaTeX regex parsing
  const codeBlocks: string[] = [];
  const protectedContent = rawContent.replace(
    /(```[\s\S]*?```|`[^`\n]+`)/g,
    (match) => {
      const placeholder = `%%PROTECTED_CODE_TOKEN_${codeBlocks.length}%%`;
      codeBlocks.push(match);
      return placeholder;
    }
  );

  // Step 2: Render block math $$ ... $$
  let mathProcessed = protectedContent.replace(
    /\$\$([\s\S]+?)\$\$/g,
    (_, math) => {
      try {
        const rendered = katex.renderToString(math.trim(), {
          displayMode: true,
          throwOnError: false,
        });
        return `\n\n<div class="katex-block-wrapper my-6 px-4 py-4 overflow-x-auto text-center bg-[#F8FAFC] dark:bg-[#0B1120] border border-[#E2E8F0] dark:border-[#1E293B] rounded-lg select-all">${rendered}</div>\n\n`;
      } catch {
        return `\n\n<pre class="katex-error text-red-600 dark:text-red-400 text-xs">${escapeHtml(math)}</pre>\n\n`;
      }
    }
  );

  // Step 3: Render inline math $ ... $ (excluding escaped \$)
  mathProcessed = mathProcessed.replace(
    /(?<!\\)\$([^\$\n]+?)(?<!\\)\$/g,
    (_, math) => {
      try {
        const rendered = katex.renderToString(math.trim(), {
          displayMode: false,
          throwOnError: false,
        });
        return `<span class="katex-inline px-1 py-0.5 rounded bg-[#F1F5F9] dark:bg-[#1E293B] text-[#0F172A] dark:text-[#F8FAFC]">${rendered}</span>`;
      } catch {
        return `<code class="katex-error text-red-600 dark:text-red-400">${escapeHtml(math)}</code>`;
      }
    }
  );

  // Step 4: Restore protected code blocks
  const restored = mathProcessed.replace(
    /%%PROTECTED_CODE_TOKEN_(\d+)%%/g,
    (_, idx) => codeBlocks[Number(idx)]
  );

  // Step 5: Configure marked v18 with clean editorial renderers
  const customMarked = new Marked({
    gfm: true,
    breaks: true,
  });

  customMarked.use({
    renderer: {
      code(arg: any, langStr?: string) {
        const text = typeof arg === 'string' ? arg : arg.text || '';
        const lang =
          typeof arg === 'string' ? langStr || 'text' : arg.lang || 'text';
        const cleanLang = lang.trim().toLowerCase() || 'code';
        const encodedCode = encodeURIComponent(text);

        return `
          <div class="code-block-container my-6 border border-[#1E293B] rounded-lg overflow-hidden bg-[#0F172A] text-[#F8FAFC]">
            <div class="flex items-center justify-between px-4 py-2 bg-[#111827] border-b border-[#1E293B] select-none">
              <span class="text-xs font-medium uppercase tracking-wider text-[#94A3B8]">${escapeHtml(cleanLang)}</span>
              <button
                type="button"
                class="copy-code-btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#1E293B] hover:bg-[#334155] text-[#F8FAFC] border border-[#334155] cursor-pointer transition-colors"
                data-code="${encodedCode}"
                title="Sao chép mã nguồn"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                <span class="copy-btn-text">Sao chép</span>
              </button>
            </div>
            <pre class="p-4 overflow-x-auto text-xs sm:text-sm leading-relaxed text-[#E2E8F0]"><code>${escapeHtml(text)}</code></pre>
          </div>
        `;
      },
      heading(this: any, token: any) {
        const renderedText = token.tokens
          ? this.parser.parseInline(token.tokens)
          : String(token.text || '');
        const level = token.depth || 1;
        const plainText = String(token.text || '').replace(/<[^>]*>/g, '');
        const id = slugifyHeading(plainText);

        return `<h${level} id="${id}">${renderedText}</h${level}>`;
      },
      table(this: any, token: any) {
        let headerCells = '';
        for (const cell of token.header || []) {
          const alignClass =
            cell.align === 'center'
              ? 'text-center'
              : cell.align === 'right'
                ? 'text-right'
                : 'text-left';
          const cellHtml = this.parser.parseInline(cell.tokens);
          headerCells += `<th class="bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC] px-4 py-3 border-b border-r border-[#E2E8F0] dark:border-[#1E293B] last:border-r-0 font-semibold text-xs sm:text-sm ${alignClass}">${cellHtml}</th>`;
        }

        let bodyRows = '';
        for (const row of token.rows || []) {
          let rowCells = '';
          for (const cell of row) {
            const alignClass =
              cell.align === 'center'
                ? 'text-center'
                : cell.align === 'right'
                  ? 'text-right'
                  : 'text-left';
            const cellHtml = this.parser.parseInline(cell.tokens);
            rowCells += `<td class="px-4 py-3 border-b border-r border-[#E2E8F0] dark:border-[#1E293B] last:border-r-0 text-sm align-top tabular-nums ${alignClass}">${cellHtml}</td>`;
          }
          bodyRows += `<tr class="hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]/40 transition-colors">${rowCells}</tr>`;
        }

        return `
          <div class="table-responsive-wrapper my-6 overflow-x-auto max-w-full border border-[#E2E8F0] dark:border-[#1E293B] rounded-lg">
            <table class="w-full min-w-[420px] border-collapse bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC]">
              <thead>
                <tr>${headerCells}</tr>
              </thead>
              <tbody class="[&>tr:last-child>td]:border-b-0">
                ${bodyRows}
              </tbody>
            </table>
          </div>
        `;
      },
    },
  });

  const parsedHtml = customMarked.parse(restored, { async: false }) as string;
  return { html: parsedHtml, toc: headings };
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  slug,
  onNavigate,
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [showFloatingToc, setShowFloatingToc] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const postIndex = POSTS.findIndex((p) => p.slug === slug);
  const post = POSTS[postIndex];

  const prevPost = postIndex > 0 ? POSTS[postIndex - 1] : null;
  const nextPost = postIndex < POSTS.length - 1 ? POSTS[postIndex + 1] : null;

  const { toc, html: htmlContent } = useMemo(() => {
    if (!post) return { toc: [] as TocItem[], html: '' };
    return renderMarkdownWithLatexAndCode(post.content);
  }, [post]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 360);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleCopyClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        '.copy-code-btn'
      ) as HTMLElement | null;
      if (!target) return;

      const encoded = target.getAttribute('data-code');
      if (!encoded) return;

      const code = decodeURIComponent(encoded);
      navigator.clipboard.writeText(code).then(() => {
        const textSpan = target.querySelector('.copy-btn-text');
        const originalText = textSpan ? textSpan.textContent : 'Sao chép';

        target.classList.remove('bg-[#1E293B]', 'hover:bg-[#334155]');
        target.classList.add('bg-[#4168E1]', 'border-[#4168E1]');
        if (textSpan) textSpan.textContent = 'Đã sao chép';

        setTimeout(() => {
          target.classList.remove('bg-[#4168E1]', 'border-[#4168E1]');
          target.classList.add('bg-[#1E293B]', 'hover:bg-[#334155]');
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
      <div className="max-w-lg mx-auto py-12 px-6 text-center bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl space-y-4">
        <h2 className="text-xl font-bold text-[#0F172A] dark:text-[#F8FAFC]">
          Bài viết không tồn tại
        </h2>
        <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">
          Đường dẫn không hợp lệ hoặc bài viết đã được cập nhật lại địa chỉ.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-[#4168E1] hover:bg-[#3154C4] dark:bg-[#5B7FF0] dark:hover:bg-[#7695F5] text-white transition-colors cursor-pointer"
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
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
    <article className="max-w-3xl mx-auto space-y-8 w-full">
      {/* Top Action Row */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#64748B] dark:text-[#94A3B8] hover:text-[#4168E1] dark:hover:text-[#5B7FF0] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về danh sách bài viết</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-[#E2E8F0] dark:border-[#334155] bg-white dark:bg-[#111827] text-[#0F172A] dark:text-[#F8FAFC] hover:border-[#4168E1] dark:hover:border-[#5B7FF0] transition-colors cursor-pointer"
        >
          {copiedShare ? (
            <Check className="w-3.5 h-3.5 text-[#4168E1] dark:text-[#5B7FF0]" />
          ) : (
            <Share2 className="w-3.5 h-3.5" />
          )}
          <span>{copiedShare ? 'Đã sao chép liên kết' : 'Chia sẻ'}</span>
        </button>
      </div>

      {/* Main Flat Editorial Sheet */}
      <div className="bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl p-6 sm:p-10 space-y-8">
        {/* Article Header */}
        <header className="space-y-4 pb-6 border-b border-[#E2E8F0] dark:border-[#1E293B]">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-medium text-[#4168E1] dark:text-[#5B7FF0]">
              {post.tags.map((tag, index) => (
                <React.Fragment key={tag}>
                  {index > 0 && (
                    <span aria-hidden="true" className="text-[#94A3B8]">
                      ·
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => onNavigate(`/tag/${encodeURIComponent(tag)}`)}
                    className="hover:text-[#3154C4] dark:hover:text-[#7695F5] hover:underline underline-offset-4 transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                </React.Fragment>
              ))}
            </div>
          )}

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F8FAFC] leading-tight text-balance">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-base sm:text-lg text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
              {post.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-2 text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] tabular-nums">
            <span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">
              Hoàng Lam
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.pubDate}>{post.pubDate}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTimeMinutes} phút đọc</span>
          </div>
        </header>

        {/* 16:9 Cover Image (with automatic fallback if missing/broken) */}
        <CoverImage
          src={post.cover}
          alt={post.title}
          category={post.tags[0]}
          priority
        />

        {/* Markdown Body */}
        <div
          ref={contentRef}
          className="editorial-prose max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>

      {/* Floating Quick TOC Button & Modal */}
      {toc.length > 0 && (
        <>
          <div
            className={`fixed bottom-6 right-6 z-40 transition-all duration-200 ${
              hasScrolled
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3 pointer-events-none'
            }`}
          >
            <button
              type="button"
              onClick={() => setShowFloatingToc((prev) => !prev)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#4168E1] hover:bg-[#3154C4] dark:bg-[#5B7FF0] dark:hover:bg-[#7695F5] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              aria-label="Mở mục lục bài viết"
            >
              <BookOpen className="w-4 h-4" />
              <span>Mục lục</span>
            </button>
          </div>

          {showFloatingToc && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/45 dark:bg-black/65 backdrop-blur-xs"
              onClick={() => setShowFloatingToc(false)}
              role="dialog"
              aria-modal="true"
              aria-label="Mục lục bài viết"
            >
              <div
                className="w-full max-w-md bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#334155] rounded-xl max-h-[80vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#E2E8F0] dark:border-[#1E293B]">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                    <ListTree className="w-4 h-4 text-[#4168E1] dark:text-[#5B7FF0]" />
                    <span>Mục lục bài viết</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowFloatingToc(false)}
                    className="p-1 text-[#64748B] hover:text-[#0F172A] dark:text-[#94A3B8] dark:hover:text-[#F8FAFC] transition-colors cursor-pointer"
                    aria-label="Đóng mục lục"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 overflow-y-auto space-y-0.5 flex-1">
                  {toc.map((item, idx) => (
                    <button
                      key={`${item.id}-${idx}`}
                      type="button"
                      onClick={() => scrollToHeading(item.id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[#F8FAFC] dark:hover:bg-[#1E293B]/60 hover:text-[#4168E1] dark:hover:text-[#5B7FF0] transition-colors cursor-pointer ${
                        item.level === 3
                          ? 'pl-7 text-[#64748B] dark:text-[#94A3B8]'
                          : 'font-medium text-[#0F172A] dark:text-[#F8FAFC]'
                      }`}
                    >
                      {item.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Previous / Next Navigation */}
      {(prevPost || nextPost) && (
        <nav
          aria-label="Bài viết liên quan"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
        >
          {prevPost ? (
            <button
              type="button"
              onClick={() => onNavigate(`/${prevPost.slug}`)}
              className="p-4 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#4168E1]/60 dark:hover:border-[#5B7FF0]/60 rounded-xl text-left transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-xs text-[#64748B] dark:text-[#94A3B8] mb-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Bài trước</span>
              </div>
              <p className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#4168E1] dark:group-hover:text-[#5B7FF0] line-clamp-2 transition-colors">
                {prevPost.title}
              </p>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {nextPost ? (
            <button
              type="button"
              onClick={() => onNavigate(`/${nextPost.slug}`)}
              className="p-4 bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1E293B] hover:border-[#4168E1]/60 dark:hover:border-[#5B7FF0]/60 rounded-xl text-left sm:text-right transition-colors group cursor-pointer"
            >
              <div className="flex items-center sm:justify-end gap-1.5 text-xs text-[#64748B] dark:text-[#94A3B8] mb-1">
                <span>Bài tiếp theo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <p className="text-sm font-semibold text-[#0F172A] dark:text-[#F8FAFC] group-hover:text-[#4168E1] dark:group-hover:text-[#5B7FF0] line-clamp-2 transition-colors">
                {nextPost.title}
              </p>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}
        </nav>
      )}
    </article>
  );
};
