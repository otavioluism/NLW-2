import React, { useState } from 'react'; 
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

const TeacherList:React.FC = () => { 
  const [favorites, setFavorites] = useState([]);

  function loadFilters(){
    AsyncStorage.getItem('favorites').then(response => {
      if(response){ 
        
        const favoritedTeachers = JSON.parse(response); // convertendo para o formato JSON

        setFavorites(favoritedTeachers); // salvando os ids dos favoritados
      }
    });
  }

  useFocusEffect(() => { 
    loadFilters();
  });

  return(
  <View style={styles.container} >
    <PageHeader title="Meus proffys favoritos" />
    <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
         {favorites.map((teacher: Teacher) => { 
           return ( 
             <TeacherItem 
              key={teacher.id}
              teacher={teacher}
              favorited
             />
           )
         })}

      </ScrollView>
  </View>
  );
}

export default TeacherList;