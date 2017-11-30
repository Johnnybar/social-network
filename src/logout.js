import React from 'react';

export default function Logout (){

return(
    <form action='/logOut' method='post'>
   <button type='submit'>
       Log Out
   </button>
   </form>
    )

}
