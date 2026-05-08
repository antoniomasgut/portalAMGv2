'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { AMGButton, AMGCard } from './Primitives';

export const LeadModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:4000/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!result.success) throw new Error(result.message);

      setStep('success');
    } catch (err: any) {
      setError(err.message || 'Error enviant la sol·licitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0d0d1a]/95 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <AMGCard className="relative w-full max-w-[500px] border-[rgba(255,107,0,0.3)] bg-[#13132a] p-0 overflow-hidden z-10 shadow-[0_0_100px_rgba(255,107,0,0.1)]">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#475569] hover:text-[#FF9A3C] transition-colors">
          <X size={20} />
        </button>

        {step === 'form' ? (
          <div className="p-10">
            <div className="mb-8">
              <div className="f-mono text-[10px] text-[#FF9A3C] tracking-[0.3em] uppercase mb-2">Solicitud de Demo</div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Estàs a un pas de l'ordre</h2>
              <p className="text-[#94a3b8] text-sm mt-2">Deixa'ns les teves dades i t'ensenyarem com automatitzar el teu negoci en 15 minuts.</p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs f-mono flex items-center gap-2">
                <AlertCircle size={14} />
                {error.toUpperCase()}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="f-mono text-[9px] uppercase tracking-widest text-[#475569] ml-1">Nom Complet</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#0d0d1a] border border-[rgba(255,107,0,0.1)] p-4 text-sm focus:border-[#FF6B00] outline-none transition-all f-mono" 
                  placeholder="Antonio Mas" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="f-mono text-[9px] uppercase tracking-widest text-[#475569] ml-1">Email Professional</label>
                <input 
                  required 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#0d0d1a] border border-[rgba(255,107,0,0.1)] p-4 text-sm focus:border-[#FF6B00] outline-none transition-all f-mono" 
                  placeholder="antonio@empresa.com" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="f-mono text-[9px] uppercase tracking-widest text-[#475569] ml-1">Empresa / Sector</label>
                <input 
                  required 
                  type="text" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full bg-[#0d0d1a] border border-[rgba(255,107,0,0.1)] p-4 text-sm focus:border-[#FF6B00] outline-none transition-all f-mono" 
                  placeholder="Enginyeria Digital" 
                />
              </div>

              <AMGButton type="submit" disabled={loading} className="w-full justify-center mt-4 py-5" icon={Send}>
                {loading ? 'ENVIANT...' : 'SOL·LICITAR ACCÉS'}
              </AMGButton>
            </form>
          </div>
        ) : (
          <div className="p-16 text-center">
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="text-green-500" size={40} />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-green-500">Rebut correctament</h2>
            <p className="text-[#94a3b8] text-sm leading-relaxed mb-10">Gràcies per confiar en AMG. Ens posarem en contacte amb tu en les properes 24 hores per agendar la teva demo.</p>
            <AMGButton onClick={onClose} variant="outline" className="mx-auto px-8">TANCAR</AMGButton>
          </div>
        )}
      </AMGCard>
    </div>
  );
};
