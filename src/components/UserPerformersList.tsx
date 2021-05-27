import React, { Fragment } from 'react';
import { useSelector } from "react-redux";
import UserPerformer from './UserPerformer';
import { ReduxState } from "../redux";

interface PerformerType {
    id: number;
    name: string;
    hex_color: string;
}


const UserPerformersList = () => {

    const allPerformers = useSelector<ReduxState, ReduxState["allPerformers"]>(
        (state) => state.allPerformers
      );

    return (
        <Fragment>
            {allPerformers.map((performer: PerformerType) => {
                return (
                    <UserPerformer key={performer.name} id={performer.id} name={performer.name} hex_color={performer.hex_color} />
                )
            })}
        </Fragment>
    )

}

export default UserPerformersList;
