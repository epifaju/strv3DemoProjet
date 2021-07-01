import {fetchPays, fetchTypePersonne} from './client';

export function startGetUser() {
  console.log('startGetUser');
  return { type: 'GET_USER_START' };
};

export function succeedGetUser(user) {
  console.log('succeedGetUser');
  return { type: 'GET_USER_SUCCESS', user };
};

export function failGetUser(err) {
  console.log('failGetUser');
  return { type: 'GET_USER_FAIL', err };
};

export function setLocation(page) {
  console.log('setLocation');
  return { type: 'SET_LOCATION', page };
};

export function getPays() {
  console.log('getPays');
  return async function(dispatch){
    try {
      const list = await fetchPays();
      dispatch({type: 'SET_PAYS', list});  
    } catch (error) {
      dispatch({type:'ERROR_PAYS'}); 
    }

    };
};

export function getTypePersonne() {
  console.log('getTypePersonne');
  return async function(dispatch){
    try {
      const listTypePersonne = await fetchTypePersonne();
      dispatch({type: 'SET_TYPE_PERSONNE', listTypePersonne});  
    } catch (error) {
      dispatch({type:'ERROR_TYPE_PERSONNE'}); 
    }

    };
};

export function getLocalStorage () {
  console.log('getLocalStorage');
  let list = localStorage.getItem('list');
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')));
  } else {
    return [];
  }
};