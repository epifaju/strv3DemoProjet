import { useSelector, useDispatch } from "react-redux";
import { getTypePersonne } from "~/actions.js";
import React from "react";

export default function SelectTypePersonne({onChangeTypePersonne, ...params}) {
      //Récupération des pays dans l'état global --> useSelector
  const typePersonne = useSelector((state) => state.referentielTypePersonne.typePersonne);
  const dispatch = useDispatch();
  if (!typePersonne) {
    dispatch(getTypePersonne());
  }
    return (
            <select name="libelle" onChange={e=>onChangeTypePersonne(e.target.value)} {...params}>
                <option value=""></option>
            {
              //? permet d'arrêter l'exécution si pays est null
              typePersonne?.map((typePers) =>(
                <option key={typePers.type} value={typePers.type}>{typePers.libelle}</option>
              ))
            }
          </select>
        );
    
  };