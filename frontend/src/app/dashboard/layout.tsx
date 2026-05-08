'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Layers, Sparkles, Zap, Globe, Shield, CreditCard, Settings, LogOut, LayoutDashboard } from 'lucide-react';
import { cn } from '@/components/amg/Primitives';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('amg_token');
    const storedUser = localStorage.getItem('amg_user');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('amg_token');
    localStorage.removeItem('amg_user');
    router.push('/login');
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { id: 'flows', label: 'My Flows', icon: Layers, href: '/dashboard/flows' },
    { id: 'factory', label: 'Content Factory', icon: Sparkles, href: '/dashboard/factory', badge: 'NEW', tone: 'accent' },
    { id: 'landings', label: 'Micro-landings', icon: Globe, href: '/dashboard/landings' },
    { id: 'vault', label: 'Vault', icon: Shield, href: '/dashboard/vault' },
    { id: 'invoices', label: 'Factures', icon: CreditCard, href: '/dashboard/invoices' },
    { id: 'settings', label: 'Configuració', icon: Settings, href: '/dashboard/settings' },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-[#e2e8f0] flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[#13132a] border-r border-[rgba(255,107,0,0.1)] flex flex-col sticky top-0 h-screen">
        <div className="h-16 border-b border-[rgba(255,107,0,0.1)] flex items-center px-6 gap-3">
          <div className="w-8 h-8 bg-[#FF6B00] btn-clip flex items-center justify-center">
            <span className="font-black text-black text-xs">A</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-black text-sm tracking-[0.1em]">AMG</span>
            <span className="f-mono text-[8px] text-[#FF9A3C] tracking-[0.2em] uppercase">Portal · AM</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="f-mono text-[9px] uppercase tracking-[0.2em] text-[#475569] px-3 py-2 mb-2">Cicle de vida</div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.id} 
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 px-3 h-10 f-mono text-[10px] uppercase tracking-wider transition-all group",
                  isActive ? "bg-[rgba(255,107,0,0.08)] text-[#FF9A3C]" : "text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[rgba(255,255,255,0.02)]"
                )}
              >
                {isActive && <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#FF6B00]" />}
                <item.icon size={14} className={cn(isActive ? "text-[#FF6B00]" : "group-hover:text-[#FF9A3C]")} />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className={cn(
                    "f-mono text-[8px] px-1.5 py-0.5 font-bold",
                    item.tone === 'accent' ? "bg-[rgba(255,107,0,0.15)] text-[#FF9A3C]" : "bg-[#212140] text-[#64748b]"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[rgba(255,107,0,0.05)]">
          <div className="flex items-center gap-3 mb-6 p-2 rounded-lg bg-[rgba(0,0,0,0.2)]">
            <div className="w-9 h-9 bg-gradient-to-br from-[#FF6B00] to-[#FF9A3C] btn-clip flex items-center justify-center text-black font-bold text-xs shrink-0 uppercase">
              {user.email.substring(0,2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-bold truncate">Antonio Mas</div>
              <div className="text-[9px] text-[#FF9A3C] f-mono tracking-tighter uppercase">{user.role}</div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-[9px] f-mono uppercase tracking-widest text-[#475569] hover:text-red-500 transition-colors"
          >
            <LogOut size={12} /> Tancar Sessió Segura
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
