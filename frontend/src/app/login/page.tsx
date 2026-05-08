'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { AMGButton, AMGCard } from '@/components/amg/Primitives';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || 'Error en l\'autenticació');
      }

      // Guardem el token i dades de l'usuari
      localStorage.setItem('amg_token', result.data.token);
      localStorage.setItem('amg_user', JSON.stringify(result.data.user));

      router.push('/dashboard/flows');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d1a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B00]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="mb-12 flex flex-col items-center gap-4 z-10">
        <div className="w-16 h-16 bg-[#FF6B00] btn-clip flex items-center justify-center shadow-[0_0_30px_rgba(255,107,0,0.3)] animate-pulse">
          <Shield className="text-black" size={32} />
        </div>
        <div className="text-center">
          <div className="f-display font-black text-3xl tracking-[0.1em] uppercase">AMG PORTAL</div>
          <div className="f-mono text-[10px] text-[#FF9A3C] tracking-[0.4em] uppercase mt-2">Accés de Seguretat</div>
        </div>
      </div>

      <AMGCard className="w-full max-w-[420px] border-[rgba(255,107,0,0.2)] bg-[#13132a]/80 backdrop-blur-2xl z-10 p-8 shadow-2xl">
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs f-mono flex items-center gap-2">
              <AlertCircle size={14} />
              {error.toUpperCase()}
            </div>
          )}

          <div className="space-y-2">
            <label className="f-mono text-[10px] uppercase tracking-widest text-[#64748b] ml-1">Identificador d'Usuari</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] group-focus-within:text-[#FF9A3C] transition-colors" size={16} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuari@amg.com"
                className="w-full bg-[#0d0d1a] border border-[rgba(255,107,0,0.1)] py-4 pl-10 pr-4 text-sm focus:border-[#FF6B00] outline-none transition-all f-mono placeholder:text-[#212140]"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="f-mono text-[10px] uppercase tracking-widest text-[#64748b] ml-1">Clau d'Accés</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] group-focus-within:text-[#FF9A3C] transition-colors" size={16} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0d0d1a] border border-[rgba(255,107,0,0.1)] py-4 pl-10 pr-4 text-sm focus:border-[#FF6B00] outline-none transition-all f-mono placeholder:text-[#212140]"
                required
              />
            </div>
          </div>

          <AMGButton 
            type="submit"
            className="w-full justify-center mt-6 py-5 shadow-[0_10px_20px_rgba(255,107,0,0.15)]"
            icon={loading ? null : ArrowRight}
            disabled={loading}
          >
            {loading ? 'VERIFICANT CREDENCIALS...' : 'INICIAR SESSIÓ SEGURA'}
          </AMGButton>
        </form>

        <div className="mt-10 pt-8 border-t border-[rgba(255,107,0,0.05)] flex justify-between items-center">
          <a href="#" className="f-mono text-[9px] text-[#475569] hover:text-[#FF9A3C] transition-colors tracking-widest">
            RECOUPERAR CLAU
          </a>
          <span className="w-1 h-1 bg-[#212140] rounded-full"></span>
          <a href="/" className="f-mono text-[9px] text-[#475569] hover:text-[#FF9A3C] transition-colors tracking-widest">
            TORNAR A LA WEB
          </a>
        </div>
      </AMGCard>

      <div className="mt-16 text-[#212140] f-mono text-[10px] uppercase tracking-[0.5em] font-bold">
        END-TO-END ENCRYPTION ACTIVE
      </div>
    </div>
  );
}
