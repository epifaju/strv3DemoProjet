import React from 'react';
import { useSelector } from 'react-redux';

export default function MasterPage({children}) {
  return <div>
      <div>Master</div>
            {children}
  </div>;
}