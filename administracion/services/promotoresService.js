/* ============================================================
   PROMOTORESSERVICE.JS — Servicio de datos de promotores
   Módulo Administración · Óptica Visión de Águila

   El listado oficial de promotores ahora se obtiene desde el
   Apps Script mediante la acción listar-promotores.
   ============================================================ */

var PromotoresService = {

  /**
   * Retorna resumen de promotores para el dashboard.
   * TODO: Conectar con Google Apps Script / Supabase.
   * @returns {Promise<object>}
   */
  obtenerResumen: function () {
    return Promise.resolve({
      total:   47,
      activos: 42,
      inactivos: 5
    });
  }

};
