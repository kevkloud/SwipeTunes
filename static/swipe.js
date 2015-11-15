// Create client for interfacing with Microsofts Mobile Services
var client = new WindowsAzure.MobileServiceClient(
  "https://swipetunesserver.azure-mobile.net/",
  "KAfLYWfIFFndZengKOGsHiQsNxIKXL27"
);

// Global variable to keep track of all song search ids
var song_ids = new Array();

// Global varible to keep track of whether a search is complete
var search_complete = true;

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

          if (count >= total) {
            search_complete = true;
          }
        }); 
      }
    }); 
  });  
}
