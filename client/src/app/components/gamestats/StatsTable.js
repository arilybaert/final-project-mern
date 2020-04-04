import React from 'react';

const StatsTable = () => {

    return (
        <div className="row o-table o-bgc">
        <table className="m-table col-12">
            <tr>
                <th></th>
                <th>pt.</th>
                <th>2pt</th>
                <th>3pt</th>
                <th>%</th>
                <th>stl</th>
                <th>blk</th>
                <th>to</th>
            </tr>   
                                <tr>
                                    <td>James</td>
                                    <td>44</td>
                                    <td>6</td>
                                    <td>3</td>
                                    <td>45%</td>
                                    <td>2</td>
                                    <td>1</td>
                                    <td>3</td>
                                </tr>
        </table>
    </div>    
    )
}

export default StatsTable;