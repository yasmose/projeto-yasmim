import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ForumPage() {
  const navigate = useNavigate();
  const [nomeUsuario, setNomeUsuario] = useState('Visitante');
  const [serieUsuario, setSerieUsuario] = useState('');
  
  //guarda todas as mensagens
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');

  //buscamos quem está logado e as mensagens salvas
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setNomeUsuario(payload.nome);
        setSerieUsuario(payload.serie);
      } catch (error) {
        console.error("Erro ao ler o token:", error);
      }
    }

    // Puxa as mensagens salvas na memória do navegador (se existirem)
    const mensagensSalvas = JSON.parse(localStorage.getItem('forum_mensagens')) || [];
    setMensagens(mensagensSalvas);
  }, []);

  //Função para enviar a mensagem
  const handleEnviar = () => {
    if (novaMensagem.trim() === '') return;

    const mensagemNova = {
      id: Date.now(), // Gera um ID único
      autor: nomeUsuario,
      serie: serieUsuario,
      texto: novaMensagem,
      data: new Date().toLocaleDateString('pt-BR')
    };

    // Junta as mensagens antigas com a nova
    const todasMensagens = [...mensagens, mensagemNova];
    
    // Atualiza a tela e salva na memória do navegador!
    setMensagens(todasMensagens);
    localStorage.setItem('forum_mensagens', JSON.stringify(todasMensagens));
    setNovaMensagem(''); // Limpa a caixa de texto
  };

  //mostrar APENAS as mensagens da mesma série do utilizador
  const mensagensDaMinhaSerie = mensagens.filter(msg => msg.serie === String(serieUsuario));

  // Define o nome da série para o título
  const nomeSerie = serieUsuario === '1' ? 'Ensino Fundamental I' : serieUsuario === '2' ? 'Ensino Fundamental II' : 'Ensino Médio';

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      
      <button onClick={() => navigate('/home')} style={{ marginBottom: '20px', padding: '10px 15px', backgroundColor: '#ffffff', border: '2px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}>
        ← Voltar para a Biblioteca
      </button>

      <h1 style={{ textAlign: 'center', color: '#e07823' }}>Fórum de Discussão</h1>
      <h3 style={{ textAlign: 'center', color: '#0056b3', marginBottom: '30px' }}>{nomeSerie}</h3>

      {/* Caixa de Mensagens */}
      <div style={{ backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '8px', padding: '20px', height: '400px', overflowY: 'auto', marginBottom: '20px' }}>
        {mensagensDaMinhaSerie.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '150px' }}>Seja o primeiro a mandar uma opinião!</p>
        ) : (
          mensagensDaMinhaSerie.map((msg) => (
            <div key={msg.id} style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <strong style={{ color: msg.autor === nomeUsuario ? '#28a745' : '#333' }}>{msg.autor}</strong>
                <span style={{ fontSize: '12px', color: '#888' }}>{msg.data}</span>
              </div>
              <p style={{ margin: 0, color: '#555', fontSize: '16px' }}>{msg.texto}</p>
            </div>
          ))
        )}
      </div>

      {/* Área para digitar a mensagem */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Escreva sua opinião sobre um livro..." 
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
          style={{ flex: 1, padding: '15px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <button onClick={handleEnviar} style={{ padding: '15px 30px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          Enviar
        </button>
      </div>

    </div>
  );
}

export default ForumPage;