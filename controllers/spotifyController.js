const SpotifyWebApi = require('spotify-web-api-node');

require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    redirectUri: process.env.redirectUrl
});

const callMusic = async (req, res) => {
    // Extract the error, code, and state from the query parameters.
    const error = req.query.error;
    const code = req.query.code;

    // If there is an error, log it and send a response to the user.
    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    // Exchange the code for an access token and a refresh token.
    spotifyApi.authorizationCodeGrant(code).then(data => {
        const accessToken = data.body['access_token'];
        const refreshToken = data.body['refresh_token'];
        const expiresIn = data.body['expires_in'];

        // Set the access token and refresh token on the Spotify API object.
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);

        // Logging tokens can be a security risk; this should be avoided in production.
        console.log('The access token is ' + accessToken);
        console.log('The refresh token is ' + refreshToken);

        // Send a success message to the user.
        res.send('Login successful! You can now use the /search and /play endpoints.');

        // Refresh the access token periodically before it expires.
        setInterval(async () => {
            const data = await spotifyApi.refreshAccessToken();
            const accessTokenRefreshed = data.body['access_token'];
            spotifyApi.setAccessToken(accessTokenRefreshed);
        }, expiresIn / 2 * 1000); // Refresh halfway before expiration.

    }).catch(error => {
        console.error('Error getting Tokens:', error);
        res.send('Error getting tokens');
    });
};


// Route handler for the search endpoint.
const searchMusic = async (req, res) => {
    // Extract the search query parameter.
    const { q } = req.query;

    // Make a call to Spotify's search API with the provided query.
    spotifyApi.searchTracks(q).then(searchData => {
        // Extract the URI of the first track from the search results.
        const trackUri = searchData.body.tracks.items[0].uri;
        // Send the track URI back to the client.
        res.send({ uri: trackUri });
    }).catch(err => {
        console.error('Search Error:', err);
        res.send('Error occurred during search');
    });
};

// Route handler for the play endpoint.
const playMusic = async (req, res) => {
    // Extract the track URI from the query parameters.
    const { uri } = req.query;

    // Send a request to Spotify to start playback of the track with the given URI.
    spotifyApi.play({ uris: [uri] }).then(() => {
        res.send('Playback started');
    }).catch(err => {
        console.error('Play Error:', err);
        res.send('Error occurred during playback');
    });
};

module.exports = { callMusic, searchMusic, playMusic  };


