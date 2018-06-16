
$.getJSON("/articles", function(data) {
	for (var i = 0; i < data.length; i++) {
		$("#articles").append("<hr class='uk-divider-icon'>")
		$("#articles").append("<p class='col-12' data-id='" + data[i]._id + "'>")
		$("#articles").append("<h3> " + data[i].title + "</h3>")
		$("#articles").append("<p>" + data[i].summary + "</p>")
		$("#articles").append("<a href='" + data[i].link + "'>" + "link to Article" + "</a>")
		$("#articles").append("<div class='form-group'>" + "<label class='form-label' for='note-input'>" + "Add a Note" + "</label>" + "<textarea class='form-input' id='note-input' rows='3'></textarea>" + "</div>")
		$("#articles").append("<button class='btn'>" + "Add Note" + "</button>")
	}
});													

