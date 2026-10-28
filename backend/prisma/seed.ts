import { PrismaClient } from '@prisma/client';
import { ensureGamificationSeeded } from '../src/gamificationService';

const prisma = new PrismaClient();

async function main() {
  console.log('Limpando todos os dados do banco de dados Combat-Hub...');
  await prisma.transacaoFinanceira.deleteMany();
  await prisma.systemLog.deleteMany();
  await prisma.userAchievementProgress.deleteMany();
  await prisma.agendamentoPresenca.deleteMany();
  await prisma.eventoDeAula.deleteMany();
  await prisma.mensalidade.deleteMany();
  await prisma.aluno.deleteMany();
  await prisma.agendamentoExperimental.deleteMany();
  await prisma.aviso.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.usuario.deleteMany();

  console.log('Criando exclusivamente o usuário BrgAdmin (Ítalo Bergamin [DEV-SYSTEM])...');
  await prisma.usuario.create({
    data: {
      nome: 'Ítalo Bergamin (BrgAdmin)',
      email: 'brgadmin@boru.com',
      cpf: '02555331280',
      senha: 'BoruCentroDeCombate98490@!',
      cargo: 'ADMIN',
      is_dev: true,
      telefone: '(69) 99238-4491',
      modalidade: '[DEV-SYSTEM]',
      graduacao: 'Desenvolvedor do Sistema [DEV-SYSTEM]',
      prajied: 'Desenvolvedor do Sistema [DEV-SYSTEM]',
      prajied_faixa: 'Desenvolvedor do Sistema [DEV-SYSTEM]',
      tempoDocencia: 'Engenharia & Arquitetura de Software',
      tempoPratica: 'Desenvolvimento Full-Stack',
      tempoAula: 'Disponibilidade Dev',
      horariosAula: 'Suporte & Atualizações Contínuas',
      horarios_aula: 'Suporte & Atualizações Contínuas',
      cargaHorariaSemanal: 'Manutenção e Evolução do Sistema',
      ativo: true
    }
  });

  console.log('Garantindo estrutura padrão da Trilha do Nak Muay (Ranks e Conquistas)...');
  await ensureGamificationSeeded(prisma, false);

  const resumo = {
    usuarios: await prisma.usuario.count(),
    alunos: await prisma.aluno.count(),
    mensalidades: await prisma.mensalidade.count(),
    presencas: await prisma.agendamentoPresenca.count(),
    transacoesFinanceiras: await prisma.transacaoFinanceira.count(),
    avisos: await prisma.aviso.count(),
    produtos: await prisma.produto.count(),
    ranksGamificacao: await prisma.gamificationRank.count(),
    conquistasGamificacao: await prisma.gamificationAchievement.count()
  };

  console.log('Seed Combat-Hub concluído com sucesso! Resumo do banco:', resumo);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
