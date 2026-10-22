type Notice = {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: string;
  autorNome: string;
  autorCargo: string;
  fixado: boolean;
  criadoEm: string;
};

type NoticeCardProps = {
  aviso: Notice;
  variant: 'admin' | 'student';
  onDelete?: (id: string) => void;
};

export default function NoticeCard({ aviso, variant, onDelete }: NoticeCardProps) {
  const isAdmin = variant === 'admin';

  return (
    <div className="bg-[#141416] border border-zinc-800 rounded-xl p-5 relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className={`flex justify-between ${isAdmin ? 'items-start' : 'items-center'} gap-2 mb-2`}>
          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
            aviso.tipo === 'URGENTE' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
            aviso.tipo === 'GRADUACAO' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
            aviso.tipo === 'EVENTO' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' :
            'bg-zinc-800 text-zinc-300'
          }`}>
            {aviso.tipo}
          </span>
          {aviso.fixado && (
            <span className="text-xs text-amber-400 font-bold">📌 Fixado</span>
          )}
        </div>
        <h3 className={`${isAdmin ? 'text-lg' : 'text-base'} font-bold text-white mb-2`}>
          {aviso.titulo}
        </h3>
        <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
          {aviso.conteudo}
        </p>
      </div>

      {isAdmin ? (
        <div className="mt-4 pt-3 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-500">
          <span>Por {aviso.autorNome} ({aviso.autorCargo})</span>
          <button
            onClick={() => onDelete?.(aviso.id)}
            className="text-red-500 hover:text-red-400 font-bold transition text-xs"
          >
            Excluir
          </button>
        </div>
      ) : (
        <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-500 flex justify-between items-center">
          <span>Enviado por: {aviso.autorNome} ({aviso.autorCargo})</span>
          <span>{new Date(aviso.criadoEm).toLocaleDateString('pt-BR')}</span>
        </div>
      )}
    </div>
  );
}
