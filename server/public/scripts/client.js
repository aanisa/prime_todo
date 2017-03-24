$(document).ready(function() {
    console.log("JQ in action");

    $('.taskForm').on('submit', function(event) {
        event.preventDefault();
        console.log("task ready to accept");
    });




}); //end doc ready
