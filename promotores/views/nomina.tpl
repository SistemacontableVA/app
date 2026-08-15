<!-- ============================================================
     NOMINA.TPL — Vista del módulo Nómina (Asesor de Campo) · V6
     Promotores · Portal de Nómina · Óptica Visión de Águila
     ============================================================ -->

<div class="max-w-2xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 py-6 lg:py-8">

  <!-- Encabezado / Buscador -->
  <div class="mb-6 lg:mb-8 fade-in no-print">
    <div class="lg:flex lg:items-center lg:justify-center lg:gap-12 text-center">
      <div class="lg:flex lg:items-center lg:gap-4">
        <img
          src="https://raw.githubusercontent.com/Soportekgservices/Visiondeaguila/10a459ffeafcfcedfcade0f0a2700b330668e52c/LOGO%20AGUILA%20VISION%202025%20(1).png"
          class="mx-auto lg:mx-0 w-40 sm:w-44 lg:w-24 mb-4 lg:mb-0"
          alt="Logo">
        <div class="text-center lg:text-left">
          <h1 class="text-verde-oscuro font-bold text-lg sm:text-xl">Portal de Nómina</h1>
          <p class="text-gris-medio text-sm">Consulta individual</p>
        </div>
      </div>

      <div class="bg-white rounded-md-plus shadow-soft p-2 flex items-center gap-2 mt-5 lg:mt-0 lg:w-[380px] lg:shrink-0">
        <input type="text" id="cedula" inputmode="numeric" placeholder="Cédula del asesor"
          class="flex-1 min-w-0 px-4 py-3 rounded-[14px] text-sm sm:text-base input-foco-verde placeholder:text-slate-400 bg-transparent"
          onkeydown="if(event.key==='Enter') consultar()">
        <button onclick="consultar()" id="btn-consultar"
          class="shrink-0 btn-primario active:scale-95 transition-all text-white font-semibold text-sm sm:text-base px-5 py-3 rounded-[14px] flex items-center gap-2">
          <span id="btn-text">Consultar</span>
          <span id="btn-spinner" class="spinner hidden"
            style="border-color: rgba(255,255,255,.3); border-top-color:#fff;"></span>
        </button>
      </div>
    </div>
    <p id="msg-error" class="text-rojo text-sm mt-3 text-center lg:text-left hidden"></p>
  </div>

  <!-- ── Resultado ── -->
  <div id="resultado" class="hidden">

    <div class="max-w-2xl lg:max-w-5xl mx-auto">

      <!-- ══ ENCABEZADO DOCUMENTAL ══ -->
      <div class="bg-white rounded-md-plus shadow-card overflow-hidden mb-3 fade-in border border-slate-200 grid grid-cols-1 sm:grid-cols-[1fr_auto]">
        <div class="tech-grid bg-verde-oscuro flex flex-col items-center justify-center py-4 px-4 overflow-hidden">
          <h1 class="relative text-white font-extrabold text-base sm:text-xl lg:text-2xl tracking-wide uppercase text-center">
            Nómina de Promotor
          </h1>
          <span class="tech-glow-line mt-1.5"></span>
        </div>
        <div class="p-3 sm:p-4 bg-gris-claro-70 flex items-center gap-3 sm:min-w-[230px] border-t sm:border-t-0 sm:border-l border-slate-100">
          <div id="avatar-inicial"
            class="w-9 h-9 shrink-0 rounded-full gradiente-verde-oscuro flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
          <div class="min-w-0 flex-1 text-[10.5px] sm:text-[11px] leading-tight space-y-0.5">
            <div class="flex justify-between gap-2">
              <span class="text-gris-medio font-semibold uppercase">Perfil:</span>
              <strong class="text-verde-oscuro uppercase">Asesor de Campo</strong>
            </div>
            <div class="flex justify-between gap-2">
              <span class="text-gris-medio font-semibold uppercase">Campo:</span>
              <strong class="text-verde-oscuro uppercase">Brig.</strong>
            </div>
            <div class="flex justify-between gap-2">
              <span class="text-gris-medio font-semibold uppercase">Atención:</span>
              <strong class="text-verde-oscuro uppercase">Venta Lentes</strong>
            </div>
          </div>
          <button onclick="window.print()" id="btn-pdf" title="Generar PDF"
            class="no-print shrink-0 bg-white hover:bg-slate-100 text-gris-medio rounded-full w-8 h-8 flex items-center justify-center transition-all border border-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- ══ BARRA DE MÉTRICAS RÁPIDAS ══ -->
      <div class="bg-white rounded-md-plus shadow-card mb-3 fade-in overflow-hidden border border-slate-200">
        <div class="grid grid-cols-2 sm:grid-cols-5 divide-x divide-y sm:divide-y-0 divide-slate-100">

          <!-- Nombre asesor -->
          <div class="p-2.5 sm:p-3 col-span-2 sm:col-span-1 flex items-center gap-2">
            <span class="w-7 h-7 shrink-0 rounded-full bg-verde-suave flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-verde-medio" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </span>
            <div class="min-w-0">
              <span class="block text-[9px] uppercase text-gris-medio font-semibold tracking-wide">Nombre Asesor</span>
              <strong id="txt-nombre" class="block text-verde-oscuro font-bold text-xs sm:text-sm uppercase truncate">...</strong>
            </div>
          </div>

          <!-- Brigadas Campo -->
          <div class="p-2.5 sm:p-3 flex items-center gap-2">
            <span class="w-7 h-7 shrink-0 rounded-full bg-verde-suave flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-verde-oscuro" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-3.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"/>
              </svg>
            </span>
            <div class="min-w-0">
              <span class="block text-[9px] uppercase text-gris-medio font-semibold tracking-wide">Brig. Campo</span>
              <strong id="res-bc" class="block text-verde-oscuro font-extrabold text-lg leading-tight">0</strong>
            </div>
          </div>

          <!-- Brigadas Atendidas -->
          <div class="p-2.5 sm:p-3 flex items-center gap-2">
            <span class="w-7 h-7 shrink-0 rounded-full bg-verde-suave flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-verde-oscuro" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </span>
            <div class="min-w-0">
              <span class="block text-[9px] uppercase text-gris-medio font-semibold tracking-wide">Brig. Atend</span>
              <strong id="res-ba" class="block text-verde-oscuro font-extrabold text-lg leading-tight">0</strong>
            </div>
          </div>

          <!-- Venta Lentes -->
          <div class="p-2.5 sm:p-3 flex items-center gap-2">
            <span class="w-7 h-7 shrink-0 rounded-full bg-verde-suave flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-verde-medio" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              </svg>
            </span>
            <div class="min-w-0">
              <span class="block text-[9px] uppercase text-gris-medio font-semibold tracking-wide">Venta Lentes</span>
              <strong id="res-lent" class="block text-verde-oscuro font-extrabold text-lg leading-tight">0</strong>
            </div>
          </div>

          <!-- Asistidos -->
          <div class="p-2.5 sm:p-3 flex items-center gap-2">
            <span class="w-7 h-7 shrink-0 rounded-full bg-verde-suave flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-verde-oscuro" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </span>
            <div class="min-w-0">
              <span class="block text-[9px] uppercase text-gris-medio font-semibold tracking-wide">Asistidos</span>
              <strong id="res-cero" class="block text-verde-oscuro font-extrabold text-lg leading-tight">0</strong>
            </div>
          </div>

        </div>
      </div>

      <!-- ══ BLOQUE FINANCIERO: INGRESOS · DEDUCCIONES · SALDO ══ -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">

        <!-- Columna 1: INGRESOS -->
        <div class="bg-white rounded-md-plus shadow-card overflow-hidden fade-in border border-slate-200 flex flex-col">
          <div class="bg-verde-oscuro text-white flex items-center justify-center gap-1.5 font-bold text-[11px] uppercase tracking-wide py-2.5">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
            Ingresos
          </div>
          <div class="divide-y divide-slate-100 text-xs flex-1">
            <div class="flex justify-between px-3 py-2">
              <span class="text-gris-medio">Cant. Afiliaciones</span>
              <strong id="res-aff-cant" class="text-verde-oscuro">0</strong>
            </div>
            <div class="flex justify-between px-3 py-2">
              <span class="text-gris-medio">Total Afiliaciones</span>
              <strong id="res-total-aff-monto" class="text-verde-oscuro">$ 0</strong>
            </div>
            <div class="flex justify-between px-3 py-2">
              <span class="text-gris-medio">Bonif. L. Especial</span>
              <strong id="res-ing-lent-esp" class="text-verde-oscuro">$ 0</strong>
            </div>
            <div class="flex justify-between px-3 py-2">
              <span class="text-gris-medio">Bonif. L. Sencillo</span>
              <strong id="res-ing-lent-sen" class="text-verde-oscuro">$ 0</strong>
            </div>
            <div class="flex justify-between px-3 py-2">
              <span class="text-gris-medio">Prom. Venta</span>
              <strong id="res-promedio-venta" class="text-verde-oscuro">0</strong>
            </div>
            <span id="res-pago-asist" class="hidden"></span>
          </div>
          <div class="flex justify-between px-3 py-2.5 bg-verde-suave border-t-2 border-verde-medio">
            <span class="font-bold text-verde-oscuro text-[11px] uppercase self-center">Total Ingresos</span>
            <strong id="res-total-ingresos" class="font-extrabold text-verde-oscuro text-sm">$ 0</strong>
          </div>
        </div>

        <!-- Columna 2: DEDUCCIONES -->
        <div class="bg-white rounded-md-plus shadow-card overflow-hidden fade-in border border-slate-200 flex flex-col">
          <div class="bg-verde-oscuro text-white flex items-center justify-center gap-1.5 font-bold text-[11px] uppercase tracking-wide py-2.5">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/>
            </svg>
            Deducciones
          </div>
          <div class="divide-y divide-slate-100 text-xs flex-1">
            <div class="flex justify-between px-3 py-2">
              <span class="text-gris-medio">Comida / Medicina</span>
              <strong id="res-ded-comida" class="text-rojo">$ 0</strong>
            </div>
            <div class="flex justify-between px-3 py-2">
              <span class="text-gris-medio">Préstamos / Adel.</span>
              <strong id="res-ded-prestamo" class="text-rojo">$ 0</strong>
            </div>
            <div class="flex justify-between px-3 py-2">
              <span class="text-gris-medio">Descuento</span>
              <strong id="res-ded-descuento" class="text-rojo">$ 0</strong>
            </div>
          </div>
          <div class="flex justify-between px-3 py-2.5 bg-rojo-suave border-t-2 border-rojo">
            <span class="font-bold text-rojo-oscuro text-[11px] uppercase self-center">Total Deducciones</span>
            <strong id="res-ded-total" class="font-extrabold text-rojo-oscuro text-sm">$ 0</strong>
          </div>
        </div>

        <!-- Columna 3: SALDO -->
        <div class="flex flex-col gap-2">
          <div id="pago-container"
            class="tech-grid saldo-card saldo-fondo-normal rounded-md-plus px-3 py-3 text-center fade-in transition-colors duration-300 flex flex-col justify-center flex-1 overflow-hidden">
            <span class="tech-dot mx-auto mb-1 w-6 h-6 rounded-full fondo-sobre-oscuro-sutil flex items-center justify-center text-white text-xs font-bold">$</span>
            <span id="saldo-label" class="uppercase text-[9px] font-semibold tracking-widest texto-sobre-oscuro-fuerte">Saldo final a pagar</span>
            <div id="res-neto" class="text-2xl font-extrabold text-verde-claro leading-tight mt-0.5 mb-0.5">$ 0</div>
            <div id="saldo-alerta" class="hidden texto-sobre-oscuro-90 text-[11px] font-medium mb-0.5">&#9888; Este saldo está en contra del asesor</div>
            <span class="tech-glow-line mx-auto mb-1.5"></span>
            <div class="texto-sobre-oscuro-medio text-[11px]">Afiliaciones totales: <span id="res-aff" class="font-semibold text-white">0</span></div>
            <div class="mt-1.5 pt-1.5 border-t borde-sobre-oscuro flex items-center justify-center gap-1.5 text-[11px] font-semibold">
              <span id="formula-ingresos" class="texto-sobre-oscuro-fuerte">$0</span>
              <span class="texto-sobre-oscuro-sutil">+</span>
              <span id="formula-asistidos" class="text-verde-claro">$0</span>
              <span class="text-rojo-claro-60">&#8722;</span>
              <span id="formula-deducciones" class="text-rojo-claro">$0</span>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="bg-white rounded-md-plus shadow-card px-2 py-2 text-center border border-slate-200">
              <span class="block text-[8px] uppercase text-gris-medio font-semibold leading-tight">Promedio Aff.</span>
              <strong id="res-promedio-aff" class="block text-verde-oscuro font-extrabold text-base leading-tight">0</strong>
            </div>
            <div class="bg-white rounded-md-plus shadow-card px-2 py-2 text-center border border-slate-200">
              <span class="block text-[8px] uppercase text-gris-medio font-semibold leading-tight">Días Trab.</span>
              <strong id="res-dias" class="block text-verde-oscuro font-extrabold text-base leading-tight">0</strong>
            </div>
          </div>
        </div>

      </div>

      <!-- ══ PESTAÑAS DE SECCIÓN ══ -->
      <div class="grid grid-cols-3 gap-2 mb-4 no-print" id="vistas">
        <button data-vista="nomina" onclick="showVista('nomina')"
          class="vista-btn flex items-center gap-2.5 text-left p-3 rounded-md-plus bg-verde-medio text-white shadow-soft transition-colors">
          <span class="icon-wrap w-8 h-8 shrink-0 rounded-lg fondo-sobre-oscuro-fuerte flex items-center justify-center">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
          </span>
          <span class="min-w-0">
            <span class="block text-[10px] sm:text-[11px] uppercase opacity-80 font-medium">Sección</span>
            <span class="block text-xs sm:text-sm font-bold mt-0.5">Detalle Jornadas</span>
          </span>
        </button>
        <button data-vista="lentes" onclick="showVista('lentes')"
          class="vista-btn flex items-center gap-2.5 text-left p-3 rounded-md-plus bg-white text-gris-medio shadow-soft transition-colors">
          <span class="icon-wrap w-8 h-8 shrink-0 rounded-lg bg-verde-suave flex items-center justify-center">
            <svg class="w-4 h-4 text-verde-medio" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </span>
          <span class="min-w-0">
            <span class="block text-[10px] sm:text-[11px] uppercase text-gris-medio font-medium">Sección</span>
            <span class="block text-xs sm:text-sm font-bold mt-0.5">Venta de Lentes</span>
          </span>
        </button>
        <button data-vista="brigadas" onclick="showVista('brigadas')"
          class="vista-btn flex items-center gap-2.5 text-left p-3 rounded-md-plus bg-white text-gris-medio shadow-soft transition-colors">
          <span class="icon-wrap w-8 h-8 shrink-0 rounded-lg bg-verde-suave flex items-center justify-center">
            <svg class="w-4 h-4 text-verde-oscuro" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-3.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"/>
            </svg>
          </span>
          <span class="min-w-0">
            <span class="block text-[10px] sm:text-[11px] uppercase text-gris-medio font-medium">Sección</span>
            <span class="block text-xs sm:text-sm font-bold mt-0.5">Brigadas Trabajadas</span>
          </span>
        </button>
      </div>

    </div>
    <!-- fin wrapper max-w-5xl -->

    <!-- ══ PANEL: DETALLE DE JORNADAS ══ -->
    <div id="panel-nomina" class="vista-panel">

      <div class="max-w-2xl lg:max-w-none mx-auto flex items-center justify-between mb-3 px-1">
        <h3 class="font-bold text-verde-oscuro text-sm sm:text-base uppercase tracking-wide">Detalle de Jornadas y Deducciones</h3>
        <span id="conteo-filtro" class="text-xs text-gris-medio"></span>
      </div>

      <!-- Filtros -->
      <div class="max-w-2xl lg:max-w-none mx-auto grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3" id="filtros">
        <button data-filtro="todos" onclick="filtrar('todos')"
          class="filtro-btn flex items-center gap-2.5 text-left p-3 rounded-md-plus bg-verde-medio text-white shadow-soft transition-colors">
          <span class="icon-wrap w-8 h-8 shrink-0 rounded-lg fondo-sobre-oscuro-fuerte flex items-center justify-center">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </span>
          <span class="min-w-0">
            <span class="block text-[11px] uppercase opacity-80 font-medium">Vista</span>
            <span class="block text-sm font-bold mt-0.5">Nómina por día</span>
          </span>
        </button>
        <button data-filtro="prestamo" onclick="filtrar('prestamo')"
          class="filtro-btn flex items-center gap-2.5 text-left p-3 rounded-md-plus bg-white text-gris-medio border border-slate-200 shadow-soft transition-colors">
          <span class="icon-wrap w-8 h-8 shrink-0 rounded-lg bg-verde-suave flex items-center justify-center">
            <svg class="w-4 h-4 text-verde-medio" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.66 0-3 .9-3 2s1.34 2 3 2 3 .9 3 2-1.34 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 10v2m0-12a4 4 0 100 8 4 4 0 000-8z"/>
            </svg>
          </span>
          <span class="min-w-0">
            <span class="block text-[11px] uppercase text-gris-medio font-medium">Observar</span>
            <span class="block text-sm font-bold mt-0.5">Préstamos</span>
          </span>
        </button>
        <button data-filtro="descuento" onclick="filtrar('descuento')"
          class="filtro-btn flex items-center gap-2.5 text-left p-3 rounded-md-plus bg-white text-gris-medio border border-slate-200 shadow-soft transition-colors">
          <span class="icon-wrap w-8 h-8 shrink-0 rounded-lg bg-verde-suave flex items-center justify-center">
            <svg class="w-4 h-4 text-verde-medio" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h.01M15 12h.01M12 3a9 9 0 100 18 9 9 0 000-18z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 15l8-8"/>
            </svg>
          </span>
          <span class="min-w-0">
            <span class="block text-[11px] uppercase text-gris-medio font-medium">Observar</span>
            <span class="block text-sm font-bold mt-0.5">Descuentos</span>
          </span>
        </button>
        <button data-filtro="aff" onclick="filtrar('aff')"
          class="filtro-btn flex items-center gap-2.5 text-left p-3 rounded-md-plus bg-white text-gris-medio border border-slate-200 shadow-soft transition-colors">
          <span class="icon-wrap w-8 h-8 shrink-0 rounded-lg bg-verde-suave flex items-center justify-center">
            <svg class="w-4 h-4 text-verde-medio" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-3.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4"/>
            </svg>
          </span>
          <span class="min-w-0">
            <span class="block text-[11px] uppercase text-gris-medio font-medium">Observar</span>
            <span class="block text-sm font-bold mt-0.5">Afiliaciones</span>
          </span>
        </button>
      </div>

      <!-- Tabla de movimientos -->
      <div class="max-w-2xl lg:max-w-none mx-auto bg-white rounded-md-plus shadow-card overflow-x-auto border border-slate-200">
        <table class="w-full text-[11px] sm:text-xs">
          <thead>
            <tr class="bg-verde-oscuro text-white text-[10px] sm:text-[11px] uppercase tracking-wide">
              <th class="px-3 py-2.5 text-left font-semibold whitespace-nowrap">Fecha</th>
              <th class="px-3 py-2.5 text-left font-semibold whitespace-nowrap">Municipio</th>
              <th class="px-3 py-2.5 text-left font-semibold whitespace-nowrap">Coordinador</th>
              <th class="px-3 py-2.5 text-center font-semibold whitespace-nowrap">N° Aff</th>
              <th class="px-3 py-2.5 text-center font-semibold whitespace-nowrap">N° Brig</th>
              <th class="px-3 py-2.5 text-right font-semibold whitespace-nowrap">Comida/Med</th>
              <th class="px-3 py-2.5 text-right font-semibold whitespace-nowrap">Prést/Adel</th>
              <th class="px-3 py-2.5 text-right font-semibold whitespace-nowrap">Descuento</th>
              <th class="px-3 py-2.5 text-left font-semibold w-full">Detalle</th>
            </tr>
          </thead>
          <tbody id="res-tabla"></tbody>
        </table>
      </div>
    </div>

    <!-- ══ PANEL: VENTA DE LENTES ══ -->
    <div id="panel-lentes" class="vista-panel hidden max-w-2xl lg:max-w-5xl mx-auto">
      <div class="bg-white rounded-md-plus shadow-card p-6 text-center fade-in border border-slate-200">
        <span class="block text-xs uppercase tracking-wide text-gris-medio font-medium mb-1">Venta de Lentes</span>
        <strong id="res-lent-detalle" class="block text-4xl font-extrabold text-verde-oscuro">0</strong>
        <p class="text-gris-medio text-xs mt-2">Total de lentes vendidos en el periodo de liquidación.</p>
      </div>
      <div id="lentes-tabla-wrap" class="hidden mt-3 bg-white rounded-md-plus shadow-card overflow-x-auto border border-slate-200">
        <table class="w-full text-xs sm:text-sm">
          <thead>
            <tr class="bg-verde-oscuro text-white text-[10px] sm:text-[11px] uppercase tracking-wide">
              <th class="px-3 py-2.5 text-left font-semibold whitespace-nowrap">Fecha</th>
              <th class="px-3 py-2.5 text-left font-semibold whitespace-nowrap">Municipio</th>
              <th class="px-3 py-2.5 text-center font-semibold whitespace-nowrap">C. Prom.</th>
              <th class="px-3 py-2.5 text-center font-semibold whitespace-nowrap">Asist.</th>
              <th class="px-3 py-2.5 text-center font-semibold whitespace-nowrap">Lente Especial</th>
              <th class="px-3 py-2.5 text-center font-semibold whitespace-nowrap">Lente Sencillo</th>
              <th class="px-3 py-2.5 text-right font-semibold whitespace-nowrap">Total Venta</th>
            </tr>
          </thead>
          <tbody id="res-tabla-lentes"></tbody>
        </table>
      </div>
    </div>

    <!-- ══ PANEL: BRIGADAS TRABAJADAS ══ -->
    <div id="panel-brigadas" class="vista-panel hidden">
      <div class="max-w-2xl lg:max-w-5xl mx-auto bg-white rounded-md-plus shadow-card p-6 text-center fade-in mb-3 border border-slate-200">
        <span class="block text-xs uppercase tracking-wide text-gris-medio font-medium mb-1">Total Brigadas Trabajadas</span>
        <strong id="res-total-brigadas" class="block text-4xl font-extrabold text-verde-oscuro">0</strong>
        <p class="text-gris-medio text-xs mt-2">Municipios con jornada de brigada registrada.</p>
      </div>
      <div class="max-w-2xl lg:max-w-5xl mx-auto bg-white rounded-md-plus shadow-card overflow-x-auto border border-slate-200">
        <table class="w-full text-xs sm:text-sm">
          <thead>
            <tr class="bg-verde-oscuro text-white text-[10px] sm:text-[11px] uppercase tracking-wide">
              <th class="px-3 py-2.5 text-left font-semibold whitespace-nowrap">Fecha</th>
              <th class="px-3 py-2.5 text-left font-semibold whitespace-nowrap">Municipio</th>
              <th class="px-3 py-2.5 text-left font-semibold whitespace-nowrap">Coordinador</th>
              <th class="px-3 py-2.5 text-center font-semibold whitespace-nowrap">N° Brigada</th>
              <th class="px-3 py-2.5 text-center font-semibold whitespace-nowrap">Estatus</th>
            </tr>
          </thead>
          <tbody id="res-tabla-brigadas"></tbody>
        </table>
      </div>
    </div>

    <!-- ══ PIE DE PÁGINA INSTITUCIONAL ══ -->
    <div class="max-w-2xl lg:max-w-5xl mx-auto mt-4 rounded-md-plus overflow-hidden bg-verde-oscuro fade-in">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-3 text-white text-[10px] sm:text-xs text-center sm:text-left">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          <span>Salud visual para todos, a tu alcance.</span>
        </div>
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>Comprometidos con tu bienestar visual.</span>
        </div>
      </div>
    </div>

  </div>
  <!-- fin #resultado -->

</div>
<!-- fin contenedor principal -->
