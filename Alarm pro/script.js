//variable declaration
const setAlarm=document.querySelector("#set");
const content=document.querySelector(".content");
const alarmTime=document.querySelectorAll("select");
const resetAlarm=document.querySelector("#reset");
var addactive=document.getElementById("clockImg");
let list=document.querySelector(".alarmList-container");

var secds=0;
// let isAlarmSet=false;
let alarm_time="";
//alarm array
let alarmList=[];          
//alarm music       
let tone=new Audio("Alarm 2.mp3");      
let currTime_display="";
//disable OFF button
document.getElementById("off").style.display="none";  

//set time interval for current time update
setInterval(currTime,1000); 

      /* Current time function*/

//start current time function
function currTime(){   

   const d = new Date();
   document.getElementById("currTime").innerHTML = d.toLocaleTimeString();
   let hr=d.getHours();
   let min=d.getMinutes();
   let sec=d.getSeconds();
   secds=sec;
   let currampm="AM";  

   //set am or pm 12hr 
      if(hr>=12){
         hr=hr-12;
         currampm="PM";
      }

      //set 0 before in 1 digit selected value
      hr=hr==0 ? (hr=12):hr;
      hr=hr<10 ? "0"+hr:hr;
      min=min<10?"0"+min:min;
      sec=sec<10?"0"+sec:sec;

      //display current time in hours minutes am/pm
      currTime_display.innerHTML=`${hr}:${min}:${currampm}`;
      currTime_display=`${hr}:${min}:${currampm}`;

      //check alarm list is empty or not 
         
            const temp="M";
            if(alarmList.some(element=>element.includes(temp))){
               list.innerHTML="List of Set Alarm's"
            }
             else{
            list.innerHTML="";
          }         


   /*Ring alaram tone check current time with set alarm*/
   
   if(alarmList.length>=0){
      for(var i=0;i<alarmList.length;i++)
      {    
        //check condition
         if(alarmList[i]==`${hr}:${min}:${sec}:${currampm}`) 
         {  
            tone.play();      
            //enable off button
            document.getElementById("off").style.display="";               
            
            addactive.classList.add("activate");
            // calling pause alarm function
            addactive.addEventListener("click",pause_alarm);
         }
      }
   }
  
}//end current time function

//use for show and select hours in option list 
for(let i=12;i>0;i--){
   i=i<10 ? "0"+ i : i;
   let opt=`<option value="${i}">${i}</option>`;
   alarmTime[0].firstElementChild.insertAdjacentHTML("afterend",opt);
}

//use for show and select minutes in option list 
for(let i=59;i>=0;i--){   
    i=i<10 ? "0"+ i : i;
    let opt=`<option value="${i}">${i}</option>`;
    alarmTime[1].firstElementChild.insertAdjacentHTML("afterend",opt);
 }

 //secounds in option list 
 for(let i=59;i>=0;i--){
   i=i<10 ? "0"+ i : i;
   let opt=`<option value=secds>secds</option>`;
   alarmTime[2].firstElementChild.insertAdjacentHTML("afterend",secds);
}

//use for select am/pm option
 for(let i=2;i>0;i--){
    let mid=i==1 ? "AM" : "PM";
    let opt=`<option value="${mid}">${mid}</option>`;
    alarmTime[3].firstElementChild.insertAdjacentHTML("afterend",opt);
 }
   
         /*reset the alarm values*/

 resetAlarm.addEventListener("click",resetfunction);
//Start reset function for reset values
 function resetfunction(){
   document.getElementById("off").style.display="none";
   
    const hr=document.getElementById("hour");
    const min=document.getElementById("min");
    const ampm=document.getElementById("ampm");
   //Reset hour to its orignal
    hr.selectedIndex="00";  
    // reset min to its orignal 
    min.selectedIndex="00";
    // reset am/pm
    ampm.selectedIndex="00";  
}//End of reset function


               /* set time for alarm */
//start set alarm function
   function setAlarmfun() {  

         document.getElementById("off").style.display="none";
         // fetch time from alarmTime array with sec
         let time = `${alarmTime[0].value}:${alarmTime[1].value}:${alarmTime[2].value}:${alarmTime[3].value}`;
         //without sec
         alarm_time=`${alarmTime[0].value}:${alarmTime[1].value}   ${alarmTime[3].value}`; 
        //check condition time include hr,min and am/pm
         if (time.includes("hour") || time.includes("min") || time.includes("midden")) {  
            return alert("Set Proper Alarm Time/Format");
         }

         //check for dublicate alarm time
      if(alarmList.includes(time)){
         resetfunction();
         return alert("Same Alarm has been set");
      }
      //add alarm in array (alarmTime)
      alarmList.push(time); 
      // call create function for create alarm list
      createlist(alarm_time); 
      alarm_time = time;
      // isAlarmSet = true;
      //reset value using reset function
      resetfunction(); 
      // alert for set alarm

      return alert("You Have Set the Alarm"); 
   } //end set alarm function
//click event handling on SET button 
   setAlarm.addEventListener("click", setAlarmfun); 

var alarmcnt=0;

                  /*create alarm list*/
      //start create alarm list function
      function createlist(time){
         alarmcnt++;       
         let show_alarm_list=`   
                                 <div class="alarmList" id="alarm${alarmcnt}" ><span id="span${alarmcnt}">${time}</span>                            
                                    <i class="fa-solid fa-trash-can" id="${alarmcnt}" onclick="delete_alarm(this.id)"></i>                                                           
                                 </div>
                              `;  //create html div and id for delete list items

         list.insertAdjacentHTML("afterend",show_alarm_list); //add list item below 
         
      }//end create alarm list function

      

   const stopalarm= document.querySelector("#off");
   //click event handling on OFF button
   stopalarm.addEventListener("click",pause_alarm);

            /*function for pause alarm - music*/
   //start alarm pause function
   function pause_alarm(){
         tone.pause();
         alarm_time="";
         //disable OFF button
         document.getElementById("off").style.display="none";

         var addactive=document.getElementById("clockImg");   
         //deactivate clock image trasmform      
         addactive.classList.remove("activate");   
         // return(isAlarmSet=false);
   }//End alarm pause function


      /* Remove alarm from list*/
//start alarm delete/remove alarm div function
function delete_alarm(alarmcnt){

   var remove_id=document.getElementById("alarm"+alarmcnt);      
   var del=alarmcnt-1;
   
   alarmList.splice(del,1," ");
   remove_id.remove();   
}
/*function myFunction() {
   var element = document.getElementById("mode-button");
   element.classList.toggle("dark");
   }*/
////////////////////////////////////////
const toggleSwitch =
    document.getElementById('.theme-slider input[type="checkbox"]');
  
/* Function to change theme */
function switchTheme(e) {
  
    /* Once checkbox is checked default theme change to dark */
    if (e.target.checked) {
        document.getElementById.setAttribute('theme', 'dark');
    }
  
    /* While page in dark mode and checkbox is 
    checked then theme back to change light*/
    else {
        document.getElementById.setAttribute('theme', 'light');
    }
}
  
toggleSwitch.addEventListener('change', switchTheme, false);