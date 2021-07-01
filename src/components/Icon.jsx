import React from 'react'; 
export default function Icon({ fa, style = {}, ...params }) {
    return <svg style={{width:'1.5em',...style}} xmlns="http://www.w3.org/2000/svg"  viewBox={`0 0 ${fa.icon[0]} ${fa.icon[1]}`} {...params}>
      <path d={fa.icon[4]} />
    </svg>;
    /**className={`fill-current inline -top-px relative ${className} ${className.includes('w-') ? '' : 'w-6'}`} */
  };