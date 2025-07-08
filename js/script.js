document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Aquí validamos el usuario y contraseña (ejemplo básico)
  if (username === 'admin' && password === '1234') {
    window.location.href = 'home.html';
  } else {
    alert('Usuario o contraseña incorrectos');
  }
});
