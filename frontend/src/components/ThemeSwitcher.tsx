// frontend/src/components/ThemeSwitcher.tsx
import React, { useState, useEffect } from 'react';
import { THEMES_LIST, applyPlatformTheme, getCurrentPlatformTheme } from '../config/themeConfig';

interface ThemeSwitcherProps {
  compact?: boolean;
}

export default function ThemeSwitcher({ compact = false }: ThemeSwitcherProps) {
  const [activeThemeId, setActiveThemeId] = useState<string>('neutral-dark');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setActiveThemeId(getCurrentPlatformTheme());

    const handleThemeChange = (e: any) => {
      if (e.detail && e.detail.id) {
        setActiveThemeId(e.detail.id);
      }
    };
    window.addEventListener('themeChanged', handleThemeChange);
    return () => window.removeEventListener('themeChanged', handleThemeChange);
  }, []);

  const handleSelectTheme = (id: string) => {
    setActiveThemeId(id);
    applyPlatformTheme(id);
    setIsOpen(false);
  };

  const currentTheme = THEMES_LIST.find(t => t.id === activeThemeId) || THEMES_LIST[0];

  return (
    <div className="relative inline-block text-left z-50">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 shadow-md text-xs font-bold text-white transition hover:scale-105"
        title="Alterar Tema e Paleta de Cores"
      >
        <span
          className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-inner flex-shrink-0"
          style={{ backgroundColor: currentTheme.primary }}
        />
        {!compact && (
          <span className="hidden sm:inline font-medium text-zinc-300">
            {currentTheme.name.split(' (')[0]}
          </span>
        )}
        <span className="text-[10px] text-zinc-400">🎨</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#141416] border border-zinc-700 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800">
              <div>
                <p className="text-xs font-black text-white uppercase tracking-wider">Paleta de Cores</p>
                <p className="text-[10px] text-zinc-400">Personalize a identidade da academia</p>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
                {THEMES_LIST.length} temas
              </span>
            </div>

            <div className="max-h-80 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
              {/* Dark Themes */}
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-2 py-1">
                  🌙 Estilos Combate (Dark)
                </p>
                <div className="space-y-1">
                  {THEMES_LIST.filter(t => t.mode === 'dark').map((t) => {
                    const isSelected = t.id === activeThemeId;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleSelectTheme(t.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition text-left ${
                          isSelected
                            ? 'bg-zinc-800 text-white border border-zinc-600 shadow-sm'
                            : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex items-center -space-x-1">
                            <span
                              className="w-4 h-4 rounded-full border border-zinc-900 shadow-sm"
                              style={{ backgroundColor: t.preview[0] }}
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-zinc-900 shadow-sm"
                              style={{ backgroundColor: t.preview[1] }}
                            />
                          </div>
                          <span className="truncate max-w-[140px]">{t.name}</span>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-emerald-400">✓ Ativo</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Light Themes */}
              <div className="border-t border-zinc-800 pt-2">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-2 py-1">
                  ☀️ Estilos Clean (Light)
                </p>
                <div className="space-y-1">
                  {THEMES_LIST.filter(t => t.mode === 'light').map((t) => {
                    const isSelected = t.id === activeThemeId;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => handleSelectTheme(t.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition text-left ${
                          isSelected
                            ? 'bg-zinc-800 text-white border border-zinc-600 shadow-sm'
                            : 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex items-center -space-x-1">
                            <span
                              className="w-4 h-4 rounded-full border border-zinc-900 shadow-sm"
                              style={{ backgroundColor: t.preview[0] }}
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-zinc-900 shadow-sm"
                              style={{ backgroundColor: t.preview[1] }}
                            />
                          </div>
                          <span className="truncate max-w-[140px]">{t.name}</span>
                        </div>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-emerald-400">✓ Ativo</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
