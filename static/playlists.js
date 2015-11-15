$(function() {
  var client = new WindowsAzure.MobileServiceClient(
    "https://swipetunesserver.azure-mobile.net/",
    "KAfLYWfIFFndZengKOGsHiQsNxIKXL27"
  );
    var accountsTable = client.getTable('accounts');
    console.log(accountsTable);
    var playlistTable = client.getTable('playlist');
    // var item = { text: "Workout Jam" };
    // client.getTable("accounts").insert(item);
        accountsTable
          .read()
          .done(function (results) {
                // alert(JSON.stringify(results));
                // debugger
                // console.log(JSON.stringify(results));
                var json = JSON.stringify(results);
                var objs = JSON.parse(json);

                objs.forEach(function(obj) {
                  // $('.playlists').append(obj.text)
                  $('.links').append( $("<a href='playlist.html'>" + obj.text + "</a>"))

                });
                // $("#playlists").empty().append(obj.text)
            }, function (err) {
                alert("Error: " + err);
            });
      // function getplaylistId(formElement) {
      //     return $(formElement).closest('ul').attr('playlist-id');
      // }
      // $('.del').on('click', '.item-delete', function () {
      //     playlistTable.del({ id: getplaylistId(this) })
      // });
        // console.log(query);
    //     query.read().then(function(accounts) {
    //         var listItems = $.map(accounts, function(playlists) {
    //             // return $('<li>')
    //             //     .attr('data-todoitem-id', playlists.id)
    //             //     .append($('<button class="item-delete">Delete</button>'))
    //             //     .append($('<div>').append($('<input class="item-text">').val(item.text)));
    //             return $('<li>')
    //                 .attr('data-todoitem-id', playlists.id)
    //                 .append($('<button class="item-delete">Delete</button>'))
    //                 .append($('<div>').append($('<input class="item-text">').val(playlists.text)));
    //         });
    //         $('#playlists').empty().append(listItems).toggle(listItems.length > 0);
    //     });
    // }
    // $('#add-item').submit(function(evt) {
    //     var textbox = $('#new-item-text'),
    //         itemText = textbox.val();
    //     if (itemText !== '') {
    //         todoItemTable.insert({ text: itemText, complete: false }).then(refreshTodoItems, handleError);
    //     }
    //     textbox.val('').focus();
    //     evt.preventDefault();
    // });
});
