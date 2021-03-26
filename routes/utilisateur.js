const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");

const Utilisateur = require("../models/Utilisateurs");

router.get("/", (req, res) => {
  Utilisateur.find()
    .then((utilisateurs) => res.send(utilisateurs))
    .catch((err) => console.log(err));
});

router.get("/inscription", (req, res) => {
  res.sendFile(path.resolve("inscription.html"));
});

router.get("/connexion", (req, res) => {
  res.sendFile(path.resolve("connexion.html"));
});

router.post("/inscriptionMobile", (req, res) => {
  const nom = req.query.nom;
  console.log(nom)
  res.send(nom)
})

router.post("/information", async (req, res) => {
  const email = req.body.user_mail;
  const motDePasse = req.body.user_password;
  console.log(motDePasse);
  Utilisateur.findOne({ email: email })
    .then((utilisateurs) => {
      if (utilisateurs == null) {
        res.sendFile(path.resolve("connexion.html"));
      } else {
        bcrypt.compare(
          motDePasse,
          utilisateurs.motDePasse,
          function (err, response) {
            if (response == true) {
              res.send("Hello");
            } else {
              res.sendFile(path.resolve("connexion.html"));
            }
          }
        );
      }
    })
    .catch((err) => res.send(err));
});

router.post("/inscription", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.user_password, salt);
  const nom = req.body.user_name;
  const prenom = req.body.user_surname;
  const motDePasse = hash;
  const email = req.body.user_mail;
  const admin = req.body.admin;
  const dateDeNaissance = req.body.user_date;
  const taille = req.body.taille;
  const poids = req.body.poids;
  const sexe = req.body.sexe;
  const photo = req.body.photo;
  const tableauCourse = req.body.tableauCourse;

  if (admin == "on") {
    var droit = 1;
  } else {
    var droit = 0;
  }

  const newUtilisateur = new Utilisateur({
    nom,
    prenom,
    email,
    motDePasse,
    dateDeNaissance,
    taille,
    poids,
    sexe,
    photo,
    tableauCourse,
    droit,
  });
  newUtilisateur
    .save()
    .then((utilisateurs) => res.send("Utilisateur a bien été crée"))
    .catch((err) => console.log(err));
});

router.post("/:_id", (req, res) => {
  const { _id } = req.params;
  const addCourseUtilisateur = req.body;
  Utilisateur.findOneAndUpdate({ _id }, { $push: addCourseUtilisateur })
    .then((utilisateurs) => res.send("utilisateur Updated"))
    .catch((err) => console.log(err));
});

router.get("/:_id", (req, res) => {
  const { _id } = req.params;
  Utilisateur.findOne({ _id })
    .then((utilisateurs) => res.send(utilisateurs))
    .catch((err) => console.log(err));
});

router.put("/:_id", (req, res) => {
  const { _id } = req.params;
  const modifyUser = req.body;
  Utilisateur.findOneAndUpdate({ _id }, { $set: modifyUser })
    .then((utilisateurs) => res.send("utilisateur Updated"))
    .catch((err) => console.log(err));
});

router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  Utilisateur.findOneAndDelete({ _id: _id })
    .then((utilisateurs) => res.send("success"))
    .catch((err) => console.log(err));
});

module.exports = router;
