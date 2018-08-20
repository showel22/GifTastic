$(document).ready(() => {
    var topics = ['sneakers', 'automation', 'photography', 'canon', 'friday', 'dancing'];

    var view = $('#container');
    var containerRow = $('<div class="row">');
    var gifContainer = $('<div>');
    gifContainer.attr('id', 'gifContainer');
    gifContainer.addClass('col-8');
    var gifRow = $('<div>');
    gifRow.attr('id', 'gifRow');
    gifRow.addClass('row');
    gifContainer.append(gifRow);
    containerRow.append(gifContainer);
    var formSection = $('<div>');
    formSection.addClass('col-4');
    var input = $('<input id="topicInput" type="text">');
    input.addClass('form-control');
    var submit = $('<button class="btn btn-primary">')
    submit.text('Add Topic');
    submit.click(function(){
        var topic = $('#topicInput').val().trim();
        topics.push(topic);
        $('#topicInput').val('');
        redrawTopics();
    }.bind(this));
    formSection.append(input);
    formSection.append(submit);
    containerRow.append(formSection);
    var btnGroup = $('<div>');
    btnGroup.addClass('btn-group row');
    redrawTopics();
    view.append(btnGroup);
    view.append(containerRow);

    function redrawTopics(){
        btnGroup.empty();
        topics.forEach((topic) => {
            var button = $('<button>');
            button.addClass('btn btn-primary');
            button.text(topic);
            button.click(getGifs);
            btnGroup.append(button);
        });
    }

    function getGifs(){
        $('#gifRow').empty();
        $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q='+ $(this).text() +'&limit=10&rating=g&api_key=9wbYUu0uTvkPw8wprZTbUN9Fy1AzepDz',
            method: 'GET'
        }).then((response) => {
            var results = response.data;

            results.forEach((result) => {
                var gifDiv = $("<div class='item col-3'>");
                var rating = result.rating;
                var p = $("<p>").text("Rating: " + rating);
                var personImage = $("<img class='img-fluid'>");
                personImage.attr("src", result.images.fixed_height_still.url);
                personImage.attr("data-otherURL", result.images.fixed_height.url);
                personImage.click(switchImage);
                gifDiv.append(p);
                gifDiv.append(personImage);
                $("#gifRow").prepend(gifDiv);
            });
        });
    };

    function switchImage(){
        var element = $(this);
        var currentImage = element.attr('src');
        var otherImage = element.attr('data-otherURL');
        element.attr('data-otherURL', currentImage);
        element.attr('src', otherImage);
    }

     

});