import React, { useState, useEffect } from 'react';
import { studentApi } from '../services/api';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

interface MatchItem {
  id: string;
  date: string;
  opponent: string;
  avatar: string;
  tier: string;
  modality: string;
  result: 'VITÓRIA' | 'DERROTA';
  method: string;
  score: string;
  event: string;
  coachNote: string;
}

const mockMatches: MatchItem[] = [
  {
    id: 'm-1',
    date: 'Ontem, 19:30',
    opponent: 'Alexandre "Viper" Ramos',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    tier: 'Faixa Preta',
    modality: 'Muay Thai Tradicional',
    result: 'VITÓRIA',
    method: 'KO / Round 2 (02:14)',
    score: '+35 MMR',
    event: 'Sparring Supervisionado #14',
    coachNote: 'Excelente pêndulo e contra-golpe de direita. Guarda alta e reflexos rápidos.'
  },
  {
    id: 'm-2',
    date: '24 Out, 20:15',
    opponent: 'Marcus "Titan" Miller',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    tier: 'Faixa Marrom',
    modality: 'Jiu-Jitsu (BJJ)',
    result: 'VITÓRIA',
    method: 'Finalização (Armlock / Solo)',
    score: '+28 MMR',
    event: 'Open Mat de Sexta',
    coachNote: 'Transição da guarda laçada direta para a chave de braço. Técnica perfeita.'
  },
  {
    id: 'm-3',
    date: '19 Out, 18:45',
    opponent: 'Dmitri "The Bear" Volkov',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    tier: 'Faixa Preta',
    modality: 'Boxe Clássico',
    result: 'DERROTA',
    method: 'Decisão Dividida (29-28)',
    score: '-14 MMR',
    event: 'Torneio Preparatório Interno',
    coachNote: 'Luta equilibradíssima. Ajustar esquiva lateral contra canhotos para a próxima.'
  },
  {
    id: 'm-4',
    date: '15 Out, 20:00',
    opponent: 'Renato "Caveira" Silva',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    tier: 'Prajied Vermelho',
    modality: 'Kickboxing K-1',
    result: 'VITÓRIA',
    method: 'TKO / Round 1 (Low Kicks)',
    score: '+40 MMR',
    event: 'Desafio Noturno de Striking',
    coachNote: 'Sequência de chutes na coxa com velocidade impecável.'
  }
];

const attendanceWeeklyData = [
  { dia: 'Seg', treinos: 2, meta: 2 },
  { dia: 'Ter', treinos: 1, meta: 1 },
  { dia: 'Qua', treinos: 2, meta: 2 },
  { dia: 'Qui', treinos: 1, meta: 1 },
  { dia: 'Sex', treinos: 2, meta: 2 },
  { dia: 'Sáb', treinos: 1, meta: 1 },
];

const mmrEvolutionData = [
  { mes: 'Mai', mmr: 1840 },
  { mes: 'Jun', mmr: 2020 },
  { mes: 'Jul', mmr: 2190 },
  { mes: 'Ago', mmr: 2410 },
  { mes: 'Set', mmr: 2650 },
  { mes: 'Out', mmr: 2840 },
];

