import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import path from 'path';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos do frontend (modo portátil / produção)
app.use(express.static(path.join(__dirname, '../public')));

// ==========================================
// AUTENTICAÇÃO RBAC (ADMIN & PROFESSORES)
// ==========================================

// Login unificado de equipe (Administrador e Professores)
app.post('/api/auth/login', async (req, res) => {
  const { emailOuUsuario, senha } = req.body;

  if (!emailOuUsuario || !senha) {
    return res.status(400).json({ erro: 'Informe o usuário/e-mail e a senha.' });
  }

  const termo = emailOuUsuario.trim().toLowerCase();

  // Atalhos práticos para demonstração e segurança rápida
  if (senha === 'admin123' && (termo === 'admin' || termo === 'admin@boru.com')) {
    return res.json({
      usuario: {
        id: 'admin-master',
        nome: 'Administrador Geral',
        email: 'admin@boru.com',
        cargo: 'ADMIN',
        telefone: '(69) 99238-4491',
        prajied: 'Prajied Preto'
      }
    });
  }

  if (senha === 'boru123' && (termo === 'felipe' || termo === 'felipe@boru.com' || termo === 'professor')) {
    return res.json({
      usuario: {
        id: 'felipe-boru',
        nome: 'Felipe Borü',
        email: 'felipe@boru.com',
        cargo: 'PROFESSOR',
        telefone: '(69) 99238-4491',
        prajied: 'Prajied Azul Escuro e Preto'
      }
    });
  }

  try {
    const usuario = await prisma.usuario.findFirst({
      where: {
        OR: [
          { email: termo },
          { nome: { contains: emailOuUsuario.trim() } }
        ],
        senha: senha,
        ativo: true
      }
    });

    if (!usuario) {
      return res.status(401).json({ erro: 'Credenciais inválidas. Verifique seu login e senha.' });
    }

    res.json({
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        cargo: usuario.cargo,
        telefone: usuario.telefone,
        modalidade: usuario.modalidade || 'Muay Thai',
        graduacao: usuario.graduacao || usuario.prajied,
        tempoPratica: usuario.tempoPratica,
        tempoDocencia: usuario.tempoDocencia,
        tempoAula: usuario.tempoAula || '60 min',
        horariosAula: usuario.horariosAula,
        cargaHorariaSemanal: usuario.cargaHorariaSemanal,
        prajied: usuario.prajied
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro interno na autenticação.' });
  }
});

// ==========================================
// GESTÃO DE PROFESSORES (EXCLUSIVO PARA ADMIN)
// ==========================================

// Listar todos os professores e membros da equipe
app.get('/api/admin/professores', async (req, res) => {
  try {
    const professores = await prisma.usuario.findMany({
      orderBy: { criadoEm: 'desc' }
    });
    res.json(professores);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar professores.' });
  }
});

// Criar novo professor (Função exclusiva do Administrador)
app.post('/api/admin/professores', async (req, res) => {
  const { 
    nome, 
    email, 
    senha, 
    cargo, 
    telefone, 
    modalidade, 
    graduacao, 
    tempoPratica, 
    tempoDocencia, 
    tempoAula, 
    horariosAula, 
    cargaHorariaSemanal, 
    prajied 
  } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, E-mail e Senha são obrigatórios.' });
  }

  const emailLimpo = email.trim().toLowerCase();

  try {
    const existente = await prisma.usuario.findUnique({
      where: { email: emailLimpo }
    });

    if (existente) {
      return res.status(400).json({ erro: 'Já existe um usuário cadastrado com este e-mail.' });
    }

    const modalidadeFinal = modalidade || 'Muay Thai';
    const graduacaoFinal = graduacao || prajied || 'Prajied Azul Escuro e Preto';

    const novo = await prisma.usuario.create({
      data: {
        nome: nome.trim(),
        email: emailLimpo,
        senha: senha.trim(),
        cargo: cargo === 'ADMIN' ? 'ADMIN' : 'PROFESSOR',
        telefone: telefone ? telefone.trim() : null,
        modalidade: modalidadeFinal,
        graduacao: graduacaoFinal,
        tempoPratica: tempoPratica ? tempoPratica.trim() : null,
        tempoDocencia: tempoDocencia ? tempoDocencia.trim() : null,
        tempoAula: tempoAula || '60 min',
        horariosAula: horariosAula ? horariosAula.trim() : null,
        cargaHorariaSemanal: cargaHorariaSemanal ? cargaHorariaSemanal.trim() : null,
        prajied: graduacaoFinal, // retrocompatibilidade
        ativo: true
      }
    });

    res.json({ mensagem: 'Professor/Usuário cadastrado com sucesso!', professor: novo });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao cadastrar professor.' });
  }
});

// Atualizar dados de um professor
app.patch('/api/admin/professores/:id', async (req, res) => {
  const { id } = req.params;
  const { 
    nome, 
    telefone, 
    prajied, 
    cargo, 
    senha,
    modalidade,
    graduacao,
    tempoPratica,
    tempoDocencia,
    tempoAula,
    horariosAula,
    cargaHorariaSemanal,
    ativo
  } = req.body;

  try {
    const dataUpdate: any = {};
    if (nome) dataUpdate.nome = nome.trim();
    if (telefone !== undefined) dataUpdate.telefone = telefone;
    if (cargo) dataUpdate.cargo = cargo;
    if (senha) dataUpdate.senha = senha.trim();
    if (modalidade) dataUpdate.modalidade = modalidade;
    if (graduacao) {
      dataUpdate.graduacao = graduacao;
      dataUpdate.prajied = graduacao;
    } else if (prajied) {
      dataUpdate.prajied = prajied;
      dataUpdate.graduacao = prajied;
    }
    if (tempoPratica !== undefined) dataUpdate.tempoPratica = tempoPratica;
    if (tempoDocencia !== undefined) dataUpdate.tempoDocencia = tempoDocencia;
    if (tempoAula !== undefined) dataUpdate.tempoAula = tempoAula;
    if (horariosAula !== undefined) dataUpdate.horariosAula = horariosAula;
    if (cargaHorariaSemanal !== undefined) dataUpdate.cargaHorariaSemanal = cargaHorariaSemanal;
    if (ativo !== undefined) dataUpdate.ativo = ativo;

    const atualizado = await prisma.usuario.update({
      where: { id },
      data: dataUpdate
    });

    res.json({ mensagem: 'Dados atualizados com sucesso!', professor: atualizado });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar professor.' });
  }
});

// Excluir professor (Admin)
app.delete('/api/admin/professores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.usuario.delete({ where: { id } });
    res.json({ mensagem: 'Professor removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao remover professor.' });
  }
});

