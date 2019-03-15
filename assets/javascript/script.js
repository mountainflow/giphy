$(document).ready(function () {
    // array containing the permanent buttons at the start.
    let startVehicles = ["Ferrari", "Ducati", "Koenigsegg", "Porche", "Corvette", "Kawasaki", "Bugatti", "Pagani", "Harley Davidson"];
    // propogates the buttons div with the permanent buttons
    for (i = 0; i < startVehicles.length; i++) {
        let startButtons = $("<input>").attr({
            "class": "btn btn-light",
            "type": "button",
            "data-search": startVehicles[i],
            "value": startVehicles[i]
        });
        $("#buttons").append(startButtons);
    }
    // when buttons are clicked the api is queried and divs containing images and the ratings are shown on page
    $("input:button").on("click", function () {
        $("#vehicles").empty();
        let x = $(this).data("search");
        console.log(x);
        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x +
            "&api_key=B1dUTrIeV9TDi8YKQUzZRzcTNhaln0j5&limit=9";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                for (i = 0; i < response.data.length; i++) {
                    let vehDiv = $("<div>");
                    let vehicleImage = $("<img>").attr({
                        "src": response.data[i].images.fixed_width_still.url,
                        "data-animate": response.data[i].images.fixed_width.url,
                        "data-still": response.data[i].images.fixed_width_still.url,
                        "data-state": "still",
                        "class": "gif"
                    });
                    let p = $("<p>").text("rating: " + response.data[i].rating);
                    vehDiv.append(vehicleImage);
                    vehDiv.append(p);
                    $("#vehicles").append(vehDiv);
                    console.log(response);
                }
            })
    })
    //*************************************************************************************
    //need to add an event listener for "Go" button that creates a new button in the buttons div with data-search and value fields from text-input

    // ********************************************************************************************

    // changes the state of the gif from still to animate and back on user click
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