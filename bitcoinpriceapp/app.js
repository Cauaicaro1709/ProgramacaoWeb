const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const port = 3000;

// Configuração do template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para log de acesso
app.use((req, res, next) => {
  const data = new Date();
  console.log(`Acesso em ${req.url} às ${data.toLocaleString()}`);
  next();
});

// Rota para exibir os preços do Bitcoin em diferentes moedas
app.get("/:currency", async (req, res) => {
  const { currency } = req.params;
  const allowedCurrencies = ["USD", "EUR", "GBP"];
  
  if (!allowedCurrencies.includes(currency.toUpperCase())) {
    // Renderizar página de erro
    return res.status(404).render("error", {
      message: `A moeda "${currency}" não é suportada.`,
    });
  }

  try {
    const response = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");
    const data = response.data;

    res.render("index", {
      currency: currency.toUpperCase(),
      rate: data.bpi[currency.toUpperCase()].rate,
      updated: data.time.updated,
      disclaimer: data.disclaimer,
    });
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    res.status(500).send("Erro ao buscar dados da API.");
  }
});

// Rota para páginas não encontradas
app.get("*", (req, res) => {
  res.status(404).render("error", {
    message: "A página solicitada não existe.",
  });
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
