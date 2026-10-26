// frontend/public/app.js - Interações da Landing Page do Combat Hub (Template Modelo White-Label)

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  renderModalitiesGrid();
  renderFacilities();
  renderInstructorsPortfolio();
  renderSchedule('all');
  initScheduleFilters();
  renderFAQ();
  initThemeSelector();
  lucide.createIcons();
});

function initHeaderScroll() {
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shadow-xl');
    } else {
      header.classList.remove('shadow-xl');
    }
  });
}

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  }
}

function closeMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.add('hidden');
}

function renderModalitiesGrid() {
  const container = document.getElementById('modalities-grid');
  const combatData = window.COMBAT_DATA || window.BORU_DATA;
  if (!container || !combatData || !combatData.modalities) return;

  const modalities = combatData.modalities;
  let html = '';

  modalities.forEach(item => {
    html += `
      <div class="group rounded-2xl overflow-hidden card-combat hover:border-[var(--color-primary)] transition duration-300 flex flex-col justify-between shadow-xl">
        <div class="relative h-56 overflow-hidden bg-[var(--color-bg-card-alt)]">
          <img src="${item.image}" 
               alt="${item.name}" 
               loading="lazy"
               class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <span class="absolute top-4 left-4 px-3 py-1 rounded-md bg-[var(--color-primary)] text-[var(--color-btn-text)] font-black text-xs uppercase tracking-wider shadow">
            ${item.badge}
          </span>
          <span class="absolute bottom-3 left-4 text-xs font-semibold text-white drop-shadow">
            ${item.category}
          </span>
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h4 class="font-heading text-xl font-bold uppercase group-hover:text-[var(--color-primary)] transition">${item.name}</h4>
            <p class="text-xs text-[var(--color-text-muted)] mt-2 leading-relaxed">${item.desc}</p>
          </div>

          <div class="space-y-3">
            <div class="flex flex-wrap gap-1.5">
              ${item.highlights.map(h => `
                <span class="text-[10px] px-2 py-0.5 rounded bg-[var(--color-bg-card-alt)] text-[var(--color-text-muted)] border border-[var(--color-border)] font-medium">
                  ✓ ${h}
                </span>
              `).join('')}
            </div>

            <div class="text-[11px] text-[var(--color-text-muted)]">
              <span class="font-bold uppercase tracking-wider block text-[10px] opacity-70">Público Indicado:</span>
              ${item.target}
            </div>
          </div>

          <div class="pt-4 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
            <span class="text-[11px] text-[var(--color-text-muted)] font-medium truncate max-w-[150px]">${item.scheduleSummary}</span>
            <button onclick="openBookingModal('${item.name}')" class="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1 transition">
              Agendar Aula <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderFacilities() {
  const container = document.getElementById('facilities-grid');
  const combatData = window.COMBAT_DATA || window.BORU_DATA;
  if (!container || !combatData || !combatData.facilities) return;

  const facilities = combatData.facilities;
  let html = '';

  facilities.forEach(item => {
    html += `
      <div class="p-6 rounded-2xl card-combat hover:border-[var(--color-primary)] transition duration-300 space-y-4 shadow-lg">
        <div class="w-12 h-12 rounded-xl bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] flex items-center justify-center text-[var(--color-primary)]">
          <i data-lucide="${item.icon}" class="w-6 h-6"></i>
        </div>
        <h4 class="font-heading text-xl font-bold uppercase">${item.title}</h4>
        <p class="text-xs text-[var(--color-text-muted)] leading-relaxed">${item.desc}</p>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderInstructorsPortfolio() {
  const container = document.getElementById('instructors-portfolio-grid');
  const combatData = window.COMBAT_DATA || window.BORU_DATA;
  if (!container || !combatData || !combatData.instructors) return;

  const instructors = combatData.instructors;
  let html = '';

  instructors.forEach(coach => {
    html += `
      <div class="rounded-2xl card-combat p-6 md:p-8 flex flex-col md:flex-row gap-6 group shadow-xl">
        
        <div class="w-full md:w-48 flex-shrink-0">
          <div class="relative h-60 md:h-full rounded-xl overflow-hidden bg-[var(--color-bg-card-alt)] border border-[var(--color-border)]">
            <img src="${coach.image}" alt="${coach.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden"></div>
          </div>
        </div>

        <div class="flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">${coach.role}</span>
              <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--color-bg-card-alt)] text-[var(--color-primary)] font-semibold border border-[var(--color-border)]">
                ${coach.cref}
              </span>
            </div>

            <h4 class="font-heading text-2xl font-bold uppercase mt-1">${coach.name}</h4>
            <p class="text-xs text-[var(--color-text-muted)] mt-2 leading-relaxed">${coach.bio}</p>
          </div>

          <div>
            <span class="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block mb-1.5 opacity-70">Especialidades:</span>
            <div class="flex flex-wrap gap-1.5">
              ${coach.specialties.map(spec => `
                <span class="text-[11px] px-2.5 py-1 rounded-md bg-[var(--color-bg-card-alt)] text-[var(--color-text-main)] border border-[var(--color-border)] font-medium">
                  ${spec}
                </span>
              `).join('')}
            </div>
          </div>

          <div class="pt-3 border-t border-[var(--color-border)]">
            <span class="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block mb-1.5 opacity-70">Conquistas & Graduação:</span>
            <ul class="space-y-1 text-xs text-[var(--color-text-muted)]">
              ${coach.achievements.map(ach => `
                <li class="flex items-center gap-2">
                  <i data-lucide="check-circle" class="w-3.5 h-3.5 text-[var(--color-primary)] flex-shrink-0"></i>
                  <span>${ach}</span>
                </li>
              `).join('')}
            </ul>
          </div>

        </div>

      </div>
    `;
  });

  container.innerHTML = html;
}

function getCombatModalityInfo(modality) {
  const m = (modality || '').toLowerCase();
  if (m.includes('boxe')) {
    return { icon: '🥊', badge: 'Boxe', tag: 'Nobre Arte' };
  } else if (m.includes('muay thai')) {
    return { icon: '🥊', badge: 'Muay Thai', tag: '8 Armas' };
  } else if (m.includes('kickboxing') || m.includes('k-1')) {
    return { icon: '🥊', badge: 'Kickboxing', tag: 'K-1 Rules' };
  } else if (m.includes('jiu-jitsu') || m.includes('bjj') || m.includes('open mat')) {
    return { icon: '🥋', badge: 'Jiu-Jitsu', tag: 'BJJ Arte Suave' };
  } else if (m.includes('judô') || m.includes('judo')) {
    return { icon: '🥋', badge: 'Judô', tag: 'Quedas & Ippon' };
  } else if (m.includes('taekwondo')) {
    return { icon: '🥋', badge: 'Taekwondo', tag: 'Chutes Olímpicos' };
  } else if (m.includes('mma') || m.includes('submission')) {
    return { icon: '⚔️', badge: 'MMA Cage', tag: 'Combate Total' };
  } else if (m.includes('defesa pessoal') || m.includes('krav maga')) {
    return { icon: '🛡️', badge: 'Defesa Pessoal', tag: 'Autoproteção' };
  } else if (m.includes('sparring')) {
    return { icon: '🏆', badge: 'Sparring', tag: 'Treino de Luta' };
  } else {
    return { icon: '⚡', badge: 'Funcional', tag: 'Condicionamento' };
  }
}

function renderSchedule(filterShift = 'all') {
  const container = document.getElementById('schedule-container');
  const combatData = window.COMBAT_DATA || window.BORU_DATA;
  if (!container || !combatData || !combatData.schedules) return;

  const schedules = combatData.schedules;
  let html = '';

  schedules.forEach(daySchedule => {
    const filteredPeriods = filterShift === 'all' 
      ? daySchedule.periods 
      : daySchedule.periods.filter(p => p.shift === filterShift);

    if (filteredPeriods.length === 0) return;

    let dayIcon = '🥊';
    if (daySchedule.day.toLowerCase().includes('terça')) dayIcon = '🥋';
    if (daySchedule.day.toLowerCase().includes('sábado') || daySchedule.day.toLowerCase().includes('sabado')) dayIcon = '🏆';

    html += `
      <div class="rounded-2xl card-combat overflow-hidden shadow-xl border border-[var(--color-border)] flex flex-col">
        <div class="p-4 sm:p-5 bg-[var(--color-bg-card-alt)] border-b border-[var(--color-border)] flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <span class="text-xl">${dayIcon}</span>
            <div>
              <h4 class="font-display text-base sm:text-lg font-black uppercase text-[var(--color-text-main)] tracking-wide leading-tight">
                ${daySchedule.day}
              </h4>
              <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--color-primary)]">Grade Oficial do Tatame</span>
            </div>
          </div>
          <span class="text-xs px-2.5 py-1 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-muted)] font-bold whitespace-nowrap">
            ${filteredPeriods.length} ${filteredPeriods.length === 1 ? 'Aula' : 'Aulas'}
          </span>
        </div>

        <div class="p-3 sm:p-4 space-y-3 flex-1">
          ${filteredPeriods.map(p => {
            const info = getCombatModalityInfo(p.modality);
            return `
            <div class="p-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-primary)] hover:shadow-md transition-all flex flex-col gap-2.5 group">
              
              <!-- Cabeçalho da Aula: Horário e Selo de Arte Marcial -->
              <div class="flex items-center justify-between gap-2">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--color-bg-card-alt)] border border-[var(--color-border)] font-bold text-xs text-[var(--color-text-main)] whitespace-nowrap">
                  <i data-lucide="clock" class="w-3.5 h-3.5 text-[var(--color-primary)]"></i>
                  <span>${p.time}</span>
                </span>
                <span class="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary-border)] whitespace-nowrap">
                  <span>${info.icon}</span>
                  <span>${info.badge}</span>
                </span>
              </div>

              <!-- Título da Modalidade & Nível -->
              <div>
                <h5 class="text-base font-black text-[var(--color-text-main)] group-hover:text-[var(--color-primary)] transition leading-snug">
                  ${p.modality}
                </h5>
                <div class="flex items-center gap-2 mt-1 text-xs text-[var(--color-text-muted)] flex-wrap">
                  <span class="inline-flex items-center gap-1 font-semibold text-[var(--color-text-main)]">
                    <i data-lucide="user" class="w-3.5 h-3.5 text-[var(--color-primary)]"></i>
                    ${p.instructor}
                  </span>
                  <span>•</span>
                  <span class="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[var(--color-bg-card-alt)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
                    ${p.level}
                  </span>
                </div>
              </div>

              <!-- Rodapé da Aula: Status de Vagas e Botão de Agendamento -->
              <div class="pt-2 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
                <span class="text-[11px] font-semibold text-emerald-500 flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Vagas Abertas
                </span>
                <button onclick="openBookingModal('${p.modality}')" class="px-3.5 py-1.5 rounded-lg theme-btn-primary font-bold text-xs flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition whitespace-nowrap">
                  <span>Experimentar</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </button>
              </div>

            </div>
          `}).join('')}
        </div>
      </div>
    `;
  });

  if (html === '') {
    html = `
      <div class="col-span-full text-center py-12 text-[var(--color-text-muted)] p-8 rounded-2xl card-combat">
        <span class="text-3xl block mb-2">🥊</span>
        <p class="font-bold">Nenhum horário disponível para o turno selecionado.</p>
        <p class="text-xs mt-1">Selecione "Todos os Turnos" para visualizar a grade completa do CT.</p>
      </div>
    `;
  }

  container.innerHTML = html;
  lucide.createIcons();
}

function initScheduleFilters() {
  const buttons = document.querySelectorAll('.schedule-filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('theme-btn-primary', 'font-bold');
        b.classList.add('theme-btn-secondary');
      });
      btn.classList.add('theme-btn-primary', 'font-bold');
      btn.classList.remove('theme-btn-secondary');

      const filter = btn.getAttribute('data-filter');
      renderSchedule(filter);
    });
  });
}

