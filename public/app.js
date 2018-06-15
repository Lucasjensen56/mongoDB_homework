
$.getJSON("/articles", function(data) {
	for (var i = 0; i < data.length; i++) {
		$("#articles").append("<hr class='uk-divider-icon'>")
		$("#articles").append("<p class='col-12' data-id='" + data[i]._id + "'>")
		$("#articles").append("<h3> " + data[i].title + "</h3>" + "<br/>")
		$("#articles").append("<a href='" + data[i].link + "'>" + "link" + "</a>" + "<br/>")
		$("#articles").append("<p>" + data[i].summary + "</p>" + "<br/>")
		$("#articles").append("<p>" + data[i].whenPublished + "</p>" + "<br/>")

		
	}
});													



		// $("#articles").append("<p class='col-12' data-id='" + data[i]._id + "'>" + data[i].title + "<br />" +  data[i].link + "<br />" + data[i].summary + "<br />" + data[i].whenPublished + "</p>");
