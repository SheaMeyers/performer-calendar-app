import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from "react-redux";
import '../css/Performer.css';


interface PerformerProps {
    id: number;
    name: string;
    hex_color: string;
}

const Performer = (props: PerformerProps) => {
    const [checked, setChecked] = useState<boolean>(true);

    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if (event.target.checked) {
            dispatch({ type: "ADD_SELECTED_PERFORMER", payload: props });
        } else {
            dispatch({ type: "REMOVE_SELECTED_PERFORMER", payload: props.name });
        }
    };

    return (
        <div className="Performer-div">
            <Checkbox
                checked={checked}
                onChange={handleChange}
                style={{color: `${props.hex_color.toLocaleLowerCase()}`}}
            />
            <p>{props.name}</p>
        </div>
    )

}

export default Performer;
