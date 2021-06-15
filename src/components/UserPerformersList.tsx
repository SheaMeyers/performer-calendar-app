import React from 'react';
import { useSelector } from "react-redux";
import UserPerformer from './UserPerformer';
import { ReduxState } from "../redux";

interface PerformerType {
    id: number;
    name: string;
    hex_color: string;
}

interface UserPerformersListProps {
    showCheckbox?: boolean;
}


const UserPerformersList = (props: UserPerformersListProps) => {

    const allPerformers = useSelector<ReduxState, ReduxState["allPerformers"]>(
        (state) => state.allPerformers
      );

    return (
        <>
            {allPerformers.map((performer: PerformerType) => {
                return (
                    <UserPerformer 
                        key={performer.name} 
                        id={performer.id} 
                        name={performer.name} 
                        hex_color={performer.hex_color} 
                        showCheckbox={props.showCheckbox}
                    />
                )
            })}
        </>
    )

}

export default UserPerformersList;
