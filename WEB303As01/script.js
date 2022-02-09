/*
	WEB 303 Assignment 1 - jQuery
	Sanjay Kumar Anand
	0770698
*/

$( document ).ready(function() {
    $("#yearly-salary,#percent").keyup(function() {
        p=$("#percent").val()
        s=$("#yearly-salary").val()
        if(p!="" && s!="")
        {
            v=(p*s/100).toFixed(2)
            $("#amount").html("$"+v)
        }
        else
            $("#amount").html("$0")
    });
});

