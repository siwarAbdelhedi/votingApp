const VotingSession = require('../models/votingSession');

const createSession = async (req, res) => {
  try {
    const { module_name, expiration_date, musics } = req.body;

    const newSession = new VotingSession({ module_name, expiration_date, musics });
    const savedSession = await newSession.save();

    res.status(201).json(savedSession);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getSession = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;

      const session = await VotingSession.findById(sessionId);
    res.status(200).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createSession, getSession };
