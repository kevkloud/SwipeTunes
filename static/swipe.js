// Create client for interfacing with Microsofts Mobile Services
var client = new WindowsAzure.MobileServiceClient(
  "https://swipetunesserver.azure-mobile.net/",
  "KAfLYWfIFFndZengKOGsHiQsNxIKXL27"
);

// Called when a user searches an artist
function search_services() {

  // Get the value currently in the search form
  var query = document.getElementById("query").value;

  // Replace spaces with %20 for URI search
  var encoded_query = encodeURIComponent(query.trim());

  var url = 'https://api.spotify.com/v1/search?type=track&limit=50&q=' + encoded_query;

  fetch(url).then(function(response) {
    return response.json();
  }).then(function(json) {
    var tracks = json.tracks;
    var items = tracks.items;
    return items;
  }).then(function(tracks) {
    for (i=0; i < tracks.length; i++) {
      console.log(tracks[i].id);
      var item = { songid: tracks[i].id };
      client.getTable("playlist").insert(item);
    }
  });

//  var related_url = 'https://api.spotify.com/v1/artists/' + + '/related-artists';


}
