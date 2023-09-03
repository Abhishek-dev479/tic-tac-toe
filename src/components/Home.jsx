import react from 'react';
import {Link} from 'react-router-dom';

function Home(){
    return(
        <div className='home-box'>
            <img src="/tic.gif" alt="" />
            <div><Link to="/create"><button className='button-36'>Create Game</button></Link><Link to="/join"><button className='button-36'>Join Game</button></Link></div>
        </div>
    )
}

export default Home;