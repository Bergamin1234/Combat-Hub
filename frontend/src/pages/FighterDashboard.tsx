import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FighterDashboard() {
  const [activeTab, setActiveTab] = useState<'combates' | 'perfil' | 'desempenho' | 'comunidade'>('combates');

  const stats = [
    { label: 'Vitórias / Derrotas (W/L)', value: '28V - 4D', rate: '87.5% Taxa de Vitória', trend: '+12% este mês', color: 'text-emerald-400' },
    { label: 'Pontos de Classificação', value: '2,840 MMR', rate: 'Divisão Mestre / Ouro', trend: 'Top 1% Global', color: 'text-cyan-400' },
    { label: 'Knockouts / Finalizações', value: '19 KOs', rate: '67.8% de Finalização', trend: 'Média 2.4 min', color: 'text-red-500' },
    { label: 'Sequência Atual (Streak)', value: '6 Seguidas', rate: 'Em Chamas 🔥', trend: 'Recorde: 11', color: 'text-amber-400' }
  ];

  const matchHistory = [
    { id: '1', date: 'Hoje, 10:30', opponent: 'Alexandre "Viper" Ramos', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80', tier: 'Faixa Preta', result: 'VITÓRIA', method: 'KO / Round 2 (02:14)', score: '+35 MMR', event: 'Arena Qualifiers #12' },
    { id: '2', date: '26 Out, 19:00', opponent: 'Marcus "Titan" Miller', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', tier: 'Faixa Marrom', result: 'VITÓRIA', method: 'Finalização (Armlock)', score: '+28 MMR', event: 'Combat-Hub Weekly Fight' },
    { id: '3', date: '22 Out, 21:15', opponent: 'Dmitri "The Bear" Volkov', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80', tier: 'Faixa Preta', result: 'DERROTA', method: 'Decisão Dividida (29-28)', score: '-18 MMR', event: 'Open Grand Prix 2026' },
    { id: '4', date: '18 Out, 18:40', opponent: 'Renato "Caveira" Silva', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&q=80', tier: 'Prajied Vermelho', result: 'VITÓRIA', method: 'TKO / Round 1 (01:05)', score: '+40 MMR', event: 'Muay Thai Clash Cup' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-slate-100 flex font-sans">
      {/* SIDEBAR FIXA À ESQUERDA */}
      <aside className="w-64 bg-[#101218] border-r border-[#252B3B] flex flex-col justify-between p-5 shrink-0 hidden md:flex">
        <div className="space-y-6">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-cyan-500 p-0.5 shadow-lg shadow-red-600/20">
              <div className="w-full h-full bg-[#0A0B0E] rounded-[10px] flex items-center justify-center font-black text-red-500 text-sm">
                ⚔️
              </div>
            </div>
            <div>
              <h1 className="text-base font-black tracking-wider text-white">COMBAT<span className="text-red-500">-HUB</span></h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Painel do Lutador</p>
            </div>
          </div>

          {/* Abas de Navegação */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('combates')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                activeTab === 'combates'
                  ? 'bg-red-600/15 text-red-500 border border-red-500/30 shadow-md shadow-red-600/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <span className="text-sm">🥋</span>
              <span>Combates Agendados</span>
            </button>

            <Link
              to="/perfil-lutador"
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent"
            >
              <span className="text-sm">👤</span>
              <span>Meu Perfil & Skills</span>
            </Link>

            <button
              onClick={() => setActiveTab('desempenho')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                activeTab === 'desempenho'
                  ? 'bg-red-600/15 text-red-500 border border-red-500/30 shadow-md shadow-red-600/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <span className="text-sm">📊</span>
              <span>Análise de Desempenho</span>
            </button>

            <button
              onClick={() => setActiveTab('comunidade')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition text-left ${
                activeTab === 'comunidade'
                  ? 'bg-red-600/15 text-red-500 border border-red-500/30 shadow-md shadow-red-600/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <span className="text-sm">🌐</span>
              <span>Comunidade & Torneios</span>
            </button>
          </nav>
        </div>

        {/* Card de Perfil Resumido do Footer */}
        <div className="bg-[#141720] border border-[#252B3B] p-3 rounded-2xl flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover border border-cyan-400 shadow-sm"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">Ítalo "Brg" Bergamin</p>
            <p className="text-[10px] text-cyan-400 font-semibold truncate">Tier: Master Class</p>
          </div>
        </div>
      </aside>

      {/* ÁREA CENTRAL DE CONTEÚDO */}
      <main className="flex-1 p-4 sm:p-8 space-y-6 overflow-y-auto">
        {/* Header do Topo */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#252B3B] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600/20 text-red-500 border border-red-500/40">
                TEMPORADA 2026 // AO VIVO
              </span>
              <span className="text-xs text-slate-400">Divisão Ouro Elite</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">Painel de Combates & Estatísticas</h2>
            <p className="text-xs text-slate-400 mt-0.5">Monitore seu histórico de lutas, métricas de precisão e confrontos ao vivo.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/perfil-lutador"
              className="px-4 py-2 rounded-xl bg-[#141720] hover:bg-[#1B202C] text-slate-200 border border-[#252B3B] text-xs font-bold transition flex items-center gap-2"
            >
              <span>👤 Ver Meu Perfil</span>
            </Link>
            <button className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider transition shadow-lg shadow-red-600/30 flex items-center gap-2">
              <span>⚔️ Buscar Confronto</span>
            </button>
          </div>
        </header>

        {/* CARDS SUPERIORES DE ESTATÍSTICAS RÁPIDAS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-[#141720] border border-[#252B3B] rounded-2xl p-5 hover:border-slate-600 transition shadow-lg">
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-wider mb-1">{s.label}</p>
              <div className="flex items-baseline justify-between gap-2">
                <span className={`text-2xl sm:text-3xl font-black ${s.color}`}>{s.value}</span>
                <span className="text-[11px] font-bold text-slate-400">{s.rate}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-[#252B3B]/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>Status da Temporada</span>
                <span className="text-emerald-400 font-bold">{s.trend}</span>
              </div>
            </div>
          ))}
        </section>

        {/* TABELA RESPONSIVA: HISTÓRICO DOS ÚLTIMOS CONFRONTOS */}
        <section className="bg-[#141720] border border-[#252B3B] rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-[#252B3B] flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-base font-black text-white tracking-wide">Histórico Recente de Confrontos</h3>
              <p className="text-xs text-slate-400">Resultados oficiais verificados pelo árbitro e registro do sistema.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Filtrar por:</span>
              <select className="bg-[#1B202C] text-xs font-bold text-white border border-[#252B3B] rounded-lg px-3 py-1.5 focus:outline-none">
                <option>Todos os Confrontos</option>
                <option>Somente Vitórias</option>
                <option>Torneios Oficiais</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#101218] text-slate-400 uppercase text-[10px] tracking-wider border-b border-[#252B3B]">
                <tr>
                  <th className="p-4">Data & Horário</th>
                  <th className="p-4">Oponente / Cartel</th>
                  <th className="p-4">Torneio / Evento</th>
                  <th className="p-4">Resultado</th>
                  <th className="p-4">Método & Tempo</th>
                  <th className="p-4 text-right">Impacto MMR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252B3B]/60">
                {matchHistory.map((m) => (
                  <tr key={m.id} className="hover:bg-[#1B202C]/50 transition">
                    <td className="p-4 text-slate-400 font-medium whitespace-nowrap">
                      {m.date}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img src={m.avatar} alt={m.opponent} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
                        <div>
                          <span className="font-bold text-white block">{m.opponent}</span>
                          <span className="text-[10px] text-cyan-400 font-semibold">{m.tier}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-300 font-medium whitespace-nowrap">
                      {m.event}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        m.result === 'VITÓRIA'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-red-500/10 text-red-500 border-red-500/30'
                      }`}>
                        {m.result}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300 font-semibold whitespace-nowrap">
                      {m.method}
                    </td>
                    <td className="p-4 text-right font-black whitespace-nowrap">
                      <span className={m.score.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}>
                        {m.score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
