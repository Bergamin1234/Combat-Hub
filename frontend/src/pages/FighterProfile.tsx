import React from 'react';
import { Link } from 'react-router-dom';

export default function FighterProfile() {
  const user = {
    nome: 'Ítalo "Brg" Bergamin',
    tag: '@brg_admin',
    titulo: 'Desenvolvedor do Sistema & Faixa Preta Muay Thai / BJJ',
    bannerUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&q=80',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80',
    biografia: 'Praticante veterano de artes marciais mistas, entusiasta de torneios e arquiteto de software do ecossistema Combat-Hub. Sempre focado em evolução constante técnica e física.',
    estatisticas: [
      { label: 'Lutas Totais', val: '32' },
      { label: 'Taxa W/L', val: '87.5%' },
      { label: 'MMR Global', val: '2,840' },
      { label: 'Rank', val: '#4 Regional' }
    ]
  };

  const skills = [
    { nome: 'Força de Golpe (Striking Power)', porcentagem: 92, cor: 'from-red-600 to-amber-500', nivel: 'Nível 92 / 100' },
    { nome: 'Reflexo & Esquiva (Reaction Time)', porcentagem: 88, cor: 'from-cyan-500 to-blue-600', nivel: 'Nível 88 / 100' },
    { nome: 'Resistência Física (Stamina / Cardio)', porcentagem: 95, cor: 'from-emerald-500 to-teal-600', nivel: 'Nível 95 / 100' },
    { nome: 'Técnica de Finalização (Grappling)', porcentagem: 84, cor: 'from-purple-600 to-indigo-600', nivel: 'Nível 84 / 100' },
    { nome: 'Disciplina Tática (Fight IQ)', porcentagem: 96, cor: 'from-amber-500 to-yellow-400', nivel: 'Nível 96 / 100' }
  ];

  const timeline = [
    { data: 'Há 2 horas', titulo: 'Vitória por Nocaute Técnico', desc: 'Venceu Alexandre Ramos no 2º round do Torneio Arena Qualifiers #12.', icone: '🥊' },
    { data: 'Ontem às 18:30', titulo: 'Conquista Destravada: Mestre dos Tatames', desc: 'Alcançou a marca histórica de 100 horas de sparring registradas.', icone: '🏆' },
    { data: '24 Outubro', titulo: 'Promoção de Graduação', desc: 'Avançou para o Grau Ouro Master com validação do mestre e corpo docente.', icone: '🥋' },
    { data: '20 Outubro', titulo: 'Check-in de Treino Intenso Concluído', desc: 'Completou a sessão de condicionamento de 90 minutos sem faltas.', icone: '⚡' }
  ];

  const badges = [
    { id: 1, nome: 'Primeiro Sangue', desc: 'Primeira vitória por KO registrada', icone: '🩸', tier: 'Ouro' },
    { id: 2, nome: 'Inquebrável', desc: '10 vitórias consecutivas sem derrota', icone: '🛡️', tier: 'Platina' },
    { id: 3, nome: 'Mestre do Tatame', desc: '+100 rounds completados', icone: '🥋', tier: 'Diamante' },
    { id: 4, nome: 'Dev Champion', desc: 'Arquiteto Oficial da Plataforma Combat-Hub', icone: '💻', tier: 'Mestre' },
    { id: 5, nome: 'Relâmpago', desc: 'Finalização em menos de 60 segundos', icone: '⚡', tier: 'Ouro' },
    { id: 6, nome: 'Coração de Ferro', desc: 'Virada espetacular após round desfavorável', icone: '❤️‍🔥', tier: 'Platina' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-slate-100 font-sans pb-20">
      {/* BANNER HORIZONTAL LARGO NO TOPO */}
      <div className="relative h-64 sm:h-80 w-full overflow-hidden border-b border-[#252B3B]">
        <img
          src={user.bannerUrl}
          alt="Banner de Combate"
          className="w-full h-full object-cover filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/40 to-transparent"></div>

        {/* Botão de Retorno / Atalho no Topo */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            to="/dashboard-lutador"
            className="px-3.5 py-1.5 rounded-xl bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 text-xs font-bold transition flex items-center gap-2 shadow-lg"
          >
            <span>← Painel do Lutador</span>
          </Link>
        </div>
      </div>

      {/* CONTAINER PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER DO PERFIL: AVATAR CIRCULAR SOBRE A BORDA INFERIOR ESQUERDA */}
        <div className="relative -mt-20 sm:-mt-24 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#252B3B]">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            {/* Avatar Sobreposto */}
            <div className="relative shrink-0">
              <img
                src={user.avatarUrl}
                alt={user.nome}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-[#0A0B0E] shadow-2xl ring-4 ring-red-600/60"
              />
              <span className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-500 border-2 border-[#0A0B0E] rounded-full" title="Online no Hub"></span>
            </div>

            {/* Informações Básicas */}
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{user.nome}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase bg-purple-600/30 text-purple-300 border border-purple-500/50">
                  💻 [DEV-SYSTEM]
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase bg-red-600/20 text-red-400 border border-red-500/30">
                  Faixa Preta
                </span>
              </div>
              <p className="text-xs text-slate-400 font-bold">{user.tag} • {user.titulo}</p>
              <p className="text-xs text-slate-400 max-w-xl mt-2 leading-relaxed">{user.biografia}</p>
            </div>
          </div>

          {/* Botões de Ação do Perfil */}
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <button className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-wider transition shadow-lg shadow-red-600/30">
              Desafiar para Sparring
            </button>
            <button className="px-4 py-2 rounded-xl bg-[#141720] hover:bg-[#1B202C] text-slate-200 border border-[#252B3B] text-xs font-bold transition">
              Editar Perfil
            </button>
          </div>
        </div>

        {/* MÉTRICAS RÁPIDAS NO HEADER */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {user.estatisticas.map((st, i) => (
            <div key={i} className="bg-[#141720] border border-[#252B3B] p-4 rounded-2xl text-center shadow-md">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{st.label}</p>
              <p className="text-xl sm:text-2xl font-black text-white mt-1">{st.val}</p>
            </div>
          ))}
        </div>

        {/* DIVISÃO EM DUAS COLUNAS PRINCIPAIS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================
              COLUNA DA ESQUERDA: INFORMAÇÕES PESSOAIS & SKILL BARS
             ======================================================== */}
          <div className="lg:col-span-5 space-y-6">
            {/* Box de Informações Pessoais */}
            <div className="bg-[#141720] border border-[#252B3B] rounded-2xl p-6 shadow-xl space-y-4">
              <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#252B3B] pb-3">
                <span>📋</span> Ficha Técnica & Dados Pessoais
              </h2>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-[#252B3B]/50">
                  <span className="text-slate-400">Modalidade Principal:</span>
                  <span className="text-white font-bold">Muay Thai & MMA</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#252B3B]/50">
                  <span className="text-slate-400">Categoria de Peso:</span>
                  <span className="text-white font-bold">Peso Meio-Médio (77 kg)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#252B3B]/50">
                  <span className="text-slate-400">Envergadura:</span>
                  <span className="text-white font-bold">182 cm</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#252B3B]/50">
                  <span className="text-slate-400">Academia / Hub:</span>
                  <span className="text-red-500 font-bold">Combat-Hub Matriz</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Tempo de Docência:</span>
                  <span className="text-white font-bold">8+ Anos no Tatame</span>
                </div>
              </div>
            </div>

            {/* Barras de Progresso Animadas (Skill Bars) */}
            <div className="bg-[#141720] border border-[#252B3B] rounded-2xl p-6 shadow-xl space-y-5">
              <div>
                <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <span>⚡</span> Atributos Físicos & Técnicos
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">Pontuação calibrada por desempenho em combates reais.</p>
              </div>

              <div className="space-y-4">
                {skills.map((sk, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-200">{sk.nome}</span>
                      <span className="font-black text-slate-400 text-[11px]">{sk.nivel}</span>
                    </div>
                    {/* Barra de Progresso com Gradiente */}
                    <div className="w-full h-3 bg-[#0A0B0E] rounded-full overflow-hidden p-0.5 border border-[#252B3B]">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${sk.cor} transition-all duration-1000 ease-out shadow-sm`}
                        style={{ width: `${sk.porcentagem}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================
              COLUNA DA DIREITA: TIMELINE & GRADE VISUAL DE CONQUISTAS
             ======================================================== */}
          <div className="lg:col-span-7 space-y-6">
            {/* Grade Visual de Conquistas e Medalhas */}
            <div className="bg-[#141720] border border-[#252B3B] rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#252B3B] pb-3">
                <div>
                  <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <span>🏆</span> Conquistas & Medalhas Destravadas
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">Recompensas obtidas em treinos e torneios oficiais.</p>
                </div>
                <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                  {badges.length} / 30 Coletadas
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {badges.map((b) => (
                  <div
                    key={b.id}
                    className="bg-[#1B202C]/60 hover:bg-[#1B202C] border border-[#252B3B] hover:border-amber-500/50 rounded-xl p-3 text-center transition group cursor-pointer"
                  >
                    <div className="text-3xl mb-1 group-hover:scale-110 transition duration-200">{b.icone}</div>
                    <p className="text-xs font-black text-white leading-tight">{b.nome}</p>
                    <span className="inline-block mt-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black/40 text-amber-400 border border-amber-500/20">
                      Tier {b.tier}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline de Atividades Recentes */}
            <div className="bg-[#141720] border border-[#252B3B] rounded-2xl p-6 shadow-xl space-y-5">
              <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 border-b border-[#252B3B] pb-3">
                <span>🕒</span> Linha do Tempo & Atividades Recentes
              </h2>

              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#252B3B]">
                {timeline.map((act, idx) => (
                  <div key={idx} className="relative group">
                    {/* Marcador da Timeline */}
                    <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-[#0A0B0E] border-2 border-red-500 group-hover:scale-125 transition flex items-center justify-center text-[8px]">
                      •
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">{act.data}</span>
                        <span className="text-xs">{act.icone}</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5">{act.titulo}</h3>
                      <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{act.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
