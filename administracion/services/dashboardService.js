/* ============================================================
   DASHBOARDSERVICE.JS — Servicio de datos del Dashboard
   Módulo Administración · Óptica Visión de Águila

   obtenerMetricas() consume el endpoint real del GAS.
   El resto de funciones retorna datos estáticos de soporte.
   ============================================================ */

var DashboardService = {

  /**
   * Obtiene las 4 métricas reales desde Google Apps Script.
   * Retorna una Promise con el objeto de métricas.
   *
   * Campos retornados:
   *   totalPromotores   — hoja Datos
   *   brigadasAtendidas — Relacion Lentes (brigadas únicas)
   *   totalAsistidos    — Relacion Lentes col G suma
   *   totalMontoPagar   — GENERAL col M suma
   *
   * @returns {Promise<object>}
   */
  obtenerMetricas: function () {
    var baseUrl = window.API_URL;
    if (!baseUrl) {
      console.warn('[DashboardService] API_URL no definida, usando datos de respaldo.');
      return Promise.resolve(this._metricasFallback());
    }

    return fetch(baseUrl + '?action=obtener-metricas-dashboard', { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .catch(function (err) {
        console.warn('[DashboardService] Error al obtener métricas, usando fallback.', err);
        return DashboardService._metricasFallback();
      });
  },

  /** Métricas de respaldo cuando la API no está disponible */
  _metricasFallback: function () {
    return {
      ok:               false,
      totalPromotores:  '—',
      brigadasAtendidas: '—',
      totalAsistidos:   '—',
      totalMontoPagar:  '—'
    };
  },

  /**
   * Retorna la actividad reciente del sistema (estática por ahora).
   * @returns {Array}
   */
  obtenerActividadReciente: function () {
    return [
      { tipo: 'documento',  texto: 'Solicitud institucional generada',    tiempo: 'Hace 5 min' },
      { tipo: 'promotor',   texto: 'Consulta de nómina realizada',        tiempo: 'Hace 18 min' },
      { tipo: 'brigada',    texto: 'Reporte de lentes consultado',        tiempo: 'Hace 32 min' },
      { tipo: 'documento',  texto: 'Hoja de convenio generada',           tiempo: 'Hace 1h' },
      { tipo: 'promotor',   texto: 'Escalafón de promotores consultado',  tiempo: 'Hace 2h' },
      { tipo: 'documento',  texto: 'Permiso policial generado',           tiempo: 'Hace 3h' }
    ];
  },

  /**
   * Retorna los accesos rápidos del dashboard.
   * @returns {Array}
   */
  obtenerAccesosRapidos: function () {
    return [
      { icono: 'doc',    label: 'Nuevo Documento',   ruta: '#/admin/documentos' },
      { icono: 'report', label: 'Ver Reportes',      ruta: '#/admin/reportes' },
      { icono: 'config', label: 'Configuración',     ruta: '#/admin/configuracion' },
      { icono: 'cat',    label: 'Catálogos',         ruta: '#/admin/catalogos' }
    ];
  }

};
