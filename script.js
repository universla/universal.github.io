
// script.js
let currentUser = null;
let posts = [];

// Iniciar sesión
function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (username && password) {
    currentUser = username;
    localStorage.setItem("currentUser", currentUser);
    alert("Inicio de sesión exitoso");
    window.location.href = "index.html";
  } else {
    alert("Ingresa usuario y contraseña");
  }
}

// Registro
function register() {
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;
  const terms = document.getElementById("terms").checked;

  if (!terms) {
    alert("Debes aceptar los términos de contenido");
    return;
  }

  if (username && password) {
    localStorage.setItem("user_" + username, JSON.stringify({ password }));
    alert("Registro exitoso");
    window.location.href = "login.html";
  } else {
    alert("Ingresa usuario y contraseña");
  }
}

// Cargar sesión
function loadSession() {
  currentUser = localStorage.getItem("currentUser");
  if (!currentUser) window.location.href = "login.html";
  else document.getElementById("username").innerText = currentUser;
}

// Cerrar sesión
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// Publicar
document.getElementById("post-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const content = document.getElementById("post-content").value;
  const media = document.getElementById("post-media").files[0];
  const mediaURL = media ? URL.createObjectURL(media) : null;

  const post = {
    user: currentUser,
    content,
    media: mediaURL,
    comments: [],
    timestamp: new Date().toISOString()
  };

  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
  renderFeed();
  this.reset();
});

// Renderizar feed
function renderFeed() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";
  posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.forEach((post, index) => {
    const div = document.createElement("div");
    div.className = "post glitch";

    div.innerHTML = `
      <strong>${post.user}</strong><br>
      <p>${post.content}</p>
      ${post.media ? `<img src="${post.media}" alt="Media" style="width:100%;max-width:400px;">` : ""}
      
      <div class="comments">
        <h4>Comentarios</h4>
        <ul id="comments-${index}"></ul>
        <form class="comment-form" data-index="${index}">
          <input type="text" placeholder="Escribe un comentario..." required />
          <button type="submit">Comentar</button>
        </form>
      </div>

      ${currentUser === "admin" ? `<button onclick="deletePost(${index})">Eliminar</button>` : ""}
    `;

    const commentsList = div.querySelector(`#comments-${index}`);
    post.comments.forEach(comment => {
      const li = document.createElement("li");
      li.textContent = comment;
      commentsList.appendChild(li);
    });

    const form = div.querySelector(".comment-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const commentInput = this.querySelector("input");
      const commentText = commentInput.value;
      if (commentText) {
        post.comments.push(`${currentUser}: ${commentText}`);
        localStorage.setItem("posts", JSON.stringify(posts));
        renderFeed();
      }
    });

    feed.appendChild(div);
  });
}

// Eliminar publicación (solo admin)
function deletePost(index) {
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
  renderFeed();
}

// Cargar avatar glitch
function generateGlitchAvatar() {
  const canvas = document.getElementById("avatar");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#0f0";
  ctx.fillRect(0, 0, 100, 100);
  ctx.fillStyle = "#f0f";
  ctx.fillText(currentUser.charAt(0).toUpperCase(), 40, 60);
  // Aquí puedes añadir efectos de glitch con librerías o manualmente
}
