///// Listern For Form Submit
document.getElementById("form").addEventListener("submit", saveBookmark);

// To Save Bookmarks
function saveBookmark(e) {
  // Get form values  --> Website name and URL
  let siteName = document.getElementById("siteName").value;
  let siteUrl = document.getElementById("siteUrl").value;

  if (!validateEnteries(siteName, siteUrl)) {
    return false;
  }

  let bookmark = {
    name: siteName,
    url: siteUrl,
  };

  /*  |||||| Local Storage Test |||||||||

     Note -> Local Storage only stores string but here is how we can parse the json into a string -> Save it and then when we need it , we can parse it back to Json

        1)  To set in Local Storage
            localStorage.setItem("test", "Hello World");

        2)  To get an item from Local Storage
            console.log(localStorage.getItem("test"));

        3)  To delete from Local Storage and
            localStorage.removeItem("test");
            console.log(localStorage.getItem("test"));
  */

  if (localStorage.getItem("bookmarks") === null) {
    /// Initialise Array
    let bookmarks = [];
    // Push the Bookmark into the array
    bookmarks.push(bookmark);
    // Set to Local Storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks)); // Stringify Turns Json into Strings
  } else {
    // Get bookmarks from the Local Storage
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")); // Parse Turns a string into Json
    // Add the bookmark to the existing array
    bookmarks.push(bookmark);
    // Set it  back to the Local Storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }

  /// Clear Enteries after submition
  document.getElementById("form").reset();

  /// Re-Fetch Bookmaeks after deleting
  fetchBookmarks();

  e.preventDefault();
}

/// Delete Bookmark
function deleteBookmark(url) {
  // Get Bookmark from the local Storage
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // Loop through Bookmarks
  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      /// Remove from Array
      bookmarks.splice(i, 1);
    }
  }

  /// Reset back to Local Storage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  /// Re-Fetch Bookmaeks after deleting
  fetchBookmarks();
}

//// Fetch Bookmarks

function fetchBookmarks() {
  // Get Bookmarks from the Local Storage
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  // Get the Bookmarks id
  let bookmarksResults = document.getElementById("bookmarkResults");
  // Display it on the body
  bookmarksResults.innerHTML = ""; // It display whatever html we give to it

  for (let i = 0; i < bookmarks.length; i++) {
    let name = bookmarks[i].name;
    let url = bookmarks[i].url;
    bookmarksResults.innerHTML +=
      "<div class= 'well'>" +
      "<h3>" +
      name +
      "<a class= 'btn btn-primary' target= '_blank' href= '" +
      url +
      "'>Visit </a>" +
      "<a   onClick = 'deleteBookmark(\"" +
      url +
      "\")'      class= 'btn btn-danger visitBtn'  href= '#'> Delete </a>";
    "</h3>" + "</div>";
  }
}

/// Validate Enteries

function validateEnteries(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("Please input valid enteries");
    return false;
  }

  let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Please Use a valid URL to");
    return false;
  }
  return true;
}
