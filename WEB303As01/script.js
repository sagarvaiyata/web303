/*
	WEB 303 Assignment 1 - jQuery
	Sanjay Kumar Anand
	0770698
*/

$(document).ready(function(){
	$("#yearly-salary,#percent").keyup(function(){
         var amount = 0;
		 var x = Number($("#yearly-salary").val());
         var y = Number($("#percent").val());
		 var amount= x * y;
		 $("#amount").val(amount);
	});
	});
