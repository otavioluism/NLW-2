import React, {useEffect, useState} from 'react';

import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg'

import api from '../../services/api';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClasses from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';


const Landing:React.FC = () => { 
  
  // estado
  const [totalConnections, setTotalConnectios] = useState(0);

  useEffect(() => { 
    api.get('/connections').then(response => { 
     const { total } = response.data;
     setTotalConnectios(total)
    })
  }, []);


  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2> Sua plataforma de estudos online.</h2>
        </div>

        <img 
          src={landingImg}  
          alt="Plataforma de Estudos" 
          className="hero-image" 
        />

        <div className="buttons-container">

          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar"/>
            Estudar
          </Link>


          <Link to="/give-classes" className="give-classes">
            <img src={giveClasses} alt="Dar Aulas"/>
            Dar Aulas
          </Link>

        </div>

        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas 
          <img src={purpleHeartIcon} alt="Coração Roxo"/>
        </span>

      </div>
  </div>
  );
}

export default Landing;