let monthValue = new Date().getMonth();
let yearValue = new Date().getFullYear();

let monthCurrent;
let dayCurrent;
let yearCurrent;
let fullDate;
let epochDate;
let currentExpenseVal;
let oldestDate = new Date(Date.UTC(yearValue, monthValue, 1, 12)).getTime();
let newestDate = new Date(Date.UTC(yearValue, monthValue, 1, 12)).getTime();
let oldestVal = 0;
let newestVal = 0;
let alphaTotal = 0;
const logMap = new Map();
const expenseMap = new Map();
const totalsMap = new Map();
const runningTotals = new Map();
const nextButton = document.getElementById("nextButton")
const prevButton = document.getElementById("previousButton")
const monthH1 = document.getElementById("month")
const yearH1 = document.getElementById("year")
const calendar = document.getElementById("calendar")
const backDrop = document.getElementById("backDrop")

const saveButton = document.getElementById("saveButton")
const cancelButton = document.getElementById("cancelButton")
const addButton = document.getElementById("addButton")
const incomeButton = document.getElementById("incomeButton")
const expenseButton = document.getElementById("expenseButton")

const amountBox = document.getElementById("amountInput")
const descriptionBox = document.getElementById("descriptionInput")
const form = document.getElementById("form");

const historyDiv = document.getElementById("financeInfo");

const popupTitleH1 = document.getElementById("popupTitle");
const total = document.getElementById("total");
const totalDiv = document.getElementById("totalDiv");





const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January","February", "March","April","May","June","July","August","September","October","November","December"];

nextButton.addEventListener("click", () => changeMonth(1));
prevButton.addEventListener("click", () => changeMonth(-1));
saveButton.addEventListener("click", () => savePressed());
cancelButton.addEventListener("click", () => cancelPressed());
incomeButton.addEventListener("click", () => incomeExpensePressed(1));
expenseButton.addEventListener("click", () => incomeExpensePressed(2));
addButton.addEventListener("click", (event) => addExpense(event));



function load(){


    const todayDate = new Date();

    const curretDay = todayDate.getDate();
    const currentMonth = todayDate.getMonth();
    const currentYear = todayDate.getFullYear();
    backDrop.style.display='none';
    alphaTotal = 0;

 

    calendar.innerHTML = '';

    let firstDay = new Date(months[monthValue] + '1, ' + yearValue).getDay();
    let daysInMonth = new Date(yearValue, monthValue + 1, 0).getDate();

    let calcDates = (newestDate - oldestDate) / 86400000; 
    
    let currentDate = oldestDate;

    console.log("newest: " + newestDate);
    console.log("oldest: " + oldestDate);

    alphaTotal = 0;
    runningTotals.clear();

    for(i = 0; i < calcDates+ 1; i++){

        if(totalsMap.get(currentDate)){
         
            let currentRunningTotal = totalsMap.get(currentDate);


            alphaTotal += currentRunningTotal

            runningTotals.set(currentDate, alphaTotal)

           console.log(i + " hit: " + alphaTotal)
          
        }
        else{

            runningTotals.set(currentDate, alphaTotal)
            console.log(i + " norm: " + alphaTotal)

        }

     

      

        currentDate += 86400000
    }

    let index = 0;
    let currentEpoch = 0;

    for (let i = 0; i < firstDay + daysInMonth; i++) {

        const newDiv = document.createElement('div');
        const totalH1 = document.createElement('h1');

        if(i < firstDay){
            
            newDiv.className = 'fakeDay';
        }
        else if(curretDay === (index + 1) && currentMonth === monthValue && currentYear === yearValue){
            newDiv.className = 'realDay';

            const todayDiv = document.createElement('div');
            todayDiv.className = 'todayDiv';
            index++;
            todayDiv.textContent = index

            todayDiv.style.color="white";
            newDiv.addEventListener("click", () => dayPressed(todayDiv.innerHTML, monthH1.innerHTML, yearH1.innerHTML));

            if(getEpoch(currentMonth, index, currentYear) >= newestDate){
               
             
                if(runningTotals.get(newestDate) >= 0){
                    totalH1.textContent= "+$" + runningTotals.get(newestDate)
                }
                else{
                    totalH1.textContent= "-$" + runningTotals.get(newestDate)
                    newDiv.className = "negativeDay";
                }
               
            }
            else if(getEpoch(currentMonth, index, currentYear) < newestDate){
                totalH1.textContent= "+$0"
            }
            else{

                if(runningTotals.get(getEpoch(currentMonth, index, currentYear)) >= 0){
                    totalH1.textContent= "+$" + runningTotals.get(getEpoch(currentMonth, index, currentYear))
                }
                else{
                    totalH1.textContent= "-$" + runningTotals.get(getEpoch(currentMonth, index, currentYear))
                    newDiv.className = "negativeDay";
                }
            }
        
            newDiv.appendChild(todayDiv)
           // newDiv.appendChild(totalH1)
        }
        else{
            newDiv.className = 'realDay';
            index++;
            newDiv.textContent = index
            newDiv.addEventListener("click", () => dayPressed(newDiv.innerHTML, monthH1.innerHTML, yearH1.innerHTML));

            console.log("skfja;: " + newDiv.innerHTML)
            
            let epochnow = getEpoch(months.indexOf(monthH1.innerHTML), newDiv.innerHTML, yearH1.innerHTML)
         
            if(epochnow >= newestDate){
               
             
                if(runningTotals.get(newestDate) >= 0){
                    totalH1.textContent= "+$" + runningTotals.get(newestDate)
                }
                else{
                    totalH1.textContent= "-$" + runningTotals.get(newestDate)
                    newDiv.className = "negativeDay";
                }
               
            }
            else if(epochnow < newestDate){
                totalH1.textContent= "+$0"
            }
            else{

                if(runningTotals.get(epochnow) >= 0){
                    totalH1.textContent= "+$" + runningTotals.get(epochnow)
                }
                else{
                    totalH1.textContent= "-$" + runningTotals.get(epochnow)
                    newDiv.className = "negativeDay";
                }
            }
//newDiv.appendChild(totalH1)
        
        }

        

        calendar.appendChild(newDiv);
      
    }

    


}

