import React, { useState } from 'react';
import { adminApi } from '../services/api';

interface CombatHubSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SANDBOX_RANKS = [
  { order: 1, name: 'Iniciante do Tatame', min: 1, max: 15, icon: '🥊', reward: 'Certificado Digital de Início na Trilha' },
  { order: 2, name: 'Calejador de Canela', min: 16, max: 40, icon: '🦵', reward: 'Destaque no Mural & Sparring Supervisionado' },
  { order: 3, name: 'Guerreiro da Disciplina', min: 41, max: 80, icon: '🛡️', reward: '5% OFF em Equipamentos ou Seminários' },
  { order: 4, name: 'Nak Muay de Ferro', min: 81, max: 150, icon: '⚔️', reward: '1 Mentoria Técnica Individual (30min)' },
  { order: 5, name: 'Muralha de Banguecoque', min: 151, max: 250, icon: '🏯', reward: 'Prioridade em Exames e 10% OFF na Loja' },
  { order: 6, name: 'Lenda do Campo', min: 251, max: null, icon: '👑', reward: 'Hall da Fama Vitalício & Nome no Quadro de Honra' },
];

interface SandboxState {
  totalCheckins: number;
  weeklyCheckins: number;
  monthlyCheckins: number;
  streakWeeks: number;
  morningCheckins: number;
  nightCheckins: number;
  fridays: number;
  saturdays: number;
  specialEvents: number;
  earlyArrivals: number;
  adverseWeather: number;
  doubleDays: number;
  friendsBrought: number;
  partnerCheckins: number;
  winterTrainings: number;
  decJanTrainings: number;
  returnAfterAbsence: number;
}

const INITIAL_STATE: SandboxState = {
  totalCheckins: 0,
  weeklyCheckins: 0,
  monthlyCheckins: 0,
  streakWeeks: 0,
  morningCheckins: 0,
  nightCheckins: 0,
  fridays: 0,
  saturdays: 0,
  specialEvents: 0,
  earlyArrivals: 0,
  adverseWeather: 0,
  doubleDays: 0,
  friendsBrought: 0,
  partnerCheckins: 0,
  winterTrainings: 0,
  decJanTrainings: 0,
  returnAfterAbsence: 0,
};

