import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function BookDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const livro = location.state?.livroSelecionado || {
    titulo: "Livro não encontrado", autor: "Desconhecido", ano: "----", tema: "Nenhum", descricao: "Nenhuma descrição informada."
  };

  const [favorito, setFavorito] = useState(false);
  const [notaGeral, setNotaGeral] = useState(4); 
  const [novaNota, setNovaNota] = useState(5);
  const [novoComentario, setNovoComentario] = useState('');
  const [avaliacoes, setAvaliacoes] = useState([
    { id: 1, usuario: "João", nota: 5, texto: "Amei esse livro, muito legal!" },
    { id: 2, usuario: "Maria", nota: 3, texto: "Não gostei muito... é OK." }
  ]);

  const handleAlugar = () => {
    const numeroWhatsApp = "5548999999999"; 
    const mensagem = `Olá! Tenho interesse em alugar o livro '${livro.titulo}'. Gostaria de saber mais informações.`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const handleEnviarAvaliacao = (e) => {
    e.preventDefault();
    if (!novoComentario) return;

    const avaliacao = {
      id: Date.now(),
      usuario: "Você", 
      nota: novaNota,
      texto: novoComentario
    };
    setAvaliacoes([avaliacao, ...avaliacoes]);
    setNovoComentario("");
    setNovaNota(5);
  };

  const renderEstrelas = (nota) => "⭐".repeat(nota) + "☆".repeat(5 - nota);

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
    btnEnviar: { backgroundColor: '#0056b3', color: 'white', border: 'none', padding: '0 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }
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
            <button onClick={() => setFavorito(!favorito)} style={styles.btnFavorito} title="Favoritar">
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
          {avaliacoes.map((av) => (
            <div key={av.id} style={styles.comentarioItem}>
              <div>
                <span style={styles.nomeUsuario}>{av.usuario}</span>
                <span style={styles.estrelasAvaliacao}>{renderEstrelas(av.nota)}</span>
              </div>
              <div style={styles.textoComentario}>{av.texto}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleEnviarAvaliacao} style={styles.formBox}>
          <select 
            value={novaNota} 
            onChange={(e) => setNovaNota(Number(e.target.value))} 
            style={styles.selectNota}
          >
            <option value="5">5 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="1">1 ⭐</option>
          </select>

          <input 
            type="text" 
            placeholder="Deixe sua avaliação..." 
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            style={styles.inputAvaliacao}
            required
          />
          <button type="submit" style={styles.btnEnviar}>Enviar</button>
        </form>
      </div>

    </div>
  );
}

export default BookDetailsPage;