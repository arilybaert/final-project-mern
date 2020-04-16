import React from 'react';

const DivisionLeagueStandings = ({data}) => {

    return (
        <tr>
            <td className="a-standings">{data.divRank}</td>
            <td>
                <img alt="logo"></img>
            </td>
            <td>{data.teamName}</td>
            <td>{data.win}</td>
            <td>{data.loss}</td>
            <td>{data.winPctV2}</td>
        </tr>
    )
}

export default DivisionLeagueStandings;