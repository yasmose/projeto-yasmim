import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || "https://projeto-yasmim-api.onrender.com";

function PerfilPage() {
  const navigate = useNavigate();

  const [dadosUsuario, setDadosUsuario] = useState({ nome: '', email: '', serie: '', senha: '' });
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const [carregando, setCarregando] = useState(true);
  const [meusFavoritos, setMeusFavoritos] = useState([]);

  useEffect(() => {
    const buscarDados = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setMensagem({ texto: 'Você precisa estar logado!', tipo: 'erro' });
        setCarregando(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/me`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setDadosUsuario({ nome: data.nome, email: data.email, serie: data.serie, senha: '' });

          const todosFavoritos = JSON.parse(localStorage.getItem('favoritos_biblioteca')) || [];
          const favoritosDesteUsuario = todosFavoritos.filter(fav => fav.usuario === data.nome);
          setMeusFavoritos(favoritosDesteUsuario.map(fav => fav.livro));
        } else {
          setMensagem({ texto: 'Erro ao carregar dados.', tipo: 'erro' });
        }
      } catch (error) {
        setMensagem({ texto: 'Erro de conexão.', tipo: 'erro' });
      } finally {
        setCarregando(false);
      }
    };

    buscarDados();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDadosUsuario(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem({ texto: 'Atualizando...', tipo: 'info' });

    const token = localStorage.getItem('token');
    const dadosParaEnviar = { ...dadosUsuario };
    if (!dadosParaEnviar.senha) delete dadosParaEnviar.senha;

    try {
      const response = await fetch(`${API_URL}/auth/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(dadosParaEnviar)
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); 
        setMensagem({ texto: 'Cadastro atualizado com sucesso!', tipo: 'sucesso' });
      } else {
        setMensagem({ texto: data.error || 'Erro ao atualizar.', tipo: 'erro' });
      }
    } catch (error) {
      setMensagem({ texto: 'Erro de conexão.', tipo: 'erro' });
    }
  };

  const getEscolaridadeTexto = (serie) => {
    if (serie === '1') return 'Ensino Fundamental I';
    if (serie === '2') return 'Ensino Fundamental II';
    if (serie === '3') return 'Ensino Médio';
    return 'Carregando...';
  };

  const styles = {
    container: { minHeight: '100vh', background: 'linear-gradient(135deg, #f6f9fc 0%, #e9f0f5 100%)', padding: '60px 20px',display: 'flex',justifyContent: 'center',fontFamily: "'Montserrat', sans-serif" },
    wrapper: {display: 'flex',flexWrap: 'wrap', gap: '40px',width: '100%',maxWidth: '1200px', alignItems: 'flex-start'},

    // COLUNA 1 (Formulário)
    card: { flex: '1', minWidth: '350px',position: 'relative',backgroundColor: '#ffffff',padding: '50px 40px 40px 40px', borderRadius: '16px',boxShadow: '0 10px 30px rgba(0,0,0,0.08)',border: '1px solid #e1e8ed'},
    btnVoltar: { position: 'absolute', top: '20px', left: '20px', background: 'none', border: 'none', color: '#0056b3', fontSize: '14px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' },
    title: { color: '#ff8c00', marginBottom: '8px', marginTop: '10px', fontSize: '28px', fontWeight: '700' },
    subtitle: { color: '#666', fontSize: '15px', marginBottom: '30px', fontWeight: '500' },
    form: { display: 'grid', gridTemplateColumns: '1fr 1fr',gap: '20px', textAlign: 'left' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    label: { fontSize: '14px', fontWeight: '700', color: '#444' },
    input: { padding: '14px', border: '1px solid #ced4da', borderRadius: '10px', fontSize: '15px', outline: 'none', width: '100%', boxSizing: 'border-box', backgroundColor: '#f8f9fa', fontFamily: "'Montserrat', sans-serif" },
    inputBloqueado: { padding: '14px', border: '1px solid #e9ecef', borderRadius: '10px', fontSize: '15px', outline: 'none', backgroundColor: '#e9ecef', color: '#6c757d', cursor: 'not-allowed', width: '100%', boxSizing: 'border-box', fontFamily: "'Montserrat', sans-serif" },
    
    button: { gridColumn: '1 / -1', backgroundColor: '#0056b3', color: 'white', padding: '16px', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 10px rgba(0, 86, 179, 0.2)', transition: 'background 0.3s' },
    
    // COLUNA 2 (Favoritos)
    favoritosContainer: { flex: '1.5',  minWidth: '350px', backgroundColor: '#ffffff',  padding: '40px',  borderRadius: '16px',  border: '1px solid #e1e8ed', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)' },
    favoritosTitulo: { borderBottom: '2px solid #f1f3f5', paddingBottom: '15px', marginBottom: '25px', color: '#0056b3', fontSize: '24px', fontWeight: '700' },
    gridLivros: { display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'flex-start' },
    livroCard: { width: '140px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s', padding: '10px', borderRadius: '12px' },
    livroCapa: { width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
    livroTitulo: { fontSize: '14px', fontWeight: '700', color: '#333', margin: '0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
    loading: { textAlign: 'center', marginTop: '50px', fontSize: '18px', color: '#555', width: '100%', fontWeight: '600' },
  };

  const getMensagemStyle = (tipo) => {
    const base = { gridColumn: '1 / -1', padding: '12px', borderRadius: '8px', marginBottom: '10px', fontSize: '14px', fontWeight: '600' };
    if (tipo === 'sucesso') return { ...base, backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' };
    if (tipo === 'erro') return { ...base, backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' };
    return { ...base, backgroundColor: '#e2e3e5', color: '#383d41' };
  };

  if (carregando) return <div style={styles.container}><div style={styles.loading}>Carregando seus dados...</div></div>;

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');`}
      </style>
      
      <div style={styles.container}>
        <div style={styles.wrapper}>
          
          <div style={styles.card}>
            <button onClick={() => navigate('/home')} style={styles.btnVoltar}>⬅ Voltar</button>
            <h2 style={styles.title}>Meu Perfil</h2>
            <p style={styles.subtitle}>Atualize suas informações abaixo:</p>

            <form onSubmit={handleSubmit} style={styles.form}>
              {mensagem.texto && ( <div style={getMensagemStyle(mensagem.tipo)}>{mensagem.texto}</div> )}
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Nome Completo:</label>
                <input type="text" name="nome" value={dadosUsuario.nome} onChange={handleChange} style={styles.input} required />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>E-mail:</label>
                <input type="email" name="email" value={dadosUsuario.email} onChange={handleChange} style={styles.input} required />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Escolaridade (Não editável):</label>
                <input type="text" value={getEscolaridadeTexto(dadosUsuario.serie)} style={styles.inputBloqueado} readOnly />
              </div>
              
              <div style={styles.inputGroup}>
                <label style={styles.label}>Nova Senha (opcional):</label>
                <input type="password" name="senha" placeholder="Deixar em branco = manter atual" value={dadosUsuario.senha} onChange={handleChange} style={styles.input} />
              </div>
              
              <button 
                type="submit" 
                style={styles.button}
                onMouseOver={(e) => e.target.style.backgroundColor = '#004494'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#0056b3'}
              >
                Salvar Alterações
              </button>
            </form>
          </div>

          <div style={styles.favoritosContainer}>
            <h2 style={styles.favoritosTitulo}>❤️ Meus Livros Favoritos</h2>
            
            {meusFavoritos.length === 0 ? (
              <p style={{ color: '#777', fontStyle: 'italic', marginTop: '20px', fontWeight: '500' }}>
                Você ainda não favoritou nenhum livro. Explore a biblioteca!
              </p>
            ) : (
              <div style={styles.gridLivros}>
                {meusFavoritos.map((livro, index) => (
                  <div 
                    key={index} 
                    style={styles.livroCard}
                    onClick={() => navigate('/livro', { state: { livroSelecionado: livro } })}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                  >
                    <img src={livro.capa} alt={livro.titulo} style={styles.livroCapa} />
                    <h4 style={styles.livroTitulo} title={livro.titulo}>{livro.titulo}</h4>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default PerfilPage;