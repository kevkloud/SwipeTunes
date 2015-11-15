$(function() {
    var client = new WindowsAzure.MobileServiceClient('https://swipetunesserver.azure-mobile.net/', 'KAfLYWfIFFndZengKOGsHiQsNxIKXL27'),
        playlistTable = client.getTable('playlist');

    function refreshPlaylist() {
        var query = playlistTable.song;
        var titlequery = playlistTable.title;

        query.read().then(function(playlist) {
            var listItems = $.map(playlist, function(songs) {
                // return $('<li>')
                //     .attr('data-todoitem-id', playlists.id)
                //     .append($('<button class="item-delete">Delete</button>'))
                //     .append($('<div>').append($('<input class="item-text">').val(item.text)));
                return $('<li>')
                    .attr('data-todoitem-id', songs.id)
                    .append($('<button class="item-delete">Delete</button>'))
                    .append($('<div>').append($('<input class="item-text">').val(item.text)));
            });
            $("#songs").empty().append(listItems).toggle(listItems.length > 0);
            $("#playlistName").empty().append(titlequery);
        });
    }
});
