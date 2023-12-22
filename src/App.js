import { useEffect,useState } from 'react';
import axios from 'axios';
import CricketPlayers from './components/CricketPlayers';
import FootBallPlayers from './components/FootBallPlayers';
import { API_URL } from './utils/Constants';



function App() {
  const [footballList,setFootballList] = useState(null)
  const [cricketList, setCricketList] = useState(null);
  useEffect(()=>{
    fetchPlayers()
  },[]);
  const fetchPlayers = async() =>{
    const Response = await axios.get(API_URL)
    setFootballList(Response);
    setCricketList(Response.data[1]);
  }

  return (
    <div className="App">
      <div className='flex flex-col flex-wrap'>
          <h1 className='font font-extrabold text-2xl p-2 text-center'>Athelete Lists</h1>
          <FootBallPlayers data={footballList && footballList.data[0]}/>
          <CricketPlayers data={cricketList}/> 
      </div>
      
    </div>
  );
}

export default App;
