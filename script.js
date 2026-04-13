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
// ! Calling Todo List
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
// ! Calling Daily Planner
dailyPlanner();

function motivationalQuote() {
    // let quote =fetch('https://motivational-spark-api.vercel.app/api/quotes/random')

    async function fetchQuote() {
        let response = await fetch('https://motivational-spark-api.vercel.app/api/quotes/random')
        let data = await response.json()
        // console.log(data.quote);
        // console.log(data.author);
        let author = document.querySelector('.motivation-3 h5')
        // console.dir(author);
        author.innerHTML = data.author

        let quote = document.querySelector('.motivation-2 h2')
        quote.innerHTML = data.quote
    }
    fetchQuote();
}

motivationalQuote()



function pomodoroTimer() {

    let totalSeconds = 25 * 60;
    let timer = document.querySelector('.pomodoro-timer h1')
    let startBtn = document.querySelector('.start-timer');
    let pauseBtn = document.querySelector('.pause-timer');
    let resetBtn = document.querySelector('.reset-timer');
    let timerInterval; // Declare the variable to store the interval ID

    function updateTime() {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        timer.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval); // Now safe to call because timerInterval is declared
        timerInterval = setInterval(function () {
            --totalSeconds;
            if (totalSeconds >= 0) {
                updateTime()
            }
        }, 1000)
    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }

    function resetTimer() {
        totalSeconds = 25 * 60;
        clearInterval(timerInterval)
        updateTime()
    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer)
}

pomodoroTimer();

// async function weatherApiCall() {
    
//     let data = await response.json()
//     console.log(data);
// }


async function weatherApiCall() {
    let data;
    const fallback = {
        location: 'Mumbai',
        current_temp: 34
    }
    try {
        const response = await fetch(`${CONFIG.BASE_URL}?key=${CONFIG.WEATHER_API_KEY}&q=${CONFIG.LOCATION}`);

        if(!response.ok){
            throw new Error(`HTTP error! status : ${response.status}`);
        }
        data = await response.json();

    }catch(error){
        data = fallback
    }
    // console.log(data.location.name);
    // console.log(data.current.temp_c);
    console.log(data);
    let temp = document.querySelector('.temp')
    let location = document.querySelector('.place');
    let weather_condition =  document.querySelector('.weather-condition');
    let precepetaiton = document.querySelector('.prec');
    let humidity =  document.querySelector('.humid');
    let wind = document.querySelector('.wind')

    temp.innerHTML = `${data.current.temp_c} °C`;
    location.innerHTML = `<i class="ri-map-pin-2-fill"></i> ${data.location.name}`
    weather_condition.innerHTML = data.current.condition.text;
    precepetaiton.innerHTML = 'Precipitation : '+data.current.precip_mm;
    humidity.innerHTML = 'Humidity : ' +data.current.humidity+'%';
    wind.innerHTML ='Wind : '+ data.current.wind_kph+'%';

    let date = document.querySelector('.head-left .date');
    let time = document.querySelector('.time');
    setInterval(()=>{let now =new Date();
        const formattedDayTime = now.toLocaleString('en-US',{
            weekday: 'long',
            hour:'2-digit',
            hour12:true,
            minute :'2-digit',
            second:'2-digit'
        })
        const formattedDate = now.toLocaleString('en-US',{
            day: 'numeric',
            month: 'long',
            year : 'numeric'
        })
        date.innerHTML = formattedDate
        time.innerHTML = formattedDayTime
    },1000)
}

weatherApiCall();