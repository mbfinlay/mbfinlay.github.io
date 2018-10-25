$(function(){
// You can add Users inside JSON users section
var _json = {
	users: ["Me" ],
	chats: [{
		from: 'Chatbot',
		msg: 'Ask me about Products and Services offered by SSFCU, for example: <br><br>- Checking accounts <br>- Home Loans <br>- Auto Loans <br>- Investments <br>- Insurance <br>- Rewards',
		time: '1533263925814',
		action: ''
	}, {
		from: 'Me',
		msg: 'I want to apply for a home loan',
		time: '1533263925814',
		action: ''
	},{
		from: 'Chatbot',
		msg: 'You can choose from 2 mortgage options. <br><br><b>Power Mortgage</b> - Save up to $5,000 in closing costs, plus pay no origination fee. <br><br><b>Power Rate</b> - Save on your monthly payments, choose  and get our lowest, discounted interest rate.',
		time: '1533263925814',
		action: ''
	},{
		from: 'Chatbot',
		msg: '<a href="#">Learn More about SSFCU mortgage options</a>',
		time: '1533263925814',
		action: ''
	}]
};

init();
function init () {
	renderData();
};	
function renderData () {
	var _now = $.now();
	getDateTime(_now);
	_json.users.forEach(function (user) {
		var userID = user.replace(/ /g,"_");
		var parentString = '<div class="chatbox" id="'+userID+'">'+
		'<div class="chats">'+
		'<ul></ul>'+
		'</div>'+
		'<div class="sendBox">'+
		'<input type="text" placeholder="enter next line '+'...">'+
		'</div>';	
		$('#viewport').append(parentString);
		_json.chats.forEach(function (chat) {
			var _cl;
			(chat.from === user) ? _cl = 'you' : _cl = 'him';
			var dataString = '<li>'+
			'<div class="msg ' + _cl +'">'+
			'<span class="partner">'+ chat.from +'</span>'+
			chat.msg +
			'<span class="time">' + getDateTime (chat.time) + '</span>'+
			'</div></li>';
			$('#viewport #'+ userID +' .chats>ul').append(dataString);		
		});
	});
	
};
function getDateTime (t) {
	var month 	= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];	
	var d 		= new Date(t/1000),
	month 	= (month[d.getMonth()]),
	day 		= d.getDate().toString(),
	hour 	= d.getHours().toString(),
	min 		= d.getMinutes().toString();
	(day.length < 2) ? day = '0' + day : '';
	(hour.length < 2) ? hour = '0' + hour : '';
	(min.length < 2) ? min = '0' + min : '';		
	var res = ''+month+' '+day+' '+hour+ ':' + min;
	return res;
}
$('#viewport .sendBox>input').keypress(function( e ) {			
	var _id = $(this).closest('.chatbox').attr('id');
	pendingRender(_id);
	if(e.which == 13) {
		var msgFrom;
		_json.users.forEach(function (user) {
			if(user.replace(/ /g,"_") === _id)
				msgFrom = user;
		});
		var msg = $('#'+_id+' .sendBox>input').val();
		msg = msg.replace(/\"/g,'\\"');
		var t = $.now();
		$('#'+_id+' .sendBox>input').val('');
		if(msg.replace(/\s/g, '') !== ''){
			var temp = {
				from: msgFrom,
				msg: msg,
				time: t.toString(),
				action: ''
			}
			_json.chats.push(temp);
			console.log(_json);
			newMsgRender (temp);
		} else {
			$('#viewport .chats ul>li.pending').remove();
		}
	}
});
function newMsgRender (data) {
	$('#viewport .chats ul>li.pending').remove();
	_json.users.forEach(function (user) {
		var checkID = user.replace(/ /g,"_");
		var _cl = '';
		(data.from === user) ? _cl = 'you' : _cl= 'him';					
		$('#viewport .chatbox#'+ checkID +' .chats ul').append('<li><div class="msg '+_cl+'">'+
			'<span class="partner">'+ data.from +'</span>'+
			data.msg +
			'<span class="time">' + getDateTime (data.time) + '</span>'+
			'</div>'+
			'</li>');	
	});
}

$('#viewport .sendBox>input').focusout(function() {
	$('#viewport .chats ul>li.pending').remove();
});
});