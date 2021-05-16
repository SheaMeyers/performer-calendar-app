import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from "react-redux";


interface BandProps {
    name: string;
}

const Band = (props: BandProps) => {
    const [checked, setChecked] = useState<boolean>(true);

    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if (event.target.checked) {
            dispatch({ type: "ADD_BAND", payload: props.name });
        } else {
            dispatch({ type: "REMOVE_BAND", payload: props.name });
        }
    };

    return (
        <div>
            <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            <p>{props.name}</p>
        </div>
    )

}

export default Band;
