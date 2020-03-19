// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    var comments = "";
    data[i].comment.forEach(function(entry1) {
      console.log(entry1);
      comments += `<p>${entry1}</p>`;
    });

    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<b>Title: " + data[i].title + "</b><br><br />" + 
    "<b>Summary:</b> " + data[i].summary + "<br><br />" + "<b>Comments:</b> " + comments + "<br><br></p>");
};
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save tqhe id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);

      // The title of the article
      $("#notes").append("<h4>" + data.title + "</h4>");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId,
    data: {
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#bodyinput").val("");
});














// // When user clicks the delete button for a note
// $(document).on("click", ".delete", function() {
//   // Save the p tag that encloses the button
//   var selected = $(this).parent();
//   // Make an AJAX GET request to delete the specific note
//   // this uses the data-id of the p-tag, which is linked to the specific note
//   $.ajax({
//     type: "GET",
//     url: "/delete/" + selected.attr("data-id"),

//     // On successful call
//     success: function(response) {
//       // Remove the p-tag from the DOM
//       selected.remove();
//       // Clear the note and title inputs
//       $("#note").val("");
//       $("#myNote").val("");
//       // Make sure the #action-button is submit (in case it's update)
//       $("#action-button").html("<button id='make-new'>Submit</button>");
//     }
//   });
//  ]);