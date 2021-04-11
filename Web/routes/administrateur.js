const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");

const Administrateur = require("../models/Administrateurs");

router.get("/", (req, res) => {
  Administrateur.find()
    .then((administrateurs) => res.send(administrateurs))
    .catch((err) => console.log(err));
});

router.get("/inscriptionAdmin", (req, res) => {
  res.sendFile(path.resolve("inscription.html"));
});

router.get("/connexionAdmin", (req, res) => {
  res.sendFile(path.resolve("connexion.html"));
});

router.post("/inscriptionAdmin", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.user_password, salt);
  const nom = req.body.user_name;
  const prenom = req.body.user_surname;
  const motDePasse = hash;
  const email = req.body.user_mail;

  const newAdministrateur = new Administrateur({
    nom,
    prenom,
    email,
    motDePasse,
  });
  newAdministrateur
    .save()
    .then((administrateur) => res.send("Administrateur a bien été crée"))
    .catch((err) => console.log(err));
});

router.get("/:_id", (req, res) => {
  const { _id } = req.params;
  Administrateur.findOne({ _id })
    .then((administrateurs) => res.send(administrateurs))
    .catch((err) => console.log(err));
});

router.put("/:_id", (req, res) => {
  const { _id } = req.params;
  const modifyUser = req.body;
  Administrateur.findOneAndUpdate({ _id }, { $set: modifyUser })
    .then((administrateurs) => res.send("Admin Updated"))
    .catch((err) => console.log(err));
});

router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  Administrateur.findOneAndDelete({ _id: _id })
    .then((administrateurs) => res.send("success"))
    .catch((err) => console.log(err));
});

router.post("/detail", async (req, res) => {
  const email = req.body.user_mail;
  const motDePasse = req.body.user_password;
  console.log(motDePasse);
  Administrateur.findOne({ email: email })
    .then((administrateurs) => {
      if (administrateurs == null) {
        res.sendFile(path.resolve("connexion.html"));
      } else {
        bcrypt.compare(
          motDePasse,
          administrateurs.motDePasse,
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

module.exports = router;