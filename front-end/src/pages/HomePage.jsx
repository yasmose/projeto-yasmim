import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; //para poder voltar ao login
import BookCard from '../components/BookCard';

const livrosMock = [
  //ENSINO FUNDAMENTAL I
  { id: 1, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", ano: 1943, tema: "Infantil", status: "Disponível", serie: "1", capa: "/capas/pequeno-principe.webp" },
  { id: 2, titulo: "O Menino Maluquinho", autor: "Ziraldo", ano: 1980, tema: "Infantil", status: "Disponível", serie: "1", capa: "/capas/menino-maluquinho.webp" },
  { id: 3, titulo: "Ou Isto ou Aquilo", autor: "Cecília Meireles", ano: 1964, tema: "Poesia", status: "Indisponível", serie: "1", capa: "/capas/ou-isto-ou-aquilo.jpg" },
  { id: 4, titulo: "Reinações de Narizinho", autor: "Monteiro Lobato", ano: 1931, tema: "Aventura", status: "Disponível", serie: "1", capa: "/capas/reinacoes-narizinho.jpg" },
  { id: 5, titulo: "O Monstro das Cores", autor: "Anna Llenas", ano: 2012, tema: "Infantil", status: "Disponível", serie: "1", capa: "/capas/monstro-das-cores.jpg" },
  { id: 6, titulo: "A Arca de Noé", autor: "Vinicius de Moraes", ano: 1970, tema: "Poesia", status: "Indisponível", serie: "1", capa: "/capas/arca-de-noe.jpg" },
  { id: 7, titulo: "Marcelo, Marmelo, Martelo", autor: "Ruth Rocha", ano: 1976, tema: "Infantil", status: "Disponível", serie: "1", capa: "/capas/marcelo-marmelo.webp" },
  { id: 8, titulo: "A Bolsa Amarela", autor: "Lygia Bojunga", ano: 1976, tema: "Aventura", status: "Disponível", serie: "1", capa: "/capas/bolsa-amarela.webp" },
  { id: 9, titulo: "Flicts", autor: "Ziraldo", ano: 1969, tema: "Infantil", status: "Disponível", serie: "1", capa: "/capas/flicts.webp" },
  { id: 10, titulo: "Pluft, o Fantasminha", autor: "Maria Clara Machado", ano: 1955, tema: "Teatro", status: "Disponível", serie: "1", capa: "/capas/pluft.jpg" },

  //ENSINO FUNDAMENTAL II
  { id: 11, titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", ano: 1997, tema: "Fantasia", status: "Disponível", serie: "2", capa: "/capas/harry-potter-1.jpg" },
  { id: 12, titulo: "Percy Jackson e o Ladrão de Raios", autor: "Rick Riordan", ano: 2005, tema: "Fantasia", status: "Indisponível", serie: "2", capa: "/capas/percy-jackson-1.jpg" },
  { id: 13, titulo: "O Diário de Anne Frank", autor: "Anne Frank", ano: 1947, tema: "Biografia", status:"Disponível", serie: "2", capa:"/capas/diario-anne-frank.jpg" },
  { id:14, titulo:"Extraordinário", autor:"R.J. Palacio", ano:2012, tema:"Ficção", status:"Disponível", serie:"2", capa:"/capas/extraordinario.jpg" },
  { id: 15, titulo: "A Droga da Obediência", autor: "Pedro Bandeira", ano: 1984, tema: "Mistério", status: "Disponível", serie: "2", capa: "/capas/droga-obediencia.jpg" },
  { id: 16, titulo: "O Mistério do Cinco Estrelas", autor: "Marcos Rey", ano: 1981, tema: "Mistério", status: "Indisponível", serie: "2", capa: "/capas/misterio-cinco-estrelas.jpg" },
  { id: 17, titulo: "A Marca de uma Lágrima", autor: "Pedro Bandeira", ano: 1985, tema: "Romance", status: "Disponível", serie: "2", capa: "/capas/marca-lagrima.jpg" },
  { id: 18, titulo: "O Meu Pé de Laranja Lima", autor: "José Mauro de Vasconcelos", ano: 1968, tema: "Drama", status: "Disponível", serie: "2", capa: "/capas/pe-de-laranja-lima.webp" },
  { id: 19, titulo: "A Ilha Perdida", autor: "Maria José Dupré", ano: 1944, tema: "Aventura", status: "Disponível", serie: "2", capa: "/capas/ilha-perdida.jpg" },
  { id: 20, titulo: "Vinte Mil Léguas Submarinas", autor: "Júlio Verne", ano: 1870, tema: "Ficção Científica", status: "Indisponível", serie: "2", capa: "/capas/vinte-mil-leguas.jpg" },

  // ENSINO MÉDIO
  { id: 21, titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899, tema: "Romance", status: "Disponível", serie: "3", capa:"/capas/dom-casmurro.jpg" },
  { id: 22, titulo: "1984", autor: "George Orwell", ano: 1949, tema: "Ficção Científica", status: "Disponível", serie: "3", capa:"/capas/1984.webp" },
  { id: 23, titulo: "O Nome do Vento", autor: "Patrick Rothfuss", ano: 2007, tema: "Fantasia", status: "Disponível", serie: "3", capa: "/capas/nome-do-vento.webp" },
  { id: 24, titulo: "Sapiens", autor: "Yuval Noah Harari", ano: 2011, tema: "História", status: "Disponível", serie: "3", capa: "/capas/sapiens.webp" },
  { id: 25, titulo: "A Culpa é das Estrelas", autor: "John Green", ano: 2012, tema: "Romance", status: "Indisponível", serie: "3", capa: "/capas/culpa-das-estrelas.png" },
  { id: 26, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954, tema: "Fantasia", status: "Indisponível", serie: "3", capa: "/capas/senhor-dos-aneis.jpg" },
  { id: 27, titulo: "Breve História do Tempo", autor: "Stephen Hawking", ano: 1988, tema: "Física", status: "Disponível", serie: "3", capa: "/capas/breve-historia.jpg" },
  { id: 28, titulo: "Inteligência Artificial", autor: "Peter Norvig", ano: 1995, tema: "Tecnologia", status: "Indisponível", serie: "3", capa: "/capas/inteligencia-artificial.jpg" },
  { id: 29, titulo: "Cálculo Vol 1", autor: "James Stewart", ano: 2021, tema: "Matemática", status: "Disponível", serie: "3", capa: "/capas/calculo-vol1.webp" },
  { id: 30, titulo:"O Código Da Vinci", autor:"Dan Brown", ano:2003, tema:"Mistério", status:"Disponível", serie:"3", capa:"/capas/codigo-da-vinci.jpg" }
];

function HomePage() {
  const navigate = useNavigate();

  const [busca, setBusca] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('Visitante');
  const [serieUsuario, setSerieUsuario] = useState(''); 
  const [emailUsuario, setEmailUsuario] = useState(''); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setNomeUsuario(payload.nome);
        setSerieUsuario(payload.serie);
        setEmailUsuario(payload.email); 
      } catch (error) {
        console.error("Erro ao ler o token do usuário:", error);
      }
    }
  }, []);

  const handlePerfil = () => {
    navigate('/perfil');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert("Você saiu da conta com sucesso!");
    navigate('/'); //usuário volta para tela de Login
  };
  // ====================================================================

  const livrosFiltrados = livrosMock.filter(livro => {
    const passaNaBusca = livro.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                         livro.autor.toLowerCase().includes(busca.toLowerCase()) ||
                         livro.tema.toLowerCase().includes(busca.toLowerCase());
    const passaNaSerie = serieUsuario === '' || livro.serie === String(serieUsuario);
    return passaNaBusca && passaNaSerie;
  });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '15px 25px', 
        backgroundColor: '#ffffff', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
        borderRadius: '12px', 
        marginBottom: '30px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/logo/logo.jpg" 
            alt="Logo da Biblioteca" 
            style={{ width: '75px', height: 'auto', borderRadius: '8px' }} 
          />
        </div>

        <div style={{ flex: 1, maxWidth: '500px', margin: '0 20px' }}>
          <input 
            type="text" 
            placeholder="Pesquise por um título, autor ou categoria..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)} 
            style={{ 
              width: '100%', 
              padding: '12px 22px', 
              borderRadius: '25px', 
              border: '1px solid #ddd', 
              outline: 'none',
              fontSize: '15px',
              backgroundColor: '#f8f9fa',
              transition: 'all 0.3s ease',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#0056b3';
              e.target.style.backgroundColor = '#ffffff';
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 86, 179, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ddd';
              e.target.style.backgroundColor = '#f8f9fa';
              e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.02)';
            }}
          />
        </div>
        
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          
         
          <div style={{ marginBottom: '10px' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
              Bem-vindo(a), <span style={{ color: '#0056b3' }}>{nomeUsuario}</span>!
            </div>
            <div style={{ fontSize: '13px', color: '#777', marginTop: '4px', fontWeight: '500' }}>
              Acesso: {serieUsuario === '1' ? 'Ensino Fundamental I' : serieUsuario === '2' ? 'Ensino Fundamental II' : 'Ensino Médio'}
            </div>
          </div>
          
        
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button 
              onClick={handlePerfil} 
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#e9ecef', 
                color: '#495057',
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#dde2e6'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#e9ecef'}
            >
              Meu Perfil
            </button>
            <button 
              onClick={handleLogout} 
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 5px rgba(220, 53, 69, 0.15)'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
            >
              Sair
            </button>
          </div>

        </div>
      </div>

      <div 
        onClick={() => navigate('/forum')} 
        style={{ 
          background: 'linear-gradient(135deg, #0056b3 0%, #00d2ff 100%)',  
          padding: '30px', 
          textAlign: 'center', 
          borderRadius: '12px',
          marginBottom: '40px', 
          color: '#ffffff', 
          cursor: 'pointer', 
          boxShadow: '0 4px 15px rgba(0, 86, 179, 0.3)',  
          transition: 'all 0.3s ease', 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)'; // botão "subir" um pouquinho
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 86, 179, 0.5)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'; // Volta ao normal
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 86, 179, 0.3)';
        }}
      >
        <span style={{ fontSize: '25px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px' }}>
          FAÇA PARTE DOS NOSSOS FÓRUNS
        </span>
        <span style={{ fontSize: '13px', fontWeight: 'normal', opacity: 0.9 }}>
          Clique aqui para compartilhar suas opiniões e descobrir novos livros 💬
        </span>
      </div>

      <h2 style={{ textAlign: 'center', borderBottom: '2px solid #ccc', paddingBottom: '10px', marginBottom: '30px' }}>
        Livros Recomendados para o seu Ano
      </h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {livrosFiltrados.length > 0 ? (
          livrosFiltrados.map((livro) => (
            <BookCard key={livro.id} livro={livro} />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#777', fontSize: '18px', marginTop: '20px', width: '100%' }}>
            Nenhum livro encontrado para a sua pesquisa.
          </p>
        )}
      </div>

    </div>
  );
}

export default HomePage;