
$.getJSON("/articles", function(data) {
	for (var i = 0; i < data.length; i++) {
		$("#articles").append("<hr class='uk-divider-icon'>")
		$("#articles").append("<p class='col-12' data-id='" + data[i]._id + "'>")
		$("#articles").append("<h3> " + data[i].title + "</h3>")
		$("#articles").append("<p>" + data[i].summary + "</p>")
		$("#articles").append("<a href='" + data[i].link + "'>" + "link to Article" + "</a>")
		$("#articles").append("<div data-id='" + data[i]._id + "' class='form-group'>" + "<label class='form-label' for='note-input'>" + "Add a Note" + "</label>" + "<textarea class='form-input' id='note-input' rows='3'></textarea>" + "</div>")
		$("#articles").append("<button id='noteButton' class='btn'>" + "Add Note" + "</button>")
	}
});		


// $(document).ready(function() {
  
// });


$(document).on("click", "#noteButton", function() {


	var thisId = $(this).attr("data-id");

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