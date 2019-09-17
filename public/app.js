$(document).ready( function() {

    getArticles();

    $("#scrapeBtn").on("click", function(){
        $.get("/scrape").then(function(data){
            getArticles();
        })
    })

    $(document).on("click", "#noteBtn", function() {
        console.log("noteBtn clicked");
        var articleId = $(this).attr("data-id");

        $.ajax({
            method: "GET",
            url: "/articles/" + articleId
        })
        .then(function(data) {
            console.log(data);
            $(".modal-title").text("Note for " + data.title);
            $("#noteSubmit").attr("data-id", data._id);

            if (data.note) {
                $("#insertTitle").val(data.note.title);
                $("#insertNote").val(data.note.body);
            }
        })
    })

    $(document).on("click", "#noteSubmit", function() {
        var articleId = $(this).attr("data-id");

        $.ajax({
            method: "POST",
            url: "/articles/" + articleId,
            data: {
                title: $("#insertTitle").val(),
                body: $("#insertNote").val(),
                articleId: articleId
            }
        })
        .then(function(data) {
            console.log(data.note);
            console.log($("#viewBtn"));
        })
    })

    $(document).on("click", "#viewBtn", function() {
        var articleID = $(this).attr("data-id");
        console.log(articleID)

        $.ajax({
            method: "GET",
            url: "/notes/" + articleID
        })
        .then(function(data) {
            console.log(data);
        })
    })

    function getArticles() {
        $.getJSON("/articles", function(data){
            for (var i = 0; i < data.length; i++) {
                $("#articles").append("<div class='card'><div class='row no-gutters'><div class='col-sm-4'>" + data[i].image + "</div><div class='col-sm-8'><div class='card-body' data-id='" + data[i]._id + "'><h3><a target='_blank' href='" + data[i].link + "'>" + data[i].title + "</a></h3><h5>Written by " + data[i].author + " | " + data[i].articleDate + "</h5><button class='btn btn-success btn-sm' id='noteBtn' data-toggle='modal' data-target='#notesModal' data-id='" + data[i]._id + "'>Add Note</button><button class='btn btn-success btn-sm' id='viewBtn' data-id='" + data[i]._id + "'>View Notes</button></div></div></div>");
            }
        });
    }

})

  


