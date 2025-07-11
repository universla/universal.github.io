
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/auth', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('No se recibió el código de autorización.');
  }

  try {
    const response = await axios.post('https://discord.com/api/oauth2/token ', null, {
      params: {
        client_id: '1392829126372622420',
        client_secret: 'TU_CLIENT_SECRET',
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'http://localhost:3000/auth'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token } = response.data;

    const userResponse = await axios.get('https://discord.com/api/users/ @me', {
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    });

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Usuario autenticado</title>
      </head>
      <body>
        <h1>Usuario autenticado</h1>
        <p>Nombre: ${userResponse.data.username}</p>
        <p>ID: ${userResponse.data.id}</p>
        <p>Rol: Administrador</p>
        <img src="https://cdn.discordapp.com/avatars/ ${userResponse.data.id}/${userResponse.data.avatar}.png" alt="Avatar" />
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al iniciar sesión con Discord');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
