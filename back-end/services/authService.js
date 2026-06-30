const crypto = require('crypto');
const { criarToken } = require('./tokenService');

const SALT = process.env.PASSWORD_SALT || 'SALT_DO_PROJETO_WEB';
const userDB = [];

function salgaSenha(senha) {
    return crypto
        .createHash('sha256')
        .update(`${senha}:${SALT}`)
        .digest('hex');
}

exports.registrarUsuario = async (dados) => {
    const { nome, cpf, email, senha, confirmaSenha, serie } = dados;

    if (!nome || !cpf || !email || !senha || !confirmaSenha || !serie) {
        throw new Error('Todos os campos sao obrigatorios!');
    }

    if (senha !== confirmaSenha) {
        throw new Error('As senhas devem ser iguais!');
    }

    if (!['1', '2', '3'].includes(serie)) {
        throw new Error('Escolha uma serie valida!');
    }

    const userExists = userDB.find(user => user.email === email || user.cpf === cpf);

    if (userExists) {
        throw new Error('E-mail ou CPF já cadastrados!');
    }

    const novoUsuario = {
        id: Date.now().toString() + userDB.length.toString(),
        nome,
        cpf,
        email,
        serie,
        senha: salgaSenha(senha)
    };

    userDB.push(novoUsuario);

    const user = {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        serie: novoUsuario.serie
    };

    return {
        token: criarToken(user),
        user
    };
};

exports.fazerLogin = async (dados) => {
    const { email, senha } = dados;

    if (!email || !senha) {
        throw new Error('E-mail e senha são obrigatorios!');
    }

    const usuario = userDB.find(user => user.email === email);

    if (!usuario || salgaSenha(senha) !== usuario.senha) {
        throw new Error('E-mail ou senha invalidos');
    }

    const user = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        serie: usuario.serie
    };

    return {
        token: criarToken(user),
        user
    };
};