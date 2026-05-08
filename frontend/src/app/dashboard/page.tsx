'use client';

import React from 'react';
import { Activity, Users, Zap, TrendingUp, Sparkles } from 'lucide-react';
import { AMGCard } from '@/components/amg/Primitives';

export default function DashboardPage() {
  return (
    <div className="p-8 md:p-12">
      <header className="mb-12">
        <div className="text-[10px] f-mono text-[#FF9A3C] tracking-[0.3em] uppercase mb-2">/ Resum General</div>
        <h1 className="text-4xl font-black tracking-tighter f-display uppercase">Benvingut, Antonio</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Mètriques Avui" value="124" delta="+12%" icon={Activity} tone="accent" />
        <StatCard label="Leads Detectats" value="48" delta="+5" icon={Users} tone="info" />
        <StatCard label="Automatitzacions" value="284" icon={Zap} tone="success" />
        <StatCard label="Conversió" value="42%" delta="+2%" icon={TrendingUp} tone="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AMGCard className="lg:col-span-2 border-[rgba(255,107,0,0.1)] bg-[#13132a]/40 p-8 min-h-[300px]">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="text-[#FF6B00]" size={20} />
            <h3 className="font-bold uppercase tracking-widest text-sm">Activitat Recent</h3>
          </div>
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="flex items-center gap-4 py-3 border-b border-[rgba(255,107,0,0.05)] last:border-0 opacity-50">
                <div className="w-2 h-2 rounded-full bg-[#FF6B00]"></div>
                <div className="flex-1 text-sm font-mono uppercase tracking-tighter">Execució d'automatització correcta · Flux de Captació</div>
                <div className="text-[9px] f-mono text-[#475569]">FA 2 MINUTS</div>
              </div>
            ))}
          </div>
        </AMGCard>

        <AMGCard className="border-[rgba(255,107,0,0.1)] bg-gradient-to-br from-[#13132a] to-[#0d0d1a] p-8 flex flex-col justify-center items-center text-center">
          <Sparkles className="text-[#FF9A3C] mb-6 animate-pulse" size={48} />
          <h3 className="text-xl font-black uppercase tracking-tight mb-2 text-[#FF9A3C]">Content Factory</h3>
          <p className="text-[#94a3b8] text-xs leading-relaxed mb-6">
            Tens 6 nous productes digitalitzats a la teva llibreria a punt per ser activats.
          </p>
          <button className="px-6 py-3 bg-[rgba(255,107,0,0.1)] border border-[#FF6B00] text-[#FF6B00] f-mono text-[10px] uppercase font-bold tracking-widest hover:bg-[#FF6B00] hover:text-black transition-all">
            Explorar Catàleg
          </button>
        </AMGCard>
      </div>
    </div>
  );
}

function StatCard({ label, value, delta, icon: Icon, tone }: any) {
  const tones: any = {
    accent: 'text-[#FF6B00] border-l-[#FF6B00]',
    info: 'text-blue-400 border-l-blue-500',
    success: 'text-green-400 border-l-green-500',
    warning: 'text-amber-400 border-l-amber-500',
  };
  return (
    <AMGCard className={`p-6 border-l-2 ${tones[tone]} bg-[#13132a]/40`}>
      <div className="flex justify-between items-start mb-4">
        <div className="f-mono text-[9px] uppercase tracking-widest text-[#64748b]">{label}</div>
        <Icon size={14} className="opacity-20" />
      </div>
      <div className="flex items-end gap-3">
        <div className="text-2xl font-black f-display">{value}</div>
        {delta && <div className="text-[9px] f-mono text-green-500 mb-1">{delta}</div>}
      </div>
    </AMGCard>
  );
}
