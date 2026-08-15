/* ============================================================
   NOMINA.JS — Lógica principal del módulo Nómina
   Promotores · Portal de Nómina · Óptica Visión de Águila
   ============================================================ */

// Usar var para que la re-ejecución del script no lance
// "SyntaxError: Identifier already declared" en navegadores.
// API_URL también se define en assets/js/utils.js para el módulo Admin.
var API_URL = window.API_URL || "https://script.google.com/macros/s/AKfycbxaxAqJ6FePwf-6rd-YTPv59WRQZ5bF5LQSjJC_HnPqxb8mapF7hIz6uqmRLn5epEtR/exec";
window.API_URL = API_URL;

var logDiarioActual = [];
var filtroActivo    = 'todos';
var vistaActual     = 'nomina';

function obtenerCedulaParaConsulta() {
  var cedulaEl = document.getElementById('cedula');
  if (cedulaEl && cedulaEl.value.trim()) {
    return cedulaEl.value.trim();
  }

  if (window.__nominaCedulaOverride && window.__nominaCedulaOverride.toString().trim()) {
    return window.__nominaCedulaOverride.toString().trim();
  }

  return '';
}

/* ----------------------------------------------------------------
   NAVEGACIÓN DE PESTAÑAS (Nómina / Lentes / Brigadas)
---------------------------------------------------------------- */
function showVista(v) {
  vistaActual = v;

  document.querySelectorAll('.vista-btn').forEach(function(btn) {
    var activo = btn.dataset.vista === v;
    btn.classList.toggle('bg-verde-medio',  activo);
    btn.classList.toggle('text-white',      activo);
    btn.classList.toggle('bg-white',        !activo);
    btn.classList.toggle('text-gris-medio', !activo);
    btn.querySelectorAll('span').forEach(function(sp) {
      if (sp.classList.contains('uppercase')) {
        sp.classList.toggle('opacity-80',     activo);
        sp.classList.toggle('text-gris-medio', !activo);
      }
    });
  });

  document.querySelectorAll('.vista-panel').forEach(function(p) {
    p.classList.add('hidden');
  });
  document.getElementById('panel-' + v).classList.remove('hidden');
}

