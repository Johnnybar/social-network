import React from 'react';
import { Link } from 'react-router';

export default function Logo (){
    return(
        <div className='logoPageTop'>

            <Link to='/'><img id='logo' src='/trackshare.png' /></Link>
            <img src= '/descriptionByLogo.png' id='description-by-logo'/>

    </div>
    )
}