// ==========================================
// MURAL DE AVISOS (COMUNICADOS)
// ==========================================

// Listar avisos para Alunos e Professores
app.get('/api/avisos', async (req, res) => {
  try {
    const avisos = await prisma.aviso.findMany({
      orderBy: [
        { fixado: 'desc' },
        { criadoEm: 'desc' }
      ]
    });
    res.json(avisos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar avisos do mural.' });
  }
});

// Criar aviso no mural (Professores e Admin)
app.post('/api/admin/avisos', async (req, res) => {
  const { titulo, conteudo, tipo, autorNome, autorCargo, fixado } = req.body;

  if (!titulo || !conteudo) {
    return res.status(400).json({ erro: 'Título e conteúdo são obrigatórios.' });
  }

  try {
    const aviso = await prisma.aviso.create({
      data: {
        titulo: titulo.trim(),
        conteudo: conteudo.trim(),
        tipo: tipo || 'GERAL',
        autorNome: autorNome || 'Felipe Borü',
        autorCargo: autorCargo || 'Professor',
        fixado: Boolean(fixado)
      }
    });

    res.json({ mensagem: 'Aviso publicado no mural com sucesso!', aviso });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar aviso.' });
  }
});

// Excluir aviso do mural
app.delete('/api/admin/avisos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.aviso.delete({ where: { id } });
    res.json({ mensagem: 'Aviso removido do mural.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir aviso.' });
  }
});

// ==========================================
// LOJA & MERCADO BORÜ (BETA)
// ==========================================

// Listar produtos da loja (com filtro opcional por categoria)
app.get('/api/produtos', async (req, res) => {
  const { categoria } = req.query;

  try {
    const where: any = { disponivel: true };
    if (categoria && typeof categoria === 'string' && categoria !== 'TODOS') {
      where.categoria = categoria;
    }

    const produtos = await prisma.produto.findMany({
      where,
      orderBy: { criadoEm: 'asc' }
    });

    res.json(produtos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar produtos da loja.' });
  }
});

// Admin adiciona novo produto na loja
app.post('/api/admin/produtos', async (req, res) => {
  const { nome, categoria, preco, estoque, descricao, imagemUrl } = req.body;

  if (!nome || !categoria || preco === undefined) {
    return res.status(400).json({ erro: 'Nome, categoria e preço são obrigatórios.' });
  }

  try {
    const produto = await prisma.produto.create({
      data: {
        nome: nome.trim(),
        categoria,
        preco: parseFloat(preco) || 0,
        estoque: parseInt(estoque) || 0,
        descricao: descricao || null,
        imagemUrl: imagemUrl || null,
        disponivel: true
      }
    });

    res.json({ mensagem: 'Produto cadastrado com sucesso!', produto });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao cadastrar produto.' });
  }
});

// Atualizar produto / estoque
app.put('/api/admin/produtos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, categoria, preco, estoque, descricao, imagemUrl, disponivel } = req.body;

  try {
    const produto = await prisma.produto.update({
      where: { id },
      data: {
        ...(nome ? { nome: nome.trim() } : {}),
        ...(categoria ? { categoria } : {}),
        ...(preco !== undefined ? { preco: parseFloat(preco) } : {}),
        ...(estoque !== undefined ? { estoque: parseInt(estoque) } : {}),
        ...(descricao !== undefined ? { descricao } : {}),
        ...(imagemUrl !== undefined ? { imagemUrl } : {}),
        ...(disponivel !== undefined ? { disponivel } : {})
      }
    });

    res.json({ mensagem: 'Produto atualizado com sucesso!', produto });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar produto.' });
  }
});

// Deletar produto da loja
app.delete('/api/admin/produtos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.produto.delete({ where: { id } });
    res.json({ mensagem: 'Produto removido.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir produto.' });
  }
});

// ==========================================
// ROTAS DO ALUNO
// ==========================================

