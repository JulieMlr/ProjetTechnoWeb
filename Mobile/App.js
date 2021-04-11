import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Axios from "axios";
import { API_ROOT_URL } from './config';
import Inscription from './src/Inscription'


const fetchUser = async () => {
  try {
    const {data} = await Axios.get(
      API_ROOT_URL + `/utilisateur/`
    );
    return data
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export default function App() {
   useEffect(() => {
     fetchUser().then((res) => {
      console.log(res)
     })
     .catch((err) => {
      console.log(err);
      throw err;
     })
   }, [])
  return (
    <View style={styles.container}>
      <Inscription/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
