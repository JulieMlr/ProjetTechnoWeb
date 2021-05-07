import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import DatePicker from "react-native-datepicker";
import { API_ROOT_URL } from "../config";

const bcrypt = require("bcryptjs");


const Ajout = async (prenom, nom, email, dateDeNaissance, motDePasse) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(motDePasse, salt);
  try {
    const res = axios.post(API_ROOT_URL + `/utilisateur/inscriptionMobile/` + nom + `/` + prenom + `/` + email + `/` + dateDeNaissance + `/` + hash)
    //console.log((await res.catch()).data)
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
  const [dateDeNaissance, setDate] = useState("01-01-2000");


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
        <DatePicker
          style={{ width: 200, marginBottom: 20 }}
          date={dateDeNaissance}
          mode="date"
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-1960"
          maxDate="31-12-3035"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(dateDeNaissance) => setDate(dateDeNaissance)}
        />
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
          onPress={() => Ajout(prenom, nom, email, dateDeNaissance, motDePasse)}
        >
          <Text style={styles.loginText}>Inscription</Text>
        </TouchableOpacity>
      </View>
    </View>
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
