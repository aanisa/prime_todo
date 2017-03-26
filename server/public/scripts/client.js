$(document).ready(function() {
    console.log("JQ in action");

addTaskButton();
getTasks();

}); //end doc ready


function getTasks() {
  $.ajax({
      type: "GET",
      url: "/tasks",
      success: function(response) {
        console.log(response);
          $('#newTask').empty();
          for (var i = 0; i < response.length; i++) {
              var tasks = response[i];
              $('#newTask').append('<li></li>');
              var $el = $('#newTask').children().last();
              $el.append('<li>' + tasks.task + tasks.status +
                  '<button id="completeButton">Complete</button>' +
                  '<button id="deleteButton">Delete</button>' + '</li>');
          }
      }
  });

}//end function

function addTaskButton() {
  $('.taskForm').on('submit', function(event) {
      event.preventDefault();
      var status = false;
  $.ajax({
      type: "POST",
      url: ('/tasks/add'),
      data: {task: $('#inputTask').val(), status: status},
      success: function(response) {
          console.log(response);
          getTasks();
      }
  });//end ajax
  });//end taskForm jquery
}//end function
