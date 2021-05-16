import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';


interface BandProps {
    name: string;
}

const Band = (props: BandProps) => {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
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
