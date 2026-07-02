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
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');`}
      </style>

      {/*fundo com a logo em blur*/}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundImage: 'url(/logo/logo.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(15px)', 
        opacity: 0.7, 
        zIndex: -1 // Fica atrás de todo o conteúdo
      }} />

      <div style={{ 
        minHeight: '100vh', 
        fontFamily: "'Montserrat', sans-serif", 
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        
        <div style={{ width: '100%', maxWidth: '800px' }}>
          
          <button 
            onClick={() => navigate('/home')} 
            style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#ffffff', color: '#0056b3', border: '1px solid #cce5ff', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'inline-flex', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}
          >
            ← Voltar para a Biblioteca
          </button>

          {/* titulo com degrade */}
          <h1 style={{ 
            textAlign: 'center', 
            background: 'linear-gradient(135deg, #0056b3 0%, #ff8c00 100%)', 
            color: '#ffffff', 
            textShadow: '2px 2px 5px rgba(0,0,0,0.4)', 
            fontSize: '32px', 
            margin: '0 0 15px 0', 
            fontWeight: '700',
            padding: '20px 30px',
            borderRadius: '16px', 
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)' 
          }}>
            Fórum de Discussão
          </h1>

          <h3 style={{ 
            textAlign: 'center', 
            color: '#0056b3', 
            margin: '0 0 30px 0', 
            fontSize: '18px', 
            fontWeight: '700',
            backgroundColor: 'rgba(255,255,255,0.8)', 
            padding: '5px 15px',
            borderRadius: '20px',
            display: 'inline-block', 
            width: 'fit-content',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block'
          }}>
            {nomeSerie}
          </h3>

          {/* Caixa de Mensagens */}
          <div style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #e1e8ed', height: '60vh', minHeight: '400px', backdropFilter: 'blur(5px)' }}>
            
            <div style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: 'transparent', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {mensagensDaMinhaSerie.length === 0 ? (
                <p style={{ margin: 'auto', color: '#adb5bd', textAlign: 'center', fontSize: '16px', fontWeight: '600' }}>Seja o primeiro a mandar uma opinião! 💬</p>
              ) : (
                mensagensDaMinhaSerie.map((msg) => (
                  <div key={msg.id} style={{ backgroundColor: '#ffffff', padding: '15px', borderRadius: '12px', border: '1px solid #e9ecef', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #f1f3f5', paddingBottom: '8px' }}>
                      <strong style={{ fontSize: '15px', color: msg.autor === nomeUsuario ? '#ff8c00' : '#0056b3' }}>
                        {msg.autor} {msg.autor === nomeUsuario && '(Você)'}
                      </strong>
                      <span style={{ color: '#868e96', fontSize: '12px', fontWeight: '600' }}>{msg.data}</span>
                    </div>
                    <p style={{ margin: 0, color: '#495057', fontSize: '15px', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>{msg.texto}</p>
                  </div>
                ))
              )}
            </div>

            {/* Área para digitar a mensagem*/}
            <div style={{ display: 'flex', padding: '20px', backgroundColor: '#ffffff', borderTop: '1px solid #e9ecef', gap: '15px' }}>
              <input 
                type="text" 
                placeholder="Escreva sua opinião sobre um livro..." 
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
                style={{ flex: 1, padding: '15px 20px', borderRadius: '30px', border: '1px solid #ced4da', outline: 'none', fontSize: '15px', fontFamily: "'Montserrat', sans-serif", backgroundColor: '#f8f9fa' }}
              />
              <button 
                onClick={handleEnviar} 
                style={{ padding: '0 30px', backgroundColor: '#0056b3', color: '#ffffff', border: 'none', borderRadius: '30px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0, 86, 179, 0.2)' }}
              >
                Enviar
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default ForumPage;