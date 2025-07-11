
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Ruta para manejar el login
app.get('/auth', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("No se recibió el código de autorización.");
  }

  try {
    // Intercambiar el code por access_token
    const response = await axios.post('https://discord.com/api/oauth2/token ', null, {
      params: {
        client_id: "1392829126372622420", // Reemplaza con tu Client ID
        client_secret: process.env.DISCORD_SECRET, // Guarda tu secret como variable de entorno en Glitch
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'https://tu-proyecto.glitch.me/auth '
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token } = response.data;

    // Obtener información del usuario
    const userResponse = await axios.get('https://discord.com/api/users/ @me', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    const user = userResponse.data;

    // Mostrar la información del usuario
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>Usuario autenticado</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f4f6f8;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
          }

          .container {
            max-width: 500px;
            padding: 2rem;
            background: white;
            border-radius: 16px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
          }

          .user-card {
            display: flex;
            align-items: center;
            gap: 1rem;
            justify-content: center;
          }

          .user-card img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 2px solid #007acc;
          }

          .user-details {
            text-align: left;
          }

          .user-details h3 {
            font-size: 1.5rem;
            color: #333;
          }

          .user-details p {
            font-size: 1rem;
            color: #555;
            margin: 0.5rem 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Usuario autenticado</h2>
          <div class="user-card">
            <img src="https://cdn.discordapp.com/avatars/ ${user.id}/${user.avatar}.png" alt="Avatar de usuario" />
            <div class="user-details">
              <h3>${user.username}</h3>
              <p>ID: ${user.id}</p>
              <p>Rol: Administrador</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al iniciar sesión con Discord");
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
