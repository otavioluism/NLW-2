import React from 'react';

import api from '../../services/api';

import Whatsapp from '../../assets/images/icons/whatsapp.svg';


import './styles.css';

export interface Teacher { 
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}


interface TeacherItemProps{ 
  dados: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({dados}) => { 

  //funcao
  function createNewConnection() { 
    api.post('/connections', { 
      user_id: dados.id,
    })
  }

  return(
    <article className="teacher-item">
    <header>
      <img src={dados.avatar} alt="Nome do endereço da foto"/>
      <div>
        <strong>{dados.name}</strong>
        <span>{dados.subject}</span>
      </div>
    </header>
    
    <p>
      {dados.bio}
    </p>

    <footer>
      <p>
        Preço/hora
        <strong>R$ {dados.cost}</strong>
      </p>
      <a 
        target="_blank" 
        rel="noopener noreferrer"
        onClick={createNewConnection} 
        href={`https://wa.me/${dados.whatsapp}`} 
      >

        <img src={Whatsapp} alt="Whatsapp"/>
        Entrar em contato

      </a>
    </footer>

  </article>
  );
}

export default TeacherItem;