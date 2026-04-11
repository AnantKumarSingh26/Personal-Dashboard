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

// localStorage.clear(); 


function todList() {

    let currentTask = JSON.parse(localStorage.getItem('currentTask')) || [];
    let allTask = document.querySelector('.allTask');

    //! Redering Task
    function renderTask() {
        localStorage.setItem('currentTask', JSON.stringify(currentTask))
        let sum = '';

        if (currentTask.length === 0) {
            sum = `<div class="task">
            <h5>Add Some Task in ToDo</h5>
          </div>`;
        } else {
            currentTask.forEach(function (elem, idx) {
                sum += `<div class="task">
            <h5>${elem.task}</h5>
            <button id="${idx}">Mark as Completed
            </button>
          </div>`
            })
        }
        allTask.innerHTML = sum;
    }

    // Use Event Delegation: Attach one listener to the parent container
    allTask.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
            currentTask.splice(e.target.id, 1);
            renderTask();
        }
    });

    renderTask(); //?Calling Render Task for view List of Task

    let form = document.querySelector(".addTask form")
    let taskInput = document.querySelector(".addTask form input");
    let taskDetailsInput = document.querySelector(".addTask form textarea");

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        currentTask.push({ task: taskInput.value, details: taskDetailsInput.value })
        renderTask();
        taskInput.value = ''
        taskDetailsInput.value = ''


    })
}

todList();


//? Daily Planner Full Page

function dailyPlanner() {

    let dayPlannerData = JSON.parse(localStorage.getItem('dayPlannerData')) || {};
    let dayPlanner = document.querySelector('.day-planner');

    var hours = Array.from({ length: 18 }, function (_, idx) {
        return `${6 + idx}:00 - ${7 + idx}:00`;
    })
    let wholeDaySum = ''

    hours.forEach(function (elem, idx) {
        let saveData = dayPlannerData[idx] || "";
        wholeDaySum += `<div class="day-planner-time">
    <p>${elem}</p>
    <input id ="${idx}" type="text" placeholder="..." value="${saveData}">
    </div>`
    })




    dayPlanner.innerHTML = wholeDaySum;

    let dayPlannerInput = document.querySelectorAll('.day-planner input');

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {

            dayPlannerData[elem.id] = elem.value;
            localStorage.setItem('dayPlannerData', JSON.stringify(dayPlannerData))
        })
    })

}

dailyPlanner();