// Recuperação de senha
app.post('/api/alunos/recuperar-senha', async (req, res) => {
  const { contato } = req.body;

  if (!contato) {
    return res.status(400).json({ erro: 'Por favor, informe seu CPF, E-mail ou Telefone.' });
  }

  const contatoLimpo = contato.trim();
  const apenasNumeros = contatoLimpo.replace(/[^\d]+/g, '');

  try {
    const filters: any[] = [{ email: contatoLimpo }];
    if (apenasNumeros.length > 0) {
      filters.push({ cpf: apenasNumeros });
    }
    if (apenasNumeros.length > 8) {
      filters.push({ telefone: { contains: apenasNumeros } });
    }

    const aluno = await prisma.aluno.findFirst({
      where: { OR: filters }
    });

    if (!aluno) {
      return res.status(404).json({ erro: 'Nenhum aluno encontrado com este contato.' });
    }

    const senhaTemporaria = 'boru123';
    
    await prisma.aluno.update({
      where: { id: aluno.id },
      data: {
        senha: senhaTemporaria,
        primeiroAcesso: true
      }
    });

    res.json({ mensagem: 'Sua senha foi redefinida para "boru123". Faça o login com essa senha e crie uma nova em seguida!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro interno ao recuperar senha.' });
  }
});

// Login do Aluno via CPF e Senha
app.post('/api/alunos/login', async (req, res) => {
  const { cpf, senha } = req.body;
  if (!cpf) return res.status(400).json({ erro: 'CPF é obrigatório.' });

  const cpfLimpo = cpf.replace(/[^\d]+/g, '');

  try {
    const aluno = await prisma.aluno.findUnique({
      where: { cpf: cpfLimpo },
      include: {
        mensalidades: { orderBy: { dataVencimento: 'desc' }, take: 1 }
      }
    });

    if (!aluno) {
      return res.status(404).json({ erro: 'CPF não encontrado no sistema.' });
    }

    if (senha) {
      if (aluno.senha !== senha) {
        return res.status(401).json({ erro: 'Senha incorreta.' });
      }
    } else {
      if (aluno.senha) {
        return res.status(401).json({ erro: 'Senha é obrigatória.' });
      }
    }

    const planoLower = (aluno.plano || '').toLowerCase();
    const isDiariaOuConvenio = planoLower.includes('diária') || planoLower.includes('diaria') || planoLower.includes('wellhub') || planoLower.includes('totalpass') || planoLower.includes('gympass');

    res.json({
      ...aluno,
      isDiariaOuConvenio,
      tipoCobranca: isDiariaOuConvenio ? 'DIARIA_CONVENIO' : 'MENSALIDADE'
    });
  } catch (error) {
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

// Aluno define/troca a senha
app.post('/api/alunos/alterar-senha', async (req, res) => {
  const { id, novaSenha } = req.body;
  try {
    const aluno = await prisma.aluno.update({
      where: { id },
      data: { senha: novaSenha, primeiroAcesso: false }
    });
    res.json({ mensagem: 'Senha atualizada com sucesso!', aluno });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao alterar senha.' });
  }
});

// Gamificação & Estímulo ao Check-in
app.get('/api/alunos/:id/gamificacao', async (req, res) => {
  const { id } = req.params;

  try {
    const aluno = await prisma.aluno.findUnique({ where: { id } });
    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });

    const hoje = new Date();
    const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    const fimMes = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0, 23, 59, 59);

    // Todas as presenças confirmadas do aluno ordenadas
    const presencas = await prisma.agendamentoPresenca.findMany({
      where: { alunoId: id, status: 'PRESENTE' },
      orderBy: { data: 'desc' }
    });

    // Presenças no mês atual
    const presencasNoMes = presencas.filter(p => p.data >= inicioMes && p.data <= fimMes).length;

    // Meta do plano
    const plano = (aluno.plano || '').toLowerCase();
    let metaMes = 8;
    if (plano.includes('3x')) metaMes = 12;
    else if (plano.includes('todos') || plano.includes('livre')) metaMes = 20;
    else if (plano.includes('diaria')) metaMes = 2;

    const progressoMeta = Math.min(100, Math.round((presencasNoMes / metaMes) * 100));

    // Cálculo do Streak (Sequência de semanas ou dias ativos)
    let streak = 0;
    if (presencas.length > 0) {
      streak = Math.min(presencas.length, 12); // Simula streak ativo baseado nas presenças acumuladas
    }

    // Medalhas
    const medalhas = [
      { id: 'm1', titulo: 'Primeiro Sangue', desc: 'Realizou o 1º check-in no tatame', desbloqueada: presencas.length >= 1, icone: '🥋' },
      { id: 'm2', titulo: 'Guerreiro Focado', desc: '5 treinos concluídos com dedicação', desbloqueada: presencas.length >= 5, icone: '🥊' },
      { id: 'm3', titulo: 'Inabalável', desc: 'Atingiu a meta mensal de treinos', desbloqueada: presencasNoMes >= metaMes, icone: '🔥' },
      { id: 'm4', titulo: 'Casca Grossa', desc: 'Mais de 15 presenças registradas', desbloqueada: presencas.length >= 15, icone: '🛡️' }
    ];

    res.json({
      streak,
      presencasNoMes,
      metaMes,
      progressoMeta,
      totalPresencas: presencas.length,
      medalhas
    });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao calcular gamificação.' });
  }
});

