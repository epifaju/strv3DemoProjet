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

const statuts = {
  NEW: 1,
  VALIDE: 2,
  ENVOI: 3,
  OK: 4,
  KO: 5,
  EDIT: 6,
  RECUP: 7,
};

export default function FormulairePersonne({id}) {
  //const { id } = useParams();
  console.log(id!==null ? id:"");
  const dispatch = useDispatch();
  const [user, setUser] = useState({ prenom: "", nom: "", age: "" , type:""});
  const [errors, setErrors] = useState([]);
  // Récupération des statuts dans l'état du composant
  const [statut, setStatut] = useState(id === '0' ? statuts.NEW : statuts.EDIT);
  const [list, setList] = useState(getLocalStorage());
  /*if(list.length==0){
    setList(user);
  }*/
  //Récupération des pays dans l'état global --> useSelector
  //const pays = useSelector((state) => state.referentiel.pays);
  //if (!pays) {
  //  dispatch(getPays());
  //}

  useEffect(() => {
    const e = setTimeout(() => setErrors([]), 4000);
    return () => {
      clearTimeout(e);
    };
  }, [errors]);

  useEffect(
    async function () {
      console.log("useEffect " + statut);
      if (statut === statuts.VALIDE) {
        console.log('Statut : '+statut);
        setStatut(statuts.ENVOI);
        console.log("setStatut : ENVOI");
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
          // await updateUser(user);
          setStatut(statuts.OK);
          console.log('setStatut : OK');
          //onChangeUser();
          console.log('Redirect to list person');
          dispatch(push('/personnes'));
        } catch (error) {
          console.log('setStatut : KO');
          setStatut(statuts.KO);

        }
      }
      if (statut === statuts.EDIT) {
        console.log('Statut : '+statut);
        setStatut(statuts.RECUP);
        console.log('setStatut : RECUP');
        try {
            //TODO : vérification si user n'est pas null
            let userEdit = await personne.fetchPersonne(id);
          setUser(userEdit);
          console.log('setStatut : NEW');
          setStatut(statuts.NEW);
        } catch (error) {
          console.warn(error);
        }
      }
      if (statut === statuts.OK || statut === statuts.KO) {
        console.log('Statut : '+statut);
        const e = setTimeout(() => setStatut(statuts.NEW), 4000);
        return () => {
          clearTimeout(e);
        };
      }
    },
    [statut]
  );

  useEffect(
    ()=>setStatut(statuts.EDIT), 
    [id]
    );

  function onSubmitUser() {
    console.log('onSubmitUser');
    if (statut !== statuts.NEW) {
      console.log('Statut : '+statut);
      return;
    }
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
    }else {
      anos.push("prenom");
      anos.push("nom");
      anos.push("age");
      anos.push("type");
    }

    setErrors(anos);
    if (!anos.length) {
      console.log('Statut : VALIDE');
      setStatut(statuts.VALIDE);
    }
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
      <button className="btn" onClick={onSubmitUser}>Valider</button>
      {statut === statuts.OK && (
        <div style={{ color: "green" }}>User Enregistré</div>
      )}
      {statut === statuts.KO && <div style={{ color: "red" }}>Erreur</div>}
      {errors.length!==0 && <div style={{ color: "red" }}>Erreur : renseignez les champs obligatoires</div>}
    </div>
  );
}
