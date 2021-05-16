import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { useSelector, useDispatch } from "react-redux";
import { BandsState } from "./BandsReduxStore";


interface BandProps {
    name: string;
}

const Band = (props: BandProps) => {
    const [checked, setChecked] = React.useState(false);
    
    const bands = useSelector<BandsState, BandsState["bands"]>(
        (state) => state.bands
      );

    const dispatch = useDispatch();

    const onAddBand = (band: string) => {
        dispatch({ type: "ADD_BAND", payload: band });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        onAddBand(props.name);
    };

    return (
        <div>
            <p>--- Bands List ---</p>
            <ul>
                {bands.map((band) => {
                return <li key={band}>{band}</li>;
                })}
            </ul>
            <p>------</p>
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
