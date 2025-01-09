const express = require('express'); // Importa o Express
const app = express(); // Inicializa o aplicativo
const PORT = 3000; // Porta do servidor

// Middleware para suporte a caracteres especiais e JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Versão 1: Saudação básica
app.get('/', (req, res) => {
    res.send('Hello, World!'); // Retorna "Hello, World!" na rota /
});

// Versão 2: Saudação personalizada
app.get('/v2/:name', (req, res) => {
    res.send(`Hello, ${req.params.name}`); // Retorna "Hello, [name]" na rota /v2/:name
});

// Versão 2 com saída JSON
app.get('/v2/:name/json', (req, res) => {
    res.json({ msg: `Hello, ${req.params.name}` }); // Retorna JSON com saudação personalizada
});

// Versão 3: Saudação bilíngue
app.get('/v3/:name/:lang', (req, res) => {
    const { name, lang } = req.params;

    // Mensagens em diferentes idiomas
    const messages = {
        'pt-br': `Olá, ${name}`,
        'en': `Hello, ${name}`,
        'es': `Hola, ${name}`,
    };

    // Verifica se o idioma está suportado
    if (messages[lang]) {
        res.json({ msg: messages[lang] });
    } else {
        res.status(400).json({ error: 'Idioma não suportado' }); // Retorna erro para idioma inválido
    }
});

// Tratamento de erro para endpoints inválidos
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint inválido' }); // Retorna erro 404 para rota inexistente
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
