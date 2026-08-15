/* ============================================================
   LOGIN.JS — Logica de la pantalla de acceso administrativo
   Modulo Administracion · Optica Vision de Aguila

   Responsabilidad unica: validar credenciales contra ADMIN_AUTH
   (definido en config/auth.js) y delegar la carga de la shell
   al router principal via mostrarModulo().

   No implementa sesiones, JWT ni almacenamiento persistente.
   Completamente reemplazable sin afectar otros modulos.
   ============================================================ */

/**
 * Maneja el submit del formulario de login.
 * @param {Event} e
 */
function adminLoginSubmit(e) {
  e.preventDefault();

  var usuario  = document.getElementById('admin-usuario').value.trim();
  var password = document.getElementById('admin-password').value;
  var errorEl  = document.getElementById('admin-login-error');
  var btnText  = document.getElementById('admin-btn-login-text');
  var spinner  = document.getElementById('admin-btn-login-spinner');
  var btn      = document.getElementById('admin-btn-login');

  // Ocultar error previo
  errorEl.classList.remove('visible');

  if (!usuario || !password) {
    errorEl.classList.add('visible');
    return;
  }

  // Simular delay visual (UX)
  btnText.textContent = 'Verificando...';
  spinner.classList.remove('hidden');
  btn.disabled = true;

  setTimeout(function () {
    // Validar contra credenciales del archivo de configuracion
    if (usuario === ADMIN_AUTH.usuario && password === ADMIN_AUTH.password) {
      // Acceso concedido: cargar la shell administrativa
      mostrarModulo('administracion');
    } else {
      // Acceso denegado
      errorEl.classList.add('visible');
      btnText.textContent = 'Ingresar';
      spinner.classList.add('hidden');
      btn.disabled = false;
      // Limpiar contrasena por seguridad
      document.getElementById('admin-password').value = '';
      document.getElementById('admin-password').focus();
    }
  }, 500);
}

/**
 * Alterna la visibilidad de la contrasena.
 */
function adminTogglePassword() {
  var input = document.getElementById('admin-password');
  input.type = input.type === 'password' ? 'text' : 'password';
}

/**
 * Vuelve al landing principal de la SPA.
 */
function adminVolverLanding() {
  document.getElementById('app-container').classList.add('hidden');
  document.getElementById('landing-bienvenida').classList.remove('hidden');
}

// Autofocus en el campo usuario al cargar
(function () {
  var u = document.getElementById('admin-usuario');
  if (u) u.focus();
})();
