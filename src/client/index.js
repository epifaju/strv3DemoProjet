import * as personne from './personne.js'

export {personne};

export function fetchUser() {
  return new Promise((resolve) => setTimeout(() => resolve('user'), 1000));
}

export function fetchPays(){
  return new Promise((resolve) => setTimeout(() => resolve(
    [{code:'FR',titre:'France', villes:['Lyon', 'Paris']},
    {code:'DE',titre:'Allemagne',villes:['Berlin', 'Munich']},
    {code:'IT',titre:'Italie',villes:['Naples', 'Rome']},
    {code:'ES',titre:'ESPAGNE',villes:['Barcelone', 'Madrid']}]), 2000));
}

export function fetchTypePersonne(){
  return new Promise((resolve) => setTimeout(() => resolve(
    [{type:'PH',libelle:'Personne Physique'},
    {type:'PM',libelle:'Personne Morale'}]), 2000));
}
// export function fetchVille(){
//   return new Promise((resolve) => setTimeout(() => resolve([{code:'PR',titre:'Paris', codePays="FR"},
//   {code:'BE',titre:'Berlin', codePays="DE"},
//   {code:'MI',titre:'Milan',codePays="IT"},
//   {code:'BR',titre:'Barcelone',codePays="ES"}]), 2000));
// }