import React from 'react';
import {Link} from 'react-router-dom'

import {FAVORITES_EDIT} from '../../routes';

const FavoAddBtn = () => {

    return (
        <Link to={FAVORITES_EDIT}>
            <div className="o-favoAddBtn">
                <span className="a-favoAddBtn">Edit</span>
            </div>
        </Link>
    )
}

export default FavoAddBtn;