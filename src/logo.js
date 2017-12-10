import React from 'react';
import { Link } from 'react-router';

export default function Logo (){
    return(
        <div>
        <div>
            <Link to='/'><img id='logo' src='logo2.png' /></Link>
        </div>
    </div>
    )
}
