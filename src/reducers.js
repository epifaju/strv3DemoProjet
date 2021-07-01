import {connectRouter} from 'connected-react-router';

export default function getRootReducer(history){
  return function reduce(state = {}, action) {
    return {
      user: reduceUser(state.user, action),
      //location: reduceLocation(state.location, action),
      referentiel : reduceReferentiel(state.referentiel, action),
      referentielTypePersonne : reduceReferentielTypePersonne(state.referentielTypePersonne, action),
      router:connectRouter(history)(),
      login:reduceLogin(state.login, action),
    };
  };
}

function reduceUser(state = null, action) {
  switch (action.type) {
     case 'GET_USER_SUCCESS':
       return action.user;
     default:
       return state;
   }
 }

 function reduceLogin(state = '', action) {
  switch (action.type) {
     case 'SET_LOGIN':
       return action.login;
     default:
       return state;
   }
 }

// function reduceLocation(state = 'ACC', action) {
//   switch (action.type) {
//     case 'SET_LOCATION':
//       return action.page;
//   }
//   return state;
// }

function reduceReferentiel(state = {}, action) {
  return {
    pays: reducePays(state.pays, action),
  };
}


function reduceReferentielTypePersonne(state = {}, action) {
    return {
      typePersonne: reduceTypePersonne(state.typePersonne, action),
    };
}

function reducePays(state = null, action) {
  switch (action.type) {
    case 'SET_PAYS':
      return action.list;
    case 'SET_LOCATION':
        return null;
  }
  return state;
}

function reduceTypePersonne(state = null, action) {
  switch (action.type) {
    case 'SET_TYPE_PERSONNE':
      return action.listTypePersonne;
    case 'SET_LOCATION':
        return null;
  }
  return state;
}