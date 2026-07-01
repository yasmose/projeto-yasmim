const authService = require("../services/authService");

exports.register = async (req, res) => {
    try {
        const resultadoRegistro = await authService.registrarUsuario(req.body);

        res.status(201).json({
            message: `Seja bem-vindo, ${resultadoRegistro.user.nome}!`,
            token: resultadoRegistro.token,
            user: resultadoRegistro.user
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const resultadoLogin = await authService.fazerLogin(req.body);

        res.status(200).json({
            message: "Login bem-sucedido!",
            token :resultadoLogin.token,
            user: resultadoLogin.user
        });

    } catch (error) {
        const statusCode = error.message === "Email ou senha inválidos" ? 401 : 400;
        res.status(statusCode).json({ error: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        // O req.user.id vem do nosso middleware de autenticação (o token)
        const user = await authService.obterUsuario(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await authService.atualizarUsuario(req.user.id, req.body);
        res.status(200).json({ 
            message: "Cadastro atualizado com sucesso!", 
            user: updatedUser 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};