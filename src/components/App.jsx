import React, {useEffect, useState} from 'react';
import { io } from 'socket.io-client';
import Box from './Box.jsx';
import Modal from './Modal.jsx';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
import Create from './Create.jsx';
import Game from './Game.jsx';

const socket = io.connect("https://tic-tac-toe-backend-ka3c.onrender.com");

function App(){
    let [game, setGame] = useState([[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]);
    let [again, setAgain] = useState([]);
    let [confirm, setConfirm] = useState([false, -2]);
    let [yourName, setYourName] = useState({name: '', score: 0});
    let [turn, setTurn] = useState('');
    let [opponentName, setOpponentName] = useState({name: 'Waiting for opponent to join...', score: ''});
    // let [turn, setTurn] = useState();
    useEffect(function(){
        socket.on('mark', (k) => {
            setConfirm([false, -2]);
            setAgain([]);
            console.log(k);
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

        socket.on('turn', (id) => {
            if(id == socket.id) setTurn('Opponent\'s turn');
            else setTurn('Your turn');
        })

        socket.on('playagain', (id) => {
            setConfirm((prev) => {
                return [true, prev[1]];
            });
            console.log('playagain event');
            if(id == socket.id) setAgain([true, 'Waiting for opponent to accept...']);
            else setAgain([false, 'Your opponent wants to play again']);
        })

        socket.on('names', (players) => {
            players.map((e, i) => {
                if(e.id == socket.id){
                    setYourName(e);
                }
                else{
                    setOpponentName(e);
                }
            })
        })
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

    function generateRandom5DigitInteger() {
        // Generate a random number between 10000 and 99999 (inclusive)
        const randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        return randomNumber;
    }
      
    const randomInteger = generateRandom5DigitInteger().toString();
    console.log(randomInteger);  
    
    function create(name, room){
        socket.emit('details', name, room);
    }

    return (
        // <div>
        //     <div id='box'>
        //         {game.map((e, i) => {
        //             return (
        //                 e.map((t, j) => {
        //                     return <Box key={i+j} i={i} j={j} mark={mark} t={t}></Box>
        //                 }) 
        //             )
        //         })}
        //     </div>
        //     {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        //     </button> */}
        //     {console.log(confirm)}
        //     {confirm[0] && <Modal winner={confirm[1]} playAgain={playAgain}></Modal>}
        // </div>

        <Router>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/create" element={<Create k={true} randomInteger={randomInteger} create={create}/>}></Route>
                <Route path="/join" element={<Create k={false} randomInteger={randomInteger} create={create}/>}></Route>
                <Route path="/start" element={<Game again={again} turn={turn} yourName={yourName} opponentName={opponentName}  mark={mark} game={game} playAgain={playAgain} confirm={confirm}></Game>}></Route>
            </Routes>
        </Router>
    )
}

export default App;
