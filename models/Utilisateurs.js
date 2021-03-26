const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UtilisateurSchema = new schema({
    nom: { type : String, required: "nom obligatoire"},
    prenom: { type : String, required: "prenom obligatoire"},
    email: { type: String, required: "email obligatoire"},
    motDePasse: { type: String, required: "mot de passe obligatoire"},
    dateDeNaissance: { type : Date},
    taille: { type: Number},
    poids: { type: Number},
    sexe: { type: Boolean},
    photo : { type: String},
    tableauCourse : [String],
    droit: { type: Boolean, default: false}
})

module.exports = mongoose.model("utilisateur", UtilisateurSchema);