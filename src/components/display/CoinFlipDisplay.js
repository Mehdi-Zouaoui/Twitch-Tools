import {useState} from 'react'

const CoinFlipDisplay = () => {
    const [flip , setFlip] = useState(false);

    const random =  () => {
        console.log('random' ,Math.round(Math.random()))
        return Math.round(Math.random());
    }
    return (
        <div>
            <button onClick={() => setFlip(random() === 1 ? true : false )}>
               Lancer la pièce
            </button>
            <p>{flip ? "Pile" : "Face"}</p>
        </div>
    );
};

export default CoinFlipDisplay;