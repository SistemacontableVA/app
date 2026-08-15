/* ============================================================
   ROUTER.JS — Sub-router interno del módulo Administración
   Óptica Visión de Águila

   Gestiona la navegación entre secciones del panel admin.
   Opera dentro de #admin-content sin afectar el router
   principal de app.js ni el módulo Promotores.

   Rutas internas: dashboard | documentos | reportes |
                   catalogos | configuracion
   ============================================================ */

/** Mapa de secciones: clave → { titulo, scripts[], renderFn } */
var ADMIN_RUTAS = {
  'dashboard':      { titulo: 'Dashboard',            scripts: ['administracion/services/dashboardService.js', 'administracion/js/dashboard.js'] },
  'documentos':     { titulo: 'Gestión Documental',   scripts: ['administracion/js/documentos.js'] },
  'nominaPromotor': { titulo: 'Nómina Promotor',      scripts: ['assets/js/utils.js', 'promotores/js/nomina-render.js', 'promotores/js/nomina-filtros.js', 'promotores/js/nomina.js', 'administracion/js/nominaPromotor.js'] },
  'reportes':       { titulo: 'Reportes',             scripts: ['administracion/services/reportesService.js', 'administracion/js/reportes.js'] },
  'catalogos':      { titulo: 'Catálogos',            scripts: ['administracion/js/catalogos.js'] },
  'configuracion':  { titulo: 'Configuración',        scripts: ['administracion/js/configuracion.js'] }
};

/** Sección activa actual */
var _adminRutaActual = '';

/**
 * Navega a una sección del panel administrativo.
 * Actualiza el sidebar, el título del topbar y carga
 * el JS de la sección de forma dinámica.
 * @param {string} seccion - Clave en ADMIN_RUTAS
 */
function adminNavegar(seccion) {
  var ruta = ADMIN_RUTAS[seccion];
  if (!ruta) {
    console.warn('[AdminRouter] Sección no encontrada:', seccion);
    return;
  }

  _adminRutaActual = seccion;

  // En móvil: cerrar el sidebar al navegar
  if (window.innerWidth <= 768) {
    var sidebar = document.getElementById('admin-sidebar');
    var overlay = document.getElementById('admin-mobile-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Actualizar título del topbar
  var tituloEl = document.getElementById('admin-topbar-titulo');
  if (tituloEl) tituloEl.textContent = ruta.titulo;

  // Marcar ítem activo en sidebar
  var items = document.querySelectorAll('.admin-menu-item');
  items.forEach(function (item) {
    var itemRuta = item.getAttribute('data-ruta');
    item.classList.toggle('activo', itemRuta === seccion);
  });

  // Mostrar spinner en el contenido
  var contenedor = document.getElementById('admin-content');
  if (contenedor) {
    contenedor.innerHTML = '<div class="flex items-center justify-center h-40"><div class="spinner"></div></div>';
  }

  // Cargar scripts de la sección en orden y luego renderizar
  _cargarScriptsAdmin(ruta.scripts, 0, function () {
    // Cada módulo expone una función render<Seccion>()
    // Ej: renderDashboard(), renderDocumentos(), etc.
    var fnNombre = 'render' + seccion.charAt(0).toUpperCase() + seccion.slice(1);
    if (typeof window[fnNombre] === 'function') {
      window[fnNombre]();
    } else {
      console.warn('[AdminRouter] Función no encontrada:', fnNombre);
    }
  });
}

/**
 * Carga scripts del admin de forma secuencial.
 * Elimina la versión anterior para garantizar re-ejecución fresca.
 * @param {string[]} scripts
 * @param {number} index
 * @param {Function} callback
 */
function _cargarScriptsAdmin(scripts, index, callback) {
  if (index >= scripts.length) {
    callback();
    return;
  }

  var src = scripts[index];
  var prev = document.querySelector('script[data-admin="' + src + '"]');
  if (prev) prev.remove();

  var s = document.createElement('script');
  s.src = src + '?t=' + Date.now();
  s.setAttribute('data-admin', src);
  s.onload = function () {
    _cargarScriptsAdmin(scripts, index + 1, callback);
  };
  s.onerror = function () {
    console.error('[AdminRouter] Error cargando:', src);
    _cargarScriptsAdmin(scripts, index + 1, callback);
  };
  document.body.appendChild(s);
}

/**
 * Cierra la sesión administrativa y vuelve al landing.
 */
function adminLogout() {
  // Limpiar scripts del admin del DOM
  document.querySelectorAll('script[data-admin]').forEach(function (s) { s.remove(); });
  // Limpiar estilos del admin si se cargaron dinámicamente
  document.querySelectorAll('link[data-admin-css]').forEach(function (l) { l.remove(); });

  // Volver al landing principal
  document.getElementById('app-container').classList.add('hidden');
  document.getElementById('landing-bienvenida').classList.remove('hidden');
}

// Iniciar en dashboard al cargar la shell
(function () {
  adminNavegar('dashboard');
})();

/**
 * Abre/cierra el sidebar en móvil (drawer).
 * Llamado desde el botón hamburguesa del topbar.
 */
function adminToggleSidebar() {
  var sidebar = document.getElementById('admin-sidebar');
  var overlay = document.getElementById('admin-mobile-overlay');
  if (!sidebar || !overlay) return;

  var isOpen = sidebar.classList.contains('open');
  if (isOpen) {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  } else {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}
