
$.getJSON("/articles", function(data) {
	for (var i = 0; i < data.length; i++) {
		$("#articles").append("<hr class='uk-divider-icon'>")
		$("#articles").append("<p class='col-12' data-id='" + data[i]._id + "'>")
		$("#articles").append("<h3> " + data[i].title + "</h3>" + "<br/>")
		$("#articles").append("<p>" + data[i].summary + "</p>")
		$("#articles").append("<a href='" + data[i].link + "'>" + "link to Article" + "</a>" + "<br/>")
		$("#articles").append("<p>" + "Article Published: " + data[i].whenPublished + "</p>" + "<br/>")
		$("#articles").append("<div class='form-group'>" + "<label class='form-label' for='note-input'>" + "Add a Note" + "</label>" + "<textarea class='form-input' id='note-input' rows='3'></textarea>" + "</div>")

																	
		
	}
});													

