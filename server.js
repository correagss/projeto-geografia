
const express = require('express');
const path = require('path');


const app = express();


const port = 3000;

// ROTA PARA A PÁGINA SOBRE
app.get('/sobre', (req, res) => {
    res.sendFile(path.join(__dirname, 'sobre.html'));
});

app.use(express.static(__dirname));


app.listen(port, () => {
  console.log(`Nosso servidor está no ar na porta ${port}. Acesse http://localhost:${port}`);
});