function changeMonth(changeValue){

    if(changeValue === 1){
        monthValue++;

       
    }
    else{
        monthValue--;
     
       
    }

    setMonthYear(monthValue)

    load()
}

function setMonthYear(monthIndex){



    if(monthIndex > 11){
        monthValue = 0
        yearValue++
        yearH1.textContent = yearValue;
    }
    else if(monthIndex < 0){
        monthValue = 11
        yearValue--;
        yearH1.textContent = yearValue;
    }
   
    monthH1.textContent = months[monthValue]

}



function cancelPressed(){
    backDrop.style.display='none';
}

function dayPressed(curretDay, currentMonth, currentYear){

    console.log('what did you do ' + curretDay)

    backDrop.style.display='flex';
    let weekDayTitle = weekdays[new Date(currentMonth + " " + curretDay + "," + yearValue).getDay()];

   popupTitleH1.textContent = weekDayTitle + " " + currentMonth + " " + curretDay + ", " + currentYear

   historyDiv.innerHTML='';
   totalDiv.innerHTML='';

   loadFinanceHistory(currentMonth, curretDay, currentYear)

   

}

function incomeExpensePressed(buttonIndex) {
    if (buttonIndex === 1) {
       

        incomeButton.classList.add("active");
        incomeButton.classList.remove("inactive");

        expenseButton.classList.add("inactive");
        expenseButton.classList.remove("active");
    } else {
       

        expenseButton.classList.add("active");
        expenseButton.classList.remove("inactive");

        incomeButton.classList.add("inactive");
        incomeButton.classList.remove("active");
    }
}

