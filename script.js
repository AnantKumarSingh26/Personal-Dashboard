function openFeatures() {
    var allElems = document.querySelectorAll('.elem');
    var fullElemPage = document.querySelectorAll('.fullElem');
    var fullElemPageBackBtn = document.querySelectorAll('.back');


    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            fullElemPage[elem.id].style.display = 'block'
        })
    })

    fullElemPageBackBtn.forEach(function (back) {
        back.addEventListener('click', function () {
            fullElemPage[back.id].style.display = 'none';
        })
    })

}
openFeatures();

let form = document.querySelector(".addTask form")
let taskInput = document.querySelector(".addTask form input");
let taskDetailsInput = document.querySelector(".addTask form textarea");

let currentTask = [
    {
        task:'Check Mail',
        details: "Check all mails for updates"
    },
    {
        task:'Breakfast',
        details: "Take breakfast before 9 AM"
    }
];

form.addEventListener('submit',function(e){
    e.preventDefault();
     
})


let allTask = document.querySelector('.allTask')
let sum = '';

currentTask.forEach(function(elem){
    sum+=`<div class="task">
            <h5>${elem.task}</h5>
            <button>Mark as Completed
            </button>
          </div>`
})
allTask.innerHTML = sum;
