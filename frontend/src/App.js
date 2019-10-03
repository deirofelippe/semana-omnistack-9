import React, { useState } from 'react';
import api from './services/api';
import './App.css';
import logo from './assets/logo.svg';

/*
. componente é um conjunto de codigo q pode ser reutilizado (menu, cabeçalho)
. informacao guardada dentro do componente, fica no estado do componente. uma listagem de pessoas q sera armazenada em um lugar p ser mostrada depois em tela.
*/
function App() {
  /*a cada mudanca de valor no input, o email é atualizado pelo setEmail*/
  /*cria a componentizacao e o estado da Session do User */
  const [email, setEmail] = useState('');

  async function handleSubmit(event){
    event.preventDefault(); /*n permite q o submit faça sua acao padrao, q é atualizar a pagina*/

    const response = await api.post('/sessions', { email });
    const {_id} = response.data;
    
    localStorage.setItem("user", _id);
  }

  return (
    <div className="container">
      <img src={logo} alt="AirCnC"/>

      <div className="content">
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL *</label>
          <input 
          type="email" 
          id="email" 
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
          />

          <button className="btn" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
