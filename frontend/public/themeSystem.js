// frontend/public/themeSystem.js
// Sistema de Temas Dinâmicos e White-Label para Plataformas de Luta e Academias

(function() {
  const THEMES = {
    'neutral-dark': {
      id: 'neutral-dark',
      name: 'Neutro Titânio & Preto (Padrão)',
      mode: 'dark',
      primary: '#E2E8F0',
      primaryHover: '#FFFFFF',
      primaryLight: 'rgba(226, 232, 240, 0.12)',
      primaryBorder: 'rgba(226, 232, 240, 0.35)',
      accent: '#94A3B8',
      bgMain: '#090A0B',
      bgCard: '#131416',
      bgCardAlt: '#1B1C20',
      textMain: '#FFFFFF',
      textMuted: '#94A3B8',
      border: '#27272A',
      preview: ['#E2E8F0', '#090A0B']
    },
    'red-dark': {
      id: 'red-dark',
      name: 'Vermelho & Preto (Combat Clássico)',
      mode: 'dark',
      primary: '#EF4444',
      primaryHover: '#DC2626',
      primaryLight: 'rgba(239, 68, 68, 0.15)',
      primaryBorder: 'rgba(239, 68, 68, 0.4)',
      accent: '#F59E0B',
      bgMain: '#0B0B0C',
      bgCard: '#141416',
      bgCardAlt: '#1A1A1E',
      textMain: '#FFFFFF',
      textMuted: '#A1A1AA',
      border: '#27272A',
      preview: ['#EF4444', '#0B0B0C']
    },
    'blue-dark': {
      id: 'blue-dark',
      name: 'Azul & Preto (Ocean Night)',
      mode: 'dark',
      primary: '#3B82F6',
      primaryHover: '#2563EB',
      primaryLight: 'rgba(59, 130, 246, 0.15)',
      primaryBorder: 'rgba(59, 130, 246, 0.4)',
      accent: '#60A5FA',
      bgMain: '#080C14',
      bgCard: '#0F172A',
      bgCardAlt: '#1E293B',
      textMain: '#FFFFFF',
      textMuted: '#94A3B8',
      border: '#1E293B',
      preview: ['#3B82F6', '#080C14']
    },
    'blue-light': {
      id: 'blue-light',
      name: 'Azul & Branco (Ocean Clean)',
      mode: 'light',
      primary: '#0284C7',
      primaryHover: '#0369A1',
      primaryLight: 'rgba(2, 132, 199, 0.12)',
      primaryBorder: 'rgba(2, 132, 199, 0.3)',
      accent: '#0EA5E9',
      bgMain: '#F8FAFC',
      bgCard: '#FFFFFF',
      bgCardAlt: '#F1F5F9',
      textMain: '#0F172A',
      textMuted: '#475569',
      border: '#CBD5E1',
      preview: ['#0284C7', '#FFFFFF']
    },
    'gold-dark': {
      id: 'gold-dark',
      name: 'Dourado & Preto (Champion Gold)',
      mode: 'dark',
      primary: '#F59E0B',
      primaryHover: '#D97706',
      primaryLight: 'rgba(245, 158, 11, 0.15)',
      primaryBorder: 'rgba(245, 158, 11, 0.4)',
      accent: '#FBBF24',
      bgMain: '#0C0A07',
      bgCard: '#17140E',
      bgCardAlt: '#211E16',
      textMain: '#FFFFFF',
      textMuted: '#A8A29E',
      border: '#292524',
      preview: ['#F59E0B', '#0C0A07']
    },
    'gold-light': {
      id: 'gold-light',
      name: 'Dourado & Branco (Gold Luxury)',
      mode: 'light',
      primary: '#B45309',
      primaryHover: '#92400E',
      primaryLight: 'rgba(180, 83, 9, 0.12)',
      primaryBorder: 'rgba(180, 83, 9, 0.3)',
      accent: '#D97706',
      bgMain: '#FDFBF7',
      bgCard: '#FFFFFF',
      bgCardAlt: '#F7F3EB',
      textMain: '#1C1917',
      textMuted: '#57534E',
      border: '#E7E5E4',
      preview: ['#B45309', '#FFFFFF']
    },
    'green-dark': {
      id: 'green-dark',
      name: 'Verde & Preto (Viper Combat)',
      mode: 'dark',
      primary: '#10B981',
      primaryHover: '#059669',
      primaryLight: 'rgba(16, 185, 129, 0.15)',
      primaryBorder: 'rgba(16, 185, 129, 0.4)',
      accent: '#34D399',
      bgMain: '#070E0A',
      bgCard: '#0E1A13',
      bgCardAlt: '#16281E',
      textMain: '#FFFFFF',
      textMuted: '#9CA3AF',
      border: '#1F3427',
      preview: ['#10B981', '#070E0A']
    },
    'green-light': {
      id: 'green-light',
      name: 'Verde & Branco (Emerald Clean)',
      mode: 'light',
      primary: '#059669',
      primaryHover: '#047857',
      primaryLight: 'rgba(5, 150, 105, 0.12)',
      primaryBorder: 'rgba(5, 150, 105, 0.3)',
      accent: '#10B981',
      bgMain: '#F6FBF8',
      bgCard: '#FFFFFF',
      bgCardAlt: '#EBF5F0',
      textMain: '#064E3B',
      textMuted: '#374151',
      border: '#D1FAE5',
      preview: ['#059669', '#FFFFFF']
    },
    'pink-dark': {
      id: 'pink-dark',
      name: 'Rosa & Preto (Cyber Sakura)',
      mode: 'dark',
      primary: '#EC4899',
      primaryHover: '#DB2777',
      primaryLight: 'rgba(236, 72, 153, 0.15)',
      primaryBorder: 'rgba(236, 72, 153, 0.4)',
      accent: '#F472B6',
      bgMain: '#0E070B',
      bgCard: '#1A0E15',
      bgCardAlt: '#271620',
      textMain: '#FFFFFF',
      textMuted: '#A1A1AA',
      border: '#331D2A',
      preview: ['#EC4899', '#0E070B']
    },
    'pink-light': {
      id: 'pink-light',
      name: 'Rosa & Branco (Sakura Blossom)',
      mode: 'light',
      primary: '#DB2777',
      primaryHover: '#BE185D',
      primaryLight: 'rgba(219, 39, 119, 0.12)',
      primaryBorder: 'rgba(219, 39, 119, 0.3)',
      accent: '#F43F5E',
      bgMain: '#FDF6F9',
      bgCard: '#FFFFFF',
      bgCardAlt: '#F9EBF1',
      textMain: '#4A044E',
      textMuted: '#4B5563',
      border: '#FCE7F3',
      preview: ['#DB2777', '#FFFFFF']
    },
    'purple-dark': {
      id: 'purple-dark',
      name: 'Roxo & Preto (Jiu-Jitsu Stealth)',
      mode: 'dark',
      primary: '#8B5CF6',
      primaryHover: '#7C3AED',
      primaryLight: 'rgba(139, 92, 246, 0.15)',
      primaryBorder: 'rgba(139, 92, 246, 0.4)',
      accent: '#A78BFA',
      bgMain: '#0A0711',
      bgCard: '#130E20',
      bgCardAlt: '#1D172F',
      textMain: '#FFFFFF',
      textMuted: '#94A3B8',
      border: '#2A1F45',
      preview: ['#8B5CF6', '#0A0711']
    }
  };

  const STORAGE_KEY = 'combat_hub_theme';
  const DEFAULT_THEME = 'neutral-dark';

  function applyTheme(themeId) {
    const theme = THEMES[themeId] || THEMES[DEFAULT_THEME];
    const root = document.documentElement;

    root.setAttribute('data-theme', theme.id);
    root.setAttribute('data-theme-mode', theme.mode);

    // Variáveis CSS Principais
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-hover', theme.primaryHover);
    root.style.setProperty('--color-primary-light', theme.primaryLight);
    root.style.setProperty('--color-primary-border', theme.primaryBorder);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-bg-main', theme.bgMain);
    root.style.setProperty('--color-bg-card', theme.bgCard);
    root.style.setProperty('--color-bg-card-alt', theme.bgCardAlt);
    root.style.setProperty('--color-text-main', theme.textMain);
    root.style.setProperty('--color-text-muted', theme.textMuted);
    root.style.setProperty('--color-border', theme.border);

    try {
      localStorage.setItem(STORAGE_KEY, theme.id);
    } catch (e) {}

    // Notifica listeners (para React e outros componentes)
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: theme }));

    // Atualiza label do seletor se existir na tela
    updateThemeSelectorUI(theme.id);
  }

  function getActiveTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && THEMES[saved]) return saved;
    } catch (e) {}
    return DEFAULT_THEME;
  }

  function updateThemeSelectorUI(activeId) {
    const activeTheme = THEMES[activeId] || THEMES[DEFAULT_THEME];
    
    // Atualiza botão do navbar se existir
    const currentNameEl = document.getElementById('theme-current-name');
    if (currentNameEl) {
      currentNameEl.textContent = activeTheme.name.split(' (')[0];
    }
    const currentDotEl = document.getElementById('theme-current-dot');
    if (currentDotEl) {
      currentDotEl.style.backgroundColor = activeTheme.primary;
    }

    // Marca o botão selecionado na lista
    document.querySelectorAll('[data-theme-choice]').forEach(btn => {
      const choiceId = btn.getAttribute('data-theme-choice');
      if (choiceId === activeId) {
        btn.classList.add('ring-2', 'ring-offset-2', 'ring-white', 'border-transparent');
      } else {
        btn.classList.remove('ring-2', 'ring-offset-2', 'ring-white', 'border-transparent');
      }
    });
  }

  // Inicializa tema no carregamento imediato
  const initialTheme = getActiveTheme();
  applyTheme(initialTheme);

  // Expõe API global
  window.THEME_SYSTEM = {
    themes: THEMES,
    applyTheme: applyTheme,
    getActiveTheme: getActiveTheme,
    getCurrentTheme: () => THEMES[getActiveTheme()]
  };

  document.addEventListener('DOMContentLoaded', () => {
    updateThemeSelectorUI(getActiveTheme());
  });
})();