// Aluno justifica ausência antecipada (Doença / Atestado / Motivo de Força Maior)
app.post('/api/alunos/justificar-ausencia', async (req, res) => {
  const { alunoId, data, eventoId, motivo, justificativa } = req.body;

  if (!alunoId || !data) {
    return res.status(400).json({ erro: 'Aluno e data são obrigatórios.' });
  }

  try {
    const dataAlvo = new Date(data);
    const inicioDia = new Date(dataAlvo);
    inicioDia.setHours(0, 0, 0, 0);
    const fimDia = new Date(dataAlvo);
    fimDia.setHours(23, 59, 59, 999);

    const statusFinal = motivo === 'DOENCA' ? 'DOENCA' : 'JUSTIFICADO';

    let reg = await prisma.agendamentoPresenca.findFirst({
      where: {
        alunoId,
        data: { gte: inicioDia, lte: fimDia }
      }
    });

    if (reg) {
      reg = await prisma.agendamentoPresenca.update({
        where: { id: reg.id },
        data: {
          status: statusFinal,
          tipoJustificativa: motivo || 'DOENCA',
          justificativa: justificativa || 'Ausência comunicada pelo aluno no app'
        }
      });
    } else {
      reg = await prisma.agendamentoPresenca.create({
        data: {
          alunoId,
          eventoId: eventoId || null,
          data: dataAlvo,
          status: statusFinal,
          tipoJustificativa: motivo || 'DOENCA',
          justificativa: justificativa || 'Ausência comunicada pelo aluno no app'
        }
      });
    }

    res.json({ mensagem: 'Ausência registrada e justificada com sucesso! Melhoras, guerreiro!', registro: reg });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao registrar justificativa.' });
  }
});

// Listar aulas de hoje e próximas com status do aluno
app.get('/api/aulas', async (req, res) => {
  const { alunoId } = req.query;

  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const limite = new Date(hoje);
    limite.setDate(limite.getDate() + 4);

    const aulas = await prisma.eventoDeAula.findMany({
      where: {
        dataInicio: { gte: hoje, lte: limite }
      },
      include: alunoId ? {
        agendamentos: {
          where: { alunoId: String(alunoId) }
        }
      } : undefined,
      orderBy: { dataInicio: 'asc' }
    });

    const aulasFormatadas = aulas.map((aula: any) => {
      const meuCheckin = aula.agendamentos && aula.agendamentos.length > 0 ? aula.agendamentos[0] : null;
      return {
        id: aula.id,
        titulo: aula.titulo,
        dataInicio: aula.dataInicio,
        dataFim: aula.dataFim,
        checkinFeito: Boolean(meuCheckin),
        checkinStatus: meuCheckin ? meuCheckin.status : null,
        checkinId: meuCheckin ? meuCheckin.id : null,
        tipoJustificativa: meuCheckin ? meuCheckin.tipoJustificativa : null
      };
    });

    res.json(aulasFormatadas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar aulas.' });
  }
});

// Realizar Check-in
app.post('/api/checkin', async (req, res) => {
  const { alunoId, eventoId } = req.body;

  if (!alunoId || !eventoId) {
    return res.status(400).json({ erro: 'Aluno e Aula são obrigatórios para o check-in.' });
  }

  try {
    const checkinExistente = await prisma.agendamentoPresenca.findFirst({
      where: { alunoId, eventoId }
    });

    if (checkinExistente) {
      return res.status(400).json({ erro: 'Você já realizou check-in nesta aula.', checkin: checkinExistente });
    }

    const evento = await prisma.eventoDeAula.findUnique({ where: { id: eventoId } });

    const checkin = await prisma.agendamentoPresenca.create({
      data: {
        alunoId,
        eventoId,
        data: evento ? evento.dataInicio : new Date(),
        status: 'AGENDADO'
      }
    });

    res.json({ 
      mensagem: 'Oss! Check-in registrado com sucesso! Mostre sua determinação no tatame.', 
      checkin 
    });
  } catch (error: any) {
    res.status(500).json({ erro: 'Erro ao realizar check-in.' });
  }
});

// ==========================================
// ROTAS DO ADMIN & PROFESSORES
// ==========================================

// Criar Aluno
app.post('/api/admin/alunos', async (req, res) => {
  const { nome, cpf, email, telefone, plano, valorMensalidade } = req.body;
  
  if (!nome || !cpf) {
    return res.status(400).json({ erro: 'Nome e CPF são obrigatórios.' });
  }

  const cpfLimpo = cpf.replace(/[^\d]+/g, '');
  if (!cpfLimpo) return res.status(400).json({ erro: 'CPF inválido.' });

  const senhaTemporaria = Math.floor(100000 + Math.random() * 900000).toString();

  let valorFinal = parseFloat(valorMensalidade);
  if (isNaN(valorFinal)) {
    if (plano === '2x na semana') valorFinal = 130.00;
    else if (plano === '3x na semana') valorFinal = 160.00;
    else if (plano === 'Todos os Horários') valorFinal = 280.00;
    else if (plano === 'Diária') valorFinal = 40.00;
    else valorFinal = 160.00;
  }

  const emailSanitizado = email && typeof email === 'string' && email.trim() !== '' ? email.trim().toLowerCase() : null;
  const telefoneSanitizado = telefone && typeof telefone === 'string' ? telefone.trim() : null;

  try {
    const alunoExistente = await prisma.aluno.findFirst({
      where: {
        OR: [
          { cpf: cpfLimpo },
          ...(emailSanitizado ? [{ email: emailSanitizado }] : [])
        ]
      }
    });

    if (alunoExistente) {
      if (alunoExistente.cpf === cpfLimpo) {
        return res.status(400).json({ erro: `Já existe um aluno cadastrado com este CPF (${cpfLimpo}).` });
      }
      if (emailSanitizado && alunoExistente.email === emailSanitizado) {
        return res.status(400).json({ erro: `Já existe um aluno cadastrado com este E-mail (${emailSanitizado}).` });
      }
    }

    const planoLower = (plano || '').toLowerCase();
    const isDiariaOuConvenio = planoLower.includes('diária') || planoLower.includes('diaria') || planoLower.includes('wellhub') || planoLower.includes('totalpass') || planoLower.includes('gympass');

    const novoAluno = await prisma.aluno.create({
      data: {
        nome: nome.trim(),
        cpf: cpfLimpo,
        email: emailSanitizado,
        telefone: telefoneSanitizado,
        plano: plano || '2x na semana',
        senha: senhaTemporaria,
        primeiroAcesso: true,
        ...(!isDiariaOuConvenio ? {
          mensalidades: {
            create: {
              valor: valorFinal,
              dataVencimento: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
              status: 'PENDENTE'
            }
          }
        } : {})
      }
    });

    res.json({ mensagem: 'Aluno criado com sucesso!', aluno: novoAluno, senhaTemporaria });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ erro: error.message || 'Erro ao criar aluno.' });
  }
});

