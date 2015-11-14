
var client = new WindowsAzure.MobileServiceClient(
    "https://swipetunesserver.azure-mobile.net/",
    "KAfLYWfIFFndZengKOGsHiQsNxIKXL27"
);

var item = { text: "Awesome item" };
client.getTable("Item").insert(item);
