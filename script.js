var allElems = document.querySelectorAll('.elem');
var allfullElem = document.querySelectorAll('.fullElem');



allElems.forEach(function(elem){
    elem.addEventListener('click',function(){
        allfullElem[elem.id].style.display='block'
    })
}) 