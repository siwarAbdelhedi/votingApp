const SpotifyWebApi = require('spotify-web-api-node');

require('dotenv').config();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    redirectUri: process.env.redirectUrl
});

const callMusic = async (req, res) => {
    // Extract the error, code, and state from the query parameters.
    const error = req.query.error; console.log('console1');
    const code = req.query.code; console.log('console2');

    // If there is an error, log it and send a response to the user.
    if (error) {
        console.error('Callback Error:', error);console.log('console3');
        res.send(`Callback Error: ${error}`);console.log('console4');
        return;
    }

    // Exchange the code for an access token and a refresh token.
    spotifyApi.authorizationCodeGrant(code).then(data => {
        const accessToken = data.body['access_token'];console.log('console5');
        const refreshToken = data.body['refresh_token'];console.log('console6');
        const expiresIn = data.body['expires_in'];console.log('console7');

        // Set the access token and refresh token on the Spotify API object.
        spotifyApi.setAccessToken(accessToken); console.log('console 8');
        spotifyApi.setRefreshToken(refreshToken); console.log('console1');

        // Logging tokens can be a security risk; this should be avoided in production.
        console.log('The access token is ' + accessToken); console.log('console 9');
        console.log('The refresh token is ' + refreshToken); console.log('console10');

        // Send a success message to the user.
        res.send('Login successful! You can now use the /search and /play endpoints.');console.log('console11');

        // Refresh the access token periodically before it expires.
        setInterval(async () => {
            const data = await spotifyApi.refreshAccessToken(); console.log('console12');
            const accessTokenRefreshed = data.body['access_token']; console.log('console13');
            spotifyApi.setAccessToken(accessTokenRefreshed); console.log('console14');
        }, expiresIn / 2 * 1000); // Refresh halfway before expiration. 
           console.log('console1');

    }).catch(error => {
        console.error('Error getting Tokens:', error); console.log('console15');
        res.send('Error getting tokens'); console.log('console16');
    });
};


// Route handler for the search endpoint.
const searchMusic = async (req, res) => {
    // Extract the search query parameter.
    const { q } = req.query; console.log('console17');

    // Make a call to Spotify's search API with the provided query.
    spotifyApi.searchTracks(q).then(searchData => {
        // Extract the URI of the first track from the search results.
        const trackUri = searchData.body.tracks.items[0].uri; console.log('console18');
        // Send the track URI back to the client.
        res.send({ uri: trackUri }); console.log('console19');
    }).catch(err => {
        console.error('Search Error:', err); console.log('console20');
        res.send('Error occurred during search'); console.log('console 20 ');
    });
};

// Route handler for the play endpoint.
const playMusic = async (req, res) => {
    // Extract the track URI from the query parameters.
    const { uri } = req.query;

    // Send a request to Spotify to start playback of the track with the given URI.
    spotifyApi.play({ uris: [uri] }).then(() => {
        res.send('Playback started 21 ');
    }).catch(err => {
        console.error('Play Error:', err);
        res.send('Error occurred during playback 22 ');
    });
};

module.exports = { callMusic, searchMusic, playMusic  };