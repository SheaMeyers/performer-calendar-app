import React from 'react';
import Band from './Band';
import myBandsList from './exampleBands';
import './BandsList.css';



const BandsList = () => {

    return (
        <div className="Bands-List">
            <h2>Performers</h2>
            {myBandsList.map(band => {
                return (
                    <Band key={band.name} name={band.name} color={band.color}/>
                )
            })}
        </div>
    )

}

export default BandsList;