export const CombatHubSandboxModal: React.FC<CombatHubSandboxModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [sim, setSim] = useState<SandboxState>(INITIAL_STATE);
  const [toastUnlocked, setToastUnlocked] = useState<string | null>(null);
  const [jsonPreview, setJsonPreview] = useState<string | null>(null);

  if (!isOpen) return null;

  // Avalia as 30 conquistas em tempo real a partir do estado simulado
  const evaluateSandboxAchievements = (s: SandboxState) => [
    // Frequência & Consistência (1-8)
    { id: 1, title: 'Primeiro Gongo', cat: 'Frequência', icon: '🔔', xp: 50, cur: s.totalCheckins, target: 1, desc: '1º treino confirmado' },
    { id: 2, title: 'Sem Desculpas', cat: 'Frequência', icon: '💪', xp: 80, cur: s.weeklyCheckins, target: 3, desc: '3 treinos na semana' },
    { id: 3, title: 'Semana Perfeita', cat: 'Frequência', icon: '🎯', xp: 100, cur: s.weeklyCheckins >= 3 ? 1 : 0, target: 1, desc: '100% da semana concluída' },
    { id: 4, title: 'Hábito Forjado', cat: 'Frequência', icon: '⚒️', xp: 150, cur: s.monthlyCheckins, target: 12, desc: '12 treinos no mês' },
    { id: 5, title: 'Máquina de Treino', cat: 'Frequência', icon: '⚙️', xp: 200, cur: s.monthlyCheckins, target: 16, desc: '16 treinos no mês' },
    { id: 6, title: 'Centenário', cat: 'Frequência', icon: '💯', xp: 350, cur: s.totalCheckins, target: 100, desc: '100 treinos acumulados' },
    { id: 7, title: 'Veterano', cat: 'Frequência', icon: '🎖️', xp: 600, cur: s.totalCheckins, target: 200, desc: '200 treinos acumulados' },
    { id: 8, title: 'Imortal', cat: 'Frequência', icon: '🐉', xp: 1000, cur: s.totalCheckins, target: 365, desc: '365 treinos acumulados' },
    // Sequências / Streaks (9-14)
    { id: 9, title: 'Aquecendo o Motor', cat: 'Streaks', icon: '🔥', xp: 75, cur: s.streakWeeks, target: 2, desc: '2 semanas seguidas' },
    { id: 10, title: 'Ritmo de Luta', cat: 'Streaks', icon: '⚡', xp: 150, cur: s.streakWeeks, target: 4, desc: '4 semanas seguidas' },
    { id: 11, title: 'Blindagem Mental', cat: 'Streaks', icon: '🧠', xp: 300, cur: s.streakWeeks, target: 8, desc: '8 semanas sem faltas' },
    { id: 12, title: 'Inabalável', cat: 'Streaks', icon: '🗿', xp: 450, cur: s.streakWeeks, target: 12, desc: '12 semanas seguidas' },
    { id: 13, title: 'Chuva ou Sol', cat: 'Streaks', icon: '⛈️', xp: 120, cur: s.adverseWeather, target: 1, desc: 'Treinou em clima adverso' },
    { id: 14, title: 'Retorno do Guerreiro', cat: 'Streaks', icon: '🦅', xp: 150, cur: s.returnAfterAbsence, target: 1, desc: 'Retorno pós-lesão/ausência' },
    // Horários & Especiais (15-20)
    { id: 15, title: 'Primeiro Raio de Sol', cat: 'Horários', icon: '🌅', xp: 150, cur: s.morningCheckins, target: 10, desc: '10 treinos de manhã' },
    { id: 16, title: 'Cavalheiro da Noite', cat: 'Horários', icon: '🌙', xp: 150, cur: s.nightCheckins, target: 10, desc: '10 treinos à noite' },
    { id: 17, title: 'Sextou', cat: 'Horários', icon: '🎉', xp: 130, cur: s.fridays, target: 5, desc: '5 sextas-feiras' },
    { id: 18, title: 'Guerreiro de Sábado', cat: 'Horários', icon: '🦁', xp: 160, cur: s.saturdays, target: 4, desc: '4 sábados treinados' },
    { id: 19, title: 'Feriado de Batalha', cat: 'Horários', icon: '🚩', xp: 150, cur: s.specialEvents, target: 1, desc: 'Treinou em feriado/aulão' },
    { id: 20, title: 'Pontualidade Sagrada', cat: 'Horários', icon: '⏱️', xp: 180, cur: s.earlyArrivals, target: 10, desc: '10 treinos chegando cedo' },
    // Superação (21-25)
    { id: 21, title: 'Dose Dupla', cat: 'Superação', icon: '💥', xp: 180, cur: s.doubleDays, target: 1, desc: '2 treinos no mesmo dia' },
    { id: 22, title: 'Maratona', cat: 'Superação', icon: '🏃', xp: 200, cur: s.weeklyCheckins, target: 5, desc: '5 treinos na semana' },
    { id: 23, title: 'Mês de Ferro', cat: 'Superação', icon: '🎄', xp: 250, cur: s.decJanTrainings, target: 8, desc: 'Firme em Dezembro/Janeiro' },
    { id: 24, title: 'Calejamento de Inverno', cat: 'Superação', icon: '❄️', xp: 220, cur: s.winterTrainings, target: 10, desc: '10 treinos no inverno' },
    { id: 25, title: 'Fiel ao Canto', cat: 'Superação', icon: '🥋', xp: 280, cur: s.monthlyCheckins, target: 12, desc: '100% no mês pré-exame' },
    // Comunidade (26-30)
    { id: 26, title: 'Novo Sparring', cat: 'Comunidade', icon: '🤝', xp: 150, cur: s.friendsBrought, target: 1, desc: 'Trouxe amigo para treinar' },
    { id: 27, title: 'Mestre de Cerimônia', cat: 'Comunidade', icon: '📣', xp: 350, cur: s.friendsBrought, target: 3, desc: '3 matrículas/indicações' },
    { id: 28, title: 'Dupla Implacável', cat: 'Comunidade', icon: '🤜', xp: 300, cur: s.partnerCheckins, target: 15, desc: '15 check-ins com parceiro' },
    { id: 29, title: 'Espírito Wai Kru', cat: 'Comunidade', icon: '🙏', xp: 250, cur: s.specialEvents, target: 3, desc: '3 eventos/exames oficiais' },
    { id: 30, title: 'Guardião do CT', cat: 'Comunidade', icon: '🏛️', xp: 800, cur: s.totalCheckins, target: 120, desc: '12 meses média >10/mês' },
  ];

  const applySimulation = (updater: (prev: SandboxState) => SandboxState, labelAcao: string) => {
    const beforeList = evaluateSandboxAchievements(sim);
    const beforeUnlocked = new Set(beforeList.filter((a) => a.cur >= a.target).map((a) => a.id));

    const nextState = updater(sim);
    const afterList = evaluateSandboxAchievements(nextState);
    const newlyUnlocked = afterList.filter((a) => a.cur >= a.target && !beforeUnlocked.has(a.id));

    setSim(nextState);

    if (newlyUnlocked.length > 0) {
      setToastUnlocked(
        `🎉 LEVEL UP! Desbloqueou ${newlyUnlocked
          .map((u) => `${u.icon} ${u.title} (+${u.xp} XP)`)
          .join(', ')}!`
      );
    } else {
      setToastUnlocked(`✅ Simulação aplicada: ${labelAcao}`);
    }
  };

  const achs = evaluateSandboxAchievements(sim);
  const unlockedCount = achs.filter((a) => a.cur >= a.target).length;
  const xpFromAchs = achs
    .filter((a) => a.cur >= a.target)
    .reduce((acc, cur) => acc + cur.xp, 0);
  const totalXp = xpFromAchs + sim.totalCheckins * 10;

  let currentRank = SANDBOX_RANKS[0];
  let nextRank: (typeof SANDBOX_RANKS)[0] | null = SANDBOX_RANKS[1];
  for (let i = 0; i < SANDBOX_RANKS.length; i++) {
    const r = SANDBOX_RANKS[i];
    if (sim.totalCheckins >= r.min && (r.max === null || sim.totalCheckins <= r.max)) {
      currentRank = r;
      nextRank = SANDBOX_RANKS[i + 1] || null;
      break;
    }
  }

  const progressPct =
    sim.totalCheckins === 0
      ? 0
      : nextRank
      ? Math.min(
          100,
          Math.round(((sim.totalCheckins - currentRank.min) / (nextRank.min - currentRank.min)) * 100)
        )
      : 100;

  const handleExportJson = async () => {
    try {
      const res = await adminApi.exportGamificationJson();
      const str = JSON.stringify(res.data, null, 2);
      setJsonPreview(str);
      const blob = new Blob([str], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'combat-hub-gamification-template.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setToastUnlocked('📦 Configuração JSON exportada com sucesso!');
    } catch {
      const fallbackStr = JSON.stringify(
        {
          module: 'Combat-Hub Gamification Showcase',
          ranks: SANDBOX_RANKS,
          achievements: achs,
        },
        null,
        2
      );
      setJsonPreview(fallbackStr);
    }
  };

  const handleResetAll = async () => {
    setSim(INITIAL_STATE);
    setJsonPreview(null);
    setToastUnlocked('🔄 Sandbox resetado para o estado inicial (Padrão)!');
    try {
      await adminApi.resetGamificationDefault();
    } catch {
      // silencioso
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#141418] border-2 border-amber-500/60 rounded-3xl max-w-6xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-2xl space-y-6">
        {/* Header Sandbox */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-black font-black text-[10px] uppercase tracking-widest">
                Combat-Hub Sandbox Interativo
              </span>
              <span className="text-xs text-zinc-400 font-bold">
                Template Showcase para Academias & Franquias
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              🎮 Simulador em Tempo Real — "Trilha do Nak Muay"
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleResetAll}
              className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs transition"
            >
              🔄 Resetar para Padrão
            </button>
            <button
              onClick={handleExportJson}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition"
            >
              📦 Exportar Configuração JSON
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs transition"
            >
              ✕ Fechar Demo
            </button>
          </div>
        </div>

        {/* Toast de Desbloqueio em Tempo Real */}
        {toastUnlocked && (
          <div className="bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-amber-500/20 border border-amber-400/60 rounded-2xl p-3.5 flex items-center justify-between text-xs sm:text-sm font-black text-amber-200">
            <span>{toastUnlocked}</span>
            <button onClick={() => setToastUnlocked(null)} className="text-zinc-400 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Painel de Controle de Simulação + Status do Aluno Simulado */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Esquerda: Controles de Simulação de Check-in e Avanço no Tempo */}
          <div className="lg:col-span-5 bg-[#1A1A1F] border border-zinc-800 rounded-2xl p-4 space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <span>⚡</span>
              <span>1. Simular Check-ins & Condições</span>
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() =>
                  applySimulation(
                    (s) => ({
                      ...s,
                      totalCheckins: s.totalCheckins + 1,
                      weeklyCheckins: s.weeklyCheckins + 1,
                      monthlyCheckins: s.monthlyCheckins + 1,
                      streakWeeks: Math.max(1, s.streakWeeks),
                    }),
                    '+1 Check-in Confirmado'
                  )
                }
                className="p-2.5 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-left text-xs font-bold text-white transition"
              >
                🥊 +1 Check-in Normal
              </button>

              <button
                onClick={() =>
                  applySimulation(
                    (s) => ({
                      ...s,
                      totalCheckins: s.totalCheckins + 5,
                      morningCheckins: s.morningCheckins + 5,
                      weeklyCheckins: s.weeklyCheckins + 2,
                      monthlyCheckins: s.monthlyCheckins + 5,
                    }),
                    '+5 Treinos Turno Manhã'
                  )
                }
                className="p-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-left text-xs font-bold text-amber-200 transition"
              >
                🌅 +5 Treinos Manhã
              </button>

              <button
                onClick={() =>
                  applySimulation(
                    (s) => ({
                      ...s,
                      totalCheckins: s.totalCheckins + 5,
                      nightCheckins: s.nightCheckins + 5,
                      weeklyCheckins: s.weeklyCheckins + 2,
                      monthlyCheckins: s.monthlyCheckins + 5,
                    }),
                    '+5 Treinos Turno Noite'
                  )
                }
                className="p-2.5 rounded-xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/30 text-left text-xs font-bold text-indigo-200 transition"
              >
                🌙 +5 Treinos Noite
              </button>

              <button
                onClick={() =>
                  applySimulation(
                    (s) => ({
                      ...s,
                      totalCheckins: s.totalCheckins + 5,
                      fridays: s.fridays + 5,
                      saturdays: s.saturdays + 4,
                    }),
                    'Sextou (5x) & Sábados (4x)'
                  )
                }
                className="p-2.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-left text-xs font-bold text-purple-200 transition"
              >
                🎉 Sextou & Sábado
              </button>

              <button
                onClick={() =>
                  applySimulation(
                    (s) => ({
                      ...s,
                      totalCheckins: s.totalCheckins + 2,
                      adverseWeather: s.adverseWeather + 1,
                      doubleDays: s.doubleDays + 1,
                      earlyArrivals: s.earlyArrivals + 10,
                    }),
                    'Chuva, Dose Dupla e Pontualidade'
                  )
                }
                className="p-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-left text-xs font-bold text-cyan-200 transition"
              >
                ⛈️ Chuva + Dose Dupla
              </button>

              <button
                onClick={() =>
                  applySimulation(
                    (s) => ({
                      ...s,
                      totalCheckins: s.totalCheckins + 3,
                      friendsBrought: s.friendsBrought + 3,
                      partnerCheckins: s.partnerCheckins + 15,
                      specialEvents: s.specialEvents + 3,
                    }),
                    'Comunidade, Amigo & Wai Kru'
                  )
                }
                className="p-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-left text-xs font-bold text-emerald-200 transition"
              >
                🤝 Comunidade & Wai Kru
              </button>
            </div>

            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 pt-2 border-t border-zinc-800">
              <span>⏳</span>
              <span>2. Avançar no Tempo (Time Travel)</span>
            </h3>

            <div className="space-y-2">
              <button
                onClick={() =>
                  applySimulation(
                    (s) => ({
                      ...s,
                      totalCheckins: s.totalCheckins + 4,
                      weeklyCheckins: 5,
                      monthlyCheckins: s.monthlyCheckins + 4,
                      streakWeeks: s.streakWeeks + 1,
                    }),
                    'Avançou +1 Semana Perfeita'
                  )
                }
                className="w-full py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-black text-white flex items-center justify-between transition"
              >
                <span>⏩ Avançar +1 Semana Perfeita</span>
                <span className="text-amber-400">+4 Check-ins / +1 Sem. Streak</span>
              </button>

              <button
                onClick={() =>
                  applySimulation(
                    (s) => ({
                      ...s,
                      totalCheckins: s.totalCheckins + 16,
                      weeklyCheckins: 5,
                      monthlyCheckins: 16,
                      streakWeeks: s.streakWeeks + 4,
                      winterTrainings: s.winterTrainings + 10,
                      decJanTrainings: s.decJanTrainings + 8,
                      returnAfterAbsence: 1,
                    }),
                    'Avançou +1 Mês de Ferro Completo'
                  )
                }
                className="w-full py-2.5 px-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-black text-white flex items-center justify-between transition"
              >
                <span>🚀 Avançar +1 Mês de Ferro</span>
                <span className="text-amber-400">+16 Check-ins / +4 Sem. Streak</span>
              </button>

              <button
                onClick={() =>
                  applySimulation(
                    () => ({
                      totalCheckins: 365,
                      weeklyCheckins: 5,
                      monthlyCheckins: 20,
                      streakWeeks: 12,
                      morningCheckins: 15,
                      nightCheckins: 15,
                      fridays: 10,
                      saturdays: 8,
                      specialEvents: 5,
                      earlyArrivals: 15,
                      adverseWeather: 3,
                      doubleDays: 3,
                      friendsBrought: 5,
                      partnerCheckins: 20,
                      winterTrainings: 15,
                      decJanTrainings: 12,
                      returnAfterAbsence: 1,
                    }),
                    'Simulação Completa: Lenda do Campo (30/30 Conquistas)'
                  )
                }
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 text-black font-black text-xs uppercase tracking-wider transition"
              >
                👑 Desbloquear Jornada Lenda do Campo (365 Check-ins)
              </button>
            </div>
          </div>

          {/* Direita: Visualização em Tempo Real do Aluno Simulado */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-gradient-to-br from-[#1C1C22] to-red-950/30 border border-zinc-800 rounded-2xl p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl">
                    {sim.totalCheckins === 0 ? '🥋' : currentRank.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-amber-400">
                      Rank Simulado em Tempo Real
                    </span>
                    <h3 className="text-2xl font-black text-white">
                      {sim.totalCheckins === 0 ? 'Aspirante (0 Check-ins)' : currentRank.name}
                    </h3>
                    <p className="text-xs text-zinc-400">{currentRank.reward}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-[#121215] border border-zinc-800 rounded-xl p-2.5">
                    <p className="text-lg font-black text-white">{sim.totalCheckins}</p>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase">Check-ins</p>
                  </div>
                  <div className="bg-[#121215] border border-zinc-800 rounded-xl p-2.5">
                    <p className="text-lg font-black text-orange-400">🔥 {sim.streakWeeks} sem.</p>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase">Streak</p>
                  </div>
                  <div className="bg-[#121215] border border-zinc-800 rounded-xl p-2.5">
                    <p className="text-lg font-black text-amber-400">⚡ {totalXp}</p>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase">XP Total</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800">
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-zinc-300">
                    Próximo Rank: {nextRank ? `${nextRank.icon} ${nextRank.name} (${nextRank.min} treinos)` : '👑 Nível Máximo!'}
                  </span>
                  <span className="text-amber-400">{progressPct}%</span>
                </div>
                <div className="w-full h-2.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-amber-400 transition-all duration-500"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Mini-Grid das 30 Conquistas em Tempo Real */}
            <div className="bg-[#1A1A1F] border border-zinc-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-white">
                  🏆 30 Conquistas Desbloqueáveis ({unlockedCount} / 30 Desbloqueadas)
                </h4>
                <span className="text-xs font-bold text-emerald-400">
                  {Math.round((unlockedCount / 30) * 100)}% Completo
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[280px] overflow-y-auto pr-1">
                {achs.map((a) => {
                  const done = a.cur >= a.target;
                  return (
                    <div
                      key={a.id}
                      className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 transition ${
                        done
                          ? 'bg-emerald-950/30 border-emerald-500/50 text-white'
                          : 'bg-[#121215] border-zinc-800/80 text-zinc-500'
                      }`}
                    >
                      <span className="text-lg">{a.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold truncate text-[11px]">{a.title}</p>
                        <p className="text-[10px] text-zinc-400">
                          {Math.min(a.cur, a.target)}/{a.target} • +{a.xp} XP
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {jsonPreview && (
          <div className="bg-[#101014] border border-zinc-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-amber-400 uppercase">
                📦 Preview da Configuração JSON Exportada
              </span>
              <button
                onClick={() => setJsonPreview(null)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Ocultar JSON
              </button>
            </div>
            <pre className="text-[11px] text-emerald-300 overflow-x-auto max-h-44 font-mono">
              {jsonPreview}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
