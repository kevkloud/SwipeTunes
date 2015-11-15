$(function() {
    var client = new WindowsAzure.MobileServiceClient('https://swipetunesserver.azure-mobile.net/', 'KAfLYWfIFFndZengKOGsHiQsNxIKXL27'),
        accountsTable = client.getTable('accounts');

    function refreshAccounts() {
        var query = accountsTable.playlists;

        query.read().then(function(accounts) {
            var listItems = $.map(accounts, function(playlists) {
                return $('<li>')
                    .attr('data-todoitem-id', playlists.id)
                    .append($('<button class="item-delete">Delete</button>'))
                    .append($('<div>').append($('<input class="item-text">').val(item.text)));
            });

            $('#playlists').empty().append(listItems).toggle(listItems.length > 0);
        });
    }
});
