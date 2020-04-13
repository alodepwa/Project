$(document).ready(function(){
   /*
	* TrungLV background image home page move
	*/
	$('.body .top').backgroundMove({
	  	movementStrength:'50'
	});

	/*
	* TrungLV  toggle info when click btn "thông tin chi tiết"
	*/ 
	$(document).on('click', '.btn_info', function(e){
		e.preventDefault();
		let parent = $(this).parents('.card');
		parent.find('.col_btn_info').toggleClass('col_btn_info_show');
	});

	//scroll horizontal fix 3 column
	// $('#dtHorizontalVerticalExample').scroll(function(){
	// 	// $('#dtHorizontalVerticalExample thead').each( (index, el) => {
	// 	// 	var p = el.offsetLeft();
	// 	// 	console.log(el);
	// 	// });
	// 	$('#dtHorizontalVerticalExample .alo').css({'position':'sticky', 'left': `${po_left} px`});
	// 	// $('#dtHorizontalVerticalExample th:lt(3)').scrollLeft(10);
	// });
})