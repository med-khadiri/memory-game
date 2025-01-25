import React from 'react';
import './SingleCard.css';

// Le composant reçoit quatre props du parent
export default function SingleCard({ card, handleChoice, flipped, disabled }) {

    // handleClick est appelée lorsque l'utilisateur clique sur la carte.
    // Si la carte n'est pas désactivée, la fonction handleChoice est déclenchée avec la carte en paramètre.
    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);  // On passe la prop 'card' à la fonction handleChoice
        }
    }

    return (
        <div className='card'>
            <div className={flipped ? "flipped" : ""}>
                {/* La prop 'flipped' détermine si la carte doit être retournée. */}
                <img className='front' src={card.src} alt='face de la carte' /> {/* La prop 'card' est utilisée pour obtenir l'image de la carte */}
                <img
                    className='back'
                    src='/img/brainset.png'
                    alt='dos de la carte'
                    onClick={handleClick}  // Lorsque la carte est cliquée, handleClick est déclenchée
                />
            </div>
        </div>
    )
}
