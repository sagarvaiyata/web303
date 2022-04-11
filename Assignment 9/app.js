$(document).ready(function(){
  $.getJSON("data.json", function(data) {
      var characterData = '';
      $.each(data, function(key, value) {  
        characterData += "<tr>";
        characterData += "<td>" + value.name + "</td>";
        characterData += "<td>" + value.CharacterName + "</td>";
        characterData += "<td>" + value.abilities + "</td>";
        characterData += "<td>" + value.firstAppearance + "</td>";
        characterData += "<td>" + value.ReleaseDate + "</td>";
        characterData += "<td>" + value.FriendsWith+ "</td>";
        characterData + "<tr>";
      })
  
      $('#tableBody').append(characterData);
      var amObject = data.filter((item) => /^[a-m]/i.test(item["name"]))
      var nzObject = data.filter((item) => /^[n-z]/i.test(item["name"]))
      $("#countAM").text(Object.keys(amObject).length);
      $("#countNZ").text(Object.keys(nzObject).length)

      $('.sortable').each(function() {
        var $table = $(this);
        var $tbody = $table.find('tbody');
        var $controls = $table.find('th');
        var rows = Array.from($tbody.find('tr'));
        console.log(rows);
      
        $controls.on('click', function(){
          var $header = $(this);
          var order = $header.data('sort');
          var column;
          // console.log($header.hasClass('ascending'))
      
          if($header.hasClass('ascending') || $header.hasClass('descending')) {
            $header.toggleClass('ascending descending');
            $tbody.append(rows.reverse());
          } else {
            $header.addClass('ascending');
            $header.siblings().removeClass('ascending descending');
      
            if(compare.hasOwnProperty(order)) {
              column = $controls.index(this);
              rows.sort(function(a,b) {
                a = $(a).find('td').eq(column).text();
                b = $(b).find('td').eq(column).text();
               
                return (compare[order](a,b));
              })
      
              /* $tbody.append(rows);
              if($header.hasClass('ascending')) {
                var headerText = $header.text();
                headerText += " <span> &#x25B2;</span>";
                $header.text(headerText);
              } else if($header.hasClass('descending')) {
                var headerText = $header.text();
                headerText += " <span>  &#x25BC;</span>";
                $header.text(headerText);
              } else {
                var headerText = $header.text();
                // headerText += " <span>  &#x25BC;</span>";
                $header.text(headerText);
              } */
            }
          }
        })
      })
  })
  

$("#myInput").on("keyup", function() {
  var value = $(this).val().toLowerCase();
  $("#tableBody tr").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});

$(".btn").on("click", function() {
    var filterValue = $(this).attr("id");      

    $.getJSON("data.json", function (data) {
      if (filterValue == "AM") {
        var sortedData = data.filter((item) => /^[a-m]/i.test(item["name"]));
      } else if (filterValue == "NZ") {
        var sortedData = data.filter((item) => /^[n-z]/i.test(item["name"]));
      }

      var characterData = "";
       $.each(sortedData, function (key, value) {
        characterData += "<tr>";
          characterData += "<td>" + value.name + "</td>";
          characterData += "<td>" + value.CharacterName + "</td>";
          characterData += "<td>" + value.abilities + "</td>";
          characterData += "<td>" + value.firstAppearance + "</td>";
          characterData += "<td>" + value.ReleaseDate + "</td>";
          characterData += "<td>" + value.FriendsWith+ "</td>";
          characterData + "<tr>";
      });

      $("#tableBody").empty().append(characterData);
    });
          
})
});

/* <th>Origin</th>
                      <th>Abilities</th>
                      <th>first appearance</th>
                      <th>first appearance date</th>
                      <th>notable aliases</th> */

var compare = {
name: function(a,b) {
  if(a > b) {
    return -1;
  } else {
    return a > b ? 1 : 0
  }
},
nameThe: function(a,b) {
  a = a.toLowerCase().replace(/^the /i, '');
  b = b.toLowerCase().replace(/^the /i, '');

  if(a > b) {
    return -1;
  } else {
    return a > b ? 1 : 0
  }
},
date: function(a,b) {
  a = new Date(a);
  b = new Date(b);

  return a - b;
}
}