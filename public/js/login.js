var __links = document.querySelectorAll('a');

function __linkClick(e) {
	parent.window.postMessage(this.href, '*');
};

for (var i = 0, l = __links.length; i < l; i++) {

	if ( __links[i].getAttribute('data-t') == '_blank' ) {

	 __links[i].addEventListener('click', __linkClick, false);
	 
}}

// 点击关闭按钮
// $(document).ready(function(c) {
// 	$('.alert-close').on('click', function(c){
// 		$('.message').fadeOut('slow', function(c){
// 	  		$('.message').remove();
// 		});
// 	});	  
// });