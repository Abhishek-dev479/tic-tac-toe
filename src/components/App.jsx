import React, {useEffect, useState} from 'react';
import { io } from 'socket.io-client';
import Box from './Box.jsx';
import Modal from './Modal.jsx';

const socket = io.connect("http://localhost:3001");

function App(){
    let [game, setGame] = useState([[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]);
    let [confirm, setConfirm] = useState([false, -2]);
    // let [turn, setTurn] = useState();
    useEffect(function(){
        socket.on('mark', (k) => {
            setGame(k);
        })
        socket.on('connect', () => {
            console.log(socket.id);
        })
        socket.on('winner', (i) => {
            setConfirm([true, i+1]);
        })
        socket.on('draw', () => {
            setConfirm([true, -1]);
        })
        // socket.on('turn', (jf) => {
        //     console.log('Turn event fired');
        //     setTurn(jf);
        // })
    }, []);

    function playAgain(){
        socket.emit('reset');
        setConfirm([false, -2]);
        // location.reload();
    }
    function mark(i, j){
        console.log('marked: '+i+j);
        socket.emit('mark', socket.id, i, j);
    }

    return (
        <div>
            <div id='box'>
                {game.map((e, i) => {
                    return (
                        e.map((t, j) => {
                            return <Box key={i+j} i={i} j={j} mark={mark} t={t}></Box>
                        }) 
                    )
                })}
            </div>
            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            </button> */}
            {console.log(confirm)}
            {confirm[0] && <Modal winner={confirm[1]} playAgain={playAgain}></Modal>}
        </div>
    )
}

export default App;