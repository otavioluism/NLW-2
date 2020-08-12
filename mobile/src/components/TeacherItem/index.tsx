import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

export interface Teacher { 
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: number;
}

interface TeacherItemProps { 
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher, favorited}) => { 
  const [isFavorited, setIsFavorites] = useState(favorited);

  function handleLinkToWhatsapp() { 
    api.post('connections', {
      user_id: teacher.id,
    })

    Linking.openURL(`https://api.whatsapp.com/send?phone=55${teacher.whatsapp}`)
  }

  async function handleToggleFavorite() { 
    const favorites = await AsyncStorage.getItem('favorites');

    let favoritesArray = [];

    if(favorites){
      favoritesArray = JSON.parse(favorites); // convertendo em um array
    }

    if (isFavorited){ 
      //remover dos favoritos
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => { 
        return teacherItem.id === teacher.id;
      });

      // remover o elemento da posicao favorite index e somente 1 elemento
      favoritesArray.splice(favoriteIndex, 1);
      
      setIsFavorites(false);
    } else { 
      // adicionar aos favoritos    
      favoritesArray.push(teacher);

      setIsFavorites(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));

  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{ uri: teacher.avatar }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>
      
      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
        <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text> 

        <View style={styles.buttonsContainer}>
          <RectButton 
            onPress={handleToggleFavorite}
            style={[
              styles.favoriteButton, 
              isFavorited ? styles.favorited : {},
            ]}
          >

            { isFavorited 
              ? <Image source={unFavoriteIcon}/> 
              : <Image source={heartOutlineIcon}/>
            }
             
          </RectButton>

          <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
            <Image source={whatsappIcon}/> 
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>

        </View>

      </View>
    </View>
  );
}

export default TeacherItem;