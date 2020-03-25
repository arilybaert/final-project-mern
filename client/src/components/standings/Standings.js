import React from 'react';
import classnames from 'classnames';

const Standings = () => {

    return (
        <div className={classnames("row", "o-standings")}>
            <div className={classnames("col-12", "o-tableContainer")}>
                <table className="m-standingsTable">
                    <tr>
                        <th>P</th>
                        <th>Logo</th>
                        <th>Teams</th>
                        <th>W</th>
                        <th>L</th>
                        <th>%</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>
                            <img alt="logo"></img>
                        </td>
                        <td>LaL</td>
                        <td>40</td>
                        <td>12</td>
                        <td>.77</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Standings;