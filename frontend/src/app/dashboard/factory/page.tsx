'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, Layers, Zap, Globe, Plus, Download, ArrowRight, Clock, Users } from 'lucide-react';
import { AMGBadge, AMGButton, AMGCard } from '@/components/amg/Primitives';

export default function FactoryHubPage() {
  const [tab, setTab] = useState('onboardings');
  const [catalog, setCatalog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      const token = localStorage.getItem('amg_token');
      try {
        const res = await fetch('http://localhost:4000/api/factory/catalog', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        if (result.success) {
          setCatalog(result.data);
        }
      } catch (error) {
        console.error('Error fetching catalog:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  const tabs = [
    { id:'onboardings', label:'Onboardings', icon:Sparkles, count: catalog?.onboardings?.length || 0 },
    { id:'phases', label:'Fases · llibreria', icon:Layers, count: catalog?.phases?.length || 0 },
    { id:'autos', label:'Automatitzacions', icon:Zap, count: 0 },
    { id:'landings', label:'Micro-landings', icon:Globe, count: 0 },
  ];

  if (loading) return <div className="p-8 text-[#FF9A3C] f-mono animate-pulse uppercase tracking-[0.2em]">Sincronitzant Content Factory...</div>;

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-[#e2e8f0]">
      <header className="h-16 border-b border-[rgba(255,107,0,0.12)] flex items-center px-8 gap-5 bg-[#0d0d1a]/80 backdrop-blur sticky top-0 z-20">
        <div className="flex-1">
          <div className="f-mono text-[10px] uppercase text-[#FF9A3C] tracking-[0.2em]">/ Content Factory</div>
          <h1 className="f-display font-bold text-lg leading-tight mt-0.5">Catàleg de Productes Digitalitzats</h1>
        </div>
        <AMGButton variant="outline" size="sm" icon={Download}>EXPORTAR</AMGButton>
        <AMGButton size="sm" icon={Plus}>NOU · {tab.toUpperCase()}</AMGButton>
      </header>

      {/* Tabs */}
      <div className="border-b border-[rgba(255,107,0,0.12)] bg-[#0d0d1a]/80 px-8 flex items-center gap-1 sticky top-16 z-20">
        {tabs.map(t => {
          const active = t.id === tab;
          return (
            <button key={t.id} onClick={()=>setTab(t.id)}
              className={`relative h-12 px-5 flex items-center gap-2 f-mono text-[11px] uppercase tracking-wider transition
                ${active ? 'text-[#FF9A3C]' : 'text-[#94a3b8] hover:text-[#e2e8f0]'}`}>
              <t.icon size={13}/>
              <span>{t.label}</span>
              <span className={`f-mono text-[9px] px-1.5 h-4 flex items-center ${active ? 'bg-[rgba(255,107,0,0.18)] text-[#FF9A3C]' : 'bg-[#212140] text-[#94a3b8]'}`}>{t.count}</span>
              {active && <span className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-[#FF6B00]"></span>}
            </button>
          );
        })}
      </div>

      <main className="p-8 max-w-[1400px] mx-auto">
        {tab === 'onboardings' && (
          <div className="space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               <AMGStat label="Onboardings" value={catalog?.onboardings?.length} tone="accent" icon={Sparkles}/>
               <AMGStat label="Publicats" value={catalog?.onboardings?.length} tone="success" icon={Globe}/>
               <AMGStat label="En clients actius" value="1" tone="info" icon={Users}/>
               <AMGStat label="Hores catàleg" value="18h" tone="accent" icon={Clock}/>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               {catalog?.onboardings?.map((o: any) => (
                 <AMGCard key={o.id} className="group hover:border-[rgba(255,107,0,0.3)] transition-all bg-[#13132a]/40 backdrop-blur-sm border-[rgba(255,107,0,0.1)] p-0 overflow-hidden">
                   <div className="p-6 border-b border-[rgba(255,107,0,0.05)]">
                     <div className="flex items-center gap-2 mb-3">
                       <AMGBadge tone="success">PUBLISHED</AMGBadge>
                       <span className="f-mono text-[10px] text-[#FF9A3C]">v1.4</span>
                     </div>
                     <h3 className="text-xl font-black uppercase tracking-tight mb-2 group-hover:text-[#FF9A3C] transition-colors">{o.name}</h3>
                     <p className="text-sm text-[#94a3b8] leading-relaxed">{o.description}</p>
                   </div>
                   
                   <div className="grid grid-cols-4 gap-1 p-6 bg-[#0d0d1a]/30">
                     {[
                       ['FASES', o.phases.length, Layers],
                       ['HORES', '18h', Clock],
                       ['AUTOS', o.phases.reduce((acc: any, p: any) => acc + p.automations.length, 0), Zap],
                       ['LANDING', '1', Globe],
                     ].map(([l, v, Ic]: any, j) => (
                       <div key={j}>
                         <div className="flex items-center gap-1.5 opacity-50">
                           <Ic size={10} className="text-[#FF9A3C]"/>
                           <span className="f-mono text-[8px] uppercase tracking-widest">{l}</span>
                         </div>
                         <div className="text-lg font-bold mt-1 text-[#e2e8f0]">{v}</div>
                       </div>
                     ))}
                   </div>

                   <div className="p-4 flex items-center justify-between bg-[#13132a]/60">
                     <span className="f-mono text-[9px] text-[#475569] uppercase tracking-widest">Utilitzat per 1 client</span>
                     <AMGButton size="sm" variant="ghost" icon={ArrowRight}>VEURE DETALLS</AMGButton>
                   </div>
                 </AMGCard>
               ))}

               <button className="card-clip border border-dashed border-[rgba(255,107,0,0.2)] hover:border-[#FF6B00] hover:bg-[rgba(255,107,0,0.02)] flex flex-col items-center justify-center gap-4 min-h-[300px] transition-all group">
                 <div className="w-12 h-12 bg-[rgba(255,107,0,0.1)] btn-clip flex items-center justify-center group-hover:bg-[#FF6B00] transition-colors">
                    <Plus size={24} className="group-hover:text-black transition-colors" />
                 </div>
                 <div className="text-center">
                    <div className="f-display font-bold text-[#FF9A3C] uppercase tracking-tight">Crear Nou Onboarding</div>
                    <div className="f-mono text-[9px] text-[#475569] uppercase tracking-[0.2em] mt-2">Fases · Autos · Micro-landing</div>
                 </div>
               </button>
             </div>
          </div>
        )}

        {tab === 'phases' && (
          <div className="amg-card card-clip overflow-hidden border-[rgba(255,107,0,0.1)] bg-[#13132a]/40">
            <div className="grid grid-cols-[120px_1fr_100px_1fr_100px] gap-6 px-8 py-4 f-mono text-[10px] uppercase tracking-[0.3em] text-[#475569] border-b border-[rgba(255,107,0,0.1)] bg-[#0d0d1a]/50">
              <div>Codi</div><div>Nom de la Fase</div><div>Hores</div><div>Automatitzacions</div><div className="text-right">Accions</div>
            </div>
            {catalog?.phases?.map((p: any, i: number) => (
              <div key={i} className="grid grid-cols-[120px_1fr_100px_1fr_100px] gap-6 px-8 py-5 items-center border-b border-[rgba(255,107,0,0.05)] last:border-0 hover:bg-[rgba(255,107,0,0.03)] transition-colors group">
                <span className="f-mono text-[10px] text-[#FF9A3C] bg-[rgba(255,107,0,0.1)] px-2 py-1 w-fit">AMG-{p.name.substring(0,3).toUpperCase()}</span>
                <span className="font-bold text-sm uppercase tracking-tight">{p.name}</span>
                <span className="f-mono text-xs text-[#94a3b8]">{p.baseHours || 2}h</span>
                <span className="f-mono text-[10px] text-[#475569] uppercase italic">Standard stack</span>
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <AMGButton size="sm" variant="ghost" icon={Plus}>EDITAR</AMGButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function AMGStat({ label, value, delta, tone, icon: Icon }: any) {
  const styles: any = {
    accent: 'border-l-[#FF6B00] text-[#FF9A3C]',
    success: 'border-l-green-500 text-green-400',
    info: 'border-l-blue-500 text-blue-400',
    warning: 'border-l-amber-500 text-amber-400',
  };
  return (
    <AMGCard className={`border-l-2 ${styles[tone]} p-6 flex flex-col justify-between`}>
      <div className="flex justify-between items-start">
        <div className="f-mono text-[9px] uppercase tracking-[0.2em] text-[#64748b]">{label}</div>
        <Icon size={14} className="opacity-20" />
      </div>
      <div className="flex items-end gap-3 mt-4">
        <div className="text-3xl font-black f-display">{value}</div>
        {delta && <div className="text-[10px] f-mono text-green-500 mb-1">{delta}</div>}
      </div>
    </AMGCard>
  );
}