function renderFAQ() {
  const container = document.getElementById('faq-accordion-container');
  const combatData = window.COMBAT_DATA || window.BORU_DATA;
  if (!container || !combatData || !combatData.faq) return;

  const faqs = combatData.faq;
  let html = '';

  faqs.forEach((item, index) => {
    html += `
      <div class="rounded-xl card-combat overflow-hidden transition">
        <button 
          type="button" 
          onclick="toggleFAQ(${index})"
          class="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-[var(--color-primary-light)] transition"
        >
          <span class="font-bold text-sm sm:text-base">${item.question}</span>
          <i data-lucide="chevron-down" id="faq-icon-${index}" class="w-5 h-5 text-[var(--color-text-muted)] transition-transform duration-300 flex-shrink-0"></i>
        </button>
        <div id="faq-answer-${index}" class="hidden px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed border-t border-[var(--color-border)] pt-4">
          ${item.answer}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function toggleFAQ(index) {
  const answer = document.getElementById(`faq-answer-${index}`);
  const icon = document.getElementById(`faq-icon-${index}`);

  if (answer && icon) {
    const isHidden = answer.classList.contains('hidden');
    if (isHidden) {
      answer.classList.remove('hidden');
      icon.classList.add('rotate-180', 'text-[var(--color-primary)]');
    } else {
      answer.classList.add('hidden');
      icon.classList.remove('rotate-180', 'text-[var(--color-primary)]');
    }
  }
}

function openBookingModal(modalityName = '') {
  const modal = document.getElementById('booking-modal');
  if (!modal) return;

  if (modalityName) {
    const select = document.getElementById('book-modality');
    if (select) {
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value.toLowerCase().includes(modalityName.toLowerCase()) ||
            modalityName.toLowerCase().includes(select.options[i].value.toLowerCase())) {
          select.selectedIndex = i;
          break;
        }
      }
    }
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function handleBookingSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('book-name').value.trim();
  const phone = document.getElementById('book-phone').value.trim();
  const modality = document.getElementById('book-modality').value;
  const shift = document.getElementById('book-shift').value;
  const experience = document.getElementById('book-experience').value;

  if (!name || !phone) {
    showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
    return;
  }

  const cfg = window.ACADEMY_CONFIG || {
    nome: 'COMBAT HUB',
    whatsappNumero: '5511987654321'
  };

  const textMessage = `*AGENDAMENTO DE AULA EXPERIMENTAL - ${encodeURIComponent(cfg.nome)}*%0A%0A` +
    `🥋 *Nome:* ${encodeURIComponent(name)}%0A` +
    `📱 *WhatsApp:* ${encodeURIComponent(phone)}%0A` +
    `🥊 *Modalidade:* ${encodeURIComponent(modality)}%0A` +
    `⏰ *Turno Escolhido:* ${encodeURIComponent(shift)}%0A` +
    `📋 *Experiência:* ${encodeURIComponent(experience)}%0A%0A` +
    `Olá equipe ${encodeURIComponent(cfg.nome)}! Gostaria de confirmar o agendamento da minha aula experimental gratuita.`;

  const whatsappNumber = cfg.whatsappNumero || '5511987654321';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${textMessage}`;

  showToast(`Redirecionando para a recepção...`, 'success');

  setTimeout(() => {
    window.open(whatsappUrl, '_blank');
    closeBookingModal();
    document.getElementById('booking-form').reset();
  }, 1000);
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type} p-3 rounded-xl shadow-xl flex items-center gap-2 border bg-[var(--color-bg-card)] text-[var(--color-text-main)] border-[var(--color-border)]`;

  let iconName = 'info';
  if (type === 'success') iconName = 'check-circle';
  if (type === 'error') iconName = 'alert-triangle';
  if (type === 'warning') iconName = 'alert-circle';

  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-5 h-5 text-[var(--color-primary)] flex-shrink-0"></i>
    <span class="text-xs font-semibold">${message}</span>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.classList.add('show');
  }, 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3500);
}

function initThemeSelector() {
  const toggleBtn = document.getElementById('theme-menu-btn');
  const dropdown = document.getElementById('theme-dropdown');
  const floatingBtn = document.getElementById('floating-theme-btn');

  function toggleDropdown(e) {
    if (e) e.stopPropagation();
    if (dropdown) dropdown.classList.toggle('hidden');
  }

  if (toggleBtn) toggleBtn.addEventListener('click', toggleDropdown);
  if (floatingBtn) floatingBtn.addEventListener('click', toggleDropdown);

  document.addEventListener('click', (e) => {
    if (dropdown && !dropdown.contains(e.target) && (!toggleBtn || !toggleBtn.contains(e.target)) && (!floatingBtn || !floatingBtn.contains(e.target))) {
      dropdown.classList.add('hidden');
    }
  });

  document.querySelectorAll('[data-theme-select]').forEach(btn => {
    btn.addEventListener('click', () => {
      const themeId = btn.getAttribute('data-theme-select');
      if (window.THEME_SYSTEM) {
        window.THEME_SYSTEM.applyTheme(themeId);
      }
      if (dropdown) dropdown.classList.add('hidden');
      renderSchedule('all'); // Re-renders schedule with active theme
      showToast(`Paleta alterada com sucesso!`, 'success');
    });
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBookingModal();
    const dropdown = document.getElementById('theme-dropdown');
    if (dropdown) dropdown.classList.add('hidden');
  }
});
