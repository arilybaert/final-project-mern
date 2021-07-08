import React from 'react';

const ConferenceLeagueData = ({data}) => {

    return (
        <tr>
            <td className="a-standings">{data.confRank}</td>
            <td>
            <img alt="logo" className="a-standingsLogo" src={`${process.env.REACT_APP_IMAGE_LINK_PREFIX}${data.teamCode}${process.env.REACT_APP_IMAGE_LINK_SUFFIX}`}></img>
            </td>
            <td>{data.teamName}</td>
            <td>{data.win}</td>
            <td>{data.loss}</td>
            <td>{data.winPctV2}</td>
        </tr>
    )
}

export default ConferenceLeagueData;