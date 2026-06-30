const crypto = require('crypto');

const SECRET = process.env.JWT_SECRET || 'SEGREDO_SUPER_SECRETAMENTE_SECRETO';

function base64Url(input) {
    return Buffer.from(JSON.stringify(input)).toString('base64url');
}

function assinar(conteudo) {
    return crypto
        .createHmac('sha256', SECRET)
        .update(conteudo)
        .digest('base64url');
}

function criarToken(user) {
    const header = base64Url({ alg: 'HS256', typ: 'JWT' });
    const payload = base64Url({
        ...user,
        exp: Date.now() + 60 * 60 * 1000
    });
    const assinatura = assinar(`${header}.${payload}`);

    return `${header}.${payload}.${assinatura}`;
}

function verificarToken(token) {
    if (!token) {
        throw new Error('Token não informado!');
    }

    const [header, payload, assinatura] = token.split('.');
    const assinaturaEsperada = assinar(`${header}.${payload}`);

    if (assinatura !== assinaturaEsperada) {
        throw new Error('Token invalido.');
    }

    const dados = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));

    if (dados.exp < Date.now()) {
        throw new Error('Token expirado.');
    }

    return dados;
}

module.exports = { criarToken, verificarToken };