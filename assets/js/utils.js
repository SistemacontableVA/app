/* ============================================================
   UTILS.JS — Funciones de utilidad globales
   Reutilizables en todos los módulos del sistema
   ============================================================ */

/**
 * URL del Web App de Google Apps Script.
 * Definida aquí para que esté disponible en todos los módulos
 * (Promotores, Administración, Reportes, Dashboard).
 * Usar var para permitir re-ejecución sin error de re-declaración.
 */
var API_URL = "https://script.google.com/macros/s/AKfycbxaxAqJ6FePwf-6rd-YTPv59WRQZ5bF5LQSjJC_HnPqxb8mapF7hIz6uqmRLn5epEtR/exec";
window.API_URL = API_URL;

/**
 * Formatea un número como moneda colombiana.
 * Ejemplo: fmt(1500000) → "1.500.000"
 * @param {number|string} n
 * @returns {string}
 */
function fmt(n) {
  var v = Number(n) || 0;
  return v.toLocaleString('es-CO');
}
