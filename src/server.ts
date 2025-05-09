import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    `Servidor rodando na porta ${PORT}`
})