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
      const response = await fetch("https://projeto-yasmim-api.onrender.com/auth/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailLogin, senha: senhaLogin })
      });

      const data = await response.json();

      if (response.ok) {
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
      const response = await fetch("https://projeto-yasmim-api.onrender.com/auth/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nome: nomeCadastro, 
          cpf: cpfCadastro, 
          email: emailCadastro, 
          senha: senhaCadastro,
          confirmaSenha: confirmaSenhaCadastro,
          serie: escolaridadeCadastro 
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
    <>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&display=swap');`}
      </style>


      <div style={{ //degrade
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #ff8c00 0%, #0056b3 100%)', // Laranja para o Azul
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '20px'
      }}>
        
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.90)', 
          backdropFilter: 'blur(10px)', // Desfoca o fundo
          padding: '40px', 
          borderRadius: '24px', 
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          width: '100%', 
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          
          <img 
            src="/logo/logo.jpg" 
            alt="Logo da Biblioteca" 
            style={{ width: '100px', height: 'auto', marginBottom: '10px', display: 'block', margin: '0 auto', borderRadius: '12px' }} 
          />
          
          <h1 style={{ 
            fontFamily: "'Fredoka', sans-serif", 
            fontSize: '42px', 
            fontWeight: '600', 
            color: '#0056b3', 
            margin: '0 0 5px 0', 
            letterSpacing: '1px' 
          }}>
            ChatBook
          </h1>
          <p style={{ color: '#555', fontSize: '15px', marginBottom: '30px' }}>
            Sua biblioteca digital interativa
          </p>

          {isLogin ? (
            // ================= TELA DE LOGIN =================
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input 
                type="email" placeholder="Email" required
                value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none', backgroundColor: 'rgba(255,255,255,0.9)' }} 
              />
              <input 
                type="password" placeholder="Senha" required
                value={senhaLogin} onChange={(e) => setSenhaLogin(e.target.value)}
                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none', backgroundColor: 'rgba(255,255,255,0.9)' }} 
              />
              <button 
                type="submit" 
                style={{ padding: '14px', backgroundColor: '#0056b3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: 'background 0.3s' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#004494'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#0056b3'}
              >
                Entrar
              </button>
              <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', color: '#555' }}>
                Ainda não é cadastrado?<br/>
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }} style={{ fontWeight: 'bold', color: '#ff8c00', textDecoration: 'none' }}>
                  Faça seu cadastro
                </a>
              </p>
            </form>
          ) : (
            // ================= TELA DE CADASTRO =================
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ textAlign: 'center', marginBottom: '10px', fontSize: '14px', color: '#444' }}>Preencha os espaços abaixo para fazer cadastro:</p>
              
              <input type="text" placeholder="Nome completo*" required value={nomeCadastro} onChange={(e) => setNomeCadastro(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }} />
              <input type="text" placeholder="CPF*" required value={cpfCadastro} onChange={(e) => setCpfCadastro(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }} />
              <input type="email" placeholder="Email*" required value={emailCadastro} onChange={(e) => setEmailCadastro(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }} />
              <input type="password" placeholder="Senha*" required value={senhaCadastro} onChange={(e) => setSenhaCadastro(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }} />
              <input type="password" placeholder="Confirmar senha*" required value={confirmaSenhaCadastro} onChange={(e) => setConfirmaSenhaCadastro(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }} />

              <label style={{ fontSize: '13px', marginTop: '5px', textAlign: 'left', fontWeight: 'bold', color: '#555' }}>Escolaridade:</label>
              <select value={escolaridadeCadastro} onChange={(e) => setEscolaridadeCadastro(e.target.value)} required style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none', backgroundColor: 'white' }}>
                <option value="">Selecione seu grau</option>
                <option value="1">Ensino Fundamental I</option>
                <option value="2">Ensino Fundamental II</option>
                <option value="3">Ensino Médio</option>
              </select>

              <button 
                type="submit" 
                style={{ padding: '14px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px', fontSize: '16px' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
              >
                FAZER CADASTRO
              </button>
              <p style={{ textAlign: 'center', fontSize: '14px', marginTop: '10px', color: '#555' }}>
                Já tem conta?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }} style={{ fontWeight: 'bold', color: '#0056b3', textDecoration: 'none' }}>
                  Faça o Login
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginPage;