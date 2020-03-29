import React from 'react';
import classnames from 'classnames';


const FavoHeader = () => {

    return (
        <div className="row">
            <div className={classnames("col-12", "o-favoHeader")}>
                        <span className="a-favoritesHeader">Favorites</span>
            </div>
        </div>
    )
}

export default FavoHeader;