// Dashboard Geral
app.get('/api/admin/dashboard', async (req, res) => {
  try {
    const totalAlunos = await prisma.aluno.count();
    const agora = new Date();

    const inadimplentesCount = await prisma.mensalidade.count({
      where: {
        status: 'ATRASADO',
        dataVencimento: { lt: agora }
      }
    });

    const alunos = await prisma.aluno.findMany({
      include: {
        mensalidades: { orderBy: { dataVencimento: 'desc' }, take: 1 }
      },
      orderBy: { nome: 'asc' }
    });

    const alunosFormatados = alunos.map(aluno => {
      const ultimaMensalidade = aluno.mensalidades[0];
      let diasVencimento = null;
      let statusMensalidade = 'PAGO';

      if (ultimaMensalidade) {
        statusMensalidade = ultimaMensalidade.status;
        const diferencaTempo = ultimaMensalidade.dataVencimento.getTime() - agora.getTime();
        diasVencimento = Math.ceil(diferencaTempo / (1000 * 3600 * 24));
        if (diasVencimento < 0 && statusMensalidade !== 'PAGO') {
          statusMensalidade = 'ATRASADO';
        }
      }

      return {
        id: aluno.id,
        nome: aluno.nome,
        plano: aluno.plano || '2x na semana',
        cpf: aluno.cpf,
        email: aluno.email,
        telefone: aluno.telefone,
        status: statusMensalidade,
        diasVencimento,
        prajied: aluno.prajied
      };
    });

    res.json({
      metricas: {
        totalAlunos,
        assinaturasAtivas: totalAlunos - inadimplentesCount,
        inadimplentes: inadimplentesCount
      },
      alunos: alunosFormatados
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao buscar dados do painel.' });
  }
});

// Atualizar Prajied
app.patch('/api/admin/alunos/:id/prajied', async (req, res) => {
  const { id } = req.params;
  const { prajied } = req.body;
  try {
    const aluno = await prisma.aluno.update({
      where: { id },
      data: { prajied }
    });
    res.json({ mensagem: 'Prajied atualizado com sucesso!', aluno });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar Prajied.' });
  }
});

// Atualizar Dados Gerais do Aluno (Plano, Prajied, Nome, etc.)
app.patch('/api/admin/alunos/:id', async (req, res) => {
  const { id } = req.params;
  const { plano, prajied, nome, telefone, email } = req.body;
  try {
    const dadosAtualizar: any = {};
    if (plano !== undefined) dadosAtualizar.plano = plano;
    if (prajied !== undefined) dadosAtualizar.prajied = prajied;
    if (nome !== undefined) dadosAtualizar.nome = nome.trim();
    if (telefone !== undefined) dadosAtualizar.telefone = telefone ? telefone.trim() : null;
    if (email !== undefined) dadosAtualizar.email = email ? email.trim().toLowerCase() : null;

    const aluno = await prisma.aluno.update({
      where: { id },
      data: dadosAtualizar
    });
    res.json({ mensagem: 'Aluno atualizado com sucesso!', aluno });
  } catch (error: any) {
    res.status(500).json({ erro: error.message || 'Erro ao atualizar aluno.' });
  }
});

// Registrar pagamento manual (Presencial na recepção - Dinheiro/Pix/Cartão)
app.post('/api/admin/alunos/:id/pagar', async (req, res) => {
  const { id } = req.params;
  try {
    const aluno = await prisma.aluno.findUnique({
      where: { id },
      include: { mensalidades: { orderBy: { dataVencimento: 'desc' }, take: 1 } }
    });

    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado' });

    let novoVencimento = new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);

    if (aluno.mensalidades.length > 0) {
      const ultima = aluno.mensalidades[0];
      if (new Date(ultima.dataVencimento) > new Date()) {
        novoVencimento = new Date(new Date(ultima.dataVencimento).getTime() + 30 * 24 * 60 * 60 * 1000);
      }
    }

    const mensalidade = await prisma.mensalidade.create({
      data: {
        alunoId: id,
        valor: aluno.mensalidades[0]?.valor || 160.00,
        dataVencimento: novoVencimento,
        dataPagamento: new Date(),
        status: 'PAGO'
      }
    });

    res.json({ mensagem: 'Pagamento presencial confirmado com sucesso! Vencimento renovado.', mensalidade });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao registrar pagamento manual.' });
  }
});

// Visualizar presenças/check-ins recentes
app.get('/api/admin/presencas', async (req, res) => {
  try {
    const presencas = await prisma.agendamentoPresenca.findMany({
      include: {
        aluno: { select: { id: true, nome: true, plano: true, telefone: true } },
        evento: { select: { id: true, titulo: true, dataInicio: true } }
      },
      orderBy: { data: 'desc' },
      take: 100
    });
    res.json(presencas);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar presenças.' });
  }
});

// Atualizar status de presença (PRESENTE, FALTA, DOENCA, JUSTIFICADO)
app.patch('/api/admin/presencas/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, justificativa, tipoJustificativa } = req.body;

  try {
    const presenca = await prisma.agendamentoPresenca.update({
      where: { id },
      data: {
        status,
        justificativa: justificativa !== undefined ? justificativa : undefined,
        tipoJustificativa: tipoJustificativa !== undefined ? tipoJustificativa : undefined
      },
      include: { aluno: true, evento: true }
    });

    res.json({ mensagem: 'Status da chamada atualizado!', presenca });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar presença.' });
  }
});