function addExpense(event){
    
    event.preventDefault();
    let amountValue = amountBox.value
    let descriptionValue = descriptionBox.value
    let incomeClass = incomeButton.className
  

    form.reportValidity();

    if(amountValue != '' && descriptionValue != ''){

      

        const log = document.createElement('p');

        if(incomeClass === "active"){
           

            log.textContent = "+ $" +  amountValue + " - " + descriptionValue
            
        }
        else{
          
            log.textContent = "- $" +  amountValue + " - " + descriptionValue
        }

        historyDiv.appendChild(log);

        runningTotal = calculateTotal();

        totalDiv.innerHTML = '';
        const newTotal = document.createElement('h1');
        const lineDiv = document.createElement('div');
        lineDiv.className = "lineBreakDiv"
        newTotal.id = "total"

        if(runningTotal >= 0){
            newTotal.textContent = "Total: + $" + runningTotal;
        }
        else{
            newTotal.textContent = "Total: - $" + runningTotal.toString().slice(1);
        }

        totalDiv.appendChild(lineDiv);
        totalDiv.appendChild(newTotal);



      
    }




}

function loadFinanceHistory(currentMonth,  curretDay, currentYear){

    epochDate = new Date(Date.UTC(currentYear, months.indexOf(currentMonth), curretDay, 12)).getTime();


    console.log("what is going on brother " + curretDay)

    dateKey = currentMonth + " " + curretDay + ", " + currentYear

    

    fullDate = dateKey;

    if(logMap.has(dateKey)){

     

        logs = logMap.get(dateKey)
        allExpenseLogs = expenseMap.get(epochDate)

        currentExpenseVal = 0;
        

        for( i = 0; i < logs.length; i++){

            
            const log = document.createElement('p');
            

            log.textContent = logs[i];

            console.log("all:" + allExpenseLogs[i])
           currentExpenseVal += allExpenseLogs[i];
           
            historyDiv.appendChild(log);

        }

        const newTotal = document.createElement('h1');
        const lineDiv = document.createElement('div');
        lineDiv.className = "lineBreakDiv"
        newTotal.id = "total"

        if(currentExpenseVal >= 0){
            newTotal.textContent = "+ $" + currentExpenseVal;
        }
        else{
            newTotal.textContent = "- $" + currentExpenseVal.toString().slice(1);
        }

        totalDiv.appendChild(lineDiv);
        totalDiv.appendChild(newTotal);

    }

}

function savePressed(){
    backDrop.style.display='none';

    const allExpenseLogs = historyDiv.getElementsByTagName("p");

    let currentEntry;
    let sign;

    logMap.set(fullDate, []);
    expenseMap.set(epochDate, [])

    for( i = 0; i < allExpenseLogs.length; i++){

        currentEntry = allExpenseLogs[i].textContent;
        
        (logMap.get(fullDate)).push(currentEntry);

        if(currentEntry[0] === '-'){
            sign = "negative";
        }

        currentEntry = currentEntry.slice(3)
        
        numericArray = currentEntry.split(' ');

    

         currentEntry = parseInt( numericArray[0], 10)

         if(sign === "negative"){

            currentEntry *= -1;
         }

        
        expenseMap.get(epochDate).push(currentEntry);

        sign = " ";

    }

    newTotal = calculateTotal();

    console.log("logged: " + epochDate);

    totalsMap.set(epochDate, newTotal);

    if(epochDate < oldestDate){

        console.log("oldest date set: " + epochDate)
        oldestDate = epochDate;
        oldestVal = newTotal;
    }

    if(epochDate > newestDate){

        console.log("newest Date set: " + epochDate)
        newestDate = epochDate;
        newestVal = newTotal;
    }
    
    
    
    load();

    
    
}

function calculateTotal(){

    const allExpenseLogs = historyDiv.getElementsByTagName("p");

    let sign;
    let runningTotal = 0;

    for( i = 0; i < allExpenseLogs.length; i++){

        currentEntry = allExpenseLogs[i].textContent;
        
        if(currentEntry[0] === '-'){
            sign = "negative";
        }

        currentEntry = currentEntry.slice(3)
        
        numericArray = currentEntry.split(' ');

      

         currentEntry = parseInt( numericArray[0], 10)

         if(sign === "negative"){
      
            currentEntry *= -1;
         }

        
        runningTotal += currentEntry;
        

        sign = " ";


    }

    return runningTotal;

}

function getEpoch(month, day, year){


    return new Date(Date.UTC(year, month, day, 12)).getTime();
}

setMonthYear()
load()