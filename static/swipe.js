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

var search_form = document.getElementById("query");

var search_button = document.getElementById("search");

search_form.addEventListener("keydown", function(e) {
  if (e.keycode == 13) {
    e.preventDefault();
    search_services();
  }
  }, false);

search_button.addEventListener("click", function(e) {
  search_services();
  }, false);

var dislike = document.getElementById("dislike");
var like = document.getElementById("like");

dislike.addEventListener("click", function(e) {
  // Add current song_ids[id_index] to dislike playlist
  
  update_suggestion();
  }, false);

like.addEventListener("click", function(e) {
  // Add current song_ids[id_index] to like playlist

  update_suggestion();
  }, false);


// Source: http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
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
            //shuffle(arr);
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
    
    console.log(song);  

    console.log(song.album.images[1].url);
    console.log(song.name); 
    console.log(song.artists[0].name); 
    console.log(song.album.name); 

    var cover_art = document.getElementById("cover_art");
    var song_title = document.getElementById("song_title"); 
    var artist = document.getElementById("artist"); 
    var album = document.getElementById("album"); 

    cover_art.src = song.album.images[1].url;
    song_title.textContent = song.name; 
    artist.textContent = song.artists[0].name; 
    album.textContent = song.album.name; 
  
    console.log(document.getElementById("cover_art").src);
  });
  
  id_index++;
}
