<link rel="stylesheet" href="administracion/styles/admin.css">

<div class="min-h-screen w-full flex items-center justify-center px-4 py-10"
     style="background: linear-gradient(135deg, rgb(12,45,72) 0%, rgb(12,45,72) 50%, rgb(12,45,72) 100%);">

  <div class="admin-login-card fade-in">

    <!-- Logo y título -->
    <div class="text-center mb-8">
      <img src="https://raw.githubusercontent.com/Soportekgservices/Visiondeaguila/10a459ffeafcfcedfcade0f0a2700b330668e52c/LOGO%20AGUILA%20VISION%202025%20(1).png"
           class="mx-auto w-20 mb-4" alt="Logo">
      <h1 class="text-verde-oscuro font-bold text-xl leading-tight">Panel Administrativo</h1>
      <p class="text-slate-400 text-sm mt-1">Optica Vision de Aguila</p>
    </div>

    <!-- Formulario -->
    <form id="admin-login-form" onsubmit="adminLoginSubmit(event)" novalidate>

      <!-- Error -->
      <div id="admin-login-error" class="admin-login-error mb-4">
        Usuario o contrasena incorrectos.
      </div>

      <!-- Usuario -->
      <div class="mb-4">
        <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          Usuario
        </label>
        <input type="text" id="admin-usuario" class="admin-input"
               placeholder="Ingresa tu usuario" autocomplete="username">
      </div>

      <!-- Contrasena -->
      <div class="mb-6">
        <label class="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
          Contrasena
        </label>
        <div class="relative">
          <input type="password" id="admin-password" class="admin-input pr-10"
                 placeholder="Ingresa tu contrasena" autocomplete="current-password">
          <button type="button" onclick="adminTogglePassword()"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabindex="-1">
            <svg id="admin-eye-icon" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Boton -->
      <button type="submit" id="admin-btn-login" class="admin-btn-primary">
        <span id="admin-btn-login-text">Ingresar</span>
        <span id="admin-btn-login-spinner" class="hidden inline-block ml-2 w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              style="animation: spin .7s linear infinite; vertical-align: middle;"></span>
      </button>

    </form>

    <!-- Footer -->
    <div class="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
      <button onclick="adminVolverLanding()"
              class="text-xs text-slate-400 hover:text-verde-oscuro transition-colors flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Volver al inicio
      </button>
      <span class="text-[10px] text-slate-300">v5.0 Admin</span>
    </div>

  </div>
</div>
