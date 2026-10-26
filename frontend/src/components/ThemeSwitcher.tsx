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
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-alt)] shadow-sm text-xs font-bold text-[var(--color-text-main)] transition hover:scale-105"
        title="Alterar Tema e Paleta de Cores"
      >
        <span
          className="w-3.5 h-3.5 rounded-full border border-white/50 shadow-sm flex-shrink-0"
          style={{ backgroundColor: currentTheme.primary }}
        />
        {!compact && (
          <span className="hidden sm:inline font-semibold text-xs">
            {currentTheme.name.split(' (')[0]}
          </span>
        )}
        <span className="text-xs">🎨</span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop Click Outside */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}
          />

          {/* Popover Dropdown Card (Totalmente Semântico e Adaptado aos Modos Claro & Escuro) */}
          <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-2xl p-3.5 z-50 text-[var(--color-text-main)] animate-in fade-in zoom-in-95 duration-150">
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--color-border)]">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-[var(--color-text-main)]">
                  Paleta de Cores da Plataforma
                </p>
                <p className="text-[10px] text-[var(--color-text-muted)]">
                  Personalização visual do Centro de Combate
                </p>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold font-mono">
                {THEMES_LIST.length} Estilos
              </span>
            </div>

            {/* Scrollable Groups */}
            <div className="max-h-80 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
              {/* Dark Themes */}
              <div>
                <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-wider px-2 py-1 mb-1">
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
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition text-left ${
                          isSelected
                            ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary-border)] font-bold shadow-sm'
                            : 'text-[var(--color-text-main)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex items-center -space-x-1">
                            <span
                              className="w-4 h-4 rounded-full border border-black/20 shadow-sm"
                              style={{ backgroundColor: t.preview[0] }}
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-black/20 shadow-sm"
                              style={{ backgroundColor: t.preview[1] }}
                            />
                          </div>
                          <span className="font-semibold text-xs leading-none">{t.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {isSelected ? (
                            <span className="text-[10px] font-black text-[var(--color-primary)] bg-[var(--color-primary-light)] px-1.5 py-0.5 rounded">
                              ✓ Ativo
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                              Dark
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Light Themes */}
              <div className="border-t border-[var(--color-border)] pt-2">
                <p className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-wider px-2 py-1 mb-1">
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
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition text-left ${
                          isSelected
                            ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary-border)] font-bold shadow-sm'
                            : 'text-[var(--color-text-main)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="flex items-center -space-x-1">
                            <span
                              className="w-4 h-4 rounded-full border border-black/20 shadow-sm"
                              style={{ backgroundColor: t.preview[0] }}
                            />
                            <span
                              className="w-4 h-4 rounded-full border border-black/20 shadow-sm"
                              style={{ backgroundColor: t.preview[1] }}
                            />
                          </div>
                          <span className="font-semibold text-xs leading-none">{t.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {isSelected ? (
                            <span className="text-[10px] font-black text-[var(--color-primary)] bg-[var(--color-primary-light)] px-1.5 py-0.5 rounded">
                              ✓ Ativo
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                              Clean
                            </span>
                          )}
                        </div>
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
