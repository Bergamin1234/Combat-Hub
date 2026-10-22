import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NoticeCard from '../components/NoticeCard';
import { adminApi, publicApi } from '../services/api';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  const [metricas, setMetricas] = useState({ totalAlunos: 0, assinaturasAtivas: 0, inadimplentes: 0 });
  const [alunos, setAlunos] = useState<any[]>([]);
  const [agendamentos, setAgendamentos] = useState<any>({ pendentes: [], posAula: [], finalizados: [] });
  const [presencas, setPresencas] = useState<any[]>([]);
  const [professores, setProfessores] = useState<any[]>([]);
  const [avisos, setAvisos] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [categoriaFiltroLoja, setCategoriaFiltroLoja] = useState('TODOS');
  const [loading, setLoading] = useState(true);

  // Abas: 'alunos' | 'agendamentos' | 'presencas' | 'avisos' | 'loja' | 'professores'
  const [abaAtiva, setAbaAtiva] = useState('alunos');
  const [subAbaExperimental, setSubAbaExperimental] = useState<'pendentes' | 'posAula'>('pendentes');

  // Modal Novo Aluno
  const [showModal, setShowModal] = useState(false);
  const [novoAluno, setNovoAluno] = useState({ nome: '', cpf: '', email: '', telefone: '', plano: '2x na semana' });

  // Modal Novo Professor (Apenas Admin)
  const [showModalProf, setShowModalProf] = useState(false);
  const [novoProfessor, setNovoProfessor] = useState({
    nome: '',
    email: '',
    senha: '',
    cargo: 'PROFESSOR',
    telefone: '',
    prajied: 'Prajied Azul Claro'
  });

  // Modal Novo Aviso no Mural
  const [showModalAviso, setShowModalAviso] = useState(false);
  const [novoAviso, setNovoAviso] = useState({
    titulo: '',
    conteudo: '',
    tipo: 'GERAL',
    fixado: false
  });

  // Modal Novo Produto na Loja
  const [showModalProduto, setShowModalProduto] = useState(false);
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    categoria: 'PROTETOR_BUCAL',
    preco: '',
    estoque: '10',
    descricao: '',
    imagemUrl: ''
  });

  // Modal Calendário / Presença Detalhada do Aluno
  const [alunoSelecionado, setAlunoSelecionado] = useState<any>(null);
  const [calendarioDados, setCalendarioDados] = useState<any>(null);
  const [loadingCalendario, setLoadingCalendario] = useState(false);
  const [mesCalendario, setMesCalendario] = useState(new Date().getMonth() + 1);
  const [anoCalendario, setAnoCalendario] = useState(new Date().getFullYear());

  // Modal de Ação do Dia no Calendário (Marcar presença / Falta / Doença)
  const [diaSelecionadoAcao, setDiaSelecionadoAcao] = useState<string | null>(null);
  const [statusAcaoDia, setStatusAcaoDia] = useState('PRESENTE');
  const [justificativaInput, setJustificativaInput] = useState('');
  const [tipoJustificativaInput, setTipoJustificativaInput] = useState('DOENCA');
  const [modalAcaoDia, setModalAcaoDia] = useState(false);

  // Modal Converter Experimental em Aluno
  const [leadParaConverter, setLeadParaConverter] = useState<any>(null);
  const [planoConversao, setPlanoConversao] = useState('2x na semana');
  const [valorConversao, setValorConversao] = useState('130');

  useEffect(() => {
    if (isLoggedIn) {
      carregarDashboard();
    }
  }, [isLoggedIn]);

  const carregarDashboard = async () => {
    setLoading(true);
    try {
      const [dashRes, agendRes, presencasRes, avisosRes, produtosRes] = await Promise.all([
        adminApi.getDashboard(),
        adminApi.getAppointments(),
        adminApi.getAttendance(),
        publicApi.getNotices(),
        publicApi.getProducts()
      ]);
      setMetricas(dashRes.data.metricas);
      setAlunos(dashRes.data.alunos);
      setAgendamentos(agendRes.data);
      setPresencas(presencasRes.data);
      setAvisos(avisosRes.data);
      setProdutos(produtosRes.data);

      if (usuarioLogado?.cargo === 'ADMIN') {
        const profsRes = await adminApi.getTeachers();
        setProfessores(profsRes.data);
      }
    } catch (error) {
      console.error('Erro ao carregar dashboard', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const response = await adminApi.login({
        emailOuUsuario: loginInput,
        senha: password
      });
      setUsuarioLogado(response.data.usuario);
      setIsLoggedIn(true);
    } catch (error: any) {
      alert(error.response?.data?.erro || 'Erro ao realizar login.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleQuickLogin = async (cargo: 'ADMIN' | 'PROFESSOR') => {
    setLoginLoading(true);
    try {
      const payload = cargo === 'ADMIN'
        ? { emailOuUsuario: 'admin@boru.com', senha: 'admin123' }
        : { emailOuUsuario: 'felipe@boru.com', senha: 'boru123' };
      const response = await adminApi.login(payload);
      setUsuarioLogado(response.data.usuario);
      setIsLoggedIn(true);
    } catch (error: any) {
      alert('Erro ao realizar login rápido.');
    } finally {
      setLoginLoading(false);
    }
  };

  // ==========================================
  // PROFESSORES (Exclusivo Admin)
  // ==========================================
  const criarProfessor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminApi.createTeacher(novoProfessor);
      alert(`Professor ${novoProfessor.nome} cadastrado com sucesso!`);
      setShowModalProf(false);
      setNovoProfessor({ nome: '', email: '', senha: '', cargo: 'PROFESSOR', telefone: '', prajied: 'Prajied Azul Claro' });
      carregarDashboard();
    } catch (error: any) {
      alert(error.response?.data?.erro || 'Erro ao criar professor.');
    }
  };

  const removerProfessor = async (id: string, nome: string) => {
    if (confirm(`Tem certeza que deseja remover o professor(a) ${nome}?`)) {
      try {
        await adminApi.deleteTeacher(id);
        alert('Professor removido.');
        carregarDashboard();
      } catch (error) {
        alert('Erro ao remover professor.');
      }
    }
  };

  // ==========================================
  // MURAL DE AVISOS
  // ==========================================
  const criarAviso = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminApi.createNotice({
        ...novoAviso,
        autorNome: usuarioLogado?.nome || 'Felipe Borü',
        autorCargo: usuarioLogado?.cargo === 'ADMIN' ? 'Administrador' : 'Professor'
      });
      alert('Aviso publicado no mural com sucesso!');
      setShowModalAviso(false);
      setNovoAviso({ titulo: '', conteudo: '', tipo: 'GERAL', fixado: false });
      carregarDashboard();
    } catch (error) {
      alert('Erro ao criar aviso.');
    }
  };

  const removerAviso = async (id: string) => {
    if (confirm('Deseja excluir este comunicado do mural?')) {
      try {
        await adminApi.deleteNotice(id);
        carregarDashboard();
      } catch (error) {
        alert('Erro ao excluir aviso.');
      }
    }
  };

  // ==========================================
  // LOJA & MERCADO (BETA)
  // ==========================================
  const criarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminApi.createProduct(novoProduto);
      alert('Produto adicionado ao catálogo da loja!');
      setShowModalProduto(false);
      setNovoProduto({ nome: '', categoria: 'PROTETOR_BUCAL', preco: '', estoque: '10', descricao: '', imagemUrl: '' });
      carregarDashboard();
    } catch (error) {
      alert('Erro ao cadastrar produto.');
    }
  };

  const removerProduto = async (id: string) => {
    if (confirm('Deseja excluir este produto do estoque?')) {
      try {
        await adminApi.deleteProduct(id);
        carregarDashboard();
      } catch (error) {
        alert('Erro ao remover produto.');
      }
    }
  };

  // ==========================================
  // ALUNOS & MENSALIDADES
  // ==========================================
  const criarAluno = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await adminApi.createStudent(novoAluno);
      alert(`Aluno criado com sucesso!\n\nSenha temporária gerada: ${response.data.senhaTemporaria}\n(Envie isso para o aluno acessar o portal)`);
      carregarDashboard();
      setShowModal(false);
      setNovoAluno({ nome: '', cpf: '', email: '', telefone: '', plano: '2x na semana' });
    } catch (error: any) {
      alert(error.response?.data?.erro || 'Erro ao criar aluno.');
    }
  };

  const handleRegistrarPagamento = async (aluno: any) => {
    if (confirm(`Confirmar recebimento presencial da mensalidade de ${aluno.nome} (Dinheiro/PIX/Cartão no balcão) e renovar por +30 dias?`)) {
      try {
        const response = await adminApi.registerPayment(aluno.id);
        alert(response.data.mensagem);
        carregarDashboard();
        if (alunoSelecionado && alunoSelecionado.id === aluno.id) {
          abrirCalendarioAluno(alunoSelecionado);
        }
      } catch (error: any) {
        alert(error.response?.data?.erro || 'Erro ao registrar pagamento.');
      }
    }
  };

  const atualizarPrajied = async (alunoId: string, prajied: string) => {
    try {
      await adminApi.updateStudentGrade(alunoId, { prajied });
      alert(`Graduação alterada para ${prajied} com sucesso!`);
      carregarDashboard();
    } catch (error: any) {
      alert(error.response?.data?.erro || 'Erro ao atualizar Prajied.');
    }
  };

  const formatarWhatsUrl = (telefone: string, mensagem: string) => {
    let limpo = (telefone || '').replace(/\D/g, '');
    if (!limpo) return '#';
    if (!limpo.startsWith('55') && (limpo.length === 10 || limpo.length === 11)) {
      limpo = '55' + limpo;
    }
    return `https://wa.me/${limpo}?text=${encodeURIComponent(mensagem)}`;
  };

  const handleCobrar = (aluno: any) => {
    if (!aluno.telefone) {
      alert(`O aluno ${aluno.nome} não possui número de telefone cadastrado.`);
      return;
    }
    const dias = aluno.diasVencimento;
    let msg = '';
    if (dias === null) {
      msg = `Olá ${aluno.nome}, aqui é do CT BORÜ Muay Thai! Tudo bem? Passando para regularizar sua matrícula presencialmente no balcão.`;
    } else if (dias < 0) {
      msg = `Olá ${aluno.nome}, tudo bem? Aqui é do CT BORÜ. Sua mensalidade venceu há ${Math.abs(dias)} dias. Por favor, acerte presencialmente na recepção ou via PIX (+55 69 9238-4491) para manter seu acesso aos treinos!`;
    } else if (dias === 0) {
      msg = `Olá ${aluno.nome}, passando para avisar que sua mensalidade no CT BORÜ vence hoje! O acerto pode ser feito na recepção no início do treino.`;
    } else {
      msg = `Olá ${aluno.nome}, tudo bem? Passando para lembrar que sua mensalidade no CT BORÜ vence em ${dias} dias. Bons treinos!`;
    }
    window.open(formatarWhatsUrl(aluno.telefone, msg), '_blank');
  };

  // ==========================================
  // CALENDÁRIO & FREQUÊNCIA DETALHADA
  // ==========================================
  const abrirCalendarioAluno = async (aluno: any) => {
    setAlunoSelecionado(aluno);
    setMesCalendario(new Date().getMonth() + 1);
    setAnoCalendario(new Date().getFullYear());
    await carregarDadosCalendario(aluno.id, new Date().getMonth() + 1, new Date().getFullYear());
  };

  const carregarDadosCalendario = async (alunoId: string, mes: number, ano: number) => {
    setLoadingCalendario(true);
    try {
      const res = await adminApi.getStudentCalendar(alunoId, { mes, ano });
      setCalendarioDados(res.data);
    } catch (error) {
      console.error('Erro ao carregar calendário do aluno', error);
    } finally {
      setLoadingCalendario(false);
    }
  };

  const mudarMesCalendario = (delta: number) => {
    let novoMes = mesCalendario + delta;
    let novoAno = anoCalendario;
    if (novoMes > 12) {
      novoMes = 1;
      novoAno += 1;
    } else if (novoMes < 1) {
      novoMes = 12;
      novoAno -= 1;
    }
    setMesCalendario(novoMes);
    setAnoCalendario(novoAno);
    if (alunoSelecionado) {
      carregarDadosCalendario(alunoSelecionado.id, novoMes, novoAno);
    }
  };

  const abrirAcaoDia = (dataIso: string) => {
    setDiaSelecionadoAcao(dataIso);
    const presencasDoDia = calendarioDados?.presencasPorDia?.[dataIso] || [];
    const presencaAtual = presencasDoDia[0];
    setStatusAcaoDia(presencaAtual?.status || 'PRESENTE');
    setJustificativaInput(presencaAtual?.justificativa || '');
    setTipoJustificativaInput(presencaAtual?.tipoJustificativa || 'DOENCA');
    setModalAcaoDia(true);
  };

  const salvarPresencaNoDia = async () => {
    if (!alunoSelecionado || !diaSelecionadoAcao) return;
    try {
      await adminApi.saveStudentAttendance(alunoSelecionado.id, {
        data: diaSelecionadoAcao,
        status: statusAcaoDia,
        justificativa: justificativaInput || null,
        tipoJustificativa: statusAcaoDia === 'DOENCA' ? 'DOENCA' : (statusAcaoDia === 'JUSTIFICADO' ? tipoJustificativaInput : null)
      });
      setModalAcaoDia(false);
      carregarDadosCalendario(alunoSelecionado.id, mesCalendario, anoCalendario);
      carregarDashboard();
    } catch (error) {
      alert('Erro ao salvar frequência.');
    }
  };

  const removerPresencaDoDia = async () => {
    if (!alunoSelecionado || !diaSelecionadoAcao) return;
    if (confirm('Deseja remover o registro de frequência deste dia?')) {
      try {
        await adminApi.deleteStudentAttendance(alunoSelecionado.id, { data: diaSelecionadoAcao });
        setModalAcaoDia(false);
        carregarDadosCalendario(alunoSelecionado.id, mesCalendario, anoCalendario);
        carregarDashboard();
      } catch (error) {
        alert('Erro ao remover registro.');
      }
    }
  };

  // ==========================================
  // CONFIRMAÇÃO DE CHECK-IN RÁPIDO
  // ==========================================
  const handleAlterarStatusPresenca = async (presencaId: string, novoStatus: string) => {
    try {
      await adminApi.updateAttendanceStatus(presencaId, {
        status: novoStatus
      });
      setPresencas(prev => prev.map(p => p.id === presencaId ? { ...p, status: novoStatus } : p));
      if (alunoSelecionado) {
        carregarDadosCalendario(alunoSelecionado.id, mesCalendario, anoCalendario);
      }
    } catch (error) {
      alert('Erro ao atualizar presença.');
    }
  };

  // ==========================================
  // LEADS & AULAS EXPERIMENTAIS
  // ==========================================
  const marcarAulaRealizada = async (agendamentoId: string) => {
    if (confirm('Confirmar que a pessoa realizou a aula experimental?')) {
      try {
        await adminApi.updateAppointment(agendamentoId, { status: 'REALIZADA' });
        carregarDashboard();
        setSubAbaExperimental('posAula');
      } catch (error) {
        alert('Erro ao atualizar agendamento.');
      }
    }
  };

  const converterLeadEmAluno = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadParaConverter) return;
    try {
      const response = await adminApi.convertAppointment(leadParaConverter.id, {
        plano: planoConversao,
        valorMensalidade: valorConversao
      });
      alert(`Parabéns! ${leadParaConverter.nome} agora é um aluno matriculado!\n\nSenha temporária: ${response.data.senhaTemporaria}`);
      setLeadParaConverter(null);
      carregarDashboard();
      setAbaAtiva('alunos');
    } catch (error) {
      alert('Erro ao converter lead em aluno.');
    }
  };

  // ==========================================
  // TELA DE LOGIN DO ADMIN / PROFESSOR
  // ==========================================
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 bg-[#0B0B0C] flex items-center justify-center z-[9999] px-4">
        <div className="bg-[#141416] border border-zinc-800 p-8 rounded-2xl w-full max-w-md shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black text-white tracking-widest mb-1">BORÜ</h1>
            <p className="text-red-500 font-bold text-xs uppercase tracking-widest">Painel Administrativo & Professores</p>
            <p className="text-zinc-400 text-xs mt-1">Controle de Alunos, Aulas, Prajied e Equipe</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-zinc-400 text-xs font-semibold mb-1">E-mail ou Usuário</label>
              <input 
                type="text" 
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition text-sm"
                placeholder="Ex: admin@boru.com ou felipe@boru.com"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-400 text-xs font-semibold mb-1">Senha de Acesso</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition text-sm"
                placeholder="Sua senha"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={loginLoading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition transform active:scale-95 shadow-lg shadow-red-600/30 text-sm uppercase tracking-wider"
            >
              {loginLoading ? 'Verificando...' : 'Entrar no Painel'}
            </button>
          </form>

          {/* Atalhos rápidos para apresentação */}
          <div className="mt-6 pt-5 border-t border-zinc-800/80">
            <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-wider text-center mb-2">Acesso Rápido de Demonstração:</p>
            <div className="grid grid-cols-2 gap-2">
              <button 
                type="button"
                onClick={() => handleQuickLogin('ADMIN')}
                className="p-2.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/60 text-xs text-white font-bold transition flex flex-col items-center justify-center gap-0.5"
              >
                <span>👑 Administrador</span>
                <span className="text-[10px] text-zinc-400 font-normal">Acesso Master</span>
              </button>
              <button 
                type="button"
                onClick={() => handleQuickLogin('PROFESSOR')}
                className="p-2.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 border border-zinc-700/60 text-xs text-red-400 font-bold transition flex flex-col items-center justify-center gap-0.5"
              >
                <span>🥋 Prof. Felipe Borü</span>
                <span className="text-[10px] text-zinc-400 font-normal">Acesso Instrutor</span>
              </button>
            </div>
          </div>

          <Link to="/" className="block text-center mt-5 text-zinc-500 hover:text-white text-xs transition">
            ← Voltar ao site principal
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAINEL LOGADO
  // ==========================================
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-zinc-100 font-sans p-3 sm:p-6 pb-20">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* BARRA SUPERIOR & PERFIL DO USUÁRIO */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-white">
                PAINEL <span className="text-red-600">BORÜ</span>
              </h1>
              {usuarioLogado?.cargo === 'ADMIN' ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                  👑 ADMINISTRADOR
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                  🥋 PROFESSOR
                </span>
              )}
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Olá, <strong className="text-white">{usuarioLogado?.nome}</strong> ({usuarioLogado?.prajied || 'Prajied Oficial'})
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {usuarioLogado?.cargo === 'ADMIN' && (
              <button 
                onClick={() => setShowModalProf(true)}
                className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-amber-900/30"
              >
                <span>➕ Criar Novo Professor</span>
              </button>
            )}
            <button 
              onClick={() => setShowModal(true)}
              className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-red-900/30"
            >
              <span>➕ Novo Aluno</span>
            </button>
            <button 
              onClick={() => { setIsLoggedIn(false); setUsuarioLogado(null); }}
              className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-300 transition"
            >
              Sair
            </button>
          </div>
        </header>

        {/* CARDS DE MÉTRICAS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-[#141416] border border-zinc-800 rounded-xl p-4 sm:p-5">
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Total de Alunos</p>
            <p className="text-3xl font-black text-white">{metricas.totalAlunos}</p>
          </div>
          <div className="bg-[#141416] border border-zinc-800 rounded-xl p-4 sm:p-5">
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Mensalidades em Dia</p>
            <p className="text-3xl font-black text-green-500">{metricas.assinaturasAtivas}</p>
          </div>
          <div className="bg-[#141416] border border-zinc-800 rounded-xl p-4 sm:p-5">
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Pendentes / Atrasados</p>
            <p className="text-3xl font-black text-red-500">{metricas.inadimplentes}</p>
          </div>
        </div>

        {/* NAVEGAÇÃO DE ABAS (TOUCH-FRIENDLY & RESPONSIVO) */}
        <div className="flex gap-2 sm:gap-3 border-b border-zinc-800 pb-3 overflow-x-auto scrollbar-none">
          <button 
            onClick={() => setAbaAtiva('alunos')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              abaAtiva === 'alunos' ? 'bg-red-600 text-white' : 'bg-[#141416] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            👥 Alunos ({alunos.length})
          </button>
          <button 
            onClick={() => setAbaAtiva('presencas')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              abaAtiva === 'presencas' ? 'bg-red-600 text-white' : 'bg-[#141416] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            📋 Chamada & Presenças
          </button>
          <button 
            onClick={() => setAbaAtiva('avisos')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              abaAtiva === 'avisos' ? 'bg-red-600 text-white' : 'bg-[#141416] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            📢 Mural de Avisos ({avisos.length})
          </button>
          <button 
            onClick={() => setAbaAtiva('loja')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              abaAtiva === 'loja' ? 'bg-red-600 text-white' : 'bg-[#141416] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            🛍️ Loja & Mercado (Beta)
          </button>
          <button 
            onClick={() => setAbaAtiva('agendamentos')}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
              abaAtiva === 'agendamentos' ? 'bg-red-600 text-white' : 'bg-[#141416] text-zinc-400 hover:text-white border border-zinc-800'
            }`}
          >
            🎯 Leads & Aulas Exp.
          </button>
          {usuarioLogado?.cargo === 'ADMIN' && (
            <button 
              onClick={() => setAbaAtiva('professores')}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                abaAtiva === 'professores' ? 'bg-amber-600 text-white' : 'bg-[#141416] text-amber-400 hover:text-white border border-amber-900/50'
              }`}
            >
              👑 Professores & Equipe
            </button>
          )}
        </div>

        {/* CONTEÚDO DA ABA: ALUNOS */}
        {abaAtiva === 'alunos' && (
          <div className="bg-[#141416] border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center flex-wrap gap-2">
              <h2 className="text-base sm:text-lg font-bold text-white">Alunos Matriculados</h2>
              <span className="text-xs text-zinc-400">Clique em "Frequência" para ver % de falta, presença e doença.</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#1A1A1E] text-zinc-400 uppercase text-[11px] tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="p-3 sm:p-4">Aluno</th>
                    <th className="p-3 sm:p-4">Plano</th>
                    <th className="p-3 sm:p-4">Graduação (Prajied)</th>
                    <th className="p-3 sm:p-4">Mensalidade</th>
                    <th className="p-3 sm:p-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {alunos.map(aluno => (
                    <tr key={aluno.id} className="hover:bg-zinc-800/30 transition">
                      <td className="p-3 sm:p-4 font-bold text-white">
                        <div>{aluno.nome}</div>
                        <div className="text-[11px] text-zinc-500 font-normal">{aluno.telefone || 'Sem telefone'}</div>
                      </td>
                      <td className="p-3 sm:p-4 text-zinc-300 font-medium">{aluno.plano}</td>
                      <td className="p-3 sm:p-4">
                        <select 
                          value={aluno.prajied || 'Branco'}
                          onChange={(e) => atualizarPrajied(aluno.id, e.target.value)}
                          className="bg-[#1A1A1E] border border-zinc-700 text-white text-xs rounded-lg px-2 py-1 font-semibold focus:border-red-500 outline-none"
                        >
                          <option value="Branco">Branco</option>
                          <option value="Branco e Vermelho">Branco e Vermelho</option>
                          <option value="Vermelho">Vermelho</option>
                          <option value="Vermelho e Azul">Vermelho e Azul</option>
                          <option value="Azul Claro">Azul Claro</option>
                          <option value="Azul Escuro">Azul Escuro</option>
                          <option value="Preto">Preto</option>
                        </select>
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          aluno.status === 'PAGO' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {aluno.status}
                        </span>
                        {aluno.diasVencimento !== null && (
                          <span className="block text-[10px] text-zinc-400 mt-0.5">
                            {aluno.diasVencimento < 0 ? `Venceu há ${Math.abs(aluno.diasVencimento)}d` : `Vence em ${aluno.diasVencimento}d`}
                          </span>
                        )}
                      </td>
                      <td className="p-3 sm:p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          <button 
                            onClick={() => abrirCalendarioAluno(aluno)}
                            className="px-2.5 py-1 rounded bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 text-xs font-bold transition"
                            title="Ver frequência e calendário detalhado"
                          >
                            📅 Frequência
                          </button>
                          <button 
                            onClick={() => handleRegistrarPagamento(aluno)}
                            className="px-2.5 py-1 rounded bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 text-xs font-bold transition"
                            title="Confirmar pagamento presencial (balcão)"
                          >
                            💵 Pago (+30d)
                          </button>
                          <button 
                            onClick={() => handleCobrar(aluno)}
                            className="px-2.5 py-1 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 text-xs font-bold transition"
                            title="Enviar cobrança via WhatsApp"
                          >
                            📲 WhatsApp
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CONTEÚDO DA ABA: CHAMADA & PRESENÇAS */}
        {abaAtiva === 'presencas' && (
          <div className="bg-[#141416] border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center flex-wrap gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white">Chamada de Treinos Recentes</h2>
                <p className="text-xs text-zinc-400">Valide os check-ins ou registre faltas e ausências por doença.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#1A1A1E] text-zinc-400 uppercase text-[11px] tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="p-3 sm:p-4">Aluno</th>
                    <th className="p-3 sm:p-4">Aula / Data</th>
                    <th className="p-3 sm:p-4">Status Atual</th>
                    <th className="p-3 sm:p-4 text-right">Lançar Chamada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {presencas.map(p => (
                    <tr key={p.id} className="hover:bg-zinc-800/30 transition">
                      <td className="p-3 sm:p-4 font-bold text-white">
                        {p.aluno?.nome}
                        <span className="block text-[11px] text-zinc-400 font-normal">{p.aluno?.plano}</span>
                      </td>
                      <td className="p-3 sm:p-4 text-zinc-300">
                        {p.evento?.titulo || 'Treino de Muay Thai'}
                        <span className="block text-[11px] text-zinc-500">
                          {new Date(p.data).toLocaleDateString('pt-BR')} às {new Date(p.data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          p.status === 'PRESENTE' ? 'bg-green-500/20 text-green-400' :
                          p.status === 'DOENCA' ? 'bg-blue-500/20 text-blue-400' :
                          p.status === 'JUSTIFICADO' ? 'bg-cyan-500/20 text-cyan-400' :
                          p.status === 'FALTA' || p.status === 'AUSENTE' ? 'bg-red-500/20 text-red-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {p.status}
                        </span>
                        {p.justificativa && (
                          <span className="block text-[10px] text-zinc-400 mt-1 italic">
                            Motivo: {p.justificativa}
                          </span>
                        )}
                      </td>
                      <td className="p-3 sm:p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          <button 
                            onClick={() => handleAlterarStatusPresenca(p.id, 'PRESENTE')}
                            className="px-2 py-1 rounded bg-green-600/20 text-green-400 hover:bg-green-600 hover:text-white border border-green-500/30 text-xs font-bold transition"
                          >
                            ✓ Presente
                          </button>
                          <button 
                            onClick={() => handleAlterarStatusPresenca(p.id, 'DOENCA')}
                            className="px-2 py-1 rounded bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white border border-blue-500/30 text-xs font-bold transition"
                            title="Registrar falta por motivo de doença / atestado"
                          >
                            🩺 Doença
                          </button>
                          <button 
                            onClick={() => handleAlterarStatusPresenca(p.id, 'FALTA')}
                            className="px-2 py-1 rounded bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white border border-red-500/30 text-xs font-bold transition"
                          >
                            ✗ Falta
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CONTEÚDO DA ABA: MURAL DE AVISOS */}
        {abaAtiva === 'avisos' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-white">Mural de Avisos da Academia</h2>
                <p className="text-xs text-zinc-400">Publicações e recados oficiais vistos por todos os alunos no portal.</p>
              </div>
              <button 
                onClick={() => setShowModalAviso(true)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-red-900/30"
              >
                <span>➕ Publicar Novo Aviso</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {avisos.map(aviso => (
                <NoticeCard
                  key={aviso.id}
                  aviso={aviso}
                  variant="admin"
                  onDelete={removerAviso}
                />
              ))}
            </div>
          </div>
        )}

        {/* CONTEÚDO DA ABA: LOJA & MERCADO (BETA) */}
        {abaAtiva === 'loja' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">Mercado & Loja Borü</h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    VERSÃO BETA
                  </span>
                </div>
                <p className="text-xs text-zinc-400">Controle de estoque dos itens físicos vendidos presencialmente na recepção.</p>
              </div>
              <button 
                onClick={() => setShowModalProduto(true)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-red-900/30"
              >
                <span>➕ Adicionar Produto</span>
              </button>
            </div>

            {/* Categorias */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['TODOS', 'PROTETOR_BUCAL', 'LUVAS', 'CANELEIRAS', 'BANDAGENS', 'ALIMENTOS'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoriaFiltroLoja(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                    categoriaFiltroLoja === cat ? 'bg-red-600 text-white' : 'bg-[#141416] text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat === 'TODOS' ? 'Todos os Produtos' :
                   cat === 'PROTETOR_BUCAL' ? 'Protetor Bucal' :
                   cat === 'LUVAS' ? 'Luvas' :
                   cat === 'CANELEIRAS' ? 'Caneleiras' :
                   cat === 'BANDAGENS' ? 'Bandagens' : 'Alimentos & Bebidas'}
                </button>
              ))}
            </div>

            {/* Grid de produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {produtos
                .filter(p => categoriaFiltroLoja === 'TODOS' || p.categoria === categoriaFiltroLoja)
                .map(prod => (
                  <div key={prod.id} className="bg-[#141416] border border-zinc-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition">
                    <div className="h-40 bg-zinc-900 relative overflow-hidden">
                      <img 
                        src={prod.imagemUrl || 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&q=80'} 
                        alt={prod.nome} 
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-white">
                        Estoque: {prod.estoque}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-red-500">
                          {prod.categoria.replace('_', ' ')}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1 leading-snug">{prod.nome}</h4>
                        {prod.descricao && (
                          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">{prod.descricao}</p>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center">
                        <span className="text-base font-black text-white">
                          R$ {prod.preco.toFixed(2).replace('.', ',')}
                        </span>
                        <button 
                          onClick={() => removerProduto(prod.id)}
                          className="text-xs text-red-500 hover:text-red-400 transition font-semibold"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* CONTEÚDO DA ABA: PROFESSORES & EQUIPE (ADMIN) */}
        {abaAtiva === 'professores' && usuarioLogado?.cargo === 'ADMIN' && (
          <div className="bg-[#141416] border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center flex-wrap gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white">Professores e Membros da Equipe</h2>
                <p className="text-xs text-zinc-400">Área restrita de gestão de acessos e instrutores do CT.</p>
              </div>
              <button 
                onClick={() => setShowModalProf(true)}
                className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1.5"
              >
                <span>➕ Cadastrar Professor</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#1A1A1E] text-zinc-400 uppercase text-[11px] tracking-wider border-b border-zinc-800">
                  <tr>
                    <th className="p-3 sm:p-4">Nome</th>
                    <th className="p-3 sm:p-4">E-mail / Login</th>
                    <th className="p-3 sm:p-4">Graduação</th>
                    <th className="p-3 sm:p-4">Cargo</th>
                    <th className="p-3 sm:p-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {professores.map(prof => (
                    <tr key={prof.id} className="hover:bg-zinc-800/30 transition">
                      <td className="p-3 sm:p-4 font-bold text-white">
                        {prof.nome}
                        <span className="block text-[11px] text-zinc-400 font-normal">{prof.telefone || 'Sem contato'}</span>
                      </td>
                      <td className="p-3 sm:p-4 text-zinc-300">{prof.email}</td>
                      <td className="p-3 sm:p-4 text-zinc-300 font-semibold">{prof.prajied || 'Prajied Oficial'}</td>
                      <td className="p-3 sm:p-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          prof.cargo === 'ADMIN' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {prof.cargo}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4 text-right">
                        {prof.id !== usuarioLogado?.id && (
                          <button 
                            onClick={() => removerProfessor(prof.id, prof.nome)}
                            className="text-xs text-red-500 hover:text-red-400 font-bold transition"
                          >
                            Excluir
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CONTEÚDO DA ABA: LEADS & AGENDAMENTOS EXPERIMENTAIS */}
        {abaAtiva === 'agendamentos' && (
          <div className="bg-[#141416] border border-zinc-800 rounded-xl overflow-hidden shadow-xl p-4 sm:p-6 space-y-4">
            <div className="flex gap-2 border-b border-zinc-800 pb-3">
              <button 
                onClick={() => setSubAbaExperimental('pendentes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  subAbaExperimental === 'pendentes' ? 'bg-red-600 text-white' : 'bg-[#1A1A1E] text-zinc-400'
                }`}
              >
                Aulas Agendadas ({agendamentos.pendentes?.length || 0})
              </button>
              <button 
                onClick={() => setSubAbaExperimental('posAula')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  subAbaExperimental === 'posAula' ? 'bg-red-600 text-white' : 'bg-[#1A1A1E] text-zinc-400'
                }`}
              >
                Pós-Aula / Fechar Contrato ({agendamentos.posAula?.length || 0})
              </button>
            </div>

            {subAbaExperimental === 'pendentes' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#1A1A1E] text-zinc-400 uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="p-3">Nome</th>
                      <th className="p-3">Telefone</th>
                      <th className="p-3">Data Prevista</th>
                      <th className="p-3 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {agendamentos.pendentes?.map((ag: any) => (
                      <tr key={ag.id} className="hover:bg-zinc-800/30">
                        <td className="p-3 font-bold text-white">{ag.nome}</td>
                        <td className="p-3 text-zinc-300">{ag.telefone}</td>
                        <td className="p-3 text-zinc-300">{ag.data} às {ag.horario}</td>
                        <td className="p-3 text-right">
                          <button 
                            onClick={() => marcarAulaRealizada(ag.id)}
                            className="px-2.5 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition"
                          >
                            ✓ Fez a Aula
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#1A1A1E] text-zinc-400 uppercase text-[11px] tracking-wider">
                    <tr>
                      <th className="p-3">Lead (Fez Aula)</th>
                      <th className="p-3">Dias Desde o Treino</th>
                      <th className="p-3">Observação</th>
                      <th className="p-3 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {agendamentos.posAula?.map((ag: any) => (
                      <tr key={ag.id} className="hover:bg-zinc-800/30">
                        <td className="p-3 font-bold text-white">
                          {ag.nome}
                          <span className="block text-[11px] text-zinc-400 font-normal">{ag.telefone}</span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            ag.diasDesdeAula > 3 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                          }`}>
                            {ag.diasDesdeAula} dias atrás
                          </span>
                        </td>
                        <td className="p-3 text-zinc-400 text-xs italic">{ag.observacao || 'Sem observação'}</td>
                        <td className="p-3 text-right">
                          <button 
                            onClick={() => setLeadParaConverter(ag)}
                            className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                          >
                            Matricular Aluno
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {/* MODAL NOVO ALUNO */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[99999]">
          <div className="bg-[#141416] border border-zinc-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Matricular Novo Aluno</h3>
            <form onSubmit={criarAluno} className="space-y-3">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-1">Nome Completo</label>
                <input required type="text" value={novoAluno.nome} onChange={(e) => setNovoAluno({...novoAluno, nome: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white" />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-1">CPF (Obrigatório)</label>
                <input required type="text" value={novoAluno.cpf} onChange={(e) => setNovoAluno({...novoAluno, cpf: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white" placeholder="000.000.000-00" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold mb-1">WhatsApp</label>
                  <input type="text" value={novoAluno.telefone} onChange={(e) => setNovoAluno({...novoAluno, telefone: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold mb-1">Plano</label>
                  <select value={novoAluno.plano} onChange={(e) => setNovoAluno({...novoAluno, plano: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white">
                    <option value="2x na semana">2x na semana (R$ 130)</option>
                    <option value="3x na semana">3x na semana (R$ 160)</option>
                    <option value="Todos os Horários">Todos os Horários (R$ 280)</option>
                    <option value="Diária">Diária (R$ 40)</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-xs font-bold">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold">Salvar Matrícula</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NOVO PROFESSOR (EXCLUSIVO ADMIN) */}
      {showModalProf && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[99999]">
          <div className="bg-[#141416] border border-zinc-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-amber-400 mb-1">Cadastrar Professor / Usuário</h3>
            <p className="text-zinc-400 text-xs mb-4">Adicione um novo instrutor com permissão de lançar chamadas e graduar alunos.</p>
            <form onSubmit={criarProfessor} className="space-y-3">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-1">Nome Completo</label>
                <input required type="text" value={novoProfessor.nome} onChange={(e) => setNovoProfessor({...novoProfessor, nome: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white" />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-1">E-mail para Login</label>
                <input required type="email" value={novoProfessor.email} onChange={(e) => setNovoProfessor({...novoProfessor, email: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold mb-1">Senha</label>
                  <input required type="password" value={novoProfessor.senha} onChange={(e) => setNovoProfessor({...novoProfessor, senha: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white" placeholder="Mínimo 6" />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold mb-1">Cargo</label>
                  <select value={novoProfessor.cargo} onChange={(e) => setNovoProfessor({...novoProfessor, cargo: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white">
                    <option value="PROFESSOR">Professor / Instrutor</option>
                    <option value="ADMIN">Administrador Geral</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-1">Graduação (Prajied)</label>
                <select value={novoProfessor.prajied} onChange={(e) => setNovoProfessor({...novoProfessor, prajied: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white">
                  <option value="Prajied Azul Claro">Prajied Azul Claro</option>
                  <option value="Prajied Azul Escuro">Prajied Azul Escuro</option>
                  <option value="Prajied Azul Escuro e Preto">Prajied Azul Escuro e Preto</option>
                  <option value="Prajied Preto">Prajied Preto</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowModalProf(false)} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-xs font-bold">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold">Criar Professor</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NOVO AVISO */}
      {showModalAviso && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[99999]">
          <div className="bg-[#141416] border border-zinc-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-3">Publicar no Mural</h3>
            <form onSubmit={criarAviso} className="space-y-3">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-1">Título do Aviso</label>
                <input required type="text" value={novoAviso.titulo} onChange={(e) => setNovoAviso({...novoAviso, titulo: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white" placeholder="Ex: Exame de Graduação" />
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-1">Categoria / Tipo</label>
                <select value={novoAviso.tipo} onChange={(e) => setNovoAviso({...novoAviso, tipo: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white">
                  <option value="GERAL">Geral</option>
                  <option value="URGENTE">Urgente</option>
                  <option value="GRADUACAO">Graduação / Prajied</option>
                  <option value="EVENTO">Evento / Workshop</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-1">Conteúdo da Mensagem</label>
                <textarea required rows={4} value={novoAviso.conteudo} onChange={(e) => setNovoAviso({...novoAviso, conteudo: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white" placeholder="Escreva o comunicado para os alunos..." />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="fixarAviso" checked={novoAviso.fixado} onChange={(e) => setNovoAviso({...novoAviso, fixado: e.target.checked})} className="rounded bg-zinc-800 border-zinc-700 text-red-600" />
                <label htmlFor="fixarAviso" className="text-xs text-zinc-300 font-semibold cursor-pointer">Fixar no topo do mural</label>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowModalAviso(false)} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-xs font-bold">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold">Publicar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL NOVO PRODUTO NA LOJA */}
      {showModalProduto && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[99999]">
          <div className="bg-[#141416] border border-zinc-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-3">Adicionar Produto na Loja</h3>
            <form onSubmit={criarProduto} className="space-y-3">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-1">Nome do Produto</label>
                <input required type="text" value={novoProduto.nome} onChange={(e) => setNovoProduto({...novoProduto, nome: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white" placeholder="Ex: Luva Muay Thai 14oz" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold mb-1">Categoria</label>
                  <select value={novoProduto.categoria} onChange={(e) => setNovoProduto({...novoProduto, categoria: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white">
                    <option value="PROTETOR_BUCAL">Protetor Bucal</option>
                    <option value="LUVAS">Luvas</option>
                    <option value="CANELEIRAS">Caneleiras</option>
                    <option value="BANDAGENS">Bandagens</option>
                    <option value="ALIMENTOS">Alimentos & Bebidas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold mb-1">Preço (R$)</label>
                  <input required type="number" step="0.5" value={novoProduto.preco} onChange={(e) => setNovoProduto({...novoProduto, preco: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white" placeholder="Ex: 45.00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold mb-1">Estoque</label>
                  <input type="number" value={novoProduto.estoque} onChange={(e) => setNovoProduto({...novoProduto, estoque: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-semibold mb-1">URL Imagem</label>
                  <input type="text" value={novoProduto.imagemUrl} onChange={(e) => setNovoProduto({...novoProduto, imagemUrl: e.target.value})} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-sm text-white" placeholder="Opcional" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowModalProduto(false)} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-xs font-bold">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CALENDÁRIO & FREQUÊNCIA DETALHADA COM PORCENTAGENS */}
      {alunoSelecionado && calendarioDados && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-3 sm:p-6 z-[99999] overflow-y-auto">
          <div className="bg-[#141416] border border-zinc-800 rounded-2xl w-full max-w-3xl p-5 sm:p-7 shadow-2xl my-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  📅 Frequência: {alunoSelecionado.nome}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Plano: <strong className="text-white">{alunoSelecionado.plano}</strong> • Prajied: <strong className="text-red-400">{alunoSelecionado.prajied}</strong>
                </p>
              </div>
              <button 
                onClick={() => setAlunoSelecionado(null)}
                className="text-zinc-500 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* CARDS COM AS PORCENTAGENS REQUISITADAS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="bg-[#1A1A1E] border border-zinc-800 rounded-xl p-3">
                <p className="text-[10px] uppercase font-bold text-green-400 mb-0.5">🟢 Presença Real</p>
                <p className="text-2xl font-black text-white">{calendarioDados.estatisticas.porcentagemPresenca}%</p>
                <span className="text-[10px] text-zinc-500">{calendarioDados.estatisticas.presentes} aulas feitas</span>
              </div>
              <div className="bg-[#1A1A1E] border border-zinc-800 rounded-xl p-3">
                <p className="text-[10px] uppercase font-bold text-blue-400 mb-0.5">🔵 Ausência Doença</p>
                <p className="text-2xl font-black text-blue-400">{calendarioDados.estatisticas.porcentagemDoenca}%</p>
                <span className="text-[10px] text-zinc-500">{calendarioDados.estatisticas.doenca} com atestado</span>
              </div>
              <div className="bg-[#1A1A1E] border border-zinc-800 rounded-xl p-3">
                <p className="text-[10px] uppercase font-bold text-red-400 mb-0.5">🔴 Falta Comum</p>
                <p className="text-2xl font-black text-red-500">{calendarioDados.estatisticas.porcentagemFalta}%</p>
                <span className="text-[10px] text-zinc-500">{calendarioDados.estatisticas.faltasNaoJustificadas} sem aviso</span>
              </div>
              <div className="bg-[#1A1A1E] border border-zinc-800 rounded-xl p-3">
                <p className="text-[10px] uppercase font-bold text-amber-400 mb-0.5">⭐ Presença Efetiva</p>
                <p className="text-2xl font-black text-amber-400">{calendarioDados.estatisticas.porcentagemGeral}%</p>
                <span className="text-[10px] text-zinc-500">Considera atestados</span>
              </div>
            </div>

            {/* MÊS E DIAS */}
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm sm:text-base font-bold text-white">
                Mês: {mesCalendario} / {anoCalendario}
              </h4>
              <div className="flex gap-2">
                <button onClick={() => mudarMesCalendario(-1)} className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold rounded">← Anterior</button>
                <button onClick={() => mudarMesCalendario(1)} className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold rounded">Próximo →</button>
              </div>
            </div>

            <p className="text-[11px] text-zinc-400 mb-2">Clique em qualquer dia para registrar Presença, Falta ou Doença:</p>

            {/* Grid dos dias */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold text-zinc-500 mb-1">
              <div>Dom</div><div>Seg</div><div>Ter</div><div>Qua</div><div>Qui</div><div>Sex</div><div>Sáb</div>
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: new Date(anoCalendario, mesCalendario - 1, 1).getDay() }).map((_, i) => (
                <div key={`emp-${i}`} className="h-16 rounded bg-zinc-900/20"></div>
              ))}
              {Array.from({ length: new Date(anoCalendario, mesCalendario, 0).getDate() }).map((_, i) => {
                const dia = i + 1;
                const dataIso = `${anoCalendario}-${String(mesCalendario).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
                const pres = calendarioDados.presencasPorDia?.[dataIso]?.[0];
                return (
                  <button
                    key={`d-${dia}`}
                    onClick={() => abrirAcaoDia(dataIso)}
                    className={`h-16 p-1.5 rounded-lg border text-left flex flex-col justify-between transition hover:scale-105 ${
                      pres?.status === 'PRESENTE' ? 'bg-green-500/20 border-green-500/50 text-white' :
                      pres?.status === 'DOENCA' ? 'bg-blue-500/20 border-blue-500/50 text-white' :
                      pres?.status === 'FALTA' ? 'bg-red-500/20 border-red-500/50 text-white' :
                      'bg-[#1A1A1E] border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <span className="font-bold text-xs">{dia}</span>
                    <span className="text-[9px] font-bold truncate">
                      {pres?.status === 'PRESENTE' ? '✓ Presente' :
                       pres?.status === 'DOENCA' ? '🩺 Doença' :
                       pres?.status === 'FALTA' ? '✗ Falta' : '+ Marcar'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODAL AÇÃO DO DIA (PRESENÇA / FALTA / DOENÇA) */}
      {modalAcaoDia && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-[999999]">
          <div className="bg-[#141416] border border-zinc-800 p-5 rounded-2xl w-full max-w-sm shadow-2xl">
            <h4 className="text-base font-bold text-white mb-2">Lançar Registro para {diaSelecionadoAcao}</h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-1">Status da Chamada</label>
                <select 
                  value={statusAcaoDia} 
                  onChange={(e) => setStatusAcaoDia(e.target.value)}
                  className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-xs text-white"
                >
                  <option value="PRESENTE">🟢 PRESENTE (Treinou normalmente)</option>
                  <option value="DOENCA">🔵 FALTA POR DOENÇA (Com atestado médico)</option>
                  <option value="FALTA">🔴 FALTA NÃO JUSTIFICADA (Sem comparecimento)</option>
                  <option value="JUSTIFICADO">ℹ️ OUTRA JUSTIFICATIVA (Trabalho/Viagem)</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-1">Motivo / Detalhes (Opcional)</label>
                <input 
                  type="text" 
                  value={justificativaInput} 
                  onChange={(e) => setJustificativaInput(e.target.value)}
                  placeholder="Ex: Gripe forte, Atestado de 2 dias..."
                  className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-xs text-white" 
                />
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-zinc-800">
                <button 
                  type="button" 
                  onClick={removerPresencaDoDia}
                  className="text-red-500 hover:text-red-400 text-xs font-bold"
                >
                  Limpar Dia
                </button>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setModalAcaoDia(false)} className="px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded-lg text-xs font-bold">Cancelar</button>
                  <button type="button" onClick={salvarPresencaNoDia} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold">Salvar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CONVERTER LEAD EM ALUNO */}
      {leadParaConverter && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[99999]">
          <div className="bg-[#141416] border border-zinc-800 p-6 rounded-2xl w-full max-w-sm shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Matricular {leadParaConverter.nome}</h3>
            <p className="text-zinc-400 text-xs mb-4">A pessoa já fez a aula experimental e agora será inserida como aluno ativo.</p>
            <form onSubmit={converterLeadEmAluno} className="space-y-3">
              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-1">Plano Escolhido</label>
                <select value={planoConversao} onChange={(e) => setPlanoConversao(e.target.value)} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-xs text-white">
                  <option value="2x na semana">2x na semana (R$ 130)</option>
                  <option value="3x na semana">3x na semana (R$ 160)</option>
                  <option value="Todos os Horários">Todos os Horários (R$ 280)</option>
                  <option value="Diária">Diária (R$ 40)</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 text-xs font-semibold mb-1">Valor da Mensalidade (R$)</label>
                <input type="number" value={valorConversao} onChange={(e) => setValorConversao(e.target.value)} className="w-full bg-[#1A1A1E] border border-zinc-700 rounded-lg p-2.5 text-xs text-white" />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setLeadParaConverter(null)} className="px-3 py-1.5 bg-zinc-800 text-zinc-300 rounded-lg text-xs font-bold">Cancelar</button>
                <button type="submit" className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold">Concluir Matrícula</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
