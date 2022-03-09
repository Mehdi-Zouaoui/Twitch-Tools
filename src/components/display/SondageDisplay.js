import React from 'react';



function SondageDisplay({currentSondage , key}) {
    console.log(currentSondage);
    return (
        <div>
            <h2>{currentSondage.title}</h2>
            <div className="sondageFlexContainer">
                {currentSondage.fields.map((field , index) => (
                    <div className="sondageField" key={index}>{field.name}</div>
                ))}
            </div>

        </div>
    );
}

export default SondageDisplay;