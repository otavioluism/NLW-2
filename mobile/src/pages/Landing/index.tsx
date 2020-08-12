import React, {useState, useEffect} from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler'; // automatiza o bottao com a estilizacao para cada mobile

import api from '../../services/api';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

const Landing: React.FC = () => { 
  
  const [totalConnections, setTotalConnections] = useState(0); //estado para pegar o total de conexões
  const navigation = useNavigation();

  useEffect(() => { 
    api.get('connections').then(response => {
      const { total } = response.data;

      setTotalConnections(total);
    })
  }, []);

  function handleNavigateToGiveClassesPage(){ 
    navigation.navigate('GiveClasses'); // navegando para outra página do app pelo nome criado nas rotas
  }

  function handleNagateToStudyPages() { 
    navigation.navigate('Study'); // indo para a aba com o nome Study 
  }

  return (
    <View style={styles.container} >
        <Image source={landingImg} style={styles.banner}></Image>

        <Text style={styles.title}>
          Seja Bem-vindo, {'\n'}
          <Text style={styles.titleBold}>O que deseja fazer?</Text>
        </Text>

        <View style={styles.buttonsContainer}>

            <RectButton onPress={handleNagateToStudyPages} style={[styles.button, styles.buttonPrimary]}>
              <Image source={studyIcon}/>
              <Text style={styles.buttonText}>Estudar</Text>
            </RectButton>

            <RectButton onPress={handleNavigateToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
              <Image source={giveClassesIcon}/>
              <Text style={styles.buttonText}>Dar Aulas</Text>
            </RectButton>          
        </View>

        <Text style={styles.totalConnections}>
          Total de {totalConnections} conexões já realizadas {' '}
          <Image source={heartIcon}/>
        </Text>
    </View>
  );
}

export default Landing;