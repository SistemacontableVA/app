<link rel="stylesheet" href="administracion/styles/admin.css">

<div id="admin-shell">

  <!-- ══ SIDEBAR ══ -->
  <nav id="admin-sidebar" role="navigation" aria-label="Menu administrativo">

    <!-- Logo -->
    <div class="admin-sidebar-logo">
      <div class="flex items-center gap-3">
        <img src="https://github.com/Soportekgservices/Visiondeaguila/blob/10a459ffeafcfcedfcade0f0a2700b330668e52c/LOGO%20AGUILA%20VISION%202025%20(1).png?raw=true"
             class="w-8 h-8 object-contain" alt="Logo">
        <div>
          <div class="text-white font-bold text-sm leading-tight">Vision de Aguila</div>
          <div class="text-white/40 text-[10px]">Panel Administrativo</div>
        </div>
      </div>
    </div>

    <!-- Navegacion -->
    <div class="flex-1 py-2">

      <div class="admin-menu-section">Principal</div>

      <a class="admin-menu-item" data-ruta="dashboard" onclick="adminNavegar('dashboard')">
        <svg class="admin-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        <span>Dashboard</span>
      </a>

      <div class="admin-menu-section">Gestion</div>

      <a class="admin-menu-item" data-ruta="documentos" onclick="adminNavegar('documentos')">
        <svg class="admin-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <span>Documentos</span>
      </a>

      <a class="admin-menu-item" data-ruta="nominaPromotor" onclick="adminNavegar('nominaPromotor')">
        <svg class="admin-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 1.343-3 3v1h6v-1c0-1.657-1.343-3-3-3zm-4 4h8M7 16h10"/>
        </svg>
        <span>Nómina Promotor</span>
      </a>

      <a class="admin-menu-item" data-ruta="reportes" onclick="adminNavegar('reportes')">
        <svg class="admin-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
        <span>Reportes</span>
      </a>

      <div class="admin-menu-section">Sistema</div>

      <a class="admin-menu-item" data-ruta="catalogos" onclick="adminNavegar('catalogos')">
        <svg class="admin-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
        </svg>
        <span>Catalogos</span>
      </a>

      <a class="admin-menu-item" data-ruta="configuracion" onclick="adminNavegar('configuracion')">
        <svg class="admin-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        <span>Configuracion</span>
      </a>

    </div>

    <!-- Footer: usuario + logout -->
    <div class="admin-sidebar-footer">
      <div class="flex items-center gap-2 mb-3">
        <div class="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">A</div>
        <div class="min-w-0">
          <div class="text-white text-xs font-semibold truncate">Administrador</div>
          <div class="text-white/40 text-[10px]">admin</div>
        </div>
      </div>
      <button onclick="adminLogout()"
              class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/5 transition-colors text-xs">
        <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
        Cerrar sesion
      </button>
    </div>

  </nav>
  <!-- fin sidebar -->

  <!-- ══ MAIN WRAPPER ══ -->
  <div id="admin-main-wrapper">

    <!-- Topbar -->
    <header id="admin-topbar">
      <div class="flex items-center gap-3">
        <h2 id="admin-topbar-titulo" class="text-verde-oscuro font-semibold text-sm sm:text-base">Dashboard</h2>
        <span id="admin-topbar-badge"
              class="hidden text-[10px] font-semibold px-2 py-0.5 rounded-full bg-verde-suave text-verde-oscuro">
        </span>
      </div>
      <div class="flex items-center gap-3">
        <span class="text-slate-400 text-xs hidden sm:block">Optica Vision de Aguila</span>
        <div class="w-7 h-7 rounded-full bg-verde-suave flex items-center justify-center text-verde-oscuro text-xs font-bold">A</div>
      </div>
    </header>

    <!-- Contenido dinamico -->
    <main id="admin-content" role="main" aria-live="polite">
      <div class="flex items-center justify-center h-40">
        <div class="spinner"></div>
      </div>
    </main>

  </div>
  <!-- fin main wrapper -->

</div>
<!-- fin admin-shell -->
