import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  
  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');

  const [nomeCadastro, setNomeCadastro] = useState('');
  const [cpfCadastro, setCpfCadastro] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [confirmaSenhaCadastro, setConfirmaSenhaCadastro] = useState('');
  const [escolaridadeCadastro, setEscolaridadeCadastro] = useState('');

  // ================= FUNÇÃO DE LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch("https://projeto-web-93xg.onrender.com/auth/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailLogin, senha: senhaLogin })
      });

      const data = await response.json();

      if (response.ok) {
        // SALVANDO O NOVO TOKEN DO BACK-END NO NAVEGADOR!
        localStorage.setItem('token', data.token);
        
        alert(`Login efetuado com sucesso!`);
        navigate('/home'); 
      } else {
        alert(data.error || data.message || "Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  // ================= FUNÇÃO DE CADASTRO =================
  const handleRegister = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch("https://projeto-web-93xg.onrender.com", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nome: nomeCadastro, 
          cpf: cpfCadastro, 
          email: emailCadastro, 
          senha: senhaCadastro,
          confirmaSenha: confirmaSenhaCadastro, // Agora mandamos para o back-end validar
          serie: escolaridadeCadastro // O back-end chama de 'serie' agora
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Cadastro realizado com sucesso! Faça seu login.");
        setIsLogin(true); 
      } else {
        alert(data.error || data.message || "Erro ao realizar cadastro.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f4f7f6'
    }}>
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '50px 40px', 
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
        width: '100%', 
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        
        <img 
          src="/logo/logo.jpg" 
          alt="Logo da Biblioteca" 
          style={{ width: '200px', height: 'auto', marginBottom: '20px', display: 'block', margin: '0 auto' }} 
        />
        
        <h2 style={{ 
          color: '#1a202c',
          fontSize: '24px', 
          fontWeight: '700', 
          marginBottom: '35px' 
        }}>
          Login no Sistema
        </h2>

        {isLogin ? (
          // ================= TELA DE LOGIN =================
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input 
              type="email" placeholder="Email" required
              value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
            />
            <input 
              type="password" placeholder="Senha" required
              value={senhaLogin} onChange={(e) => setSenhaLogin(e.target.value)}
              style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} 
            />
            <button type="submit" style={{ padding: '10px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
              Entrar
            </button>
            <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px' }}>
              Ainda não é cadastrado?<br/>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }} style={{ fontWeight: 'bold', color: '#0056b3', textDecoration: 'none' }}>
                Faça seu cadastro
              </a>
            </p>
          </form>
        ) : (
          // ================= TELA DE CADASTRO =================
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ textAlign: 'center', marginBottom: '15px', fontSize: '14px' }}>Preencha os espaços abaixo para fazer cadastro:</p>
            
            <input type="text" placeholder="nome completo*" required value={nomeCadastro} onChange={(e) => setNomeCadastro(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="text" placeholder="CPF*" required value={cpfCadastro} onChange={(e) => setCpfCadastro(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="email" placeholder="email*" required value={emailCadastro} onChange={(e) => setEmailCadastro(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="password" placeholder="senha*" required value={senhaCadastro} onChange={(e) => setSenhaCadastro(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="password" placeholder="Confirmar senha*" required value={confirmaSenhaCadastro} onChange={(e) => setConfirmaSenhaCadastro(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }} />

            <label style={{ fontSize: '14px', marginTop: '5px' }}>escolaridade:</label>
            {/* O value agora é 1, 2 ou 3, exatamente como o back-end exigiu */}
            <select value={escolaridadeCadastro} onChange={(e) => setEscolaridadeCadastro(e.target.value)} required style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}>
              <option value="">Selecione seu grau</option>
              <option value="1">Ensino Fundamental I</option>
              <option value="2">Ensino Fundamental II</option>
              <option value="3">Ensino Médio</option>
            </select>

            <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
              FAZER CADASTRO
            </button>
            <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px' }}>
              Já tem conta?{' '}
              <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }} style={{ fontWeight: 'bold', color: '#0056b3', textDecoration: 'none' }}>
                Faça o Login
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginPage;