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
    if (nota === 0) return <span style={{ color: '#999', fontSize: '14px', fontWeight: '500' }}>Nenhuma avaliação ainda</span>;
    return "⭐".repeat(nota) + "☆".repeat(5 - nota);
  };

  const styles = {
    pageBackground: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f6f9fc 0%, #e9f0f5 100%)',
      fontFamily: "'Montserrat', sans-serif",
      padding: '40px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    container: { width: '100%', maxWidth: '900px' },
    btnVoltar: { 
      marginBottom: '25px', padding: '10px 20px', backgroundColor: '#ffffff', color: '#0056b3', 
      border: '1px solid #cce5ff', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', 
      display: 'inline-flex', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', transition: 'all 0.2s ease' 
    },
    topSection: { 
      display: 'flex', gap: '40px', backgroundColor: '#ffffff', padding: '40px', 
      borderRadius: '16px', border: '1px solid #e1e8ed', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', flexWrap: 'wrap' 
    },
    capaContainer: { flexShrink: 0, margin: '0 auto' },
    capa: { width: '240px', height: '350px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 12px 25px rgba(0,0,0,0.15)', border: '1px solid #eee' },
    infoContainer: { display: 'flex', flexDirection: 'column', flex: 1, minWidth: '300px' },
    headerLivro: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px' },
    titulo: { margin: '0 0 15px 0', fontSize: '32px', color: '#003366', fontWeight: '700' },
    btnFavorito: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '28px', transition: 'transform 0.2s ease', padding: '0' },
    descricao: { fontSize: '15px', color: '#495057', lineHeight: '1.7', marginBottom: '25px', textAlign: 'justify' },
    infoBox: { marginTop: '10px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '12px', border: '1px solid #e9ecef' },
    metaDados: { color: '#495057', fontSize: '14px', margin: '6px 0', fontWeight: '500' },
    btnAlugar: { 
      marginTop: '25px', width: '100%', padding: '16px', backgroundColor: '#25D366', color: 'white', 
      border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', fontSize: '16px', 
      transition: 'all 0.3s ease', display: 'flex', justifyContent: 'center', alignItems: 'center', 
      gap: '8px', boxShadow: '0 6px 15px rgba(37, 211, 102, 0.3)' 
    },
    bottomSection: { 
      backgroundColor: '#ffffff', padding: '40px', borderRadius: '16px', border: '1px solid #e1e8ed', 
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)', marginTop: '30px' 
    },
    notaGeralHeader: { fontSize: '22px', fontWeight: '700', marginBottom: '25px', color: '#333', display: 'flex', alignItems: 'center', gap: '10px' },
    tituloAvaliacoes: { fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#0056b3' },
    comentarioItem: { marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f1f3f5' },
    nomeUsuario: { fontWeight: '700', color: '#ff8c00', marginRight: '10px', fontSize: '15px' },
    estrelasAvaliacao: { color: '#ffc107', letterSpacing: '2px', fontSize: '16px' },
    textoComentario: { marginTop: '8px', color: '#495057', fontStyle: 'italic', fontSize: '15px', lineHeight: '1.5' },
    formBox: { display: 'flex', gap: '15px', marginTop: '30px', alignItems: 'center', flexWrap: 'wrap' },
    selectNota: { padding: '12px 15px', borderRadius: '30px', border: '1px solid #ced4da', outline: 'none', fontFamily: "'Montserrat', sans-serif", fontSize: '15px', fontWeight: '600', color: '#495057', backgroundColor: '#f8f9fa' },
    inputAvaliacao: { flex: 1, minWidth: '200px', padding: '15px 25px', borderRadius: '30px', border: '1px solid #ced4da', outline: 'none', fontSize: '15px', fontFamily: "'Montserrat', sans-serif", backgroundColor: '#f8f9fa', transition: 'border-color 0.2s' },
    btnEnviar: { backgroundColor: '#0056b3', color: 'white', border: 'none', padding: '14px 30px', borderRadius: '30px', cursor: 'pointer', fontWeight: '700', fontSize: '15px', transition: 'all 0.2s ease', boxShadow: '0 4px 10px rgba(0, 86, 179, 0.2)' },
    msgAvaliado: { marginTop: '30px', padding: '15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '10px', textAlign: 'center', fontWeight: '600', border: '1px solid #c3e6cb' }
  };

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');`}
      </style>
      
      <div style={styles.pageBackground}>
        <div style={styles.container}>
          
          <button 
            onClick={() => navigate('/home')} 
            style={styles.btnVoltar}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f1f8ff'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ffffff'}
          >
            ← Voltar para a Biblioteca
          </button>

          <div style={styles.topSection}>
            <div style={styles.capaContainer}>
              <img src={livro.capa} alt={`Capa de ${livro.titulo}`} style={styles.capa} />
            </div>

            <div style={styles.infoContainer}>
              <div style={styles.headerLivro}>
                <h1 style={styles.titulo}>{livro.titulo}</h1>
                <button 
                  onClick={handleFavoritar} 
                  style={styles.btnFavorito} 
                  title="Favoritar"
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  {favorito ? "❤️" : "🤍"}
                </button>
              </div>

              <div style={styles.descricao}>
                {livro.descricao.split('\n\n').map((paragrafo, index) => (
                  <p key={index} style={{ margin: '0 0 10px 0' }}>{paragrafo}</p>
                ))}
              </div>

              <div style={styles.infoBox}>
                <p style={styles.metaDados}><strong>Autor(a):</strong> {livro.autor}</p>
                <p style={styles.metaDados}><strong>Ano:</strong> {livro.ano}</p>
                <p style={styles.metaDados}><strong>Tema:</strong> {livro.tema}</p>
              </div>

              <button 
                onClick={handleAlugar} 
                style={styles.btnAlugar}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#1ea952';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#25D366';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                QUERO ALUGAR NO WHATSAPP 📲
              </button>
            </div>
          </div>

          <div style={styles.bottomSection}>
            <div style={styles.notaGeralHeader}>
              Nota geral: <span style={styles.estrelasAvaliacao}>{renderEstrelas(notaGeral)}</span>
            </div>

            <div style={styles.tituloAvaliacoes}>Avaliações da Comunidade</div>

            <div>
              {avaliacoes.length === 0 ? (
                <p style={{ color: '#777', fontStyle: 'italic', fontWeight: '500' }}>Ninguém avaliou este livro ainda. Seja o primeiro!</p>
              ) : (
                avaliacoes.map((av) => (
                  <div key={av.id} style={styles.comentarioItem}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
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
                  type="text" placeholder="Deixe sua avaliação sobre o livro..." 
                  value={novoComentario} onChange={(e) => setNovoComentario(e.target.value)}
                  style={styles.inputAvaliacao} required
                  onFocus={(e) => e.target.style.borderColor = '#0056b3'}
                  onBlur={(e) => e.target.style.borderColor = '#ced4da'}
                />
                
                <button 
                  type="submit" 
                  style={styles.btnEnviar}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#004494';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#0056b3';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Enviar
                </button>
              </form>
            ) : (
              <div style={styles.msgAvaliado}>
                ✔️ Você já deixou sua avaliação para este livro. Obrigado!
              </div>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetailsPage;