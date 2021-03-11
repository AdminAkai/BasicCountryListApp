import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, Pressable, Alert } from 'react-native';
import axios from 'axios'

export default function App() {

  const [countriesData, setCountriesData] = useState([])

  const fetchCountriesData = async () => {
    try {
      const res = await axios.get('https://restcountries.eu/rest/v2/region/africa?fields=name;capital')
      setCountriesData([...res.data])
    }
    catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCountriesData()
  }, [])

  return (
    <FlatList
      data={countriesData}
      contentContainerStyle={styles.container}
      keyExtractor={item => item.name}
      renderItem={
        ({item}) => 
          <Text
            onPress={() => {Alert.alert(`The Capital of ${item.name} is ${item.capital}`)}} 
            style={styles.text} 
            key={item.name}
          >
            {item.name}
          </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#483D8B',
  },
  text: {
    fontSize: 18,
    margin: 5,
    color: '#fff'
  }
});
