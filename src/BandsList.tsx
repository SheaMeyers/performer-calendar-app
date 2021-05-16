import React, { useState } from 'react';
import myBandsList from './exampleBands';



const BandsList = () => {

    return (
        <div className="Bands-List">
            {myBandsList.map(band => {
                return (
                    <p>{band}</p>
                )
            })}
        </div>
    )

}

export default BandsList;
