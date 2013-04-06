function searchTwitter(query) {
	$.ajax({
		url: 'http://search.twitter.com/search.json?' + jQuery.param(query),
		dataType: 'jsonp',
		success: function(data) {
		var tweets = $('#tweets');
		tweets.html('');	
		$('#error').html('');		
		if ($.isEmptyObject(data.results))
			$("#error").append('not found').delay(20).fadeIn();
					
		var time_elements;	
		for (res in data['results']) {
							
			var tweet = $(".tweet").first().clone();
			var index = data['results'][res];
							
			var imgpath = index['profile_image_url'];
			var nickname = index['from_user'];
			var text = index['text'];
			var user = index['from_user_name'];
			var time = index['created_at'];
			time_elements = time.split(" ");
			//tweets.append('<div class="tweet"><img class="img" src="'+imgpath+'" /><div class="info"><p class="user"><span class="name">'+user+'</span><span class="handle">'+nickname+'</span></p><p class="text">'+text+'</p></div></div><br><hr>');
							
			tweet.find('.img').attr('src', imgpath);
			tweet.find('.name').text(user);
			tweet.find('.text').text(text);
			tweet.find('.time').text(time_elements[0]+time_elements[1]+" "+time_elements[2]+" "+time_elements[3]+" - "+time_elements[4]);
							
			tweet.find('.handle').attr('href'," http://twitter.com/@" + nickname );
			tweet.find('.handle').attr('title'," tweets by " + nickname );
			tweet.find('.handle').text("(@" + nickname+" )");
							
			tweet.appendTo('#tweets').fadeIn();							
			}
		}
	});
}
			
function time_check(time){
	 
	if(time=="")    time=10;
	/*if(time='0')		throw "yeniden giriniz";*/
	if(isNaN(time)) throw "not a number";
	return time;
	

}
	
function count_check(count){
	 
	if(count=="tweet count")    count=5;
	return count;
}	
	
	var inter;
				
	$(document).ready(function() {		//sayfanin tamamen yuklendikten sonra kodun tetiklenmesini saglar.
		$('#submit').click(function() {
			
			clearInterval(inter);
			 try
			{
				if($('#query').val()){
					time=time_check($('#refresh_time_input').val());
					var params = {
						q: $('#query').val(),
						rpp: count_check($("#tweet_count").val()),
						result_type: "recent"
					};
					searchTwitter(params);					
					inter=setInterval(function () {searchTwitter(params)},1000* time);
				}
				
				else{
				$('#tweets').html('');
					$('#error').html('');
					$("#error").append('it is empty').delay(20).fadeIn();
				}
			}
			catch(err)
			{
				$('#tweets').html('');
				alert("Error:" + err +".");
			}
					
			
		});
	});