export function StudentPerformanceStatsTab({ aluno }: { aluno?: any }) {
  const [filterPeriod, setFilterPeriod] = useState<'30dias' | 'trimestre' | 'ano'>('30dias');
  const [evalData, setEvalData] = useState<any>(null);

  useEffect(() => {
    if (aluno?.id) {
      studentApi.getEvaluation(aluno.id)
        .then((res: any) => {
          if (res?.data) {
            setEvalData(res.data);
          }
        })
        .catch(() => {});
    }
  }, [aluno?.id]);

  return (
    <div className="space-y-6">
      {/* CABEÇALHO DO MÓDULO */}
      <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] bg-[var(--color-primary-light)] border border-[var(--color-primary-border)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-ping" />
            <span>Analytics Ao Vivo // Dados Consolidados</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[var(--color-text-main)] uppercase tracking-tight">
            Estatísticas de Desempenho &amp; Evolução
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
            Acompanhe métricas em tempo real de assiduidade, aproveitamento de golpes, taxa de vitórias em sparrings e seu ranking consolidado de MMR para impulsionar sua evolução física e técnica.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card-alt)] text-center">
            <span className="block text-base font-mono font-black text-emerald-400">
              87.5%
            </span>
            <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold">Taxa de Vitória</span>
          </div>

          <div className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card-alt)] text-center">
            <span className="block text-base font-mono font-black text-[var(--color-primary)]">
              {evalData?.mmr ? evalData.mmr.toLocaleString('pt-BR') : '2,840'}
            </span>
            <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-bold">MMR Atual</span>
          </div>
        </div>
      </div>

      {/* PARECER TÉCNICO DO PROFESSOR (SE HOUVER) */}
      {evalData?.parecerMestre && (
        <div className="p-4 sm:p-5 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 shadow-md flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-xl shrink-0 border border-yellow-500/30">
            🥋
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-black text-white uppercase tracking-wider">
                Parecer Técnico do Professor ({evalData.avaliadoPor || 'Mestre do Tatame'})
              </h4>
              <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800">
                {evalData.avaliadoEm ? new Date(evalData.avaliadoEm).toLocaleDateString('pt-BR') : 'Avaliação Recente'}
              </span>
            </div>
            <p className="text-xs text-yellow-100/90 italic leading-relaxed">
              "{evalData.parecerMestre}"
            </p>
          </div>
        </div>
      )}

      {/* GRADE DE CARDS KPI (6 MÉTRICAS PRINCIPAIS) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Vitórias / Derrotas */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-md space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
            <span className="font-bold uppercase tracking-wider text-[10px]">Recorde (W / L)</span>
            <span className="text-emerald-400 font-bold">+12% mês</span>
          </div>
          <p className="text-xl sm:text-2xl font-mono font-black text-emerald-400">28V - 4D</p>
          <p className="text-[11px] text-[var(--color-text-muted)] font-medium">87.5% de aproveitamento em lutas</p>
        </div>

        {/* Card 2: Pontuação MMR */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-md space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
            <span className="font-bold uppercase tracking-wider text-[10px]">Classificação MMR</span>
            <span className="text-[var(--color-primary)] font-bold">Top 1%</span>
          </div>
          <p className="text-xl sm:text-2xl font-mono font-black text-[var(--color-primary)]">
            {evalData?.mmr ? `${evalData.mmr.toLocaleString('pt-BR')} MMR` : '2,840 MMR'}
          </p>
          <p className="text-[11px] text-[var(--color-text-muted)] font-medium">Divisão Ouro / Nível Mestre</p>
        </div>

        {/* Card 3: Aproveitamento de Golpes */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-md space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
            <span className="font-bold uppercase tracking-wider text-[10px]">Precisão de Golpes</span>
            <span className="text-cyan-400 font-bold">Excelente</span>
          </div>
          <p className="text-xl sm:text-2xl font-mono font-black text-cyan-400">
            {evalData?.precisaoGolpes ? `${evalData.precisaoGolpes}%` : '78.4%'}
          </p>
          <p className="text-[11px] text-[var(--color-text-muted)] font-medium">Golpes contundentes conectados</p>
        </div>

        {/* Card 4: Assiduidade Mensal */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-md space-y-2">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
            <span className="font-bold uppercase tracking-wider text-[10px]">Assiduidade</span>
            <span className="text-amber-400 font-bold">🔥 14d streak</span>
          </div>
          <p className="text-xl sm:text-2xl font-mono font-black text-amber-400">94.2%</p>
          <p className="text-[11px] text-[var(--color-text-muted)] font-medium">22 treinos no mês (Meta: 20)</p>
        </div>
      </div>

      {/* GRÁFICOS: FREQUÊNCIA SEMANAL & EVOLUÇÃO DE MMR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico 1: Assiduidade Semanal */}
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-base font-black text-[var(--color-text-main)] uppercase tracking-wide flex items-center gap-2">
                <span>📅</span> Frequência Semanal (Check-ins Concluídos)
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">Distribuição de treinos presenciais por dia da semana.</p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              9/9 Treinos Cumpridos
            </span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceWeeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="dia" stroke="#71717A" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717A" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#141416',
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="treinos" fill="var(--color-primary, #FF003C)" radius={[6, 6, 0, 0]} name="Treinos Feitos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 2: Evolução de MMR nos Últimos 6 Meses */}
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-xl space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-base font-black text-[var(--color-text-main)] uppercase tracking-wide flex items-center gap-2">
                <span>📈</span> Curva de Evolução de MMR (Últimos 6 Meses)
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">Crescimento contínuo de pontuação marcial no CT.</p>
            </div>
            <span className="text-xs font-mono font-bold text-[var(--color-primary)] bg-[var(--color-primary-light)] px-2 py-0.5 rounded border border-[var(--color-primary-border)]">
              +1,000 MMR (+54%)
            </span>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mmrEvolutionData}>
                <defs>
                  <linearGradient id="mmrGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary, #FF003C)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-primary, #FF003C)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="mes" stroke="#71717A" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717A" fontSize={11} tickLine={false} domain={['dataMin - 200', 'dataMax + 200']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#141416',
                    borderColor: 'rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="mmr"
                  stroke="var(--color-primary, #FF003C)"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#mmrGradient)"
                  name="Pontuação MMR"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* HISTÓRICO DE LUTAS & SPARRINGS RECENTES */}
      <div className="p-5 sm:p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-black text-[var(--color-text-main)] uppercase tracking-wide flex items-center gap-2">
              <span>🥊</span> Histórico Recente de Lutas &amp; Sparrings Supervisionados
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Registros validados pelo mestre com pontuação de MMR e notas de evolução técnica.
            </p>
          </div>
          <span className="text-xs text-[var(--color-text-muted)]">
            Mostrando últimos 4 combates
          </span>
        </div>

        <div className="space-y-3 pt-1">
          {mockMatches.map((m) => (
            <div
              key={m.id}
              className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card-alt)] hover:border-[var(--color-primary)]/50 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={m.avatar}
                  alt={m.opponent}
                  className="w-12 h-12 rounded-xl object-cover border border-zinc-700/80 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-[var(--color-text-main)] truncate">
                      vs {m.opponent}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                        m.result === 'VITÓRIA'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/15 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {m.result}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                      {m.date}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] mt-1 flex-wrap">
                    <span className="font-semibold text-[var(--color-primary)]">{m.modality}</span>
                    <span>•</span>
                    <span>{m.method}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px] opacity-75">{m.event}</span>
                  </div>

                  {m.coachNote && (
                    <p className="text-[11px] text-amber-300/90 mt-1 italic">
                      💬 Parecer do Mestre: "{m.coachNote}"
                    </p>
                  )}
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-[var(--color-border)]">
                <span
                  className={`font-mono font-black text-sm ${
                    m.score.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {m.score}
                </span>
                <span className="text-[10px] text-[var(--color-text-muted)] uppercase font-semibold">
                  {m.tier}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
