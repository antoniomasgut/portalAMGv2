'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, AlertCircle, Sparkles, Zap, Check } from 'lucide-react';
import { AMGButton, AMGCard } from '@/components/amg/Primitives';
import { LeadModal } from '@/components/amg/LeadModal';

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#0d0d1a] overflow-auto text-[#e2e8f0] selection:bg-[#FF6B00] selection:text-black relative">
      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Blueprint Grid Background */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,107,0,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0d0d1a]/80 border-b border-[rgba(255,107,0,0.12)]">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF6B00] btn-clip flex items-center justify-center">
              <span className="font-black text-black text-xs">A</span>
            </div>
            <div className="font-black text-sm tracking-[0.15em]">AMG</div>
          </div>
          <nav className="hidden md:flex gap-6 text-[11px] uppercase tracking-wider font-mono">
            <a href="#sistema" className="text-[#e2e8f0] hover:text-[#FF9A3C] transition-colors">Sistema</a>
            <a href="#resultats" className="text-[#e2e8f0] hover:text-[#FF9A3C] transition-colors">Resultats</a>
            <a href="#formacio" className="text-[#e2e8f0] hover:text-[#FF9A3C] transition-colors">Formació</a>
          </nav>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-[11px] uppercase tracking-wider font-mono hover:text-[#FF9A3C] transition-colors">
              Portal
            </Link>
            <AMGButton onClick={() => setIsModalOpen(true)} size="sm" icon={ArrowRight}>SOL·LICITAR DEMO</AMGButton>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative py-32 px-6 z-10">
        <div className="relative max-w-[1000px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(255,107,0,0.1)] border border-[rgba(255,107,0,0.2)] mb-8 animate-pulse">
            <Sparkles size={14} className="text-[#FF9A3C]" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF9A3C]">Sistema de Gestió Professional v2.0</span>
          </div>
          <h1 className="font-black text-5xl md:text-[86px] leading-[0.9] tracking-tight mb-8 uppercase">
            ORDRE TOTAL EN LA TEVA<br/>
            <span className="text-[#FF9A3C] drop-shadow-[0_0_15px_rgba(255,154,60,0.3)]">GESTIÓ DIGITAL.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#94a3b8] mb-12 max-w-[700px] mx-auto leading-relaxed">
            Converteix el caos de les teves comunicacions en un motor de negoci organitzat. 
            <span className="text-[#e2e8f0] font-semibold"> Sense tecnicismes, sense complicacions.</span>
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <AMGButton onClick={() => setIsModalOpen(true)} size="lg" icon={ArrowRight} className="px-10 py-5 text-sm">
              AGENDAR DEMO DE FUNCIONAMENT
            </AMGButton>
            <div className="f-mono text-[10px] uppercase tracking-[0.2em] text-[#64748b]">
              REUNIÓ DE 15 MINUTS · SENSE COMPROMÍS
            </div>
          </div>
        </div>
      </section>

      {/* Problema */}
      <section id="sistema" className="relative py-32 bg-[#13132a] px-6 z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF6B00]/5 blur-[120px] rounded-full"></div>
        <div className="relative max-w-[800px] mx-auto text-center">
          <h2 className="font-black text-4xl md:text-5xl mb-16 uppercase tracking-tight">EL TEU NEGOCI ET CONTROLA A TU?</h2>
          <div className="grid gap-6 text-left">
            {[
              'Clients que t\'escriuen i esperen hores (o dies) per una resposta.',
              'Consultes que no són urgents i t\'interrompen la feina constantment.',
              'El caos de gestionar l\'agenda a base de trucades i missatges perduts.',
              'Oportunitats de negoci que es refreden per falta de seguiment.'
            ].map((item, i) => (
              <AMGCard key={i} className="flex items-center gap-5 bg-[#0d0d1a]/50 backdrop-blur-sm border-[rgba(255,107,0,0.1)] group hover:border-[rgba(255,107,0,0.3)] transition-all">
                <div className="w-10 h-10 rounded-full bg-[rgba(239,68,68,0.1)] flex items-center justify-center shrink-0">
                  <AlertCircle className="text-red-500/80" size={20} />
                </div>
                <p className="text-lg md:text-xl text-[#94a3b8] group-hover:text-[#e2e8f0] transition-colors">{item}</p>
              </AMGCard>
            ))}
          </div>
        </div>
      </section>

      {/* Solució */}
      <section id="resultats" className="relative py-32 px-6 z-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-black text-4xl md:text-5xl uppercase tracking-tight mb-4">EL TEU NOU SISTEMA DE GESTIÓ</h2>
            <p className="text-[#94a3b8] f-mono text-[11px] uppercase tracking-[0.3em]">Resultats tangibles des del primer dia</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              ['Resposta immediata', 'Els teus clients senten que els atens a l\'instant, generant confiança absoluta.'],
              ['Classificació intel·ligent', 'Separem el soroll de les urgències. Sabem què és una venda i què és una consulta.'],
              ['Agenda automatitzada', 'El client tria el seu espai segons la teva disponibilitat real. Sense trucades.'],
              ['Seguiment infallible', 'El sistema recorda cada compromís. Res es perd, res s\'oblida. Mai més.']
            ].map(([t,d], i) => (
              <div key={i} className="card-clip p-10 border-l-4 border-l-[#FF6B00] bg-[#13132a] hover:bg-[#1a1a35] transition-colors group">
                <h3 className="font-black text-2xl mb-4 text-[#FF9A3C] uppercase tracking-wide group-hover:translate-x-1 transition-transform">{t}</h3>
                <p className="text-[#94a3b8] leading-relaxed text-lg">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-40 text-center px-6 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF6B00]/5 to-transparent"></div>
        <div className="relative max-w-[800px] mx-auto">
          <h2 className="font-black text-4xl md:text-6xl mb-10 uppercase tracking-tighter italic">ESTÀS A UN PAS DE<br/><span className="text-[#FF6B00]">L'ORDRE TOTAL</span></h2>
          <AMGButton onClick={() => setIsModalOpen(true)} size="lg" icon={Zap} className="px-12 py-6 text-lg mx-auto shadow-[0_0_50px_rgba(255,107,0,0.2)] hover:shadow-[0_0_70px_rgba(255,107,0,0.4)] transition-shadow">
            ACTIVAR EL MEU SISTEMA
          </AMGButton>
          <div className="mt-10 f-mono text-[10px] text-[#64748b] uppercase tracking-[0.4em]">Implementació en 48 hores · Suport personalitzat</div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 text-center text-[#64748b] text-[10px] font-mono uppercase tracking-[0.3em] border-t border-[rgba(255,107,0,0.05)] z-10">
        <div className="flex items-center justify-center gap-4 mb-6 opacity-50">
          <div className="w-10 h-[1px] bg-[#64748b]"></div>
          <div className="w-2 h-2 rotate-45 border border-[#64748b]"></div>
          <div className="w-10 h-[1px] bg-[#64748b]"></div>
        </div>
        AMG Enginyeria Digital · 2026 · EL SISTEMA QUE ORGANITZA EL TEU NEGOCI
      </footer>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "AMG Portal",
            "operatingSystem": "Web",
            "applicationCategory": "BusinessApplication",
            "description": "Sistema de gestió digital per a serveis professionals.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            }
          })
        }}
      />
    </div>
  );
}