/* ----------------------------------------------------------------
   CONSULTA PRINCIPAL — Conecta con Google Apps Script
---------------------------------------------------------------- */
async function consultar() {
  var ci         = obtenerCedulaParaConsulta();
  var errorEl    = document.getElementById('msg-error');
  var btnText    = document.getElementById('btn-text');
  var btnSpinner = document.getElementById('btn-spinner');
  var btn        = document.getElementById('btn-consultar');

  errorEl.classList.add('hidden');
  if (!ci) return;

  btnText.textContent = 'Buscando...';
  btnSpinner.classList.remove('hidden');
  btn.disabled = true;

  try {
    var res  = await fetch(API_URL + '?cedula=' + ci);
    var data = await res.json();

    if (data.error) {
      errorEl.textContent = data.error;
      errorEl.classList.remove('hidden');
      document.getElementById('resultado').classList.add('hidden');
    } else {
      var resumen = data.resumen || {};

      document.getElementById('txt-nombre').innerText     = data.nombre || 'Asesor';
      document.getElementById('avatar-inicial').innerText = (data.nombre || 'A').trim().charAt(0).toUpperCase();

      // ── KPIs Brigadas y Asistidos ──
      document.getElementById('res-bc').innerText   = resumen.brigCampo !== undefined ? resumen.brigCampo : 0;
      document.getElementById('res-ba').innerText   = resumen.brigAtend !== undefined ? resumen.brigAtend : 0;
      var valAsistidos = resumen.asistidos !== undefined
        ? resumen.asistidos
        : (resumen.ceroAsist !== undefined ? resumen.ceroAsist : 0);
      document.getElementById('res-cero').innerText = valAsistidos;

      // ── BLOQUE INGRESOS ──
      document.getElementById('res-aff').innerText             = resumen.totalAff !== undefined ? resumen.totalAff : 0;
      document.getElementById('res-aff-cant').innerText        = resumen.totalAff !== undefined ? resumen.totalAff : 0;
      document.getElementById('res-total-aff-monto').innerText = '$ ' + fmt(resumen.totalAffMonto  || 0);
      document.getElementById('res-pago-asist').innerText      = '$ ' + fmt(resumen.pagoAsistencia || 0);
      document.getElementById('res-ing-lent-esp').innerText    = '$ ' + fmt(resumen.montoLenteEsp  || 0);
      document.getElementById('res-ing-lent-sen').innerText    = '$ ' + fmt(resumen.montoLenteSen  || 0);
      document.getElementById('res-promedio-venta').innerText  = Number(resumen.promedioVenta || 0).toFixed(2);
      document.getElementById('res-total-ingresos').innerText  = '$ ' + fmt(resumen.totalIngresos  || 0);

      // ── Fórmula visible en tarjeta de saldo ──
      document.getElementById('formula-ingresos').innerText    = '$' + fmt(resumen.totalIngresos    || 0);
      document.getElementById('formula-asistidos').innerText   = '$' + fmt(resumen.pagoAsistencia   || 0);
      document.getElementById('formula-deducciones').innerText = '$' + fmt(resumen.totalDeducciones || 0);

      // ── BLOQUE DEDUCCIONES ──
      document.getElementById('res-ded-total').innerText     = '$ ' + fmt(resumen.totalDeducciones || 0);
      document.getElementById('res-ded-prestamo').innerText  = '$ ' + fmt(resumen.deducPrestamo    || 0);
      document.getElementById('res-ded-comida').innerText    = '$ ' + fmt(resumen.deducComida      || 0);
      document.getElementById('res-ded-descuento').innerText = '$ ' + fmt(resumen.deducDescuento   || 0);

      // ── Saldo final ──
      var neto          = resumen.neto !== undefined ? resumen.neto : 0;
      var displayNeto   = document.getElementById('res-neto');
      var pagoContainer = document.getElementById('pago-container');
      var saldoLabel    = document.getElementById('saldo-label');
      var saldoAlerta   = document.getElementById('saldo-alerta');

      displayNeto.innerText = (typeof neto === 'number') ? '$ ' + neto.toLocaleString('es-CO') : neto;

      var esNegativo = neto.toString().includes('-');

      if (esNegativo) {
        displayNeto.classList.remove('text-verde-claro');
        displayNeto.classList.add('text-rojo-claro');
        pagoContainer.classList.remove('saldo-fondo-normal');
        pagoContainer.classList.add('saldo-fondo-negativo');
        pagoContainer.style.background = '';
        saldoLabel.classList.remove('texto-sobre-oscuro-fuerte');
        saldoLabel.classList.add('text-rojo');
        saldoAlerta.classList.remove('hidden', 'texto-sobre-oscuro-90');
        saldoAlerta.classList.add('text-rojo');
      } else {
        displayNeto.classList.add('text-verde-claro');
        displayNeto.classList.remove('text-rojo-claro');
        pagoContainer.classList.add('saldo-fondo-normal');
        pagoContainer.classList.remove('saldo-fondo-negativo');
        pagoContainer.style.background = '';
        saldoLabel.classList.add('texto-sobre-oscuro-fuerte');
        saldoLabel.classList.remove('text-rojo');
        saldoAlerta.classList.add('hidden');
        saldoAlerta.classList.remove('text-rojo');
      }

      // ── Historial diario ──
      logDiarioActual = data.logDiario || [];
      var dias    = logDiarioActual.length;
      var promAff = dias ? Math.round((Number(resumen.totalAff) || 0) / dias) : 0;
      document.getElementById('res-dias').innerText         = dias;
      document.getElementById('res-promedio-aff').innerText = promAff;

      // ── Renderizar secciones ──
      renderDeducciones();
      renderBrigadas();
      renderLentes(data);
      filtrar('todos');
      showVista('nomina');

      document.getElementById('resultado').classList.remove('hidden');
    }
  } catch (e) {
    console.error('[Nómina] Error:', e);
    errorEl.textContent = 'Error conectando con el sistema.';
    errorEl.classList.remove('hidden');
  } finally {
    btnText.textContent = 'Consultar';
    btnSpinner.classList.add('hidden');
    btn.disabled = false;
  }
}
