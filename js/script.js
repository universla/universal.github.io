document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Validación básica (ejemplo)
  if (username === 'admin' && password === '1234') {
    // Guardamos el nombre de usuario
    localStorage.setItem('user', username);

    // Redirigimos a home.html
    window.location.href = 'home.html';
  } else {
    alert('Usuario o contraseña incorrectos');
  }
});
