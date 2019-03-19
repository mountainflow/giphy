$(document).ready(function () {
    // array containing the permanent buttons at the start.
    let startVehicles = ["Ferrari", "Ducati", "Koenigsegg", "Porche", "Corvette", "Kawasaki", "Bugatti", "Pagani", "Harley"];
    // propogate the buttons div with the permanent buttons
    for (i = 0; i < startVehicles.length; i++) {
        let startButtons = $("<input>").attr({
            "class": "btn btn-light make-image",
            "type": "button",
            "data-search": startVehicles[i],
            "value": startVehicles[i]
        });
        $("#buttons").append(startButtons);
    }
    //create new buttons with information from the textbox
    $(".userInputForm").on("submit", function (e) {
        e.preventDefault();
        let userInput = $("#vehicleChoice").val().trim();
        if (userInput !== "") {
            let userButtons = $("<input>").attr({
                "class": "btn btn-light make-image",
                "type": "button",
                "data-search": userInput,
                "value": userInput
            });
            $("#buttons").append(userButtons);
            $("#vehicleChoice").val(""); //clears the textbox
            addGif(userInput);
        }
    })
    // clear the number of gif's to be added and default to 10
    $("#clear").on("click", function () {
        $("#gifAmount").val("");
    })
    // query the api and add the gif's to the vehicles div
    function addGif(param) {
        $("#vehicles").empty();
        console.log(param);
        let gifNumber = $("#gifAmount").val().trim();
        if (gifNumber === "") {
            gifNumber = 10;
        }
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + param +
            "&api_key=B1dUTrIeV9TDi8YKQUzZRzcTNhaln0j5&limit=" + gifNumber;
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                for (i = 0; i < response.data.length; i++) {
                    let vehDiv = $("<div>").attr("class", "d-inline-block");
                    let vehicleImage = $("<img>").attr({
                        "src": response.data[i].images.fixed_height_still.url,
                        "data-animate": response.data[i].images.fixed_height.url,
                        "data-still": response.data[i].images.fixed_height_still.url,
                        "data-state": "still",
                        "class": "gif"
                    });
                    let p = $("<p>").attr("class", "rating").text("rating: " + response.data[i].rating);
                    vehDiv.append(vehicleImage);
                    vehDiv.append(p);
                    $("#vehicles").append(vehDiv);
                    console.log(response);
                }
            })
    }
    // when buttons are clicked the api is queried and divs containing images and the ratings are shown on page
    $("#buttons").on("click", "input:button.make-image", function () {
        addGif($(this).data("search"));
    });
    // change the state of the gif from still to animate and back on user click
    $("#vehicles").on("click", ".gif", function () {
        let state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })
})