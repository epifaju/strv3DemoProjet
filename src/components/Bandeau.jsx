import React from 'react';
import { useSelector } from 'react-redux';
import version from '~/version.js';
export default function Bandeau() {
  const loginAffiche = useSelector(state => state.login);
  return <div>Startrac {version}  <span>{loginAffiche}</span>
  </div>;
}
