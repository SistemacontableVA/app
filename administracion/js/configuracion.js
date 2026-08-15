/* ============================================================
   CONFIGURACION.JS — Vista de Configuración del sistema
   Módulo Administración · Óptica Visión de Águila
   Fase 6 — Arquitectura base. Conectar ConfiguracionService.
   ============================================================ */

function renderConfiguracion() {
  var contenedor = document.getElementById('admin-content');
  if (!contenedor) return;

  var config = ConfiguracionService.obtener();

  contenedor.innerHTML =
    '<div class="fade-in">' +
      '<div class="mb-6">' +
        '<h3 class="text-verde-oscuro font-bold text-lg">Configuracion</h3>' +
        '<p class="text-slate-400 text-sm mt-0.5">Parametros generales del sistema</p>' +
      '</div>' +
      '<div class="bg-white rounded-xl shadow-soft p-6 max-w-lg">' +
        '<div class="space-y-4">' +
          _configField('Nombre del sistema', config.nombreSistema, true) +
          _configField('Empresa', config.empresa, true) +
          _configField('Version', config.version, true) +
          _configField('URL Google Apps Script', 'Pendiente configuracion', false) +
          _configField('Integracion Supabase', 'Pendiente integracion', false) +
        '</div>' +
        '<div class="mt-6 pt-4 border-t border-slate-100">' +
          '<p class="text-xs text-slate-400">La configuracion completa estara disponible al integrar el backend.</p>' +
        '</div>' +
      '</div>' +
    '</div>';
}

function _configField(label, valor, activo) {
  return '<div>' +
    '<label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">' + label + '</label>' +
    '<div class="px-3 py-2.5 rounded-lg text-sm ' +
      (activo ? 'bg-slate-50 text-slate-700 font-medium' : 'bg-slate-50 text-slate-400 italic') + '">' +
      valor +
    '</div>' +
  '</div>';
}
