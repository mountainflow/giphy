$("button").on("click", function () {
    let x = $(this).data("search");
    console.log(x);
    let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x +
        "&api_key=B1dUTrIeV9TDi8YKQUzZRzcTNhaln0j5&limit=5";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            for (i = 0; i < response.data.length; i++) {
                let vehDiv = $("<div>");
                let vehicleImage = $("<img>").attr({
                    "src": response.data[i].images.fixed_width.url,
                    "data-animate": response.data[i].images.fixed_width.url,
                    "data-still": response.data[i].images.fixed_width_still.url,
                    "data-state": "animate",
                    "class": "gif"
                });
                let p = $("<p>").text("rating: " + response.data[i].rating);
                vehDiv.append(vehicleImage);
                vehDiv.append(p);
                $("#vehicles").prepend(vehDiv);
                console.log(response);
            }
        })
})
$("#vehicles").on("click", ".gif", function () {
    let state = $(this).attr("data-state");
    if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    } else {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log("data-state= " + state);
    }
})