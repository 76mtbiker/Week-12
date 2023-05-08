const DREAMS_URL = "https://64500c33b61a9f0c4d31fdad.mockapi.io/dreams";

/*NOTE - retrieves the data from the API, then goes through each object and adds it to the table body and adds a delete button
that, when clicked will delete the piece of data from the API itself. The function it calls is further below */

    $.get(DREAMS_URL).then(data =>
    data.map(dream => {
        $("tbody").append(
            $(`
            <tr>
                <td>${dream.id}</td>
                <td>${dream.name}</td>
                <td>${dream.goal}</td>
                <td>${dream.dream}</td>
                <td><button class="btn btn-danger" onclick="deleteDream(${dream.id})">Delete</button></td>
            </tr>
            `)
        )
    }))


/*NOTE - calls on the id for the Submit button in the HTML. Then it sets up a function to be activated when the button is clicked/
When the button is clicked, it will add the value of the input that has been put in fields called below */


$("#addGoal").on("click", () => {
  $.post(DREAMS_URL, {
      name: $("#addName").val(),
      goal: $("#addGoal").val(),
      dream: $("#addDream").val(),
  })
});
      

    /*NOTE - this function takes an id as its argument and uses that id to target the specific data it wants deleted from the API */

    function deleteDream(id) {
        $.ajax(`${DREAMS_URL}/${id}` , {
            method: "DELETE",
        });
    };

    /*NOTE - this function fetches the specific information based on the id number given and then allows us to enter in
    new data for the id and update the API. Prevent default is used to stop the page refreshing before the information is submitted */
    function updateDream(e) {
        e.preventDefault();
        let id = $("#updateID").val();
      
        fetch(`${DREAMS_URL}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify ({
            name: $("#updateName").val(),
            goal: $("#updateGoal").val(),
            dream: $("#updateDream").val(),
          })
        }) .then(response => {
      });
    };

      
      
      $("#updateDream").on("click", (e) => updateDream(e))
    