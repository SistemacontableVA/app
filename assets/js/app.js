/* ============================================================
   APP.JS — Router principal de la aplicación
   Portal de Nómina · Óptica Visión de Águila

   NOTA: Las vistas usan extensión .tpl (no .html) para evitar
   que Live Server inyecte su script de recarga automática dentro
   del fragmento, lo cual truncaba el HTML y rompía el DOM.
   ============================================================ */

var MODULOS = {
  'nomina': {
    html: 'promotores/views/nomina.tpl',
    scripts: [
      'assets/js/utils.js',
      'promotores/js/nomina-render.js',
      'promotores/js/nomina-filtros.js',
      'promotores/js/nomina.js'
    ]
  },
  'coordinador': {
    html: 'coordinador/views/coordinador.tpl',
    scripts: [
      'coordinador/js/coordinador.js'
    ]
  },
  // ── Módulo Administración ─────────────────────────────────
  // Punto de entrada: pantalla de acceso temporal
  'admin-login': {
    html: 'administracion/views/login.tpl',
    scripts: [
      'administracion/config/auth.js',
      'administracion/js/login.js'
    ]
  },
  // ── Módulo Documentos: formularios ────────────────────────
  'documentos': {
    html: 'administracion/documentos/views/documentos.tpl',
    scripts: [
      'administracion/documentos/js/documentosService.js',
      'administracion/documentos/js/documentos.js'
    ]
  },
  'solicitud-institucional': {
    html: 'administracion/documentos/views/solicitud-institucional.tpl',
    scripts: [
      'administracion/documentos/js/documentosService.js',
      'administracion/documentos/js/documentos.js'
    ]
  },
  'solicitud-espacio': {
    html: 'administracion/documentos/views/solicitud-espacio.tpl',
    scripts: [
      'administracion/documentos/js/documentosService.js',
      'administracion/documentos/js/documentos.js'
    ]
  },
  'permiso-policial': {
    html: 'administracion/documentos/views/permiso-policial.tpl',
    scripts: [
      'administracion/documentos/js/documentosService.js',
      'administracion/documentos/js/documentos.js'
    ]
  },
  'hoja-convenio': {
    html: 'administracion/documentos/views/hoja-convenio.tpl',
    scripts: [
      'administracion/documentos/js/documentosService.js',
      'administracion/documentos/js/documentos.js'
    ]
  },
  'hoja-convenio-personalizable': {
    html: 'administracion/documentos/views/hoja-convenio-personalizable.tpl',
    scripts: [
      'administracion/documentos/js/documentos.js'
    ]
  },

  // Shell administrativa: sidebar + topbar + contenido dinámico
  'administracion': {
    html: 'administracion/views/shell.tpl',
    scripts: [
      'assets/js/utils.js',               // define API_URL global para todos los sub-módulos
      'administracion/config/auth.js',
      'administracion/services/dashboardService.js',
      'administracion/services/documentosService.js',
      'administracion/services/promotoresService.js',
      'administracion/services/configuracionService.js',
      'administracion/js/router.js'
    ]
  }
};

/**
 * Carga un módulo: hace fetch del fragmento .tpl, lo inyecta en
 * #app-container y luego carga sus scripts en orden.
 */
async function mostrarModulo(nombre) {
  var modulo = MODULOS[nombre];
  if (!modulo) { console.warn('[App] Módulo no encontrado:', nombre); return; }

  var contenedor = document.getElementById('app-container');
  contenedor.innerHTML = '<div class="flex items-center justify-center min-h-[60vh]"><div class="spinner"></div></div>';

  try {
    var res = await fetch(modulo.html + '?t=' + Date.now(), { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status + ' — ' + modulo.html);
    var html = await res.text();

    contenedor.innerHTML = html;

    // Cargar scripts en orden secuencial
    for (var i = 0; i < modulo.scripts.length; i++) {
      await cargarScript(modulo.scripts[i]);
    }

    console.log('[App] Módulo "' + nombre + '" cargado.');
  } catch (err) {
    console.error('[App] Error cargando módulo:', err);
    contenedor.innerHTML = '<div class="flex items-center justify-center min-h-[60vh] text-slate-400 text-sm px-4">No se pudo cargar el módulo. Verifica que el servidor esté activo.</div>';
  }
}

/**
 * Inyecta un script dinámicamente. Elimina la versión anterior
 * para garantizar re-ejecución fresca en cada carga de módulo.
 */
function cargarScript(src) {
  return new Promise(function(resolve, reject) {
    var prev = document.querySelector('script[data-modulo="' + src + '"]');
    if (prev) prev.remove();
    var s = document.createElement('script');
    s.src = src + '?t=' + Date.now();
    s.setAttribute('data-modulo', src);
    s.onload  = resolve;
    s.onerror = function() { reject(new Error('No se pudo cargar: ' + src)); };
    document.body.appendChild(s);
  });
}

function ingresarAsesor() {
  document.getElementById('landing-bienvenida').classList.add('hidden');
  document.getElementById('pantalla-busqueda').classList.remove('hidden');
}

/**
 * Desde la pantalla de búsqueda intermedia (V6):
 * transfiere la cédula al módulo nómina y dispara la consulta.
 */
function iniciarBusqueda() {
  var cedulaInput = document.getElementById('cedula-inicial').value.trim();

  document.getElementById('pantalla-busqueda').classList.add('hidden');
  document.getElementById('app-container').classList.remove('hidden');

  mostrarModulo('nomina').then(function() {
    if (cedulaInput) {
      var campoCedula = document.getElementById('cedula');
      if (campoCedula) {
        campoCedula.value = cedulaInput;
        if (typeof consultar === 'function') consultar();
      }
    }
  });
}

/** Abre la pantalla de acceso del módulo Administración */
function ingresarAdmin() {
  document.getElementById('landing-bienvenida').classList.add('hidden');
  document.getElementById('app-container').classList.remove('hidden');
  mostrarModulo('admin-login');
}

function mostrarProximamente() {
  document.getElementById('modal-proximamente').classList.remove('hidden');
}

function cerrarModalProximamente() {
  document.getElementById('modal-proximamente').classList.add('hidden');
}
