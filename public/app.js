
$.getJSON("/articles", function(data) {
	for (var i = 0; i < data.length; i++) {
		$("#articles").append("<hr class='uk-divider-icon'>")
		$("#articles").append("<p class='col-12' data-id='" + data[i]._id + "'>")
		$("#articles").append("<h3> " + data[i].title + "</h3>")
		$("#articles").append("<p>" + data[i].summary + "</p>")
		$("#articles").append("<a href='" + data[i].link + "'>" + "link to Article" + "</a>")
		$("#articles").append("<div class='form-group'>" + "<label class='form-label' for='note-input'>" + "Add a Note" + "</label>" + "<textarea data-id='" + data[i]._id + "' class='form-input' id='note-input' rows='3'></textarea>" + "</div>")
		$("#articles").append("<button data-id='" + data[i]._id + "' id='noteButton' class='btn'>" + "Add Note" + "</button>")
		// $("#articles").append("<p id='body-input'>" + data.note.body + "</p>")
	}
});		





$(document).on("click", "#note-input", function() {
	console.log("note-input clicked")
	var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
  .then(function(data) {
  	console.log(data)
  	$("#notesField").append("<p id='body-input'>" + "words" + "</p>")
  	if (data.note) {
  		$("#body-input").val(data.note.body);
  	}
  	
  })
})


$(document).on("click", "#noteButton", function() {

	var noteText = $("#note-input").val();
	console.log("value of text input: " + noteText)

	var thisId = $(this).attr("data-id");
	console.log(thisId)

	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			body: $("#note-input").val()
		}
	})
	.then(function(data) {
		console.log(data);
		$("#note-input").empty();
	})

})