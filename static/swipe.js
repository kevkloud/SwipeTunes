// Create client for interfacing with Microsofts Mobile Services
var client = new WindowsAzure.MobileServiceClient(
  "https://swipetunesserver.azure-mobile.net/",
  "KAfLYWfIFFndZengKOGsHiQsNxIKXL27"
);

// Called when a user searches an artist
function search_services() {
  
  // Get the value currently in the search form
  var query = document.getElementById("search_form").value;

  // Replace spaces with %20 for URI search
  var encoded_query = encodeURIComponent(query.trim());

  var url = 'https://api.spotify.com/v1/search?type=track&limit=50&q=' + encoded_query;
  
  $.ajax(url, {
    dataType: 'json',
    success: function(r) {
      console.log('got track', r);
      callback({
        word: word,
        tracks: r.tracks.items
          .map(function(item) {
            var ret = {
              name: item.name,
              artist: 'Unknown',
              artist_uri: '',
              album: item.album.name,
              album_uri: item.album.uri,
              cover_url: '',
              uri: item.uri
            }
            if (item.artists.length > 0) {
              ret.artist = item.artists[0].name;
              ret.artist_uri = item.artists[0].uri;
            }
            if (item.album.images.length > 0) {
              ret.cover_url = item.album.images[item.album.images.length - 1].url;
            }
            return ret;
          })
      });
    },
    error: function(r) {
      callback({
        word: word,
        tracks: []
      });
    }
  }); 
  
}

// var item = { text: "Awesome item" };
// client.getTable("Item").insert(item);
