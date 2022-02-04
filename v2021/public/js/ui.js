const close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}

const page_title = document.getElementById('page-title')
const title_input = document.getElementById('title-input')

title_input.addEventListener('keyup' , (e) => {
 if (page_title.innerText.length <= 0) {
   return page_title.innerText = "add note" 
 }
 else page_title.innerText = e.target.value
})
