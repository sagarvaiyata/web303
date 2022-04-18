let submitButton = document.getElementById("submit");
let checkbox = document.getElementById("accept-terms");
let dropdown = $('#countries');
let countriesForm = document.getElementById("countries-form");
let container = document.querySelector(".container");
let username = document.getElementById("username");


$(document).ready(function () {
    $("#accept-terms").click(function () {
        $("#submit").attr("disabled", !this.checked);
    });

    // console.log(dropdown)
    dropdown.empty();
    dropdown.append('<option selected="true" disabled>Choose Country</option>');
    dropdown.prop('selectedIndex', 0);

    countries.forEach(country => {
        dropdown.append($('<option></option>').attr('value', country.code).text(country.name));
    })

    console.log(countriesForm)
    countriesForm.addEventListener("submit", function(e) {
        e.preventDefault();
        let message = `Welcome ${username.value}! The country you selected is ${dropdown.value}`;
        alert(message)
    })
});