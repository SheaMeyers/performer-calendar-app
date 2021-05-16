import React from 'react';
import Band from './Band';
import myBandsList from './exampleBands';



const BandsList = () => {

    return (
        <div className="Bands-List">
            {myBandsList.map(band => {
                return (
                    <Band name={band.name} color={band.color}/>
                )
            })}
        </div>
    )

}

export default BandsList;
