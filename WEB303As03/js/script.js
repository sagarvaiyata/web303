
$(function(){

let getJsonObject = $.getJSON("team.json").done(function (data) {
    // jQuery.each
    $.each(data.members, function (key, val) {
        console.log("data key: ", key, " and data value: ", val);

        $('#content').append(`<div id="${val.name.toLowerCase()}" id="team">
            <div class="name"><h2>${val.name}</h2></div>
            <div class="position"><h5>${val.position}</h5></div>
            <div class="bio"><p>${val.bio}</p></div>
        </div>`);
    });
});

console.log("The getjson object: ", getJsonObject);
});

// init();


$(function(){


function ajaxData() {
    $.ajax({
      url: "team.json",
      type: "GET",
      beforeSend: ()=> {
        $("div#team").html("Loading...");
      },
      error: (error)=> {
        $("div#team").html("Cannot get content at the moment, try later.");
      },
      success: (data) => {
      
          $("div#team").empty();
          $.each(data.members, (index, value) => {
            $("div#team").append(`<h2>${value.name}</h2>`);
            $("div#team").append(`<h5>${value.position}</h5>`);
            $("div#team").append(`<p>${value.bio}</p>`);
          });
        }
      
    })
  
}
});




