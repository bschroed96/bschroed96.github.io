const a = Math.floor((Math.random() * 200) + 1);
const b = Math.floor((Math.random() * 200) + 1);
const c = Math.floor((Math.random() * 200) + 1);
const d = Math.floor((Math.random() * 200) + 1);
const e = Math.floor((Math.random() * 200) + 1);
const f = Math.floor((Math.random() * 200) + 1);
const g = Math.floor((Math.random() * 200) + 1);
const h = Math.floor((Math.random() * 200) + 1);

console.log(a)
console.log(b)

// randomly place navbar elements
var about = document.getElementById('about');
about.style.position = "absolute";
about.style.left = 200 + a + 'px';
about.style.top = 100 + b + 'px';

var blog = document.getElementById('blog');
blog.style.left = 210 + c + 'px';
blog.style.top = 90 + d + 'px';

var work = document.getElementById('work');
work.style.left = 195 + e + 'px';
work.style.top = 105 + f + 'px';

var home = document.getElementById('home');
home.style.left = 215 + g + 'px';
home.style.top = 80 + h + 'px';



// Create draggable about div
$(function() {
	$("#about").draggable();
});

$(function() {
	$("#blog").draggable();
});

$(function() {
	$("#work").draggable();
});

$(function() {
	$("#home").draggable();
});


// Create Lazy susan type content carousel

$('.bodycircle').click(function() {
	$('.bodycircle').addClass('spin');
});










