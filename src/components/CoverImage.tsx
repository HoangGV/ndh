import React, { useState, useEffect } from 'react';

interface CoverImageProps {
  src?: string;
  alt: string;
  category?: string;
  hoverZoom?: boolean;
  priority?: boolean;
  className?: string;
}

export const CoverImage: React.FC<CoverImageProps> = ({
  src,
  alt,
  category,
  hoverZoom = false,
  priority = false,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const trimmedSrc = src?.trim();
  const showImage = Boolean(trimmedSrc) && !hasError;

  return (
    <div
      className={`relative w-full aspect-video overflow-hidden rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F1F5F9] dark:bg-[#0F172A] ${className}`}
    >
      {showImage ? (
        <img
          src={trimmedSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover ${
            hoverZoom
              ? 'transition-transform duration-300 ease-out group-hover:scale-[1.03]'
              : ''
          }`}
        />
      ) : (
        <div
          aria-label={alt}
          className="w-full h-full flex flex-col items-center justify-center p-6 text-center select-none bg-[#F8FAFC] dark:bg-[#0F172A] relative"
        >
          {/* Minimal architectural framing lines */}
          <div className="absolute inset-3 border border-[#E2E8F0] dark:border-[#1E293B] rounded-md pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-2.5 max-w-[85%]">
            <img
              src="/ndh.svg"
              alt=""
              aria-hidden="true"
              className="w-9 h-9 opacity-90"
            />
            <span className="text-sm font-semibold tracking-tight text-[#0F172A] dark:text-[#F8FAFC]">
              Người Đồng Hành
            </span>
            {category && (
              <span className="text-xs font-medium text-[#4168E1] dark:text-[#5B7FF0] truncate max-w-full">
                {category}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
