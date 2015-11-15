$(function() {
  var client = new WindowsAzure.MobileServiceClient(
    "https://swipetunesserver.azure-mobile.net/",
    "KAfLYWfIFFndZengKOGsHiQsNxIKXL27"
  );
    var accountsTable = client.getTable('accounts');
    console.log(accountsTable);
    // var item = { text: "Workout Jam" };
    // client.getTable("accounts").insert(item);

    function refreshAccounts() {
        // var username = accountsTable.
        // console.log(username)
        // var query = accountsTable.where({
        //   playlists: accounts.playlists
        // });
        accountsTable.select('text', 'playlists')
          .read(
             { success: function(results) {
                 debugger
                 if (results.length > 0) {
                     return results;
                 } else {
                     console.log('no results returned');
                 }
               }
             })
     };
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

    refreshAccounts();
});
