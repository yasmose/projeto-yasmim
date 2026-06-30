import React from 'react';
import { useNavigate } from 'react-router-dom';

function BookCard({ livro }) {
  const navigate = useNavigate();

  // Definição das cores do status fora para manter o código limpo
  const statusColor = livro.status === 'Disponível' ? '#28a745' : '#dc3545';

  return (
    <div 
      // 1. O PULOS DO GATO: Os eventos de animação e navegação
      onClick={() => navigate('/livro', { state: { livroSelecionado: livro } })} 
      
      // 2. ESTILOS BASE DO CARTÃO
      style={{ 
        border: '1px solid #eee', 
        borderRadius: '12px', // Cantos mais suaves
        padding: '20px', 
        width: '180px', 
        textAlign: 'center', 
        cursor: 'pointer',
        backgroundColor: '#fff',
        // Adicionamos uma sombra base suave
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        // A transição precisa ser para 'all' e um pouco mais longa para ficar fluida
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative' // Bom para posicionamento interno se precisarmos
      }}

      // 3. EVENTOS DE ANIMAÇÃO NO MOUSEOVER (IGUAL AO FÓRUM)
      onMouseOver={(e) => {
        // e.currentTarget refere-se a esta div específica
        e.currentTarget.style.transform = 'translateY(-5px)'; // Faz flutuar
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)'; // Aumenta a sombra
        e.currentTarget.style.borderColor = '#ddd'; // Escurece levemente a borda
      }}
      
      // 4. RESETAR A ANIMAÇÃO NO MOUSEOUT
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'; // Volta ao normal
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)'; // Sombra normal
        e.currentTarget.style.borderColor = '#eee'; // Borda normal
      }}
    >
      {/* Imagem da capa */}
      <img 
        src={livro.capa} 
        alt={`Capa de ${livro.titulo}`} 
        style={{ 
          width: '100%', 
          height: '220px', 
          objectFit: 'cover', 
          borderRadius: '8px', 
          marginBottom: '15px' 
        }} 
      />
      
      {/* Detalhes do livro */}
      <div>
        <h4 style={{ margin: '10px 0 5px 0', fontSize: '16px', color: '#333', fontWeight: 'bold' }}>
          {livro.titulo}
        </h4>
        <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#777' }}>
          Ano: {livro.ano}
        </p>
        
        {/* Status com cor dinâmica */}
        <p style={{ 
          margin: '10px 0 0 0', 
          fontSize: '14px', 
          fontWeight: 'bold', 
          color: statusColor,
          textTransform: 'uppercase', // Estilo extra para o status
          letterSpacing: '1px'
        }}>
          {livro.status}
        </p>
      </div>
    </div>
  );
}

export default BookCard;