// =======================================================
// CALENDÁRIO COM CÁLCULO DETALHADO DE PRESENÇA, FALTA E DOENÇA
// =======================================================
app.get('/api/admin/alunos/:id/calendario', async (req, res) => {
  const { id } = req.params;
  const agora = new Date();
  const mes = parseInt(req.query.mes as string) || (agora.getMonth() + 1);
  const ano = parseInt(req.query.ano as string) || agora.getFullYear();

  try {
    const aluno = await prisma.aluno.findUnique({
      where: { id },
      include: {
        mensalidades: { orderBy: { dataVencimento: 'desc' }, take: 1 }
      }
    });

    if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado.' });

    const dataInicioMes = new Date(ano, mes - 1, 1, 0, 0, 0, 0);
    const dataFimMes = new Date(ano, mes, 0, 23, 59, 59, 999);

    const presencas = await prisma.agendamentoPresenca.findMany({
      where: {
        alunoId: id,
        data: { gte: dataInicioMes, lte: dataFimMes }
      },
      include: { evento: true },
      orderBy: { data: 'asc' }
    });

    const presencasPorDia: Record<string, any[]> = {};
    presencas.forEach(p => {
      const dataIso = new Date(p.data).toISOString().split('T')[0];
      if (!presencasPorDia[dataIso]) presencasPorDia[dataIso] = [];
      presencasPorDia[dataIso].push(p);
    });

    // Contadores refinados
    const presentesCount = presencas.filter(p => p.status === 'PRESENTE').length;
    const doencaCount = presencas.filter(p => p.status === 'DOENCA' || p.tipoJustificativa === 'DOENCA').length;
    const outrasJustificadasCount = presencas.filter(p => p.status === 'JUSTIFICADO' && p.tipoJustificativa !== 'DOENCA').length;
    const faltasNaoJustificadas = presencas.filter(p => p.status === 'FALTA' || p.status === 'AUSENTE').length;
    const agendadosCount = presencas.filter(p => p.status === 'AGENDADO').length;

    // Frequência esperada & Identificação de Diária/Convênio
    const plano = (aluno.plano || '').toLowerCase();
    const isDiariaOuConvenio = plano.includes('diária') || plano.includes('diaria') || plano.includes('wellhub') || plano.includes('totalpass') || plano.includes('gympass');

    let aulasPorSemana = 2;
    if (plano.includes('3x')) aulasPorSemana = 3;
    else if (plano.includes('todos') || plano.includes('livre')) aulasPorSemana = 5;
    else if (isDiariaOuConvenio) aulasPorSemana = 1;

    const semanasNoMes = 4;
    const aulasEsperadasNoMes = aulasPorSemana * semanasNoMes;

    // Frequência da semana atual (Segunda-feira a Domingo)
    const agoraHoje = new Date();
    const diaDaSemanaHoje = agoraHoje.getDay(); // 0 = Domingo, 1 = Segunda, etc.
    const diffSegunda = agoraHoje.getDate() - (diaDaSemanaHoje === 0 ? 6 : diaDaSemanaHoje - 1);
    const inicioSemanaAtual = new Date(agoraHoje);
    inicioSemanaAtual.setDate(diffSegunda);
    inicioSemanaAtual.setHours(0, 0, 0, 0);

    const fimSemanaAtual = new Date(inicioSemanaAtual);
    fimSemanaAtual.setDate(fimSemanaAtual.getDate() + 6);
    fimSemanaAtual.setHours(23, 59, 59, 999);

    const presencasSemana = await prisma.agendamentoPresenca.findMany({
      where: {
        alunoId: id,
        data: { gte: inicioSemanaAtual, lte: fimSemanaAtual },
        status: { in: ['PRESENTE', 'DOENCA', 'JUSTIFICADO'] }
      },
      orderBy: { data: 'asc' }
    });

    const nomesDias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    const nomesDiasCurto = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const diasFrequentadosNaSemana = presencasSemana.map(p => {
      const d = new Date(p.data);
      return {
        diaSemana: nomesDias[d.getDay()],
        diaSemanaCurto: nomesDiasCurto[d.getDay()],
        dataIso: d.toISOString().split('T')[0],
        dataFormatada: `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`,
        status: p.status
      };
    });

    const frequenciaSemanal = {
      totalNaSemana: presencasSemana.length,
      diasFrequentados: diasFrequentadosNaSemana,
      diasFormatadosTexto: diasFrequentadosNaSemana.length > 0 
        ? diasFrequentadosNaSemana.map(d => `${d.diaSemanaCurto} (${d.dataFormatada})`).join(', ') 
        : 'Nenhum treino registrado nesta semana'
    };

    // Presenças Efetivas (Presença física + Doença/Atestado que não prejudica a graduação)
    const presencasEfetivas = presentesCount + doencaCount + outrasJustificadasCount;
    
    // Porcentagens exatas
    const baseCalculo = Math.max(aulasEsperadasNoMes, presencas.length || 1);
    const pctPresenca = Math.min(100, Math.round((presentesCount / baseCalculo) * 100));
    const pctDoenca = Math.min(100, Math.round((doencaCount / baseCalculo) * 100));
    const pctFalta = Math.min(100, Math.round((faltasNaoJustificadas / baseCalculo) * 100));
    const pctGeralEfetiva = Math.min(100, Math.round((presencasEfetivas / baseCalculo) * 100));

    const ultimaMensalidade = aluno.mensalidades[0];
    let diasParaVencer: number | null = null;
    let statusMensalidade = isDiariaOuConvenio ? 'LIBERADO' : 'PAGO';

    if (!isDiariaOuConvenio && ultimaMensalidade) {
      statusMensalidade = ultimaMensalidade.status;
      const diffTime = new Date(ultimaMensalidade.dataVencimento).getTime() - agora.getTime();
      diasParaVencer = Math.ceil(diffTime / (1000 * 3600 * 24));
      if (diasParaVencer < 0 && statusMensalidade !== 'PAGO') {
        statusMensalidade = 'ATRASADO';
      }
    }

    res.json({
      aluno: {
        id: aluno.id,
        nome: aluno.nome,
        cpf: aluno.cpf,
        telefone: aluno.telefone,
        email: aluno.email,
        plano: aluno.plano || '2x na semana',
        prajied: aluno.prajied,
        isDiariaOuConvenio,
        tipoCobranca: isDiariaOuConvenio ? 'DIARIA_CONVENIO' : 'MENSALIDADE'
      },
      periodo: { mes, ano },
      estatisticas: {
        isDiariaOuConvenio,
        frequenciaSemanal,
        aulasPorSemana,
        aulasEsperadasNoMes,
        presentes: presentesCount,
        doenca: doencaCount,
        justificadas: outrasJustificadasCount,
        faltasNaoJustificadas,
        agendadasPendentes: agendadosCount,
        presencasEfetivas,
        porcentagemPresenca: pctPresenca,
        porcentagemDoenca: pctDoenca,
        porcentagemFalta: pctFalta,
        porcentagemGeral: pctGeralEfetiva
      },
      mensalidade: {
        isDiariaOuConvenio,
        tipoCobranca: isDiariaOuConvenio ? 'DIARIA_CONVENIO' : 'MENSALIDADE',
        status: isDiariaOuConvenio ? 'LIBERADO' : statusMensalidade,
        diasParaVencer: isDiariaOuConvenio ? null : diasParaVencer,
        dataVencimento: isDiariaOuConvenio ? null : (ultimaMensalidade?.dataVencimento || null),
        valor: isDiariaOuConvenio ? 40.00 : (ultimaMensalidade?.valor || 160.00)
      },
      presencas,
      presencasPorDia
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao carregar frequência do aluno.' });
  }
});

// Admin adiciona ou altera presença no calendário
app.post('/api/admin/alunos/:id/presenca', async (req, res) => {
  const { id } = req.params;
  const { data, status, justificativa, tipoJustificativa, eventoId } = req.body;

  if (!data || !status) {
    return res.status(400).json({ erro: 'Data e status são obrigatórios.' });
  }

  try {
    const dataAlvo = new Date(data);
    const inicioDia = new Date(dataAlvo);
    inicioDia.setHours(0, 0, 0, 0);
    const fimDia = new Date(dataAlvo);
    fimDia.setHours(23, 59, 59, 999);

    let registro = await prisma.agendamentoPresenca.findFirst({
      where: {
        alunoId: id,
        data: { gte: inicioDia, lte: fimDia }
      }
    });

    if (registro) {
      registro = await prisma.agendamentoPresenca.update({
        where: { id: registro.id },
        data: {
          status,
          justificativa: justificativa || null,
          tipoJustificativa: tipoJustificativa || null,
          ...(eventoId ? { eventoId } : {})
        }
      });
    } else {
      registro = await prisma.agendamentoPresenca.create({
        data: {
          alunoId: id,
          data: dataAlvo,
          status,
          justificativa: justificativa || null,
          tipoJustificativa: tipoJustificativa || null,
          eventoId: eventoId || null
        }
      });
    }

    res.json({ mensagem: 'Frequência atualizada com sucesso!', registro });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao registrar frequência.' });
  }
});

// Admin remove registro de presença
app.delete('/api/admin/alunos/:id/presenca', async (req, res) => {
  const { id } = req.params;
  const { presencaId, data } = req.body;

  try {
    if (presencaId) {
      await prisma.agendamentoPresenca.delete({ where: { id: presencaId } });
    } else if (data) {
      const dataAlvo = new Date(data);
      const inicioDia = new Date(dataAlvo);
      inicioDia.setHours(0, 0, 0, 0);
      const fimDia = new Date(dataAlvo);
      fimDia.setHours(23, 59, 59, 999);

      await prisma.agendamentoPresenca.deleteMany({
        where: {
          alunoId: id,
          data: { gte: inicioDia, lte: fimDia }
        }
      });
    }

    res.json({ mensagem: 'Registro removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao remover registro.' });
  }
});

// ==========================================
// AULAS EXPERIMENTAIS & LEADS
// ==========================================

// Criar Agendamento Experimental
app.post('/api/agendamentos', async (req, res) => {
  const { nome, telefone, data, horario } = req.body;
  try {
    const agendamento = await prisma.agendamentoExperimental.create({
      data: { nome, telefone, data, horario, status: 'PENDENTE' }
    });
    res.json({ mensagem: 'Aula experimental agendada!', agendamento });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao agendar aula.' });
  }
});

// Listar agendamentos
app.get('/api/admin/agendamentos', async (req, res) => {
  try {
    const todos = await prisma.agendamentoExperimental.findMany({
      orderBy: { criadoEm: 'desc' }
    });

    const agora = new Date();
    const pendentes = todos.filter(a => a.status === 'PENDENTE');
    const posAula = todos
      .filter(a => a.status === 'REALIZADA')
      .map(item => {
        const dataReferencia = item.dataRealizada ? new Date(item.dataRealizada) : new Date(item.criadoEm);
        const diferencaMs = agora.getTime() - dataReferencia.getTime();
        const diasDesdeAula = Math.max(0, Math.floor(diferencaMs / (1000 * 60 * 60 * 24)));
        return {
          ...item,
          diasDesdeAula,
          dataRealizadaFormatada: dataReferencia.toLocaleDateString('pt-BR')
        };
      })
      .sort((a, b) => b.diasDesdeAula - a.diasDesdeAula);

    const finalizados = todos.filter(a => a.status === 'FECHOU_CONTRATO' || a.status === 'DESISTIU');

    res.json({ pendentes, posAula, finalizados, todos });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar agendamentos.' });
  }
});

// Atualizar status de aula experimental
app.patch('/api/admin/agendamentos/:id', async (req, res) => {
  const { id } = req.params;
  const { status, observacao, dataRealizada } = req.body;

  try {
    const dataUpdate: any = {};
    if (status) dataUpdate.status = status;
    if (observacao !== undefined) dataUpdate.observacao = observacao;
    if (status === 'REALIZADA') {
      dataUpdate.dataRealizada = dataRealizada ? new Date(dataRealizada) : new Date();
    } else if (dataRealizada) {
      dataUpdate.dataRealizada = new Date(dataRealizada);
    }

    const agendamento = await prisma.agendamentoExperimental.update({
      where: { id },
      data: dataUpdate
    });

    res.json({ mensagem: 'Agendamento atualizado!', agendamento });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar agendamento.' });
  }
});

// Converter experimental em Aluno Matriculado
app.post('/api/admin/agendamentos/:id/converter', async (req, res) => {
  const { id } = req.params;
  const { plano, valorMensalidade, cpf, email } = req.body;

  try {
    const agendamento = await prisma.agendamentoExperimental.findUnique({ where: { id } });
    if (!agendamento) return res.status(404).json({ erro: 'Agendamento não encontrado.' });

    const cpfFinal = cpf ? cpf.replace(/[^\d]+/g, '') : Math.floor(10000000000 + Math.random() * 90000000000).toString();
    const senhaTemporaria = Math.floor(100000 + Math.random() * 900000).toString();

    const novoAluno = await prisma.aluno.create({
      data: {
        nome: agendamento.nome,
        telefone: agendamento.telefone,
        cpf: cpfFinal,
        email: email || null,
        plano: plano || '2x na semana',
        senha: senhaTemporaria,
        primeiroAcesso: true,
        mensalidades: {
          create: {
            valor: parseFloat(valorMensalidade) || 160.00,
            dataVencimento: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
            status: 'PENDENTE'
          }
        }
      }
    });

    await prisma.agendamentoExperimental.update({
      where: { id },
      data: { status: 'FECHOU_CONTRATO' }
    });

    res.json({
      mensagem: `Parabéns! ${agendamento.nome} agora é um aluno matriculado!`,
      aluno: novoAluno,
      senhaTemporaria
    });
  } catch (error: any) {
    res.status(500).json({ erro: 'Erro ao converter lead em aluno.' });
  }
});

// ==========================================
// CHECKOUT PÚBLICO (PAGAMENTO PRESENCIAL)
// ==========================================

// Pré-matrícula pública via Checkout (Pagamento presencial na recepção)
app.post('/api/checkout', async (req, res) => {
  const { nome, cpf, email, telefone, senha, plano, valor } = req.body;
  if (!nome || !cpf || !senha) {
    return res.status(400).json({ erro: 'Nome, CPF e senha são obrigatórios.' });
  }

  const cpfLimpo = cpf.replace(/[^\d]+/g, '');
  
  try {
    const novoAluno = await prisma.aluno.create({
      data: {
        nome: nome.trim(),
        cpf: cpfLimpo,
        email: email ? email.trim().toLowerCase() : null,
        telefone: telefone ? telefone.trim() : null,
        senha: senha.trim(),
        primeiroAcesso: false,
        plano: plano || '2x na semana',
        mensalidades: {
          create: {
            valor: parseFloat(valor) || 160,
            dataVencimento: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
            status: 'PENDENTE' // Pagamento é feito presencialmente no balcão
          }
        }
      }
    });

    res.json({ 
      mensagem: 'Cadastro realizado com sucesso! Para confirmar sua matrícula, realize o pagamento da 1ª mensalidade presencialmente na recepção da academia.', 
      aluno: novoAluno 
    });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ erro: 'Já existe um aluno com este CPF ou E-mail.' });
    }
    res.status(500).json({ erro: 'Erro ao processar cadastro.' });
  }
});

// Fallback SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server Borü API rodando em http://localhost:${PORT}`);
});
