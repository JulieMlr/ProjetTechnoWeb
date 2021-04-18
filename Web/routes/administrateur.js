const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');

const Administrateur = require('../models/Administrateurs');
const Utilisateur = require('../models/Utilisateurs');

router.get('/', (req, res) => {
  /*Administrateur.find()
    .then((administrateurs) => res.send(administrateurs))
    .catch((err) => console.log(err));*/
  res.sendFile(path.resolve('accueil.html'));
});

router.get('/delete/:_idAdmin/:_id', (req, res) => {
  const { _id } = req.params;
  const { _idAdmin } = req.params;
  Utilisateur.findOneAndDelete({ _id: _id })
    .then((administrateurs) => res.redirect('/administrateur/' + _idAdmin))
    .catch((err) => console.log(err));
});

router.get('/modifier/:_idAdmin/:_id', (req, res) => {
  const { _id } = req.params;
  const { _idAdmin } = req.params;
  Utilisateur.findOne({ _id: _id }).then((utilisateurs) => {
    res.render('modifierUser.html', {
      idAdmin: _idAdmin,
      id: _id,
      nom: utilisateurs.nom,
      prenom: utilisateurs.prenom,
      email: utilisateurs.email,
      dateDeNaissance: utilisateurs.dateDeNaissance,
      tableauCourse: utilisateurs.tableauCourse,
      motDePasse: utilisateurs.motDePasse,
    });
  });
});

router.get('/inscriptionAdmin', (req, res) => {
  res.sendFile(path.resolve('inscription.html'));
});

router.get('/connexionAdmin', (req, res) => {
  res.sendFile(path.resolve('connexion.html'));
});

router.post('/inscriptionAdmin', async (req, res) => {
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
    .then((administrateur) =>
      res.redirect('/administrateur/' + administrateur._id)
    )
    .catch((err) => console.log(err));
});

router.post('/put', (req, res) => {
  const idAdmin = req.body.admin_id;
  const id = req.body.user_id;
  const nom = req.body.user_nom;
  const prenom = req.body.user_prenom;
  const email = req.body.user_email;
  const date = req.body.user_date;
  Utilisateur.findOneAndUpdate(
    { _id: id },
    { $set: { nom: nom, prenom: prenom, email: email, dateDeNaissance: date } }
  )
    .then((utilisateurs) => res.redirect('/administrateur/' + idAdmin))
    .catch((err) => console.log(err));
});

router.get('/:_id', (req, res) => {
  const { _id } = req.params;
  Utilisateur.find()
    .then((utilisateurs) => {
      Administrateur.findOne({ _id })
        .then((administrateurs) =>
          res.render('accueilConnect.html', {
            id: _id,
            nom: administrateurs.nom,
            prenom: administrateurs.prenom,
            nomUser: ([] = utilisateurs),
          })
        )
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post('/connexion', (req, res) => {
  const email = req.body.user_mail;
  const motDePasse = req.body.user_password;
  Administrateur.findOne({ email: email })
    .then((administrateurs) => {
      if (administrateurs == null) {
        res.sendFile(path.resolve('connexion.html'));
      } else {
        bcrypt.compare(
          motDePasse,
          administrateurs.motDePasse,
          function (err, response) {
            if (response == true) {
              res.redirect('/administrateur/' + administrateurs._id)
            } else {
              res.sendFile(path.resolve('connexion.html'));
            }
          }
        );
      }
    })
    .catch((err) => res.send(err));
})
router.put('/:_id', (req, res) => {
  const { _id } = req.params;
  const modifyUser = req.body;
  Administrateur.findOneAndUpdate({ _id }, { $set: modifyUser })
    .then((administrateurs) => res.send('Admin Updated'))
    .catch((err) => console.log(err));
});

router.delete('/:_id', (req, res) => {
  const { _id } = req.params;
  Administrateur.findOneAndDelete({ _id: _id })
    .then((administrateurs) => res.send('success'))
    .catch((err) => console.log(err));
});

router.post('/detail', async (req, res) => {
  const email = req.body.user_mail;
  const motDePasse = req.body.user_password;
  Administrateur.findOne({ email: email })
    .then((administrateurs) => {
      if (administrateurs == null) {
        res.sendFile(path.resolve('connexion.html'));
      } else {
        bcrypt.compare(
          motDePasse,
          administrateurs.motDePasse,
          function (err, response) {
            if (response == true) {
              res.send("Hello")
            } else {
              res.sendFile(path.resolve('connexion.html'));
            }
          }
        );
      }
    })
    .catch((err) => res.send(err));
});

module.exports = router;
