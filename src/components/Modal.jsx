import react, {useEffect} from 'react';

function Modal(props){
    function playAgain(){
        props.playAgain();
    }
    return (
    <div className='modal'>
        <h1>Game Over!</h1>
        <h3>{props.winner == -1 ? 'Draw!' : 'Player '+props.winner+' wins!'}</h3>
        <button onClick={playAgain}>Play Again</button> 
    </div>
    )
}

export default Modal;