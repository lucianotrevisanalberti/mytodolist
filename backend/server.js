const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// --- API ---
let tarefas = [
  { id: 1, nome: 'Estudar Node.js' },
  { id: 2, nome: 'Aprender React' },
];

app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});

app.post('/tarefas', (req, res) => {
  const nova = { id: tarefas.length + 1, nome: req.body.nome };
  tarefas.push(nova);
  res.json(nova);
});

app.delete("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  tarefas = tarefas.filter((t) => t.id !== id);
  res.status(204).send(); // 204 = No Content
});

// --- FRONT-END BUILD ---
// Isto serve o build do React pela mesma porta do Node
// app.use(express.static(path.join(__dirname, 'client/build')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// --- INICIA SERVIDOR ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
