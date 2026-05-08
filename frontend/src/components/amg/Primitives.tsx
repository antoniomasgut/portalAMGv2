import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const AMGBadge = ({ children, tone = 'neutral' }: { children: React.ReactNode, tone?: 'accent' | 'danger' | 'success' | 'warning' | 'neutral' | 'info' }) => {
  const styles = {
    accent: 'bg-[rgba(255,107,0,0.18)] text-[#FF9A3C]',
    danger: 'bg-[rgba(239,68,68,0.15)] text-[#f87171]',
    success: 'bg-[rgba(34,197,94,0.15)] text-[#4ade80]',
    warning: 'bg-[rgba(245,158,11,0.15)] text-[#fbbf24]',
    info: 'bg-[rgba(59,130,246,0.15)] text-[#60a5fa]',
    neutral: 'bg-[#212140] text-[#94a3b8]',
  };

  return (
    <span className={cn("f-mono text-[9px] uppercase tracking-wider px-2 py-0.5 font-bold", styles[tone])}>
      {children}
    </span>
  );
};

export const AMGButton = ({ children, variant = 'primary', size = 'md', className, icon: Icon }: any) => {
  return (
    <button className={cn(
      "btn-clip flex items-center gap-2 transition-all active:scale-95 f-mono uppercase tracking-widest font-bold",
      variant === 'primary' ? "bg-[#FF6B00] text-black" : "border border-[#FF6B00] text-[#FF6B00]",
      size === 'sm' ? "px-3 py-1.5 text-[9px]" : "px-5 py-2 text-[11px]",
      className
    )}>
      {Icon && <Icon size={size === 'sm' ? 12 : 14} />}
      {children}
    </button>
  );
};

export const AMGCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("card-clip p-5", className)}>
    {children}
  </div>
);
