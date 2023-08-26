import react from 'react';

function Box(props){
    function marking(){
        props.mark(props.i, props.j);
    }
    return (
        <div key={props.i+props.j} id={''+props.i+props.j} className='inside-boxes' onClick={marking}>{props.t != '-1' ? props.t == '0' ? 'X' : 'O' : ''}</div>
    )
}

export default Box;