import react from 'react';

function Box(props){
    function marking(event){
        props.mark(props.i, props.j);
        console.log(event.target);
    }
    return (
        <div key={props.i+props.j} id={''+props.i+props.j} className='inside-boxes' onClick={marking} style={props.t == '0' ? {color: 'red'} : {color: 'white'}}>{props.t != '-1' ? props.t == '0' ? 'X' : 'O' : ''}</div>
    )
}

export default Box;