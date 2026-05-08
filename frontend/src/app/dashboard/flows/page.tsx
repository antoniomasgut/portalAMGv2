'use client';

import React, { useEffect, useState } from 'react';
import { Layers, Zap, Sparkles, Loader2 } from 'lucide-react';
import { AMGBadge, AMGButton, AMGCard } from '@/components/amg/Primitives';

export default function FlowsPage() {
  const [flows, setFlows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('amg_token');
    if (token) fetchFlows(token);
  }, []);

  const fetchFlows = async (token: string) => {
    try {
      const res = await fetch('http://localhost:4000/api/flows/my', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await res.json();
      if (result.success) setFlows(result.data);
    } catch (error) {
      console.error('Error fetching flows:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-[80vh]"><Loader2 className="animate-spin text-[#FF6B00]" size={32} /></div>;

  return (
    <div className="p-8 md:p-12">
      <header className="mb-12">
        <div className="text-[10px] f-mono text-[#FF9A3C] tracking-[0.3em] uppercase mb-2">/ Panell de Control</div>
        <h1 className="text-4xl font-black tracking-tighter f-display uppercase">Gestió de Fluxos</h1>
      </header>

      {flows.length === 0 ? (
        <AMGCard className="border-dashed border-[rgba(255,107,0,0.2)] bg-transparent text-center py-20">
          <Sparkles size={40} className="mx-auto text-[#212140] mb-4" />
          <div className="text-[#94a3b8] mb-6 font-mono text-sm uppercase tracking-widest">No tens cap flux actiu.</div>
          <AMGButton variant="outline" icon={Zap}>Explorar Catàleg</AMGButton>
        </AMGCard>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {flows.map(flow => (
            <AMGCard key={flow.id} className="border-[rgba(255,107,0,0.15)] bg-[#13132a]/40 backdrop-blur-sm p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-2 text-[#FF9A3C]">
                    <Layers size={24} />
                    <h2 className="text-2xl font-black uppercase tracking-tight text-[#e2e8f0]">{flow.name}</h2>
                  </div>
                  <p className="text-[#94a3b8] text-sm max-w-[500px] leading-relaxed italic border-l border-[rgba(255,107,0,0.2)] pl-4">
                    {flow.description}
                  </p>
                </div>
                <AMGBadge tone="accent">INSTÀNCIA ACTIVA</AMGBadge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {flow.phases.map((phase: any) => (
                  <div key={phase.id} className="relative group p-5 bg-[#0d0d1a]/60 border border-[rgba(255,107,0,0.08)] hover:border-[rgba(255,107,0,0.3)] transition-all">
                    {phase.status === 'ACTIVE' && (
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent" />
                    )}
                    <div className="flex justify-between items-start mb-4">
                      <span className="f-mono text-[9px] text-[#475569] uppercase tracking-widest">FASE 0{phase.orderIndex}</span>
                      <AMGBadge tone={phase.status === 'ACTIVE' ? 'success' : phase.status === 'PURCHASED' ? 'warning' : 'neutral'}>
                        {phase.status}
                      </AMGBadge>
                    </div>
                    <div className="font-bold text-sm mb-2 group-hover:text-[#FF9A3C] transition-colors uppercase tracking-tight">{phase.name}</div>
                    <div className="f-mono text-[10px] text-[#FF9A3C] font-bold mt-4">+{phase.monthlyPrice}€/MES</div>
                  </div>
                ))}
              </div>
            </AMGCard>
          ))}
        </div>
      )}
    </div>
  );
}
