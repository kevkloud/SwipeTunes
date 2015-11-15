$(function() {
    var client = new WindowsAzure.MobileServiceClient("https://swipetunesserver.azure-mobile.net/",
    "KAfLYWfIFFndZengKOGsHiQsNxIKXL27"
    );
    // var item = { song: "Stronger", title: "Workout Jam", artist: "Kanye West", duration: "4:45"};
    // client.getTable("playlist").insert(item);
    var playlistTable = client.getTable('playlist');

      playlistTable
        .read()
        .done(function (results) {
              // alert(JSON.stringify(results));
              // debugger
              // console.log(JSON.stringify(results));
              var json = JSON.stringify(results);
              var objs = JSON.parse(json);
              console.log(objs)
              $(".playlistName").append(objs[1].title)
              objs.forEach(function(obj) {
                $('.songs').append(obj.song)
                $('.artists').append(obj.artist)
                $('.duration').append(obj.duration)


              });
              // $("#playlists").empty().append(obj.text)
          }, function (err) {
              alert("Error: " + err);
          });

//     function refreshPlaylist() {
//         var query = playlistTable.song;
//         var titlequery = playlistTable.title;
//
//         query.read().then(function(playlist) {
//             var listItems = $.map(playlist, function(songs) {
//                 // return $('<li>')
//                 //     .attr('data-todoitem-id', playlists.id)
//                 //     .append($('<button class="item-delete">Delete</button>'))
//                 //     .append($('<div>').append($('<input class="item-text">').val(item.text)));
//                 return $('<li>')
//                     .attr('data-todoitem-id', songs.id)
//                     .append($('<button class="item-delete">Delete</button>'))
//                     .append($('<div>').append($('<input class="item-text">').val(item.text)));
//             });
//             $("#songs").empty().append(listItems).toggle(listItems.length > 0);
//             $("#playlistName").empty().append(titlequery);
//         });
//     }
});
