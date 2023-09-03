import react, {useState} from 'react'; 
import {Link} from 'react-router-dom';

function Create(props){  
    const [name, setName] = useState('player');
    const [room, setRoom] = useState('');
    function nameChange(event){
        setName(event.target.value);
    }
    function create(){
        console.log('join room code: '+ room);
        props.k ? props.create(name, props.randomInteger) : props.create(name, room);
    }

    function roomChange(event){
        console.log(event.target.value);
        setRoom(event.target.value)
    }

    return (
        <div>
            <div className='create-box'>
                <input id='name' type="text" placeholder='Enter Name' value={name} onChange={nameChange}/>
                {props.k ? <p>Team Code: {props.randomInteger}</p> : <input id='room' type='text' placeholder='Enter Code' value={room} onChange={roomChange} />}
                <Link to="/start"><button onClick={create} className='button-61'>Create</button></Link>
            </div>
        </div>
    )
}

export default Create;