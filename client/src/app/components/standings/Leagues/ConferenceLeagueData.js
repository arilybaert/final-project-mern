import React from 'react';

const ConferenceLeagueData = ({data}) => {

    return (
        <tr>
            <td className="a-standings">{data.confRank}</td>
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

export default ConferenceLeagueData;