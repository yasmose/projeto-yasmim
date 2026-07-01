import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || "https://projeto-yasmim-api.onrender.com";

function Perfil() {
  const [dadosUsuario, setDadosUsuario] = useState({
    nome: '', email: '', serie: '', senha: ''
  });
  
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const [carregando, setCarregando] = useState(true);

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
          method: 'GET', headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setDadosUsuario({ nome: data.nome, email: data.email, serie: data.serie, senha: '' });
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
    
    if (!dadosParaEnviar.senha) {
      delete dadosParaEnviar.senha;
    }

    try {
      const response = await fetch(`${API_URL}/auth/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dadosParaEnviar)
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem({ texto: 'Cadastro atualizado com sucesso!', tipo: 'sucesso' });
      } else {
        setMensagem({ texto: data.error || 'Erro ao atualizar.', tipo: 'erro' });
      }
    } catch (error) {
      setMensagem({ texto: 'Erro de conexão.', tipo: 'erro' });
    }
  };

  const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f4f7f6', padding: '20px',
    },
    card: { backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '450px', textAlign: 'center',
    },
    title: { color: '#333', marginBottom: '8px' },
    subtitle: { color: '#666', fontSize: '14px', marginBottom: '24px' },
    form: { display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { fontSize: '14px', fontWeight: '600', color: '#444' },
    input: {
      padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '15px', outline: 'none'
    },
    button: {
      backgroundColor: '#28a745', color: 'white', padding: '14px', border: 'none',
      borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px'
    },
    loading: { textAlign: 'center', marginTop: '50px', fontSize: '18px', color: '#555' }
  };

  // Função para retornar a cor da mensagem baseada no tipo
  const getMensagemStyle = (tipo) => {
    const base = { padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', fontWeight: '500' };
    if (tipo === 'sucesso') return { ...base, backgroundColor: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' };
    if (tipo === 'erro') return { ...base, backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb' };
    return { ...base, backgroundColor: '#e2e3e5', color: '#383d41' };
  };

  if (carregando) return <div style={styles.loading}>Carregando seus dados...</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Meu Perfil</h2>
        <p style={styles.subtitle}>Atualize suas informações abaixo:</p>

        {mensagem.texto && (
          <div style={getMensagemStyle(mensagem.tipo)}>
            {mensagem.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nome Completo:</label>
            <input
              type="text"
              name="nome"
              value={dadosUsuario.nome}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>E-mail:</label>
            <input
              type="email"
              name="email"
              value={dadosUsuario.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Escolaridade:</label>
            <select 
              name="serie" 
              value={dadosUsuario.serie} 
              onChange={handleChange}
              style={styles.input}
            >
              <option value="1">Ensino Fundamental</option>
              <option value="2">Ensino Médio</option>
              <option value="3">Ensino Superior</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Nova Senha (opcional):</label>
            <input
              type="password"
              name="senha"
              placeholder="Deixe em branco para manter a atual"
              value={dadosUsuario.senha}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}

export default Perfil;