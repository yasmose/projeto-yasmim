require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
//const forumRoutes = require('./routes/forumRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API funcionando!' });

});

app.use('/auth', authRoutes);
//app.use('/forum', forumRoutes);

//iniciando o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT} e operante`);
});
