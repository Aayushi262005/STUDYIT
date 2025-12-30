const goalInput=document.getElementById("newgoal");
const hrsInput = document.getElementById("hrsInput");
const minsInput = document.getElementById("minsInput");
const submitBtn=document.querySelector("#submitbtn");
const goalList = document.querySelector(".goallist ul");
const goalListItem = document.querySelectorAll(".goallist");
const timerHeading=document.querySelector("#timerheading");
const time=document.querySelector("#changabletime");
const stopBtn=document.querySelector("#stop");
const allSections = document.querySelectorAll(".allgoals, .progress");
const beep = new Audio("beep.mp3");
const mode=document.getElementById("mode");
const body=document.querySelector("body");
const modeIcon=document.querySelector("img");
const progressList=document.querySelector(".progress-item-list");
const total= document.getElementById("total");
const reset=document.querySelector("#reset")

let isBeeping = false;
let activeGoalIndex=null;
let timer=null;
let remainingSeconds=0;
beep.loop = true;
let goals = [];


submitBtn.addEventListener("click",()=>{
    const goalName=goalInput.value;
    const h= Number(hrsInput.value);
    const m = Number(minsInput.value);
    const targetTime = (h*3600)+(m*60);
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
    renderProgress();
    saveToLocal();
    goalInput.value = "";
    hrsInput.value = "";
    minsInput.value="";

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
    if (goals.length === 0) {
        goalList.innerHTML = `<p class="helperclass" style="align-item:center">No goals added yet.</p>`;
        return;
    }
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

stopBtn.addEventListener("click",()=>{
    if(activeGoalIndex===null){
        alert("Please select a goal!");
        return;
    }
    if(isBeeping){
        beep.pause();
        beep.currentTime = 0;
        isBeeping=false;
        stopBtn.textContent="Start";
        toggleFocusMode(false);
        return;

    }
    if(timer==null){
        startTimer();
        stopBtn.textContent = "Stop";
        toggleFocusMode(true);
    }
    else{
        clearInterval(timer);
        timer = null;
        stopBtn.textContent = "Start";
        toggleFocusMode(false);
    }
    
})

function startTimer(){
    if(activeGoalIndex===null){
        alert("Please select a goal!");
        return;
    }
    clearInterval(timer);
    
    timer= setInterval(()=>{

        if (remainingSeconds <= 0) {
            clearInterval(timer);
            timer = null;
            remainingSeconds = 0;
            isBeeping = true;
            beep.currentTime = 0;
            beep.play();
            return;
        }
        remainingSeconds--; 
        goals[activeGoalIndex].studied++;
        if (remainingSeconds < 0) remainingSeconds = 0; 
        updateClock();
        renderProgress();
        saveToLocal();
 
    },1000);
}

function updateClock(){
    const hrs=Math.floor(remainingSeconds/3600);
    const mins=Math.floor((remainingSeconds%3600)/60);
    const secs=Math.floor(remainingSeconds%60);
    time.innerText= String(hrs).padStart(2,"0")+":"+String(mins).padStart(2,"0")+":"+String(secs).padStart(2,"0");
    
}

function loadGoalTime(index) {
  remainingSeconds = Number(goals[index].target-goals[index].studied);
  updateClock();
}

function toggleFocusMode(isActive){
    allSections.forEach(section =>{
            section.style.opacity = isActive ? "0.5" : "1";
            section.style.pointerEvents = isActive ? "none" : "auto";
    })
}

mode.addEventListener("click",()=>{
    body.classList.toggle("dark");  
    if(body.classList.contains("dark")){
        modeIcon.src="sun2.png";
        localStorage.setItem("currMode","dark");
    }
    else {
        modeIcon.src = "moon2.png"; 
        localStorage.setItem("currMode","light");
    }
})

function renderProgress() {
    progressList.innerHTML = "";
    let currTotal=0;
    if (goals.length === 0) {
        progressList.innerHTML = `<p class="helperclass" style="text-align: center; margin-top: 20px;">Your progress tracking will appear here.</p>`;
        total.textContent = "00:00:00";
        return;
    }
    goals.forEach(goal => {
        currTotal += goal.studied;

        const percentage = Math.min(
            (goal.studied / goal.target) * 100,
            100
        );

        const item = document.createElement("div");
        item.classList.add("item");

        item.innerHTML = `
            <div class="til">
                <p class="progress-title">${goal.name}</p>
                <p class="progress-text">
                    ${formatTime(goal.studied)} / ${formatTime(goal.target)}
                </p>
            </div>
            <div class="progress-track">
                <div class="progress-fill" style="width:${percentage}%"></div>
            </div>
        `;

        progressList.append(item);
    });

    total.textContent = formatClock(currTotal);
}
function formatClock(totalSeconds) {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const sec = totalSeconds%60;

    return (
        String(hrs).padStart(2, "0") +
        ":" +
        String(mins).padStart(2, "0")+
        ":" +
        String(sec).padStart(2, "0")
    );
}

reset.addEventListener("click",()=>{
   
    if(confirm("Are you sure you want to reset all progress and goals for today?")){
        clearInterval(timer);
        timer = null;
        remainingSeconds = 0;
        stopBtn.textContent = "Start";
        toggleFocusMode(false);
        activeGoalIndex = null;
        goals=[];
        
        updateClock();
        rendergoals();
        renderProgress();
        saveToLocal();
        
    }
     

})
function saveToLocal() {
    localStorage.setItem("studyGoal", JSON.stringify(goals));
    localStorage.setItem("currMode",body.classList.contains("dark") ? "dark" : "light")
}

window.addEventListener("load",()=>{
    updateDailyQuote();
    const saved=localStorage.getItem("studyGoal");
    const savedMode=localStorage.getItem("currMode");
    if(saved){
        goals=JSON.parse(saved);
        
        rendergoals();
        if(savedMode=="dark"){
            body.classList.add("dark");
            modeIcon.src = "sun2.png";
        }
        else{
            body.classList.remove("dark");
            modeIcon.src= "moon2.png";
        }
        renderProgress();
        
    }

})
async function updateDailyQuote() {
    const quote= document.getElementById("daily-quote");
    const today = new Date().toDateString();
    const savedQuote= JSON.parse(localStorage.getItem("dailyQuote"));

    if(savedQuote && savedQuote.date===today){
        quote.innerText=savedQuote.text;
        return;
    }
    try{
        const response=await fetch ("https://quoteslate.vercel.app/api/quotes/random?maxLength=50");
        if(!response.ok) throw new Error("api limit");
        const data= await response.json();
        const quoteText= data.quote;

        const newQuote={
            text: quoteText,
            date:today
        }
        localStorage.setItem("dailyQuote",JSON.stringify(newQuote));
        quote.innerText=quoteText;
        console.log(localStorage.getItem("text"));
        
    }
    catch(error){
        quote.innerText="Dreams don't work unless you do";

    }
}