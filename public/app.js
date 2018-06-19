
$.getJSON("/articles", function(data) {
	for (var i = 0; i < data.length; i++) {
		$("#articles").append("<hr class='uk-divider-icon'>")
		$("#articles").append("<p class='col-12' data-id='" + data[i]._id + "'>")
		$("#articles").append("<h3> " + data[i].title + "</h3>")
		$("#articles").append("<p>" + data[i].summary + "</p>")
		$("#articles").append("<a href='" + data[i].link + "'>" + "link to Article" + "</a>")
		$("#articles").append("<div class='form-group'>" + "<label class='form-label' for='note-input'>" + "Add a Note" + "</label>" + "<textarea class='form-input' id='" + data[i]._id + "' rows='3'></textarea>" + "</div>")
		$("#articles").append("<button data-id='" + data[i]._id + "' class='btn noteButton'>" + "Add Note" + "</button>")
		$("#articles").append("<button data-id='" + data[i]._id + "' id='" + data[i]._id + "' class='btn showComments' > " + "Show Comments" + "</button>")
		$("#articles").append("<div id='" + data[i]._id + "' class='showCommentsDiv'>" + "</div>")
		$(".showCommentsDiv").append("<p id='" + data[i]._id + "' class='body-input'>" + "</p>")
	}
});		



$(document).on("click", ".showComments", function() {
	console.log("showComments clicked")
	var thisId = $(this).attr("data-id");

	console.log(thisId)

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
  .then(function(data) {
  	console.log(data)

  	// $("#showCommentsDiv").append("<p id='body-input'>" + "</p>");

  	// var noteBody = 

  	if (data.note) {



  		$(`p#${thisId}`).text(data.note.body);



  		// add the text to the p tag, not the id of the input field. need to place id on to the p tag somehow
  	}
  	
  })
})


$(document).on("click", ".noteButton", function() {


	var thisId = $(this).attr("data-id");
	// console.log(thisId)

	var noteText = $(`#${thisId}`).val()

	console.log("value of text input: " + noteText)

	$.ajax({
		method: "POST",
		url: "/articles/" + thisId,
		data: {
			body: $(`#${thisId}`).val()
		}
	})
	.then(function(data) {
		console.log(data);
		$(".form-input").empty();
	})

})