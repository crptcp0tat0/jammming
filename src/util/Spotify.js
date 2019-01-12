let accessToken = null;
let expiresIn = '';
const clientId = 'e882f0bd7eb24cb5ba6df7e847befbdc';
const redirectURI = 'http://app-playlist.surge.sh/';

export const Spotify = {
  /*getAccessToken() {
    expiresIn = window.location.href.match(/expires_in=([^&]+)/)[1];
    accessToken = window.location.href.match(/access_token=([^&]+)/)[1];
    if (accessToken) {
      return fetch(accessToken);
    } else if (!(accessToken)){
      console.log('in the false section');

      return fetch(`https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&scope=user-read-private%20user-read-email%20playlist-modify-public%20playlist-modify-private&response_type=token`)
      .then(() => {

        //accessToken = window.location.href.match(/access_token=([^&]*)/);
        //expiresIn = window.location.href.match(/expires_in=([^&]*)/);
        //window.setTimeout(() => accessToken = '', expiresIn * 1000);
        //window.history.pushState('Access Token', null, '/');

        console.log('in the double ');
        window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`)
        accessToken = window.location.href.match(/access_token=([^&]*)/);
        expiresIn = window.location.href.match(/expires_in=([^&]*)/);
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        console.log(accessToken);
        return accessToken;
      })
    }
  },*/

  getAccessToken() {
    if (accessToken) {
      return fetch(accessToken);
    } else if (window.location.href.match(/access_token=([^&]*)/)){
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return fetch(accessToken);
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
    }
  },

  search(searchTerm) {
    return Spotify.getAccessToken()
    .then(() => {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
        method:'GET',
        headers: {Authorization: `Bearer ${accessToken}`}
      })
    })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          Name: track.name,
          Artist: track.artists[0].name,
          Album: track.album.name,
          uri: track.uri
        }))
      } else {
        return ([])
      }
    })
  },

  savePlaylist(name, trackURIs) {
    let userID = '';
    if((name === '') || (trackURIs === [])) {
      return;
    };

    return Spotify.getAccessToken()
    .then(() => fetch('https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/me', {headers: {Authorization: `Bearer ${accessToken}`}}))
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      userID = jsonResponse.id
      return jsonResponse.id
    })
    .then(userID => {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name: name})
      })
    })
    .then(response => {
      return response.json()
    })
    .then(jsonResponse => {
      return jsonResponse.id
    })
    .then(playlistID => {
      return fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({uris: trackURIs})
      })
    });
  }
};

//export default Spotify;
/*let playlistID = Spotify.getAccessToken()
.then(fetch(`https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
headers: {
Authorization: `Bearer ${accessToken}`,
'Content-Type': 'application/json'
},
method: 'POST',
body: JSON.stringify({
uris: trackURIs
})
}))
.then(response => {
return response.json()
})
.then(jsonResponse => {
return jsonResponse.id
});*/

















/*else if ((window.location.href.match(/access_token=([^&]*)/)) && (window.location.href.match(/expires_in=([^&]*)/))) {
accessToken = window.location.href.match(/access_token=([^&]*)/);
const expiresIn = window.location.href.match(/expires_in=([^&]*)/);
window.setTimeout(() => accessToken = '', expiresIn * 1000);
window.history.pushState('Access Token', null, '/');
} else {
let URLString = fetch(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`),{

}
}*/
