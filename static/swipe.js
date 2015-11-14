// Create client for interfacing with Microsofts Mobile Services
var client = new WindowsAzure.MobileServiceClient(
  "https://swipetunesserver.azure-mobile.net/",
  "KAfLYWfIFFndZengKOGsHiQsNxIKXL27"
);

// Called when a user searches an artist
function search_services() {
  
  var search_query = document.getElementById("search_form").value;
  
  alert("You searched for: " + search_query);
  
}

// var item = { text: "Awesome item" };
// client.getTable("Item").insert(item);
