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
      header.classList.add('shadow-xl', 'border-zinc-800');
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
      <div class="group rounded-2xl overflow-hidden bg-zinc-900/90 border border-zinc-800 hover:border-[var(--color-primary)] transition duration-300 flex flex-col justify-between card-combat shadow-xl">
        <div class="relative h-56 overflow-hidden bg-zinc-950">
          <img src="${item.image}" 
               alt="${item.name}" 
               loading="lazy"
               class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
          <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent"></div>
          <span class="absolute top-4 left-4 px-3 py-1 rounded-md bg-[var(--color-primary)] text-zinc-900 font-black text-xs uppercase tracking-wider shadow">
            ${item.badge}
          </span>
          <span class="absolute bottom-3 left-4 text-xs font-semibold text-zinc-300">
            ${item.category}
          </span>
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h4 class="font-heading text-xl font-bold text-white uppercase group-hover:text-[var(--color-primary)] transition">${item.name}</h4>
            <p class="text-xs text-zinc-400 mt-2 leading-relaxed">${item.desc}</p>
          </div>

          <div class="space-y-3">
            <div class="flex flex-wrap gap-1.5">
              ${item.highlights.map(h => `
                <span class="text-[10px] px-2 py-0.5 rounded bg-zinc-950 text-zinc-300 border border-zinc-800 font-medium">
                  ✓ ${h}
                </span>
              `).join('')}
            </div>

            <div class="text-[11px] text-zinc-400">
              <span class="text-zinc-500 font-bold uppercase tracking-wider block text-[10px]">Público Indicado:</span>
              ${item.target}
            </div>
          </div>

          <div class="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-2">
            <span class="text-[11px] text-zinc-400 font-medium truncate max-w-[150px]">${item.scheduleSummary}</span>
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
      <div class="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-[var(--color-primary)] transition duration-300 card-combat space-y-4">
        <div class="w-12 h-12 rounded-xl bg-zinc-800/80 border border-zinc-700 flex items-center justify-center text-[var(--color-primary)]">
          <i data-lucide="${item.icon}" class="w-6 h-6"></i>
        </div>
        <h4 class="font-heading text-xl font-bold text-white uppercase">${item.title}</h4>
        <p class="text-xs text-zinc-400 leading-relaxed">${item.desc}</p>
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
      <div class="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 md:p-8 flex flex-col md:flex-row gap-6 card-combat group">
        
        <div class="w-full md:w-48 flex-shrink-0">
          <div class="relative h-60 md:h-full rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
            <img src="${coach.image}" alt="${coach.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden"></div>
          </div>
        </div>

        <div class="flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]">${coach.role}</span>
              <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-800 text-amber-400 font-semibold border border-zinc-700">
                ${coach.cref}
              </span>
            </div>

            <h4 class="font-heading text-2xl font-bold text-white uppercase mt-1">${coach.name}</h4>
            <p class="text-xs text-zinc-400 mt-2 leading-relaxed">${coach.bio}</p>
          </div>

          <div>
            <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Especialidades:</span>
            <div class="flex flex-wrap gap-1.5">
              ${coach.specialties.map(spec => `
                <span class="text-[11px] px-2.5 py-1 rounded-md bg-zinc-950 text-zinc-300 border border-zinc-800 font-medium">
                  ${spec}
                </span>
              `).join('')}
            </div>
          </div>

          <div class="pt-3 border-t border-zinc-800">
            <span class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block mb-1.5">Currículo & Conquistas:</span>
            <ul class="space-y-1 text-xs text-zinc-300">
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

    html += `
      <div class="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden card-combat">
        <div class="p-4 sm:p-5 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-3 h-3 rounded-full bg-[var(--color-primary)]"></div>
            <h4 class="font-heading text-lg sm:text-xl font-bold text-white uppercase">${daySchedule.day}</h4>
          </div>
          <span class="text-xs px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-400 font-medium">
            ${filteredPeriods.length} ${filteredPeriods.length === 1 ? 'Aula' : 'Aulas'}
          </span>
        </div>

        <div class="divide-y divide-zinc-800/80">
          ${filteredPeriods.map(p => `
            <div class="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-800/40 transition">
              <div class="flex items-start gap-4">
                <div class="px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-white font-mono font-bold text-sm whitespace-nowrap">
                  ${p.time}
                </div>
                <div>
                  <h5 class="text-base font-bold text-white">${p.modality}</h5>
                  <div class="flex items-center gap-3 mt-1 text-xs text-zinc-400">
                    <span>🥋 ${p.level}</span>
                    <span>•</span>
                    <span>👤 ${p.instructor}</span>
                  </div>
                </div>
              </div>
              <button onclick="openBookingModal('${p.modality}')" class="self-start sm:self-auto px-4 py-2 rounded-lg bg-zinc-800 hover:bg-[var(--color-primary)] hover:text-zinc-900 text-zinc-200 text-xs font-bold transition">
                Experimentar
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  if (html === '') {
    html = `
      <div class="text-center py-12 text-zinc-500">
        Nenhum horário disponível para o filtro selecionado.
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
        b.classList.remove('bg-[var(--color-primary)]', 'text-zinc-900', 'font-bold');
        b.classList.add('bg-zinc-800', 'text-zinc-300');
      });
      btn.classList.add('bg-[var(--color-primary)]', 'text-zinc-900', 'font-bold');
      btn.classList.remove('bg-zinc-800', 'text-zinc-300');

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
      <div class="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden transition">
        <button 
          type="button"
          onclick="toggleFAQ(${index})"
          class="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-zinc-800/40 transition"
        >
          <span class="font-bold text-white text-sm sm:text-base">${item.question}</span>
          <i data-lucide="chevron-down" id="faq-icon-${index}" class="w-5 h-5 text-zinc-400 transition-transform duration-300 flex-shrink-0"></i>
        </button>
        <div id="faq-answer-${index}" class="hidden px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/40 pt-4">
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

  showToast(`Redirecionando para a recepção de ${cfg.nome}...`, 'success');

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
  toast.className = `toast toast-${type}`;

  let iconName = 'info';
  if (type === 'success') iconName = 'check-circle';
  if (type === 'error') iconName = 'alert-triangle';
  if (type === 'warning') iconName = 'alert-circle';

  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-5 h-5 flex-shrink-0"></i>
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
  }, 4000);
}

function initThemeSelector() {
  const toggleBtn = document.getElementById('theme-menu-btn');
  const dropdown = document.getElementById('theme-dropdown');
  const floatingBtn = document.getElementById('floating-theme-btn');

  function toggleDropdown() {
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
      showToast(`Tema alterado com sucesso!`, 'success');
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
