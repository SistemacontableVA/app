/* ============================================================
   DASHBOARD.JS — Vista del Dashboard Administrativo
   Módulo Administración · Óptica Visión de Águila
   KPIs reales desde Google Apps Script via DashboardService.
   ============================================================ */

function renderDashboard() {
  var contenedor = document.getElementById('admin-content');
  if (!contenedor) return;

  // Mostrar shell con spinner en las tarjetas mientras carga
  contenedor.innerHTML = _dashShellHtml();

  // Cargar métricas reales de forma asíncrona
  DashboardService.obtenerMetricas()
    .then(function (metricas) {
      _dashRenderKpis(metricas);
      // Actualizar el subtítulo según si los datos son reales o fallback
      var subtitulo = document.getElementById('dash-subtitulo');
      if (subtitulo) {
        subtitulo.textContent = metricas.ok === false
          ? 'Resumen del sistema · No se pudo conectar con el servidor'
          : 'Resumen del sistema · Datos en tiempo real';
      }
    })
    .catch(function () {
      _dashRenderKpis(DashboardService._metricasFallback());
    });
}

/* ════════════════════════════════════════════════════════════
   SHELL HTML — estructura fija, KPIs se inyectan después
════════════════════════════════════════════════════════════ */
function _dashShellHtml() {
  var actividad = DashboardService.obtenerActividadReciente();
  var accesos   = DashboardService.obtenerAccesosRapidos();

  var iconosAcceso = {
    doc:    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
    report: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',
    config: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
    cat:    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>'
  };

  var actividadHtml = actividad.map(function (a) {
    var colores = {
      documento: 'bg-verde-suave text-verde-oscuro',
      promotor:  'bg-verde-suave text-verde-oscuro',
      brigada:   'bg-emerald-100 text-emerald-700'
    };
    var color = colores[a.tipo] || 'bg-slate-100 text-slate-600';
    return '<div class="admin-activity-row">' +
      '<span class="admin-badge ' + color + ' flex-shrink-0">' + a.tipo + '</span>' +
      '<span class="text-sm text-slate-700 flex-1 min-w-0 truncate">' + a.texto + '</span>' +
      '<span class="text-[11px] text-slate-400 flex-shrink-0 ml-2">' + a.tiempo + '</span>' +
    '</div>';
  }).join('');

  var accesosHtml = accesos.map(function (a) {
    return '<button onclick="adminNavegar(\'' + a.ruta.replace('#/admin/', '') + '\')"' +
      ' class="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-soft' +
      ' hover:shadow-card transition-all hover:-translate-y-0.5 active:scale-95 border border-slate-100">' +
      '<div class="w-10 h-10 rounded-xl bg-verde-suave flex items-center justify-center">' +
        '<svg class="w-5 h-5 text-verde-oscuro" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
          iconosAcceso[a.icono] +
        '</svg>' +
      '</div>' +
      '<span class="text-xs font-semibold text-slate-600 text-center leading-tight">' + a.label + '</span>' +
    '</button>';
  }).join('');

  return '<div class="fade-in">' +

    // Saludo
    '<div class="mb-6">' +
      '<h3 class="text-verde-oscuro font-bold text-lg">Buenos días, Administrador</h3>' +
      '<p class="text-slate-400 text-sm mt-0.5" id="dash-subtitulo">Cargando datos...</p>' +
    '</div>' +

    // KPIs — placeholder con spinner mientras carga
    '<div id="dash-kpis" class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">' +
      [1,2,3,4].map(function() {
        return '<div class="admin-kpi-card flex items-center justify-center h-24">' +
          '<div class="spinner"></div>' +
        '</div>';
      }).join('') +
    '</div>' +

    // Fila central: actividad + accesos rápidos
    '<div class="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4">' +

      '<div class="bg-white rounded-xl shadow-soft p-4">' +
        '<div class="flex items-center justify-between mb-4">' +
          '<h4 class="font-bold text-verde-oscuro text-sm">Actividad Reciente</h4>' +
          '<span class="text-[10px] text-slate-400 uppercase tracking-wide font-semibold">Últimas 6</span>' +
        '</div>' +
        actividadHtml +
      '</div>' +

      '<div class="bg-gris-claro rounded-xl p-4 min-w-[200px]">' +
        '<h4 class="font-bold text-verde-oscuro text-sm mb-3">Accesos Rápidos</h4>' +
        '<div class="grid grid-cols-2 gap-2">' + accesosHtml + '</div>' +
      '</div>' +

    '</div>' +

    // Estado del sistema
    '<div class="mt-4 bg-white rounded-xl shadow-soft p-4">' +
      '<h4 class="font-bold text-verde-oscuro text-sm mb-3">Estado del Sistema</h4>' +
      '<div class="grid grid-cols-2 sm:grid-cols-4 gap-3">' +
        _estadoChip('Portal de Nómina', 'Activo', 'emerald') +
        _estadoChip('Google Apps Script', 'Activo', 'emerald') +
        _estadoChip('Base de Datos', 'Pendiente integración', 'amber') +
        _estadoChip('Versión', 'v5.0 MVP', 'blue') +
      '</div>' +
    '</div>' +

  '</div>';
}

