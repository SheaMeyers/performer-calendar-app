import React, { Fragment } from 'react';
import UserPerformer from './UserPerformer';
import myPerformersList from '../examplePerformers';

interface PerformerType {
    name: string;
    color: string;
}


const UserPerformersList = () => {

    return (
        <Fragment>
            {myPerformersList.map((performer: PerformerType) => {
                return (
                    <UserPerformer key={performer.name} name={performer.name}/>
                )
            })}
        </Fragment>
    )

}

export default UserPerformersList;
