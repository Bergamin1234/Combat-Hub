import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Limpando dados antigos...');
  await prisma.agendamentoPresenca.deleteMany();
  await prisma.eventoDeAula.deleteMany();
  await prisma.mensalidade.deleteMany();
  await prisma.aluno.deleteMany();
  await prisma.agendamentoExperimental.deleteMany();
  await prisma.aviso.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.usuario.deleteMany();

  console.log('Criando Usuários (Administrador e Professores)...');
  await prisma.usuario.create({
    data: {
      nome: 'Administrador Master',
      email: 'admin@academia.com',
      senha: 'CentroDeCombateModelTotallity984490@!',
      cargo: 'ADMIN',
      telefone: '11987654321',
      prajied: 'Prajied Preto'
    }
  });

  await prisma.usuario.create({
    data: {
      nome: 'Mestre Carlos Silva',
      email: 'carlos@academia.com',
      cpf: '12345678900',
      senha: 'senha123',
      cargo: 'PROFESSOR',
      telefone: '11987654321',
      modalidade: 'Muay Thai',
      graduacao: 'Prajied Azul Escuro e Preto',
      prajied: 'Prajied Azul Escuro e Preto',
      tempoPratica: '12 anos de treino e dedicação',
      tempoDocencia: '7 anos ministrando aulas',
      tempoAula: '60 min',
      horariosAula: 'Seg, Qua e Sex (16h, 19h e 20h) | Ter e Qui (15h, 19h e 20h)',
      cargaHorariaSemanal: '18 horas/semana'
    }
  });

  await prisma.usuario.create({
    data: {
      nome: 'Carlos "Gracie" Silva',
      email: 'carlos.bjj@academia.com',
      cpf: '98765432100',
      senha: 'senha123',
      cargo: 'PROFESSOR',
      telefone: '11991234567',
      modalidade: 'Jiu-Jitsu',
      graduacao: 'Faixa Preta 2º Grau',
      prajied: 'Faixa Preta 2º Grau',
      tempoPratica: '15 anos no tatame / Campeão Estadual',
      tempoDocencia: '8 anos lecionando Jiu-Jitsu',
      tempoAula: '90 min',
      horariosAula: 'Ter e Qui (19h30 às 21h00) | Sábado (10h00)',
      cargaHorariaSemanal: '6 horas/semana'
    }
  });

  await prisma.usuario.create({
    data: {
      nome: 'Marcos "Demolidor" Santos',
      email: 'marcos.boxe@academia.com',
      senha: 'senha123',
      cargo: 'PROFESSOR',
      telefone: '11992345678',
      modalidade: 'Boxe',
      graduacao: 'Sem faixa (Graduação por cartel e tempo)',
      prajied: 'Sem faixa',
      tempoPratica: '10 anos de prática (Cartel: 14V - 2D)',
      tempoDocencia: '5 anos treinando atletas e amadores',
      tempoAula: '60 min',
      horariosAula: 'Seg, Qua e Sex (07h00 e 18h00)',
      cargaHorariaSemanal: '6 horas/semana'
    }
  });

  await prisma.usuario.create({
    data: {
      nome: 'Anderson "Spider" Costa',
      email: 'anderson.mma@academia.com',
      senha: 'senha123',
      cargo: 'PROFESSOR',
      telefone: '11993456789',
      modalidade: 'MMA',
      graduacao: 'Sem faixa (Graduação por experiência e cartel)',
      prajied: 'Sem faixa',
      tempoPratica: '8 anos de prática (Ex-atleta profissional)',
      tempoDocencia: '4 anos formando lutadores',
      tempoAula: '90 min',
      horariosAula: 'Seg e Qua (20h30 às 22h00) | Sex (Sparring 20h)',
      cargaHorariaSemanal: '5 horas/semana'
    }
  });

  await prisma.usuario.create({
    data: {
      nome: 'Mestre Jin-Woo Park',
      email: 'jin.tkd@academia.com',
      senha: 'senha123',
      cargo: 'PROFESSOR',
      telefone: '11994567890',
      modalidade: 'Taekwondo',
      graduacao: 'Faixa Preta 4º Dan',
      prajied: 'Faixa Preta 4º Dan',
      tempoPratica: '18 anos de dedicação / Mestre Formado',
      tempoDocencia: '11 anos ministrando aulas e graduando faixas',
      tempoAula: '60 min',
      horariosAula: 'Ter e Qui (17h00 - Kids / 18h00 - Adultos)',
      cargaHorariaSemanal: '4 horas/semana'
    }
  });

  console.log('Criando Produtos da Loja da Academia (Beta)...');
  await prisma.produto.createMany({
    data: [
      {
        nome: 'Protetor Bucal Gel Termomoldável Combat Pro',
        categoria: 'PROTETOR_BUCAL',
        preco: 45.00,
        estoque: 15,
        descricao: 'Proteção bucal avançada com camada interna de gel para máxima absorção de impacto.',
        imagemUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500&q=80',
        disponivel: true
      },
      {
        nome: 'Protetor Bucal Duplo Combat Fight',
        categoria: 'PROTETOR_BUCAL',
        preco: 60.00,
        estoque: 8,
        descricao: 'Proteção superior e inferior para sparrings pesados e competições.',
        imagemUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500&q=80',
        disponivel: true
      },
      {
        nome: 'Luva Muay Thai Combat Pro 12oz',
        categoria: 'LUVAS',
        preco: 220.00,
        estoque: 6,
        descricao: 'Couro sintético de alta durabilidade, espuma tripla densidade, punho reforçado.',
        imagemUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&q=80',
        disponivel: true
      },
      {
        nome: 'Luva Muay Thai Combat Pro 14oz',
        categoria: 'LUVAS',
        preco: 230.00,
        estoque: 10,
        descricao: 'Ideal para treinos diários e sparring técnico. Excelente ventilação e grip firme.',
        imagemUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&q=80',
        disponivel: true
      },
      {
        nome: 'Luva Muay Thai Combat Pro 16oz',
        categoria: 'LUVAS',
        preco: 250.00,
        estoque: 5,
        descricao: 'Máximo amortecimento para treinos de força e proteção dos companheiros de tatame.',
        imagemUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500&q=80',
        disponivel: true
      },
      {
        nome: 'Caneleira Anatômica Combat Pro',
        categoria: 'CANELEIRAS',
        preco: 180.00,
        estoque: 12,
        descricao: 'Proteção completa da tíbia e peito de pé com fecho duplo reforçado em velcro.',
        imagemUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80',
        disponivel: true
      },
      {
        nome: 'Bandagem Elástica Combat Fight 4 Metros',
        categoria: 'BANDAGENS',
        preco: 35.00,
        estoque: 25,
        descricao: 'Algodão e elastano na medida certa para estabilização de punho e articulações dos dedos.',
        imagemUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80',
        disponivel: true
      },
      {
        nome: 'Bandagem Algodão Combat Fight 5 Metros',
        categoria: 'BANDAGENS',
        preco: 45.00,
        estoque: 18,
        descricao: 'Comprimento profissional para amarração completa de mãos e punhos.',
        imagemUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&q=80',
        disponivel: true
      },
      {
        nome: 'Barrinha de Proteína Whey Crisp Chocolate',
        categoria: 'ALIMENTOS',
        preco: 9.00,
        estoque: 40,
        descricao: '15g de proteína pura para recuperação muscular rápida pós-treino.',
        imagemUrl: 'https://images.unsplash.com/photo-1622484212850-eb596d769edc?w=500&q=80',
        disponivel: true
      },
      {
        nome: 'Paçoca de Amendoim Proteica',
        categoria: 'ALIMENTOS',
        preco: 4.50,
        estoque: 50,
        descricao: 'Energia saudável com amendoim selecionado e zero adição de açúcar.',
        imagemUrl: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=500&q=80',
        disponivel: true
      },
      {
        nome: 'Energético Monster Energy 473ml',
        categoria: 'ALIMENTOS',
        preco: 12.00,
        estoque: 20,
        descricao: 'Gás total para aguentar os rounds mais intensos de artes marciais.',
        imagemUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80',
        disponivel: true
      },
      {
        nome: 'Água Mineral 500ml',
        categoria: 'ALIMENTOS',
        preco: 3.50,
        estoque: 60,
        descricao: 'Hidratação gelada essencial para manter o ritmo no tatame.',
        imagemUrl: 'https://images.unsplash.com/photo-1559839914-17aae19cec71?w=500&q=80',
        disponivel: true
      }
    ]
  });

  console.log('Criando Avisos no Mural...');
  await prisma.aviso.createMany({
    data: [
      {
        titulo: 'Exame Oficial de Graduação de Faixas e Prajieds',
        conteudo: 'Atenção alunos: o próximo exame de graduação será realizado no último sábado deste mês às 09h. Mantenham a frequência e a disciplina afiadas nos treinos!',
        tipo: 'GRADUACAO',
        autorNome: 'Mestre Carlos Silva',
        autorCargo: 'Instrutor Chefe',
        fixado: true
      },
      {
        titulo: 'Lembrete: Pagamento de Mensalidades Presencial',
        conteudo: 'Lembramos a todos os alunos que os pagamentos de mensalidades e diárias são realizados diretamente na recepção da academia (PIX no balcão, Cartão ou Dinheiro).',
        tipo: 'GERAL',
        autorNome: 'Administração Combat Hub',
        autorCargo: 'Recepção',
        fixado: true
      },
      {
        titulo: 'Seminário Especial de Clinch e Técnicas Avançadas',
        conteudo: 'Treino especial com foco intensivo em técnicas avançadas de combate e defesa pessoal. Não perca! Vagas limitadas para alunos matriculados.',
        tipo: 'EVENTO',
        autorNome: 'Coordenação Técnica',
        autorCargo: 'Professor',
        fixado: false
      }
    ]
  });

  console.log('Criando grade de horários de Muay Thai - Mestre Carlos Silva...');
  
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const eventosCriados = [];
  
  const gradeHorarios: Record<number, Array<{h: number, m: number, pub: string}>> = {
    1: [ // Segunda
      {h: 16, m: 0, pub: 'ADULTOS'}, {h: 18, m: 0, pub: 'KIDS'}, {h: 19, m: 0, pub: 'ADULTOS'}, {h: 20, m: 0, pub: 'ADULTOS'}
    ],
    2: [ // Terça
      {h: 15, m: 0, pub: 'ADULTOS'}, {h: 19, m: 0, pub: 'ADULTOS'}, {h: 20, m: 0, pub: 'ADULTOS'}, {h: 22, m: 30, pub: 'ADULTOS'}
    ],
    3: [ // Quarta
      {h: 16, m: 0, pub: 'ADULTOS'}, {h: 18, m: 0, pub: 'KIDS'}, {h: 19, m: 0, pub: 'ADULTOS'}, {h: 20, m: 0, pub: 'ADULTOS'}
    ],
    4: [ // Quinta
      {h: 15, m: 0, pub: 'ADULTOS'}, {h: 19, m: 0, pub: 'ADULTOS'}, {h: 20, m: 0, pub: 'ADULTOS'}, {h: 22, m: 30, pub: 'ADULTOS'}
    ],
    5: [ // Sexta
      {h: 16, m: 0, pub: 'ADULTOS'}, {h: 18, m: 0, pub: 'KIDS'}, {h: 19, m: 0, pub: 'ADULTOS'}, {h: 20, m: 0, pub: 'ADULTOS'}
    ],
    6: [ // Sábado
      {h: 8, m: 0, pub: 'ADULTOS'}, {h: 12, m: 30, pub: 'ADULTOS'}
    ]
  };

  // Gerar para 15 dias a partir de hoje
  for (let i = 0; i < 15; i++) {
    const dataAtual = new Date(hoje);
    dataAtual.setDate(hoje.getDate() + i);
    const diaDaSemana = dataAtual.getDay();

    if (gradeHorarios[diaDaSemana]) {
      const aulasDoDia = gradeHorarios[diaDaSemana];
      for (const aula of aulasDoDia) {
        const dataInicio = new Date(dataAtual);
        dataInicio.setHours(aula.h, aula.m, 0, 0);
        
        const dataFim = new Date(dataInicio);
        dataFim.setHours(aula.h + 1, aula.m, 0, 0);

        const evento = await prisma.eventoDeAula.create({
          data: {
            titulo: `Muay Thai (${aula.pub}) - Mestre Carlos Silva`,
            dataInicio,
            dataFim,
          }
        });
        eventosCriados.push(evento);
      }
    }
  }
  
  console.log('Criando alunos e mensalidades de teste...');
  
  const aluno1 = await prisma.aluno.create({
    data: {
      nome: 'João Pedro',
      cpf: '00000000000',
      telefone: '(69) 99311-2233',
      plano: '2x na semana',
      prajied: 'Branco e Vermelho',
      mensalidades: {
        create: {
          valor: 130.00,
          dataVencimento: new Date(hoje.getTime() + 12 * 24 * 60 * 60 * 1000), // Vence em 12 dias
          status: 'PAGO'
        }
      }
    }
  });

  const aluno2 = await prisma.aluno.create({
    data: {
      nome: 'Maria Silva',
      cpf: '12345678909',
      telefone: '(69) 98455-6677',
      plano: 'Todos os Horários',
      prajied: 'Azul Claro',
      mensalidades: {
        create: {
          valor: 280.00,
          dataVencimento: new Date(hoje.getTime() - 3 * 24 * 60 * 60 * 1000), // Atrasado 3 dias
          status: 'ATRASADO'
        }
      }
    }
  });

  const aluno3 = await prisma.aluno.create({
    data: {
      nome: 'Carlos Eduardo',
      cpf: '11122233344',
      telefone: '(69) 99122-3344',
      plano: '3x na semana',
      prajied: 'Vermelho',
      mensalidades: {
        create: {
          valor: 160.00,
          dataVencimento: new Date(hoje.getTime() + 5 * 24 * 60 * 60 * 1000),
          status: 'PAGO'
        }
      }
    }
  });

  console.log('Registrando presenças no calendário com status detalhados...');

  const anoAtual = hoje.getFullYear();
  const mesAtual = hoje.getMonth();

  // Dias passados do mês atual para João Pedro
  const diasPresenca = [2, 5, 9, 12];
  for (const dia of diasPresenca) {
    const dataPresenca = new Date(anoAtual, mesAtual, dia, 19, 0, 0);
    await prisma.agendamentoPresenca.create({
      data: {
        alunoId: aluno1.id,
        data: dataPresenca,
        status: 'PRESENTE'
      }
    });
  }

  // Falta por Doença com tipoJustificativa (Comando novo)
  await prisma.agendamentoPresenca.create({
    data: {
      alunoId: aluno1.id,
      data: new Date(anoAtual, mesAtual, 16, 19, 0, 0),
      status: 'DOENCA',
      tipoJustificativa: 'DOENCA',
      justificativa: 'Gripe forte - Atestado médico de 2 dias'
    }
  });

  // Falta comum não justificada
  await prisma.agendamentoPresenca.create({
    data: {
      alunoId: aluno1.id,
      data: new Date(anoAtual, mesAtual, 19, 19, 0, 0),
      status: 'FALTA',
      justificativa: 'Não compareceu ao treino sem aviso prévio'
    }
  });

  // Check-ins pendentes de confirmação do professor
  if (eventosCriados.length > 0) {
    await prisma.agendamentoPresenca.create({
      data: {
        alunoId: aluno1.id,
        eventoId: eventosCriados[0].id,
        data: eventosCriados[0].dataInicio,
        status: 'AGENDADO'
      }
    });

    await prisma.agendamentoPresenca.create({
      data: {
        alunoId: aluno3.id,
        eventoId: eventosCriados[0].id,
        data: eventosCriados[0].dataInicio,
        status: 'AGENDADO'
      }
    });
  }

  console.log('Criando leads de aulas experimentais...');
  await prisma.agendamentoExperimental.create({
    data: {
      nome: 'Rafael Mendonça',
      telefone: '69992345678',
      data: 'Segunda-feira',
      horario: '19:00',
      status: 'PENDENTE'
    }
  });

  const doisDiasAtras = new Date(hoje.getTime() - 2 * 24 * 60 * 60 * 1000);
  await prisma.agendamentoExperimental.create({
    data: {
      nome: 'Bruna Oliveira',
      telefone: '69981123456',
      data: 'Quarta-feira',
      horario: '18:00 (KIDS)',
      status: 'REALIZADA',
      dataRealizada: doisDiasAtras,
      observacao: 'Gostou bastante do treino. Ficou de conversar com os pais para fechar plano 3x.'
    }
  });

  console.log('Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
