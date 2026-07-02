import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../components/BookCard';

const livrosMock = [
  // ENSINO FUNDAMENTAL I
  { id: 1, titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", ano: 1943, tema: "Infantil", status: "Disponível", serie: "1", capa: "/capas/pequeno-principe.webp", 
    descricao: "Um piloto cai no deserto do Saara e encontra um jovem príncipe que viaja por diferentes planetas. Através de suas conversas, eles exploram a natureza humana, a amizade e o amor.\n\nUma obra poética e filosófica que, embora pareça um livro infantil, traz reflexões profundas sobre o que realmente importa na vida, nos lembrando que 'o essencial é invisível aos olhos'." },
  { id: 2, titulo: "O Menino Maluquinho", autor: "Ziraldo", ano: 1980, tema: "Infantil", status: "Disponível", serie: "1", capa: "/capas/menino-maluquinho.webp", 
    descricao: "Conheça a história de um menino alegre, criativo e cheio de energia que vive com uma panela na cabeça. Ele adora inventar brincadeiras e viver aventuras com seus amigos.\n\nUm verdadeiro clássico da literatura brasileira que celebra a infância livre, a imaginação sem limites e a importância das relações familiares e de amizade." },
  { id: 3, titulo: "Ou Isto ou Aquilo", autor: "Cecília Meireles", ano: 1964, tema: "Poesia", status: "Indisponível", serie: "1", capa: "/capas/ou-isto-ou-aquilo.jpg", 
    descricao: "Um livro de poemas que brinca com as palavras, os sons e os ritmos, explorando as escolhas que as crianças fazem em seu dia a dia. A obra estimula a percepção sonora e visual.\n\nCom uma linguagem doce e musical, Cecília Meireles convida os pequenos leitores a enxergarem a poesia nas pequenas coisas e a valorizarem o poder da imaginação." },
  { id: 4, titulo: "Reinações de Narizinho", autor: "Monteiro Lobato", ano: 1931, tema: "Aventura", status: "Disponível", serie: "1", capa: "/capas/reinacoes-narizinho.jpg", 
    descricao: "Acompanhe as primeiras grandes aventuras da menina Narizinho e sua boneca de pano falante, Emília, no mágico Sítio do Picapau Amarelo, onde a realidade e a fantasia se misturam.\n\nEste livro é a porta de entrada para o universo de Monteiro Lobato, cheio de personagens inesquecíveis do folclore brasileiro e fábulas universais." },
  { id: 5, titulo: "O Monstro das Cores", autor: "Anna Llenas", ano: 2012, tema: "Infantil", status: "Disponível", serie: "1", capa: "/capas/monstro-das-cores.jpg", 
    descricao: "O Monstro das Cores acordou se sentindo confuso, com todas as suas emoções misturadas. Com a ajuda de uma menina, ele aprende a separar a alegria, a tristeza, a raiva, o medo e a calma por cores.\n\nUma ferramenta maravilhosa para ajudar as crianças a identificarem, entenderem e expressarem seus próprios sentimentos de forma lúdica e visual." },
  { id: 6, titulo: "A Arca de Noé", autor: "Vinicius de Moraes", ano: 1970, tema: "Poesia", status: "Indisponível", serie: "1", capa: "/capas/arca-de-noe.jpg", 
    descricao: "Uma coleção de poemas infantis que retratam diversos animais de forma divertida, rítmica e cheia de humor. Cada bicho ganha uma personalidade única nos versos do 'Poetinha'.\n\nMuitos desses poemas viraram músicas famosas que encantam gerações. É uma leitura perfeita para desenvolver a musicalidade e o amor pelas palavras." },
  { id: 7, titulo: "Marcelo, Marmelo, Martelo", autor: "Ruth Rocha", ano: 1976, tema: "Infantil", status: "Disponível", serie: "1", capa: "/capas/marcelo-marmelo.webp", 
    descricao: "Marcelo é um menino curioso que adora inventar novas palavras para as coisas, questionando por que os nomes são como são. Sua imaginação muda a forma como sua família vê o mundo.\n\nO livro reúne contos muito divertidos que mostram a inteligência das crianças e incentivam o pensamento crítico e a criatividade no uso da linguagem." },
  { id: 8, titulo: "A Bolsa Amarela", autor: "Lygia Bojunga", ano: 1976, tema: "Aventura", status: "Disponível", serie: "1", capa: "/capas/bolsa-amarela.webp", 
    descricao: "Raquel é uma menina que esconde três grandes vontades dentro de uma bolsa amarela: a vontade de crescer, a de ser um garoto e a de se tornar escritora.\n\nUma obra sensível que aborda os conflitos internos da infância, o machismo estrutural e a importância de dar voz e espaço aos desejos das crianças." },
  { id: 9, titulo: "Flicts", autor: "Ziraldo", ano: 1969, tema: "Infantil", status: "Disponível", serie: "1", capa: "/capas/flicts.webp", 
    descricao: "A história de uma cor rara e diferente chamada Flicts, que não consegue encontrar o seu lugar no mundo ao lado das outras cores do arco-íris. Ela se sente isolada e triste.\n\nUma belíssima metáfora visual sobre aceitação, diversidade e a busca pela própria identidade, mostrando que todos têm o seu espaço no universo." },
  { id: 10, titulo: "Pluft, o Fantasminha", autor: "Maria Clara Machado", ano: 1955, tema: "Teatro", status: "Disponível", serie: "1", capa: "/capas/pluft.jpg", 
    descricao: "Pluft é um fantasminha diferente: ele tem muito medo de pessoas! Mas quando a menina Maribel é sequestrada por um pirata malvado e escondida no sótão, ele precisa criar coragem.\n\nUma das peças teatrais mais famosas do Brasil, esta obra ensina sobre o enfrentamento dos medos e o poder da solidariedade e da verdadeira amizade." },

  // ENSINO FUNDAMENTAL II
  { id: 11, titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", ano: 1997, tema: "Fantasia", status: "Disponível", serie: "2", capa: "/capas/harry-potter-1.jpg", 
    descricao: "Harry é um garoto órfão que vive com seus tios malvados, até descobrir, no seu aniversário de 11 anos, que é um bruxo e foi aceito na Escola de Magia e Bruxaria de Hogwarts.\n\nO início de uma saga épica que envolve feitiços, mistérios e o poder do amor e da amizade na luta contra o bruxo das trevas, Lord Voldemort." },
  { id: 12, titulo: "Percy Jackson e o Ladrão de Raios", autor: "Rick Riordan", ano: 2005, tema: "Fantasia", status: "Indisponível", serie: "2", capa: "/capas/percy-jackson-1.jpg", 
    descricao: "Percy Jackson é um adolescente com TDAH que descobre ser um semideus, filho de Poseidon. Ele é acusado de roubar o raio mestre de Zeus e precisa embarcar em uma missão para provar sua inocência.\n\nUma aventura eletrizante que mistura a mitologia grega com o mundo moderno, cheia de humor, monstros e lições sobre heroísmo e autoaceitação." },
  { id: 13, titulo: "O Diário de Anne Frank", autor: "Anne Frank", ano: 1947, tema: "Biografia", status:"Disponível", serie: "2", capa:"/capas/diario-anne-frank.jpg", 
    descricao: "O relato real e emocionante de uma adolescente judia que viveu escondida com sua família durante dois anos em Amsterdã, para fugir da perseguição nazista na Segunda Guerra Mundial.\n\nAtravés de suas anotações, Anne Frank compartilha seus medos, esperanças, o despertar da adolescência e o desejo inabalável de um mundo melhor." },
  { id:14, titulo:"Extraordinário", autor:"R.J. Palacio", ano:2012, tema:"Ficção", status:"Disponível", serie:"2", capa:"/capas/extraordinario.jpg", 
    descricao: "Auggie Pullman é um garoto que nasceu com uma severa deformidade facial. Após anos estudando em casa, ele precisa enfrentar o desafio de frequentar uma escola regular pela primeira vez.\n\nUma história profundamente comovente e inspiradora sobre empatia, bullying, resiliência e a escolha de ser gentil em um mundo que muitas vezes julga pelas aparências." },
  { id: 15, titulo: "A Droga da Obediência", autor: "Pedro Bandeira", ano: 1984, tema: "Mistério", status: "Disponível", serie: "2", capa: "/capas/droga-obediencia.jpg", 
    descricao: "Cinco estudantes que formam um grupo secreto chamado 'Os Karas' decidem investigar o misterioso desaparecimento de alunos de vários colégios de São Paulo.\n\nEles descobrem um plano sinistro envolvendo uma droga que tira a vontade própria dos jovens. Um suspense nacional viciante e cheio de reviravoltas." },
  { id: 16, titulo: "O Mistério do Cinco Estrelas", autor: "Marcos Rey", ano: 1981, tema: "Mistério", status: "Indisponível", serie: "2", capa: "/capas/misterio-cinco-estrelas.jpg", 
    descricao: "Léo, um mensageiro de um luxuoso hotel em São Paulo, encontra um cadáver em um dos quartos. No entanto, o corpo desaparece e ninguém acredita em sua história.\n\nCom a ajuda de seus amigos, ele decide investigar o caso por conta própria. Um clássico da literatura policial juvenil brasileira que prende do início ao fim." },
  { id: 17, titulo: "A Marca de uma Lágrima", autor: "Pedro Bandeira", ano: 1985, tema: "Romance", status: "Disponível", serie: "2", capa: "/capas/marca-lagrima.jpg", 
    descricao: "Isabel é uma jovem inteligente, mas muito insegura com sua aparência, que ajuda seu grande amor a conquistar sua melhor amiga escrevendo cartas românticas anônimas.\n\nAlém do triângulo amoroso, ela acaba testemunhando o assassinato da diretora da escola. Um livro que mistura romance profundo com suspense policial investigativo." },
  { id: 18, titulo: "O Meu Pé de Laranja Lima", autor: "José Mauro de Vasconcelos", ano: 1968, tema: "Drama", status: "Disponível", serie: "2", capa: "/capas/pe-de-laranja-lima.webp", 
    descricao: "Zezé é um menino pobre de cinco anos, muito inteligente, mas incompreendido e frequentemente castigado pela família. Ele encontra refúgio desabafando com um pequeno pé de laranja lima.\n\nUma das obras mais emocionantes da literatura brasileira, que trata da perda da inocência, da dor, mas também do poder do amor e da ternura." },
  { id: 19, titulo: "A Ilha Perdida", autor: "Maria José Dupré", ano: 1944, tema: "Aventura", status: "Disponível", serie: "2", capa: "/capas/ilha-perdida.jpg", 
    descricao: "Os irmãos Eduardo e Henrique decidem explorar uma ilha misteriosa perto da fazenda do padrinho. O que parecia uma simples aventura se transforma em uma luta pela sobrevivência.\n\nPresos na ilha, eles conhecem o enigmático Simão e aprendem grandes lições sobre respeito à natureza, coragem e o valor da vida selvagem." },
  { id: 20, titulo: "Vinte Mil Léguas Submarinas", autor: "Júlio Verne", ano: 1870, tema: "Ficção Científica", status: "Indisponível", serie: "2", capa: "/capas/vinte-mil-leguas.jpg", 
    descricao: "O Professor Aronnax, seu criado Conseil e o arpoador Ned Land são capturados pelo misterioso Capitão Nemo, a bordo do impressionante submarino Náutilus.\n\nEles embarcam em uma viagem incrível pelas maravilhas e perigos do fundo do mar. Uma obra visionária que antecipou diversas tecnologias modernas." },

  // ENSINO MÉDIO
  { id: 21, titulo: "Dom Casmurro", autor: "Machado de Assis", ano: 1899, tema: "Romance", status: "Disponível", serie: "3", capa:"/capas/dom-casmurro.jpg", 
    descricao: "Narrado em primeira pessoa por Bento Santiago, o livro conta a história de seu amor de juventude por Capitu, uma mulher de 'olhos de ressaca', e a amizade com Escobar.\n\nUma obra-prima da literatura mundial que deixa uma das maiores dúvidas de todos os tempos: Capitu traiu ou não traiu Bentinho? Uma leitura obrigatória sobre ciúme e psicologia." },
  { id: 22, titulo: "1984", autor: "George Orwell", ano: 1949, tema: "Ficção Científica", status: "Disponível", serie: "3", capa:"/capas/1984.webp", 
    descricao: "Em um futuro distópico, Winston Smith vive sob a vigilância constante do Grande Irmão, em uma sociedade totalitária onde até o pensamento livre é considerado um crime grave.\n\nAo tentar se rebelar contra o sistema, ele descobre as terríveis engrenagens do controle do Estado. Um livro fundamental para entender vigilância, poder e liberdade." },
  { id: 23, titulo: "O Nome do Vento", autor: "Patrick Rothfuss", ano: 2007, tema: "Fantasia", status: "Disponível", serie: "3", capa: "/capas/nome-do-vento.webp", 
    descricao: "A autobiografia épica de Kvothe, um jovem que cresceu em uma trupe de artistas, perdeu tudo em uma tragédia e se tornou o maior e mais temido mago do seu tempo.\n\nCom uma prosa poética e um sistema de magia fascinante, o livro é uma ode à música, ao aprendizado e às histórias que contamos sobre nós mesmos." },
  { id: 24, titulo: "Sapiens", autor: "Yuval Noah Harari", ano: 2011, tema: "História", status: "Disponível", serie: "3", capa: "/capas/sapiens.webp", 
    descricao: "Uma jornada monumental pela história da humanidade, desde a Idade da Pedra até o século XXI, explicando como a nossa espécie conseguiu dominar o planeta Terra.\n\nO autor explora como mitos, religiões, dinheiro e leis foram criados para permitir a cooperação em massa. Uma leitura que muda a nossa visão de mundo." },
  { id: 25, titulo: "A Culpa é das Estrelas", autor: "John Green", ano: 2012, tema: "Romance", status: "Indisponível", serie: "3", capa: "/capas/culpa-das-estrelas.png", 
    descricao: "Hazel Grace é uma adolescente com câncer terminal que conhece Augustus Waters em um grupo de apoio. Juntos, eles embarcam em uma jornada para conhecer o autor favorito de Hazel.\n\nUma história arrebatadora sobre amor, dor, a efemeridade da vida e o desejo de deixar uma marca no mundo, mesmo com o tempo contado." },
  { id: 26, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954, tema: "Fantasia", status: "Indisponível", serie: "3", capa: "/capas/senhor-dos-aneis.jpg", 
    descricao: "O pacato hobbit Frodo Bolseiro recebe a missão mais perigosa de todas: viajar até o coração do território inimigo para destruir o Um Anel e derrotar o senhor do escuro, Sauron.\n\nA obra máxima da fantasia épica, que criou raças, idiomas e um universo inteiro para falar sobre amizade, sacrifício e a luta do bem contra o mal." },
  { id: 27, titulo: "Breve História do Tempo", autor: "Stephen Hawking", ano: 1988, tema: "Física", status: "Disponível", serie: "3", capa: "/capas/breve-historia.jpg", 
    descricao: "Um dos maiores gênios da física moderna explica de forma acessível os grandes mistérios do universo: de onde viemos, o que são buracos negros e a natureza do tempo e do espaço.\n\nUma excelente oportunidade para estudantes do Ensino Médio compreenderem conceitos complexos da física e da cosmologia de maneira fascinante e instigante." },
  { id: 28, titulo: "Inteligência Artificial", autor: "Peter Norvig", ano: 1995, tema: "Tecnologia", status: "Indisponível", serie: "3", capa: "/capas/inteligencia-artificial.jpg", 
    descricao: "O livro definitivo sobre as bases da Inteligência Artificial, explicando como as máquinas aprendem, processam linguagem, tomam decisões e resolvem problemas complexos.\n\nEssencial para estudantes interessados na área de tecnologia, oferecendo os fundamentos lógicos e matemáticos por trás dos algoritmos que moldam o nosso futuro." },
  { id: 29, titulo: "Cálculo Vol 1", autor: "James Stewart", ano: 2021, tema: "Matemática", status: "Disponível", serie: "3", capa: "/capas/calculo-vol1.webp", 
    descricao: "O livro mais utilizado em cursos de exatas no mundo todo. Ele apresenta de forma didática os conceitos de limites, derivadas e integrais, com exercícios práticos do mundo real.\n\nPerfeito para alunos do último ano do Ensino Médio que desejam se preparar para engenharias ou ciências da computação nas universidades." },
  { id: 30, titulo:"O Código Da Vinci", autor:"Dan Brown", ano:2003, tema:"Mistério", status:"Disponível", serie:"3", capa:"/capas/codigo-da-vinci.jpg", 
    descricao: "O simbologista Robert Langdon é chamado ao Museu do Louvre para investigar um assassinato misterioso. Lá, ele descobre pistas escondidas nas obras de Leonardo Da Vinci.\n\nUm thriller conspiratório de tirar o fôlego que mistura arte, religião, história e sociedades secretas em uma caçada implacável através da Europa." }
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
    navigate('/'); 
  };

  const livrosFiltrados = livrosMock.filter(livro => {
    const passaNaBusca = livro.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                         livro.autor.toLowerCase().includes(busca.toLowerCase()) ||
                         livro.tema.toLowerCase().includes(busca.toLowerCase());
    const passaNaSerie = serieUsuario === '' || livro.serie === String(serieUsuario);
    return passaNaBusca && passaNaSerie;
  });

  return (
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');`}
      </style>

      {/* FUNDO DA PÁGINA*/}
      <div style={{ 
        fontFamily: "'Montserrat', sans-serif", 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f6f9fc 0%, #e9f0f5 100%)', 
        padding: '40px 20px' 
      }}>
        
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '20px 30px', 
            backgroundColor: 'rgba(255, 255, 255, 0.85)', 
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)', 
            borderRadius: '16px', 
            marginBottom: '40px', 
            flexWrap: 'wrap', 
            gap: '20px' 
          }}>
            
            {/* LOGO */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/logo/logo.jpg" alt="Logo da Biblioteca" style={{ width: '80px', height: 'auto', borderRadius: '10px' }} />
            </div>

            {/* BARRA DE PESQUISA  */}
            <div style={{ flex: 1, maxWidth: '500px', margin: '0 20px' }}>
              <input 
                type="text" 
                placeholder="🔍 Pesquise por um título, autor ou categoria..." 
                value={busca} 
                onChange={(e) => setBusca(e.target.value)} 
                style={{ 
                  width: '100%', 
                  padding: '16px 24px', 
                  borderRadius: '30px', 
                  border: '2px solid transparent', 
                  outline: 'none', 
                  fontSize: '15px', 
                  fontWeight: '600',
                  backgroundColor: '#ffffff', 
                  color: '#333',
                  transition: 'all 0.3s ease', 
                  boxShadow: '0 6px 15px rgba(0,0,0,0.08)' 
                }}
                onFocus={(e) => { 
                  e.target.style.borderColor = '#ff8c00'; // Borda laranja
                  e.target.style.boxShadow = '0 6px 20px rgba(255, 140, 0, 0.2)'; // Sombra laranja suave
                }}
                onBlur={(e) => { 
                  e.target.style.borderColor = 'transparent'; 
                  e.target.style.boxShadow = '0 6px 15px rgba(0,0,0,0.08)'; 
                }}
              />
            </div>
            
            {/* INFORMAÇÕES DO USUÁRIO */}
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#333' }}>
                  Bem-vindo(a), <span style={{ color: '#ff8c00' }}>{nomeUsuario}</span>!
                </div>
                <div style={{ fontSize: '13px', color: '#777', marginTop: '4px', fontWeight: '600' }}>
                  Acesso: {serieUsuario === '1' ? 'Ensino Fundamental I' : serieUsuario === '2' ? 'Ensino Fundamental II' : 'Ensino Médio'}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  onClick={handlePerfil} 
                  style={{ padding: '10px 18px', backgroundColor: '#e9ecef', color: '#495057', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', transition: 'all 0.2s ease' }} 
                  onMouseOver={(e) => e.target.style.backgroundColor = '#dde2e6'} 
                  onMouseOut={(e) => e.target.style.backgroundColor = '#e9ecef'}
                >
                  Meu Perfil
                </button>
                <button 
                  onClick={handleLogout} 
                  style={{ padding: '10px 18px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', transition: 'all 0.2s ease', boxShadow: '0 4px 10px rgba(220, 53, 69, 0.2)' }} 
                  onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'} 
                  onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                >
                  Sair
                </button>
              </div>
            </div>
          </div>

          {/* BANNER DOS FÓRUNS  */}
          <div 
            onClick={() => navigate('/forum')} 
            style={{ 
              background: 'linear-gradient(135deg, #0056b3 0%, #ff8c00 100%)', 
              padding: '35px', 
              textAlign: 'center', 
              borderRadius: '16px', 
              marginBottom: '50px', 
              color: '#ffffff', 
              cursor: 'pointer', 
              boxShadow: '0 10px 25px rgba(0, 86, 179, 0.2)', 
              transition: 'all 0.3s ease', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }} 
            onMouseOver={(e) => { 
              e.currentTarget.style.transform = 'translateY(-5px)'; 
              e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 86, 179, 0.3)'; 
            }} 
            onMouseOut={(e) => { 
              e.currentTarget.style.transform = 'translateY(0)'; 
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 86, 179, 0.2)'; 
            }}
          >
            <span style={{ fontSize: '26px', fontWeight: '700', letterSpacing: '1px', marginBottom: '8px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              FAÇA PARTE DOS NOSSOS FÓRUNS
            </span>
            <span style={{ fontSize: '15px', fontWeight: '400', opacity: 0.95 }}>
              Clique aqui para compartilhar suas opiniões e descobrir novos livros 💬
            </span>
          </div>

          <h2 style={{ 
            textAlign: 'center', 
            color: '#2c3e50', 
            fontWeight: '700',
            fontSize: '28px',
            marginBottom: '40px' 
          }}>
            Livros Recomendados para você
          </h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '25px' }}>
            {livrosFiltrados.length > 0 ? (
              livrosFiltrados.map((livro) => (
                <BookCard key={livro.id} livro={livro} />
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#777', fontSize: '18px', marginTop: '20px', width: '100%', fontWeight: '600' }}>
                Nenhum livro encontrado para a sua pesquisa.
              </p>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default HomePage;