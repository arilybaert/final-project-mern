import React from 'react';

const AllLeagueData = ({data}) => {
// TODO ADD STYLE TO IMAGE
    return (
        <tr>
            <td className="a-standings">{data.defaultOrder}</td>
            <td>
                <img alt="logo" class="a-standingsLogo" src={`${process.env.REACT_APP_IMAGE_LINK_PREFIX}${data.teamCode}${process.env.REACT_APP_IMAGE_LINK_SUFFIX}`}></img>
            </td>
            <td>{data.teamName}</td>
            <td>{data.win}</td>
            <td>{data.loss}</td>
            <td>{data.winPctV2}</td>
        </tr>
    )
}

export default AllLeagueData;