
const setTime = document.querySelector('.set-timer');
let display = document.querySelector('.alarm-list');


let timeList = [];

let id = 1;
setTime.addEventListener('click',(e)=>{
    e.preventDefault();

    let hrs = document.getElementById('hours').value;
    let mins = document.getElementById('minutes').value;
    let secs = document.getElementById('seconds').value;

    let hrsToSecs = hrs * 60 * 60;
    let minToSecs = mins * 60;
    let seconds = parseInt(secs);

    let totalDuration = hrsToSecs + minToSecs + seconds;
    
    console.log(totalDuration);
    timeList.push({
        duration : totalDuration,
        timeId : id++,

    })

    console.log(timeList);
    startTimer(totalDuration, id++);

})


function startTimer(duration, id) {
    let timer = duration;
    // let display = document.querySelector('.alarm-list');
    
    document.querySelector(".text-display").style.display = "none";


    let div = document.createElement('div');
    div.className = "count-started";
    div.setAttribute("id",id);

        let interval = setInterval(function () {
    
            const hours = Math.floor(timer / 3600);
            const minutes = Math.floor((timer % 3600) / 60);
            const seconds = timer % 60;
        
            console.log(hours, minutes, seconds, id);
            
            let hrs = hours.toString().padStart(2, '0');
            let mins = minutes.toString().padStart(2, '0');
            let secs = seconds.toString().padStart(2, '0'); 
            
            
            div.innerHTML = `
            <span class="end-time" id="${id+2}">
                <p id="left-time-label">Time Left :</p>
                <div class="time-remaining" id="times-up">
                    <input type="number" value="${hrs}" id="hours-left" placeholder="00" name="hours">:
                    <input type="number" value="${mins}" id="minutes-left" placeholder="00" name="minutes">:
                    <input type="number" value="${secs}" id="seconds-left" placeholder="00" name="seconds">
                </div>
            </span>
            <button class="dlt-timer" id=${id+1}>Delete</button>`;
    
            // Decrement the timer
            timer--;
    

            let dltDiv = document.getElementById(id+1);
                dltDiv.addEventListener('click',(e)=>{
                    dltTimeSlot(div.id);
                })

            // Check if the timer has reached zero
            if (timer < 0) {
                clearInterval(interval);

                div.style.backgroundColor = "yellow";
                
                let changeContext = document.getElementById(id+2);
                changeContext.textContent = "Time's Up!";
                changeContext.style.padding = "15px";
                changeContext.style.color = "black";
                changeContext.style.justifyContent = "center";
                
                dltDiv.textContent = "Stop";
                dltDiv.style.color = "white";
                dltDiv.style.backgroundColor = "black";
                
                // alert("Time's up!");
                audioPlay();
            }
        }, 1000); // Update the timer every second (1000ms)

    display.append(div);

}


function dltTimeSlot(timerId){
    let dltDiv = document.getElementById(timerId);
    console.log(dltDiv.id);

    // if(dltDiv.id === dltDiv2.id2){
        dltDiv.remove();
    // }
}


function audioPlay(){
    let audio = new Audio("audio2.mp3");
    audio.play();
}


