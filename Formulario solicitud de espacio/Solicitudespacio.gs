/*************************************************
 * Solicitudespacio.gs — Solicitud de Espacio
 * Portal de Nómina · Óptica Visión de Águila
 *
 * MODO 1: Modal dentro del Google Doc
 *   onOpen() → crea el menú "Óptica Visión de Águila"
 *   mostrarFormulario() → abre el diálogo modal
 *
 * MODO 2: Web App HTTP (Portal de Nómina)
 *   doGet(e) → recibe los datos del formulario por query string
 *   Responde con { ok, id, url } del documento generado
 *
 * Para desplegar como Web App:
 *   Extensiones → Apps Script → Implementar → Nueva implementación
 *   Tipo: Aplicación web
 *   Ejecutar como: Yo
 *   Quién puede acceder: Cualquier usuario
 *
 * Marcadores en la plantilla Google Doc:
 *   {{fechasolicitud}}  → Fecha de la solicitud
 *   {{dirigido}}        → Señores / Dirigido a
 *   {{municipio}}       → Municipio
 *   {{lugar}}           → Lugar de Atención
 *   {{fechaatencion}}   → Fecha de la Jornada
 *   {{horainicio}}      → Hora de inicio
 *   {{horafinal}}       → Hora de finalización
 *************************************************/

var CONFIG_SE = {
  EMPRESA:     "Óptica Visión de Águila",
  TITULO:      "Solicitud de Espacio",
  HORA_INICIO: "7:30 AM",
  HORA_FIN:    "5:30 PM"
};

/**
 * ID de la plantilla Google Doc de Solicitud de Espacio.
 * Reemplaza este valor con el ID real de tu plantilla:
 *   Abre el Google Doc → la URL tiene el formato:
 *   https://docs.google.com/document/d/ESTE_ES_EL_ID/edit
 */
var TEMPLATE_ID_SE = "REEMPLAZAR_CON_ID_DE_TU_PLANTILLA";

// ═══════════════════════════════════════════════════════════
// MODO 1 — Modal dentro del Google Doc (uso original)
// ═══════════════════════════════════════════════════════════

function onOpen() {
  DocumentApp.getUi()
    .createMenu(CONFIG_SE.EMPRESA)
    .addItem("Generar Solicitud de Espacio", "mostrarFormulario")
    .addToUi();
}

function mostrarFormulario() {
  var html = HtmlService.createHtmlOutputFromFile("Formulario")
    .setWidth(520)
    .setHeight(600);
  DocumentApp.getUi().showModalDialog(html, CONFIG_SE.TITULO);
}

/** Retorna la fecha y horas por defecto al abrir el formulario modal */
function obtenerConfiguracion() {
  return {
    fechasolicitud: Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy"),
    horainicio:     CONFIG_SE.HORA_INICIO,
    horafinal:      CONFIG_SE.HORA_FIN
  };
}

// ═══════════════════════════════════════════════════════════
// MODO 2 — Web App para el Portal de Nómina (HTTP)
// ═══════════════════════════════════════════════════════════

/**
 * Punto de entrada HTTP GET — método principal desde el Portal de Nómina.
 *
 * Modo generación (desde el portal):
 *   fetch(URL + '?fechasolicitud=...&dirigido=...&municipio=...')
 *   → Se detecta por la presencia de e.parameter.dirigido
 *   → Genera el documento y retorna { ok, id, url }
 *
 * Modo exportar PDF:
 *   fetch(URL + '?accion=exportarPDF&id=DOC_ID')
 *   → Retorna { ok, url } del PDF generado
 *
 * Modo health check (sin parámetros):
 *   → Retorna { ok, status, servicio }
 */
