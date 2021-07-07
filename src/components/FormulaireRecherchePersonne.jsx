import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {push} from 'connected-react-router';
//import { updatePersonne, addPersonne, fetchPersonne } from "~/client";
import { personne } from "~/client";
import { getLocalStorage } from "~/actions.js";
import { useParams } from "react-router";
import SelectPays from './SelectPays.jsx';
import SelectVille from './SelectVille.jsx';
import SelectTypePersonne from "./SelectTypePersonne.jsx";
import { faAddressCard, faTrashAlt, faEye} from "@fortawesome/free-regular-svg-icons";
import Icon from './Icon.jsx';

export default function FormulaireRecherchePersonne(rechParams) {

  const dispatch = useDispatch();
  const [user, setUser] = useState({ prenom: "", nom: "", age: "" , type:""});
  const [errors, setErrors] = useState([]);
  const [isRecherche, setIsRecherche] = useState(false);
  const [listRecherchePersonnes, setListRecherchePersonnes] = useState([]);
  const paysList = useSelector(state => state.referentiel.pays);
  const typePersList = useSelector(state => state.referentielTypePersonne.typePersonne);

  useEffect(() => {
    const e = setTimeout(() => setErrors([]), 4000);
    return () => {
      clearTimeout(e);
    };
  }, [errors]);

  useEffect(
    async function () {
      console.log("useEffect getRecherche Personne");
      console.log(user);
      console.log('isRecherche : '+isRecherche);
      console.log('listRecherchePersonnes');
      console.log(listRecherchePersonnes);
     
       /*
        try {
          if (user && user.id) {
            await personne.updatePersonne(user);
            setList(
              list.map((item) => {
                if (item.id === user.id) {
                  return { ...user, prenom: user.prenom, nom:user.nom, age:user.age,type:user.type};
                }
                return item;
              })
            );
          } else {
            const persId = await personne.addPersonne(user);
            setUser({ id: persId, ...user });
            setList([...list, user]);
          }
          //dispatch(push('/personnes'));
        } catch (error) {
          console.log(error);

        }*/
    

        try {
            //TODO : vérification si user n'est pas null
            if(isRecherche===true) {
              let rechParams ={nom:user.nom, prenom:user.prenom};
              console.log('rechParams');
              console.log(rechParams);
              let listRecherchePersonnes = await personne.fetchListPersonnes(rechParams);
              console.log('listPersonnes returned by fetchListPersonnes function');
              console.log(listRecherchePersonnes);
              setListRecherchePersonnes(listRecherchePersonnes);
              setIsRecherche(false);
            }
        } catch (error) {
          console.warn(error);
        }
    },[isRecherche]
  );


  function onSubmitRecherchePersonne() {
    console.log('onSubmitRecherchePersonne');
    console.log(user);
    const anos = [];
    if(user) {

      if (!user.prenom) {
        anos.push("prenom");
      }
      if (!user.nom) {
        anos.push("nom");
      }
      if (!user.type) {
        anos.push("type");
      }
      if (!user.age || isNaN(user.age)) {
        anos.push("age");
      } else {
        const age = parseInt(user.age);
        if (age < 7 || age > 77) {
          anos.push("age");
        }
      }
      if(anos.length===0){
        setIsRecherche(true);
      }
    }else {
      anos.push("prenom");
      anos.push("nom");
      anos.push("age");
      anos.push("type");
    }
    
    setErrors(anos);
  }

  return (
    <div>
      <div>
        <label>Prénom : </label>
        <input
          type="text"
          name="prenom"
          onInput={(e) => setUser({ ...user, prenom: e.target.value })}
          value={ user && user.prenom}
          style={{ borderColor: errors.includes("prenom") ? "red" : null }}
        />
      </div>
      <div>
        <label>Nom: </label>
        <input
          type="text"
          name="nom"
          onInput={(e) => setUser({ ...user, nom: e.target.value })}
          value={user && user.nom}
          style={{ borderColor: errors.includes("nom") ? "red" : null }}
        />
      </div>
      <div>
        <label>Age: </label>
        <input
          type="text"
          name="age"
          onInput={(e) => {
            !isNaN(e.target.value) && setUser({ ...user, age: e.target.value });
          }}
          value={user && user.age}
          style={{ borderColor: errors.includes("age") ? "red" : null }}
        />
      </div>
      <div>
      <label>Type Personne: </label>
        <SelectTypePersonne value={user && user.type} onChangeTypePersonne={type => {
            setUser({ ...user, type });
          }}
          value={user && user.type} style={{ borderColor: errors.includes("type") ? "red" : null }}/>
      </div>
      <div>
      <label>Pays: </label>
        <SelectPays value={user && user.pays} onChangePays={pays => {
            setUser({ ...user, pays });
          }}
          value={user && user.pays} /></div>
      <div>
      <label>Ville: </label>
        <SelectVille value={user && user.ville} onChangeVille={ville => {
            setUser({ ...user, ville });
          }} paysSelected={user && user.pays}
          value={user && user.ville} />
      </div>
      
      <button className="btn" onClick={()=> dispatch(push('/personnes'))}>Retour</button>
      <button className="btn" onClick={onSubmitRecherchePersonne}>Rechercher</button>

      {errors.length!==0 && <div style={{ color: "red" }}>Erreur : renseignez les champs obligatoires</div>}

      {listRecherchePersonnes.length > 0 && 
      <>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Age</th>
            <th>Type</th>
            <th>Nationalité</th>
            <th>Ville</th>
            <th>Modifier</th>
            <th>Supprimer</th>
            <th>Editer en live</th>
          </tr>
        </thead>
        <tbody>
          { listRecherchePersonnes.map((p, i)=>
          <tr key={i} align="center">
            <td>{p.nom}</td>
            <td>{p.prenom}</td>
            <td>{p.age}</td>
            <td>{typePersList?.find(typePers => typePers.type===p.type).libelle}</td>
            <td>{paysList?.find(pay => pay.code===p.pays).titre}</td>
            <td>{p.ville}</td>
            <td style={{verticalAlign:'middle'}}><Icon style={{cursor:'pointer'}} fa={faAddressCard} onClick={()=>dispatch(push(`/personnes/${p.id}`)) }/></td>
            <td style={{verticalAlign:'middle'}}><Icon style={{cursor:'pointer'}} fa={faTrashAlt} onClick={async function(){await personne.deletePerson(p.id); setStatut(1)} }/></td>
            <td style={{verticalAlign:'middle'}}><Icon style={{cursor:'pointer'}} fa={faEye} onClick={async function(){setSelectedUser(p.id)} }/></td>
          </tr>
          )}
        </tbody>
      </table>
      <button className="btn" onClick={()=>dispatch(push('/personnes/0')) }>Ajouter personne</button>
      </>
      }
    </div>
    
  );
}
