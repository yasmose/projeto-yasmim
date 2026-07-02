import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function BookDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const livro = location.state?.livroSelecionado || {
    id: 0, titulo: "Livro não encontrado", autor: "Desconhecido", ano: "----", tema: "Nenhum", descricao: "Nenhuma descrição informada."
  };

  const [favorito, setFavorito] = useState(false);
  const [notaGeral, setNotaGeral] = useState(0); 
  const [avaliacoes, setAvaliacoes] = useState([]);
  
  const [novaNota, setNovaNota] = useState(5);
  const [novoComentario, setNovoComentario] = useState('');
  const [jaAvaliou, setJaAvaliou] = useState(false);
  const [usuarioAtual, setUsuarioAtual] = useState('Visitante');

  useEffect(() => {
    //pega quem é o usuário logado pelo Token
    let nomeDoUsuario = 'Visitante';
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        nomeDoUsuario = payload.nome;
        setUsuarioAtual(nomeDoUsuario);
      } catch (error) {
        console.error("Erro ao ler token", error);
      }
    }

    const todosFavoritos = JSON.parse(localStorage.getItem('favoritos_biblioteca')) || [];
    const jaEstaFavoritado = todosFavoritos.some(fav => fav.usuario === nomeDoUsuario && fav.livro.id === livro.id);
    setFavorito(jaEstaFavoritado);

    //Buscar as avaliações salvas no navegador
    let todasAvaliacoes = JSON.parse(localStorage.getItem('avaliacoes_biblioteca'));
    
    //criamos avaliações falsas para os livros 1 e 2
    if (!todasAvaliacoes) {
      todasAvaliacoes = [
        { id: 101, bookId: 1, usuario: "João", nota: 5, texto: "Amei esse livro, muito legal!" },
        { id: 102, bookId: 1, usuario: "Maria", nota: 3, texto: "Não gostei muito... é OK." },
        { id: 103, bookId: 2, usuario: "Lucas", nota: 5, texto: "Achei muito interessante" }
      ];
      localStorage.setItem('avaliacoes_biblioteca', JSON.stringify(todasAvaliacoes));
    }

    const avaliacoesDoLivro = todasAvaliacoes.filter(av => av.bookId === livro.id);
    
    // As mais novas aparecem primeiro
    setAvaliacoes(avaliacoesDoLivro.reverse());

    //Verifica se o usuário já avaliou ESSE livro
    const usuarioJaFez = avaliacoesDoLivro.some(av => av.usuario === nomeDoUsuario);
    setJaAvaliou(usuarioJaFez);

    //média da nota geral
    if (avaliacoesDoLivro.length > 0) {
      const somaNotas = avaliacoesDoLivro.reduce((acumulador, av) => acumulador + av.nota, 0);
      setNotaGeral(Math.round(somaNotas / avaliacoesDoLivro.length));
    } else {
      setNotaGeral(0); // Fica 0 se não tiver avaliação
    }

  }, [livro.id]);

  const handleFavoritar = () => {
    const novoStatus = !favorito;
    setFavorito(novoStatus);

    let todosFavoritos = JSON.parse(localStorage.getItem('favoritos_biblioteca')) || [];

    if (novoStatus) {
      // Se curtiu, salva o livro e de quem é
      todosFavoritos.push({ usuario: usuarioAtual, livro: livro });
    } else {
      // Se descurtiu, filtra e remove o livro do usuário
      todosFavoritos = todosFavoritos.filter(fav => !(fav.usuario === usuarioAtual && fav.livro.id === livro.id));
    }
    
    localStorage.setItem('favoritos_biblioteca', JSON.stringify(todosFavoritos));
  };

  const handleAlugar = () => {
    const numeroWhatsApp = "5548999999999"; 
    const mensagem = `Olá! Tenho interesse em alugar o livro '${livro.titulo}'. Gostaria de saber mais informações.`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const handleEnviarAvaliacao = (e) => {
    e.preventDefault();
    if (!novoComentario || jaAvaliou) return;

    // Criamos a nova avaliação
    const novaAvaliacao = {
      id: Date.now(),
      bookId: livro.id, // vincula a avaliação ao ID do livro
      usuario: usuarioAtual, 
      nota: novaNota,
      texto: novoComentario
    };

    const todasAvaliacoes = JSON.parse(localStorage.getItem('avaliacoes_biblioteca')) || [];
    todasAvaliacoes.push(novaAvaliacao);
    localStorage.setItem('avaliacoes_biblioteca', JSON.stringify(todasAvaliacoes));

    const novaListaDoLivro = [novaAvaliacao, ...avaliacoes];
    setAvaliacoes(novaListaDoLivro);
    setJaAvaliou(true); // Bloqueia para não avaliar de novo

    const somaNotas = novaListaDoLivro.reduce((acumulador, av) => acumulador + av.nota, 0);
    setNotaGeral(Math.round(somaNotas / novaListaDoLivro.length));

    setNovoComentario("");
  };

  const renderEstrelas = (nota) => {
    if (nota === 0) return <span style={{ color: '#999', fontSize: '14px' }}>Nenhuma avaliação ainda</span>;
    return "⭐".repeat(nota) + "☆".repeat(5 - nota);
  };

  const styles = {
    container: { padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' },
    btnVoltar: { marginBottom: '20px', padding: '10px 15px', backgroundColor: '#eee', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' },
    topSection: { display: 'flex', gap: '40px', backgroundColor: '#fff', padding: '30px', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
    capaContainer: { flexShrink: 0 },
    capa: { width: '220px', height: '320px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', border: '1px solid #ddd' },
    infoContainer: { display: 'flex', flexDirection: 'column', flex: 1 },
    headerLivro: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
    titulo: { margin: '0 0 15px 0', fontSize: '28px', color: '#003366', fontWeight: 'bold' },
    btnFavorito: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px' },
    descricao: { fontSize: '15px', color: '#444', lineHeight: '1.6', marginBottom: '20px', textAlign: 'justify' },
    metaDados: { color: '#555', fontSize: '15px', margin: '3px 0' },
    btnAlugar: { marginTop: 'auto', width: '100%', padding: '15px', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: '0.3s', display: 'flex', justifyContent: 'center', gap: '8px' },
    bottomSection: { backgroundColor: '#fff', padding: '30px', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginTop: '20px' },
    notaGeralHeader: { fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' },
    tituloAvaliacoes: { fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#555' },
    comentarioItem: { marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px dashed #ddd' },
    nomeUsuario: { fontWeight: 'bold', color: '#0056b3', marginRight: '10px' },
    estrelasAvaliacao: { color: '#ffc107', letterSpacing: '2px' },
    textoComentario: { marginTop: '5px', color: '#444', fontStyle: 'italic' },
    formBox: { display: 'flex', gap: '10px', marginTop: '25px' },
    inputAvaliacao: { flex: 1, padding: '12px', border: '1px solid #0056b3', borderRadius: '8px', outline: 'none', fontSize: '15px' },
    selectNota: { padding: '10px', borderRadius: '8px', border: '1px solid #0056b3', outline: 'none' },
    btnEnviar: { backgroundColor: '#0056b3', color: 'white', border: 'none', padding: '0 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
    msgAvaliado: { marginTop: '25px', padding: '15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', border: '1px solid #c3e6cb' }
  };

  return (
    <div style={styles.container}>
      
      <button onClick={() => navigate('/home')} style={styles.btnVoltar}>
        ← Voltar
      </button>

      <div style={styles.topSection}>
        <div style={styles.capaContainer}>
          <img src={livro.capa} alt={`Capa de ${livro.titulo}`} style={styles.capa} />
        </div>

        <div style={styles.infoContainer}>
          <div style={styles.headerLivro}>
            <h1 style={styles.titulo}>{livro.titulo}</h1>
            <button onClick={handleFavoritar} style={styles.btnFavorito} title="Favoritar">
              {favorito ? "❤️" : "🤍"}
            </button>
          </div>

          <div style={styles.descricao}>
            {livro.descricao.split('\n\n').map((paragrafo, index) => (
              <p key={index} style={{ margin: '0 0 10px 0' }}>{paragrafo}</p>
            ))}
          </div>

          <div style={{ marginTop: '10px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <p style={styles.metaDados}><strong>Autor(a):</strong> {livro.autor}</p>
            <p style={styles.metaDados}><strong>Ano:</strong> {livro.ano}</p>
            <p style={styles.metaDados}><strong>Tema:</strong> {livro.tema}</p>
          </div>

          <button onClick={handleAlugar} style={styles.btnAlugar}>
            📱 QUERO ALUGAR NO WHATSAPP
          </button>
        </div>
      </div>

      <div style={styles.bottomSection}>
        <div style={styles.notaGeralHeader}>
          Nota geral: <span style={styles.estrelasAvaliacao}>{renderEstrelas(notaGeral)}</span>
        </div>

        <div style={styles.tituloAvaliacoes}>Avaliações:</div>

        <div>
          {avaliacoes.length === 0 ? (
            <p style={{ color: '#777', fontStyle: 'italic' }}>Ninguém avaliou este livro ainda. Seja o primeiro!</p>
          ) : (
            avaliacoes.map((av) => (
              <div key={av.id} style={styles.comentarioItem}>
                <div>
                  <span style={styles.nomeUsuario}>{av.usuario}</span>
                  <span style={styles.estrelasAvaliacao}>{renderEstrelas(av.nota)}</span>
                </div>
                <div style={styles.textoComentario}>{av.texto}</div>
              </div>
            ))
          )}
        </div>

        {!jaAvaliou ? (
          <form onSubmit={handleEnviarAvaliacao} style={styles.formBox}>
            <select value={novaNota} onChange={(e) => setNovaNota(Number(e.target.value))} style={styles.selectNota}>
              <option value="5">5 ⭐</option>
              <option value="4">4 ⭐</option>
              <option value="3">3 ⭐</option>
              <option value="2">2 ⭐</option>
              <option value="1">1 ⭐</option>
            </select>

            <input 
              type="text" placeholder="Deixe sua avaliação..." 
              value={novoComentario} onChange={(e) => setNovoComentario(e.target.value)}
              style={styles.inputAvaliacao} required
            />
            <button type="submit" style={styles.btnEnviar}>Enviar</button>
          </form>
        ) : (
          <div style={styles.msgAvaliado}>
            ✔️ Você já deixou sua avaliação para este livro. Obrigado!
          </div>
        )}
        
      </div>

    </div>
  );
}

export default BookDetailsPage;