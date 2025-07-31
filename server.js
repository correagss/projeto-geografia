const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views', 'index.html'));
});

app.get('/sobre', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/views', 'sobre.html'));
});

app.get('/tempo', async (req, res) => {
  try {
    const cidade = req.query.cidade;
    if (!cidade) {
      return res.status(400).json({ message: 'O nome da cidade é obrigatório!' });
    }
    const apiKey = '28d11bd851fe59bf90f5c18baafd7a4e'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;
    const respostaDaAPI = await axios.get(url);
    res.json(respostaDaAPI.data);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ message: 'Cidade não encontrada.'});
    } else {
      console.error("Erro ao buscar dados do tempo:", error.message);
      res.status(500).json({ message: 'Erro interno no servidor.' });
    }
  }
});

app.use(express.static(path.join(__dirname, 'src')));


app.listen(port, () => {
  console.log(`Nosso servidor está no ar na porta ${port}. Acesse http://localhost:${port}`);
});