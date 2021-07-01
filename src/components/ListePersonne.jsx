import React, { useState, useEffect } from "react";
//import {listPersonnes, deletePerson} from '~/client';
import {personne} from '~/client';
import { useSelector, useDispatch } from 'react-redux';
import {push} from 'connected-react-router';
import MasterPage from "./MasterPage.jsx";
import { faAddressCard, faTrashAlt, faEye} from "@fortawesome/free-regular-svg-icons";
import Icon from './Icon.jsx';
import { getPays, getTypePersonne, getLocalStorage } from "~/actions.js";
import FormulairePersonne from "./FormulairePersonne.jsx";

export default function ListePersonne() {
  const [statut, setStatut] = useState(1);
  const [list, setList] = useState(getLocalStorage());
  const [selectedUser, setSelectedUser] = useState();
  const dispatch = useDispatch();
  const paysList = useSelector(state => state.referentiel.pays);
  const typePersList = useSelector(state => state.referentielTypePersonne.typePersonne);
  if (!paysList) {
    dispatch(getPays());
  }
  if(!typePersList){
    dispatch(getTypePersonne());
  }
  useEffect(async function() {
    if (statut === 1){
      setList(await personne.listPersonnes()); 
      setStatut(2);
    }
  }, [statut]);
  
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  return (
    <MasterPage>
      <div style={{display:"flex"}}>
      <div>
      {list && 
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
          { list.map((p, i)=>
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
      {!list && 'Chargement en cours'}
      </div>
      <div>
        {selectedUser && <FormulairePersonne id={selectedUser} onChangeUser={()=>setStatut(1)} />}
      </div>
      </div>
    </MasterPage>
  );
}
