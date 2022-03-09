import React from "react";
import SondageDisplay from "../components/display/SondageDisplay";

function Sondage({ sondagesData }) {
  return (
    <div>
      {sondagesData.map((item, index) => (
        <SondageDisplay currentSondage={item}  key={index} />
      ))}
    </div>
  );
}

export default Sondage;
