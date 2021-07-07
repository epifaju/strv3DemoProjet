import { getLocalStorage } from "~/actions.js";
const personnes = [{nom:'Toto', prenom:'tata',age:'25', id:'1', pays:'DE', ville:'Munich', type:'PH'}];
let compteur = 2;
export function updatePersonne(personne){
  console.log('updatePersonne');
  return new Promise((resolve, reject) => setTimeout(() =>{
    let person = personnes.find(p => p.id == personne.id);
    person.nom=personne.nom;
    person.prenom=personne.prenom;
    person.age=personne.age;
    person.pays=personne.pays;
    person.ville=personne.ville;
    person.type=personne.type;
    resolve()}, 1000));
  }
  export function addPersonne(personne){
    console.log('addPersonne');
    return new Promise((resolve, reject) => setTimeout(() => {
      personne.id = compteur++;
      personnes.push(personne);
      resolve(personne.id)}, 1000));
  }
export function listPersonnes(){
  console.log('listPersonnes');
  return new Promise((resolve) => setTimeout(() => resolve(personnes), 1000));
}
export function fetchPersonne(id){
console.log('fecthPersonne');
  return new Promise((resolve) => setTimeout(() => resolve(personnes.find(p => p.id==id)), 1000));
}

export function deletePerson(idPersonne){
  console.log('deletePerson');
  return new Promise((resolve) => setTimeout(() => {
    const persTempIndex = personnes.findIndex(p => p.id == idPersonne);
  personnes.splice(persTempIndex,1);
   resolve()}, 1000));
}
export function fetchListPersonnes (rechParams){
  console.log('fetchListPersonnes');
  console.log('Critères recherche');
  console.log(rechParams);
  let listPersonnes = [];
  let resultRecherche = [];
  listPersonnes = getLocalStorage();
  console.log('listPersonne dans la localStorage');
  console.log(listPersonnes);
  resultRecherche = listPersonnes.filter((personne) =>(personne.nom === rechParams.nom 
    || personne.prenom === rechParams.prenom));
    console.log('resultRecherche from fetchListPersonnes');
    console.log(resultRecherche);
  return new Promise((resolve) => setTimeout(() => resolve(resultRecherche), 1000));
}