import React, { Fragment } from 'react';
import UserPerformer from './UserPerformer';
import myBandsList from '../exampleBands';

interface BandType {
    name: string;
    color: string;
}


const UserPerformersList = () => {

    return (
        <Fragment>
            {myBandsList.map((band: BandType) => {
                return (
                    <UserPerformer key={band.name} name={band.name}/>
                )
            })}
        </Fragment>
    )

}

export default UserPerformersList;
