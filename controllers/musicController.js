const Music = require('../models/musique');
const VotingSession = require('../models/votingSession')
const submitMusic = async (req, res) => {
  try {
    const { title, artist } = req.body;
    const sessionId = req.params.sessionId;
   
    const newMusic = new Music({ title, artist });
    const savedMusic = await newMusic.save();
   
     const session = await VotingSession.findById(sessionId);
     session.musics.push(savedMusic._id);
     await session.save();

    res.status(201).json(savedMusic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getMusics = async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      
      const session = await VotingSession.findById(sessionId).populate('musics');
      const musics = session.musics;
  
     
      res.status(200).json(musics);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = { submitMusic, getMusics };
