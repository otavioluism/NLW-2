import React from 'react';


import Whatsapp from '../../assets/images/icons/whatsapp.svg';


import './styles.css';

const TeacherItem: React.FC = () => { 
  return(
    <article className="teacher-item">
    <header>
      <img src="https://avatars1.githubusercontent.com/u/43592310?s=460&u=48323dabcc77b148e26878bc5e0ae015b4618c4f&v=4" alt="Otávio Luis Martins"/>
      <div>
        <strong>Otávio Luis Martins</strong>
        <span>Quimíca</span>
      </div>
    </header>
    
    <p>
      Entusiasta das melhores tecnologias de quimica avançada.
    </p>

    <footer>
      <p>
        Preço/hora
        <strong>R$ 80,00</strong>
      </p>
      <button type="button">
        <img src={Whatsapp} alt="Whatsapp"/>
        Entrar em contato
      </button>
    </footer>

  </article>
  );
}

export default TeacherItem;