// Create client for interfacing with Microsofts Mobile Services
var client = new WindowsAzure.MobileServiceClient(
  "https://swipetunesserver.azure-mobile.net/",
  "KAfLYWfIFFndZengKOGsHiQsNxIKXL27"
);

// Global variable to keep track of all song search ids
var song_ids = new Array();

// Global varible to keep track of whether a search is complete
var search_complete = true;

// Global variable for index into songs_ids
var id_index = 0;

// Sound
var song_preview = soundManager.createSound({
  url: ''
  });

var search_form = document.getElementById("query");

var search_button = document.getElementById("search");

search_form.addEventListener("keydown", function(e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    search_services();
    return false;
  }
  }, false);

search_button.addEventListener("click", function(e) {
  search_services();
  }, false);

var dislike = document.getElementById("dislike");
var like = document.getElementById("like");

dislike.addEventListener("click", function(e) {
  // Add current song_ids[id_index] to dislike playlist
  var item = {liked : false};
  client.getTable("Playlist").update(item);
  update_suggestion();
  }, false);

like.addEventListener("click", function(e) {
  var track_url = 'https://api.spotify.com/v1/tracks/' + song_ids[id_index];

  fetch(track_url).then(function(response) {

    return response.json();
  }).then(function(song)  {
    var cover_art = document.getElementById("cover_art");
    var song_title = document.getElementById("song_title");
    var artist = document.getElementById("artist");
    var album = document.getElementById("album");
    console.log(song)
    var item = { songids: song.id, songtitle: song.name};
    client.getTable("newPlaylist").insert(item);
  });


    // Add current song_ids[id_index] to like playlist
    update_suggestion();
  }, false);


// Source: http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}


// Called when a user searches an artist
function search_services() {

  search_complete = false;

  song_ids.length = 0;

  // Get the value currently in the search form
  var query = document.getElementById("query").value;

  // Replace spaces with %20 for URI search
  var encoded_query = encodeURIComponent(query.trim());

  var url = 'https://api.spotify.com/v1/search?type=track&limit=50&q=' + encoded_query;

  // Search song/artist on Spotify
  fetch(url).then(function(response) {

    // Return JSON
    return response.json();
  }).then(function(json) {

    // Return the items in the JSON
    var tracks = json.tracks;
    var items = tracks.items;
    return items;
  }).then(function(tracks) {

    for (i=0; i < tracks.length; i++) {
      var id = tracks[i].id;
      song_ids.push(id);
      var item = { songid: tracks[i].id };
      //client.getTable("playlist").insert(item);
    }

    // Get id of first artist
    var artist_id = tracks[0].artists[0].id;

    var related_url = 'https://api.spotify.com/v1/artists/' + artist_id + '/related-artists';

    // Search for related artists of the artist most relevant to searches
    fetch(related_url).then(function(response) {
      return response.json();
    }).then(function(object) {
      var artists = object.artists;

      var artist_ids = new Array();

      for (i = 0; i < artists.length; i++) {
        artist_ids.push(artists[i].id);
      }

      var total = artist_ids.length;
      var count = 0;

      // For each artist, gather their top 10 tracks and add them to the songs_id
      for (i = 0; i < artist_ids.length; i++) {

        var artist_url = 'https://api.spotify.com/v1/artists/' + artist_ids[i] + '/top-tracks?country=US';

        fetch(artist_url).then(function(response) {
          return response.json();
        }).then(function(json) {
          var tracks = json.tracks;

          for (i = 0; i < tracks.length; i++) {
            song_ids.push(tracks[i].id);
          }

          count++;

          // Once all keys have been collected in songs_id
          if (count >= total) {
            shuffle(song_ids);
            search_complete = true;
            update_suggestion();
          }
        });
      }
    });
  });
}

function update_suggestion() {

  var track_url = 'https://api.spotify.com/v1/tracks/' + song_ids[id_index];

  fetch(track_url).then(function(response) {

    return response.json();
  }).then(function(song)  {

    var cover_art = document.getElementById("cover_art");
    var song_title = document.getElementById("song_title");
    var artist = document.getElementById("artist");
    var album = document.getElementById("album");

    cover_art.src = song.album.images[1].url;
    song_title.textContent = song.name;
    artist.textContent = song.artists[0].name;
    album.textContent = song.album.name;

    soundManager.stopAll();

    song_preview = soundManager.createSound({
      url:  song.preview_url
    });

    song_preview.play();

  });

  id_index++;
}
