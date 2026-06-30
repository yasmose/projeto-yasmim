import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function BookDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // recebe os dados do livro que vieram do cartão. 
  const livro = location.state?.livroSelecionado || {
    titulo: "Livro não encontrado",
    autor: "Desconhecido",
    ano: "----",
    tema: "Nenhum"
  };

  const handleAlugar = () => {
    const numeroWhatsApp = "5548999999999"; 
    // título  muda automaticamente na mensagem do WhatsApp
    const mensagem = `Olá! Tenho interesse em alugar o livro '${livro.titulo}'. Gostaria de saber mais informações.`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      
      <button onClick={() => navigate('/home')} style={{ marginBottom: '20px', padding: '10px 15px', backgroundColor: '#eee', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer' }}>
        ← Voltar para a Biblioteca
      </button>

      <div style={{ display: 'flex', gap: '40px', backgroundColor: '#fff', padding: '30px', borderRadius: '10px', border: '1px solid #e0e0e0', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        
        <img 
          src={livro.capa} 
          alt={`Capa de ${livro.titulo}`} 
          style={{ width: '250px', height: '350px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }} 
        />

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/*as info vem dos dados da variável livro */}
          <h1 style={{ margin: '0 0 10px 0', fontSize: '28px', color: '#333' }}>{livro.titulo}</h1>
          <p style={{ margin: '5px 0', fontSize: '16px' }}><strong>Autor:</strong> {livro.autor}</p>
          <p style={{ margin: '5px 0', fontSize: '16px' }}><strong>Ano:</strong> {livro.ano}</p>
          <p style={{ margin: '5px 0', fontSize: '16px' }}><strong>Tema:</strong> {livro.tema}</p>

          <div style={{ marginTop: 'auto', borderTop: '2px solid #f0f0f0', paddingTop: '20px' }}>
            <button onClick={handleAlugar} style={{ width: '100%', padding: '15px', backgroundColor: '#25D366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px', transition: '0.3s' }}>
              QUERO ALUGAR NO WHATSAPP
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default BookDetailsPage;