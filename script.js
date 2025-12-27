const goalInput=document.getElementById("newgoal");
const timeInput = document.getElementById("time");
const submitBtn=document.querySelector("#submitbtn");
const goalList = document.querySelector(".goallist ul");
const goalListItem = document.querySelectorAll(".goallist");
const timerHeading=document.querySelector("#timerheading");
const time=document.querySelector("#changabletime");

let goals = [];
let activeGoalIndex=null;
let timer=null;
let seconds=0;
let remainingSeconds=0;


submitBtn.addEventListener("click",()=>{
    const goalName=goalInput.value;
    const targetTime = Number(timeInput.value) * 3600;
    if(! goalName|| !targetTime){
        alert("Please enter both goal and time");
    }
    else{
        const goal = {
        name: goalName,
        target: targetTime,
        studied: 0
    };
    goals.push(goal);
    rendergoals();
    goalInput.value = "";
    timeInput.value = "";

    }
})
function formatTime(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);

  let result = "";

  if (hrs > 0) {
    result += hrs + " " + (hrs === 1 ? "hr" : "hrs");
  }

  if (mins > 0) {
    if (result !== "") result += " ";
    result += mins + " " + (mins === 1 ? "min" : "mins");
  }

  return result || "0 min";
}

function rendergoals(){
    goalList.innerHTML="";
    goals.forEach((goal, index) =>{
        const li = document.createElement("li");
        li.classList.add("goal-item");
        if(index===activeGoalIndex){
            li.classList.add("active");
        }
        li.innerHTML=`
            <span class="goal-name">${goal.name}</span>
            <span class="goal-time">${formatTime(goal.target)}</span>
        `;

        li.addEventListener("click", () =>{
            activeGoalIndex=index;
            timerHeading.textContent=goal.name;
            loadGoalTime(index)
            rendergoals();
        })
    goalList.appendChild(li);

    })
}

function startTimer(){
    if(activeGoalIndex===null){
        alert("Please select a goal!");
        return;
    }
    clearInterval(timer);
    
    timer= setInterval(()=>{

        if(remainingSeconds<=0){
            clearInterval(timer);
            timer=null;
            return;
        
        }
        remainingSeconds--;
        updateClock();

    },1000);
}

function updateClock(){
    const hrs=Math.floor(remainingSeconds/3600);
    const mins=Math.floor((remainingSeconds%3600)/60);
    const secs=Math.floor(remainingSeconds%60);
    time.innerText= String(hrs).padStart(2,"0")+":"+String(mins).padStart(2,"0")+":"+String(secs).padStart(2,"0");
    
}
console.log();

function loadGoalTime(index) {
  remainingSeconds = Number(goals[index].target);
  updateClock();
}

