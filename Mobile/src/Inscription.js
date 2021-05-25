import axios from "axios";
import React, {  useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { API_ROOT_URL } from "../config";

const Ajout = async (prenom, nom, email, dateDeNaissance, motDePasse) => {
  try {
    const res = axios.post(`${API_ROOT_URL}/utilisateur/inscriptionMobile?nom=${nom}&prenom=${prenom}&email=${email}&dateDeNaissance=${dateDeNaissance}&motDePasse=${motDePasse}`)
    //console.log('data : '+res.data)
    return (await res.catch()).data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};



const Inscription = (props) => {
  const [prenom, setPrenom] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [dateDeNaissance, setDate] = useState(new Date("2000-01-01"));
  const [jourNaissance, setJourN] = useState("01");
  const [moisNaissance, setMoisN] = useState("01");
  const [anneeNaissance, setAnneeN] = useState("2000");

  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 150, width: '100%', marginTop: '-25%' }}
        source={{
          uri: 'https://cdn.discordapp.com/attachments/771665604977491978/840167041507655680/logo_small_mobile.png'
        }} />
      <View style={styles.form}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Nom"
            placeholderTextColor="gray"
            onChangeText={(nom) => setNom(nom)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Prenom"
            placeholderTextColor="gray"
            onChangeText={(prenom) => setPrenom(prenom)}
          />
        </View>
        <View style={styles.inputView2}>
          <View style={styles.inputViewJM}>
            <TextInput
              style={styles.TextInput}
              placeholder="Jour"
              placeholderTextColor="gray"
              onChangeText={(jourNaissance) => setJourN(jourNaissance)}
              keyboardType='numeric'
            />
          </View>

          <View style={styles.inputViewJM}>
            <TextInput
              style={styles.TextInput}
              placeholder="Mois"
              placeholderTextColor="gray"
              onChangeText={(moisNaissance) => setMoisN(moisNaissance)}
              keyboardType='numeric'
            />
          </View>

          <View style={styles.inputViewAnnee}>
            <TextInput
              style={styles.TextInput}
              placeholder="Annee"
              placeholderTextColor="gray"
              onChangeText={(anneeNaissance) => setAnneeN(anneeNaissance)}
              keyboardType='numeric'
            />
          </View>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="gray"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry={true}
            onChangeText={(motDePasse) => setMotDePasse(motDePasse)}
          />
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            setDate(new Date(anneeNaissance + '-' + moisNaissance + '-' + jourNaissance))
            Ajout(prenom, nom, email, dateDeNaissance, motDePasse)
            navigation.navigate('Connexion')
          }}
        >
          <Text style={styles.loginText}>Inscription</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  form: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    width: '80%',
    paddingVertical: '5%',
    backgroundColor: '#eeeeee',
    borderRadius: 10
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 20,
    justifyContent: "center",
  },

  inputView2: {
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 20,
    flexDirection: 'row'
  },

  inputViewJM: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    width: "20%",
    height: 45,
    marginRight: 20
  },

  inputViewAnnee: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    width: "40%",
    height: 45,
    marginLeft: 5,
  },

  TextInput: {
    textAlign: "center",
    color: 'black'
  },

  loginBtn: {
    width: "100%",
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#1abc9c",
    paddingHorizontal: "10%",
  },
  loginText: {
    fontWeight: "bold",
    color: "white",
  },
});

export default Inscription;
