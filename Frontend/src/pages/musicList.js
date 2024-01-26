import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Modal from 'react-modal';
import api from '../services/api';


const MusicListPage = () => {
    const { sessionId } = useParams();
    console.log(sessionId);
    const [musics, setMusics] = useState([]);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [voteRating, setVoteRating] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    
    const user = localStorage.getItem('userData');
    const userId = user._id ;


  useEffect(() => {
    const fetchMusics = async () => {
      try {
            const response = await api.fetchMusics(sessionId);
            console.log(response);
            setMusics(response);
        } catch (error) {
            console.error('Error fetching musics:', error.response.data.error);
        }
    };

    fetchMusics();
  }, [sessionId]);


  const handleVote = async () => {
        try {
        const response = api.vote(userId, sessionId, selectedMusic._id, voteRating);
        console.log(response);
        setModalIsOpen(false);
        } catch (error) {
        console.error('Error voting on music:', error.response.data.error);
        }
    };

  return (
    <div>
      <h1>Music List</h1>
      <ul>
        { musics && musics.map((music) => (
          <li key={music._id}>
            <p>Title: {music.title}</p>
            <p>Artist: {music.artist}</p>
           
            <button onClick={() => {
                setSelectedMusic(music);
                setModalIsOpen(true);
            }   
        }>
    Vote
    </button>
    </li>
))}
        </ul>
<Modal
isOpen={modalIsOpen}
onRequestClose={() => setModalIsOpen(false)}
contentLabel="Vote Modal"
>
<h2>Vote for {selectedMusic && selectedMusic.title}</h2>
<select onChange={(e) => setVoteRating(Number(e.target.value))} value={voteRating}>
{[1, 2, 3, 4, 5].map((rating) => (
<option key={rating} value={rating}>
 {rating}
</option>
))}
</select>
<button onClick={handleVote}>Vote</button>
</Modal>
</div>
);
};


export default MusicListPage;