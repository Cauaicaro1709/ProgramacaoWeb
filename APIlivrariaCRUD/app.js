// Importar as dependências
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Banco de dados simulado
let livros = [
    { id: 1, titulo: 'Livro A', autor: 'Autor X', editora: 'Editora A', ano: 2020, quant: 10, preco: 50.0 },
    { id: 2, titulo: 'Livro B', autor: 'Autor Y', editora: 'Editora B', ano: 2018, quant: 0, preco: 40.0 },
    { id: 3, titulo: 'Livro C', autor: 'Autor Z', editora: 'Editora A', ano: 2021, quant: 5, preco: 60.0 }
];

// CREATE: Adicionar um novo livro
app.post('/livros', (req, res) => {
    const { id, titulo, autor, editora, ano, quant, preco } = req.body;
    if (livros.find(livro => livro.id === id)) {
        return res.status(400).json({ error: 'ID já existe.' });
    }
    livros.push({ id, titulo, autor, editora, ano, quant, preco });
    res.status(201).json({ message: 'Livro adicionado com sucesso!' });
});

// READ: Buscar todos os livros
app.get('/livros', (req, res) => {
    res.status(200).json(livros);
});

// READ: Buscar um livro por ID
app.get('/livros/:id', (req, res) => {
    const livro = livros.find(l => l.id === parseInt(req.params.id));
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado.' });
    res.status(200).json(livro);
});

// UPDATE: Atualizar informações de um livro
app.put('/livros/:id', (req, res) => {
    const livro = livros.find(l => l.id === parseInt(req.params.id));
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado.' });

    const { titulo, autor, editora, ano, quant, preco } = req.body;
    if (titulo) livro.titulo = titulo;
    if (autor) livro.autor = autor;
    if (editora) livro.editora = editora;
    if (ano) livro.ano = ano;
    if (quant) livro.quant = quant;
    if (preco) livro.preco = preco;

    res.status(200).json({ message: 'Livro atualizado com sucesso!', livro });
});

// DELETE: Remover um livro por ID
app.delete('/livros/:id', (req, res) => {
    const index = livros.findIndex(l => l.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Livro não encontrado.' });

    livros.splice(index, 1);
    res.status(204).send();
});

// Buscar livros por editora
app.get('/livros/editora/:editora', (req, res) => {
    const resultado = livros.filter(livro => livro.editora === req.params.editora);
    res.status(200).json(resultado);
});

// Buscar livros por palavra-chave no título
app.get('/livros/titulo/:keyword', (req, res) => {
    const resultado = livros.filter(livro => livro.titulo.toLowerCase().includes(req.params.keyword.toLowerCase()));
    res.status(200).json(resultado);
});

// Buscar livros acima de um preço específico
app.get('/livros/acima/:preco', (req, res) => {
    const resultado = livros.filter(livro => livro.preco > parseFloat(req.params.preco));
    res.status(200).json(resultado);
});

// Buscar livros abaixo de um preço específico
app.get('/livros/abaixo/:preco', (req, res) => {
    const resultado = livros.filter(livro => livro.preco < parseFloat(req.params.preco));
    res.status(200).json(resultado);
});

// Buscar livros mais recentes
app.get('/livros/recentes', (req, res) => {
    const recente = Math.max(...livros.map(livro => livro.ano));
    const resultado = livros.filter(livro => livro.ano === recente);
    res.status(200).json(resultado);
});

// Buscar livros mais antigos
app.get('/livros/antigos', (req, res) => {
    const antigo = Math.min(...livros.map(livro => livro.ano));
    const resultado = livros.filter(livro => livro.ano === antigo);
    res.status(200).json(resultado);
});

// Buscar livros sem estoque
app.get('/livros/semestoque', (req, res) => {
    const resultado = livros.filter(livro => livro.quant === 0);
    res.status(200).json(resultado);
});

// Endpoint inexistente
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint não encontrado.' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