/* ════════════════════════════════════════════════════════════
   RENDER KPIs — se llama cuando llegan los datos reales
════════════════════════════════════════════════════════════ */
function _dashRenderKpis(m) {
  var el = document.getElementById('dash-kpis');
  if (!el) return;

  // Formatear monto con separador de miles
  var montoFmt = (typeof m.totalMontoPagar === 'number')
    ? '$ ' + m.totalMontoPagar.toLocaleString('es-CO')
    : (m.totalMontoPagar || '—');

  var kpis = [
    {
      label: 'Total Promotores',
      valor: m.totalPromotores || '—',
      sub:   'registrados en el sistema',
      color: 'text-verde-oscuro',
      bg:    'bg-verde-suave',
      icono: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-3.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"/>'
    },
    {
      label: 'Brigadas Atendidas',
      valor: m.brigadasAtendidas || '—',
      sub:   'con venta de lentes registrada',
      color: 'text-emerald-700',
      bg:    'bg-emerald-50',
      icono: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V7.618a1 1 0 01.553-.894L9 4m0 16l6-3m-6 3V4m6 13l5.447-2.724A1 1 0 0021 13.382V4.618a1 1 0 00-1.447-.894L15 6m0 11V6m0 0L9 4"/>'
    },
    {
      label: 'Total Asistidos',
      valor: (typeof m.totalAsistidos === 'number')
               ? m.totalAsistidos.toLocaleString('es-CO')
               : (m.totalAsistidos || '—'),
      sub:   'personas atendidas en brigadas',
      color: 'text-verde-oscuro',
      bg:    'bg-verde-suave',
      icono: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-3.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"/>'
    },
    {
      label: 'Total Monto a Pagar',
      valor: montoFmt,
      sub:   'suma total a promotores',
      color: 'text-violet-700',
      bg:    'bg-violet-50',
      icono: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>'
    }
  ];

  el.innerHTML = kpis.map(function (k) {
    return '<div class="admin-kpi-card fade-in">' +
      '<div class="w-9 h-9 rounded-xl ' + k.bg + ' flex items-center justify-center mb-3">' +
        '<svg class="w-5 h-5 ' + k.color + '" fill="none" viewBox="0 0 24 24" stroke="currentColor">' +
          k.icono +
        '</svg>' +
      '</div>' +
      '<div class="text-2xl font-extrabold ' + k.color + ' leading-tight">' + k.valor + '</div>' +
      '<div class="text-xs text-slate-500 font-medium mt-0.5">' + k.label + '</div>' +
      '<div class="text-[10px] text-slate-400 mt-0.5">' + k.sub + '</div>' +
    '</div>';
  }).join('');
}

function _estadoChip(label, estado, color) {
  var colores = {
    emerald: 'bg-emerald-50 text-emerald-700',
    amber:   'bg-amber-50 text-amber-700',
    blue:    'bg-verde-suave text-verde-oscuro'
  };
  return '<div class="rounded-lg px-3 py-2.5 ' + (colores[color] || 'bg-slate-50 text-slate-600') + '">' +
    '<div class="text-[10px] font-semibold uppercase tracking-wide opacity-70">' + label + '</div>' +
    '<div class="text-xs font-bold mt-0.5">' + estado + '</div>' +
  '</div>';
}
