/* ============================================================
   NOMINAPROMOTOR.JS — Integración de consulta de nómina
   Módulo Administración · Óptica Visión de Águila

   Reutiliza la lógica existente del módulo de Promotor.
   ============================================================ */

function renderNominaPromotor() {
  var contenedor = document.getElementById('admin-content');
  if (!contenedor) return;

  contenedor.innerHTML = [
    '<div class="fade-in">',
    '  <div class="mb-6">',
    '    <h3 class="text-verde-oscuro font-bold text-lg">Consulta de Nómina</h3>',
    '    <p class="text-gris-medio text-sm mt-0.5">Selecciona un promotor y consulta su nómina usando la misma lógica del módulo de promotores.</p>',
    '  </div>',
    '  <div class="bg-white rounded-xl shadow-soft p-5 max-w-2xl mb-6 border border-slate-200">',
    '    <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end">',
    '      <div>',
    '        <label class="block text-xs font-semibold text-gris-medio uppercase tracking-wide mb-1.5">Promotor</label>',
    '        <select id="admin-promotor-select" class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-gris-oscuro focus:outline-none input-foco-verde">',
    '        </select>',
    '      </div>',
    '      <button onclick="consultarNominaPromotor()" id="admin-btn-consultar-nomina" class="btn-primario text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70" type="button">',
    '        <span id="admin-btn-consultar-texto">Consultar Nómina</span>',
    '        <span id="admin-btn-consultar-spinner" class="hidden inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" style="animation: spin .7s linear infinite;"></span>',
    '      </button>',
    '    </div>',
    '    <div id="admin-nomina-error" class="hidden mt-4 text-sm text-rojo"></div>',
    '  </div>',
    '  <div id="admin-nomina-view"></div>',
    '</div>'
  ].join('');

  cargarPromotoresAdmin();
}

function cargarPromotoresAdmin() {
  var select = document.getElementById('admin-promotor-select');
  if (!select) return;

  var baseUrl = window.API_URL || '';
  if (!baseUrl) {
    select.innerHTML = '<option value="">No se pudo cargar la lista</option>';
    return;
  }

  select.innerHTML = '<option value="">Cargando promotores...</option>';

  fetch(baseUrl + '?action=listar-promotores')
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (payload) {
      var lista = payload && Array.isArray(payload.promotores) ? payload.promotores : (Array.isArray(payload) ? payload : []);
      select.innerHTML = '<option value="">Selecciona un promotor</option>' + lista.map(function (p) {
        return '<option value="' + (p.cedula || '').toString().trim() + '">' + (p.nombre || '').toString().trim() + '</option>';
      }).join('');
    })
    .catch(function (err) {
      console.error('[AdminNomina] Error cargando promotores:', err);
      select.innerHTML = '<option value="">No se pudo cargar la lista</option>';
    });
}

function consultarNominaPromotor() {
  var select = document.getElementById('admin-promotor-select');
  var errorEl = document.getElementById('admin-nomina-error');
  var wrapper = document.getElementById('admin-nomina-view');

  if (!select || !wrapper) return;

  var cedula = select.value;
  if (!cedula) {
    errorEl.textContent = 'Selecciona un promotor antes de consultar.';
    errorEl.classList.remove('hidden');
    return;
  }

  errorEl.classList.add('hidden');

  var btn = document.getElementById('admin-btn-consultar-nomina');
  var btnText = document.getElementById('admin-btn-consultar-texto');
  var btnSpinner = document.getElementById('admin-btn-consultar-spinner');
  if (btn && btnText && btnSpinner) {
    btn.disabled = true;
    btnText.textContent = 'Cargando...';
    btnSpinner.classList.remove('hidden');
  }

  wrapper.innerHTML = '<div class="flex items-center justify-center py-8"><div class="spinner"></div></div>';

  window.__nominaCedulaOverride = cedula;

  fetch('promotores/views/nomina.tpl?t=' + Date.now())
    .then(function (res) { return res.text(); })
    .then(function (html) {
      wrapper.innerHTML = html;
      var header = wrapper.querySelector('.mb-6.lg\\:mb-8.fade-in.no-print');
      if (header) header.style.display = 'none';
      var resultado = wrapper.querySelector('#resultado');
      if (resultado) resultado.classList.add('hidden');

      var cedulaInput = wrapper.querySelector('#cedula');
      if (cedulaInput) {
        cedulaInput.value = cedula;
      }

      return consultar().finally(function () {
        window.__nominaCedulaOverride = '';
      });
    })
    .then(function () {
      var resultado = wrapper.querySelector('#resultado');
      if (resultado) {
        resultado.classList.remove('hidden');
        resultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    })
    .catch(function (err) {
      console.error('[AdminNomina] Error consultando nómina:', err);
      wrapper.innerHTML = '<div class="text-sm text-rojo">No se pudo cargar la nómina del promotor seleccionado.</div>';
    })
    .finally(function () {
      var btn = document.getElementById('admin-btn-consultar-nomina');
      var btnText = document.getElementById('admin-btn-consultar-texto');
      var btnSpinner = document.getElementById('admin-btn-consultar-spinner');
      if (btn && btnText && btnSpinner) {
        btn.disabled = false;
        btnText.textContent = 'Consultar Nómina';
        btnSpinner.classList.add('hidden');
      }
    });
}