function doGet(e) {
  var param = (e && e.parameter) ? e.parameter : {};

  // Cabecera CORS para permitir llamadas desde cualquier origen
  var output;

  // Modo: exportar PDF de un documento ya generado
  if (param.accion === 'exportarPDF' && param.id) {
    try {
      var pdf = _exportarPDF(param.id);
      output = ContentService
        .createTextOutput(JSON.stringify(pdf))
        .setMimeType(ContentService.MimeType.JSON);
      return output;
    } catch (err) {
      output = ContentService
        .createTextOutput(JSON.stringify({ ok: false, mensaje: err.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
      return output;
    }
  }

  // Modo: generar documento con parámetros del formulario
  if (param.dirigido) {
    try {
      var resultado = _generarDocumentoSE(param);
      output = ContentService
        .createTextOutput(JSON.stringify(resultado))
        .setMimeType(ContentService.MimeType.JSON);
      return output;
    } catch (err) {
      output = ContentService
        .createTextOutput(JSON.stringify({ ok: false, mensaje: err.toString() }))
        .setMimeType(ContentService.MimeType.JSON);
      return output;
    }
  }

  // Sin parámetros → health check
  return ContentService
    .createTextOutput(JSON.stringify({
      ok:       true,
      status:   'activo',
      servicio: CONFIG_SE.TITULO,
      empresa:  CONFIG_SE.EMPRESA
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Punto de entrada HTTP POST (compatibilidad).
 * El portal usa doGet, pero se mantiene doPost por si se necesita.
 */
function doPost(e) {
  try {
    var datos = JSON.parse(e.postData.contents);
    var resultado = _generarDocumentoSE(datos);
    return ContentService
      .createTextOutput(JSON.stringify(resultado))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, mensaje: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ═══════════════════════════════════════════════════════════
// LÓGICA PRINCIPAL
// ═══════════════════════════════════════════════════════════

/**
 * Copia la plantilla y reemplaza todos los marcadores {{...}}.
 *
 * @param {object} datos - Parámetros recibidos del formulario:
 *   datos.fechasolicitud → {{fechasolicitud}}
 *   datos.dirigido       → {{dirigido}}
 *   datos.municipio      → {{municipio}}
 *   datos.lugar          → {{lugar}}
 *   datos.fechaatencion  → {{fechaatencion}}
 *   datos.horainicio     → {{horainicio}}
 *   datos.horafinal      → {{horafinal}}
 *
 * @returns {{ ok: boolean, id: string, url: string }}
 */
function _generarDocumentoSE(datos) {
  var archivo = DriveApp.getFileById(TEMPLATE_ID_SE);
  var nombreCopia = "Solicitud de Espacio - " + (datos.municipio || "Sin municipio");
  var copia = archivo.makeCopy(nombreCopia);
  var doc   = DocumentApp.openById(copia.getId());
  var body  = doc.getBody();

  body.replaceText("{{fechasolicitud}}", datos.fechasolicitud || _hoyFormateado());
  body.replaceText("{{dirigido}}",       datos.dirigido       || "");
  body.replaceText("{{municipio}}",      datos.municipio      || "");
  body.replaceText("{{lugar}}",          datos.lugar          || "");
  body.replaceText("{{fechaatencion}}",  datos.fechaatencion  || "");
  body.replaceText("{{horainicio}}",     datos.horainicio     || CONFIG_SE.HORA_INICIO);
  body.replaceText("{{horafinal}}",      datos.horafinal      || CONFIG_SE.HORA_FIN);

  doc.saveAndClose();

  return {
    ok:  true,
    id:  copia.getId(),
    url: "https://docs.google.com/document/d/" + copia.getId() + "/edit"
  };
}

/** Alias público para compatibilidad con el formulario modal */
function generarDocumento(datos) {
  return _generarDocumentoSE(datos);
}

// ═══════════════════════════════════════════════════════════
// EXPORTAR PDF
// ═══════════════════════════════════════════════════════════

/**
 * Convierte el Google Doc generado a PDF y devuelve su URL.
 * El Doc original queda en la papelera (se puede recuperar si es necesario).
 *
 * @param {string} idDocumento - ID del Google Doc generado previamente
 * @returns {{ ok: boolean, url: string }}
 */
function _exportarPDF(idDocumento) {
  var archivo = DriveApp.getFileById(idDocumento);
  var pdfBlob = archivo.getBlob().getAs(MimeType.PDF);
  var pdf     = DriveApp.createFile(pdfBlob);
  pdf.setName(archivo.getName() + ".pdf");
  archivo.setTrashed(true);
  return { ok: true, url: pdf.getUrl() };
}

// ═══════════════════════════════════════════════════════════
// UTILIDADES
// ═══════════════════════════════════════════════════════════

/** Retorna la fecha de hoy en formato dd/MM/yyyy */
function _hoyFormateado() {
  return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy");
}
