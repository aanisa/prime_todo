var taskID = 0;


$(document).ready(function() {
    console.log("JQ in action");

    getTasks();
    addTaskButton();

    $('#newTask').on('click', '.complete', function() {
        taskID = $(this).data('tasks');           //accessing id of tasks from stashed data
        var completedStatus = true;

    $.ajax({
      type: 'PUT',
      url: '/tasks/complete',
      data: {status: completedStatus, id: taskID},
      success: function(response) {
        console.log(response);
        console.log('hey');
         getTasks();
      }
    });//end ajax
    }); //end complete button click

    $('#newTask').on('click', '.delete', function() {
        taskID = $(this).data('tasks');
        console.log(taskID);

        $.ajax({
          type: 'DELETE',
          url: '/tasks/delete' + taskID,
          success: function(response) {
            console.log(response);
            console.log('deleting for sure');
            //  getTasks();
          }
        });//end ajax
    }); //end complete button click



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
                $el.append('<li>' + tasks.task + tasks.status + '</li>' +
                    '<button class="complete" data-tasks="' +
                    tasks.id + '">Complete</button>' +
                    '<button class="delete" data-tasks="' +
                    tasks.id + '">Delete</button>');
            }
        }
    }); //end ajax request

} //end function

function addTaskButton() {
    $('.taskForm').on('submit', function(event) {
        event.preventDefault();
        var status = false;
        $.ajax({
            type: "POST",
            url: ('/tasks/add'),
            data: {
                task: $('#inputTask').val(),
                status: status
            },
            success: function(response) {
                getTasks();
            }
        }); //end ajax
    }); //end taskForm jquery
} //end function

function completeTask() {

}

function deleteTask() {

}
