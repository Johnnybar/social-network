import React from 'react';

export default function Logo (){
    return(
        <div>
        <div>
            <img id='logo' src='logo.jpg' />
        </div>
        <form  action='logOut' method='post'>
        <button type='submit'>
            Log Out
        </button>
        </form>
    </div>
    )
}
