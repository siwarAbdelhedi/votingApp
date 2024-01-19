const Vote = require('../models/vote');
const VotingSession = require('../models/votingSession');

const vote = async (req, res) => {
  try {
    const { userId, musicId, rating } = req.body;
    const sessionId = req.params.sessionId;
    console.log(sessionId);
     const session = await VotingSession.findById(sessionId);
    //  const hasVoted = session.votes.some(vote => vote.user_id.toString() === userId && vote.music_id.toString() === musicId);
    //  if (hasVoted) {
    //    return res.status(400).json({ error: 'User has already voted for this music in the session.' });
    //  }
    const newVote = new Vote({ user_id: userId, music_id: musicId, rating, vote_date: new Date() });
    const savedVote = await newVote.save();
     //session.votes.push(savedVote._id);
     //await session.save();
    res.status(201).json(savedVote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getVoteResults = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
     const session = await VotingSession.findById(sessionId).populate('votes');
     const votes = session.votes;
    res.status(200).json(votes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { vote, getVoteResults };
