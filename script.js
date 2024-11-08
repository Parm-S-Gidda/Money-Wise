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
let first = 0;
let bal = 0;
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

    //console.log("newest: " + newestDate + " - " + new Date(newestDate).toLocaleDateString());
    //console.log("oldest: " + oldestDate + " - " + new Date(oldestDate).toLocaleDateString());


    alphaTotal = 0;
    runningTotals.clear();

    for(i = 0; i < calcDates+ 1; i++){

        if(totalsMap.get(currentDate)){
         
            let currentRunningTotal = totalsMap.get(currentDate);


            alphaTotal += currentRunningTotal

            runningTotals.set(currentDate, alphaTotal)

     
          
        }
        else{

            runningTotals.set(currentDate, alphaTotal)
    

        }

    
        currentDate += 86400000
    }

    let index = 0;
 
    let isNegative = 0;

    for (let i = 0; i < firstDay + daysInMonth; i++) {
        isNegative = 0;

        const newDiv = document.createElement('div');

        const totalDiv = document.createElement('div');
        const dateDivTemp = document.createElement('div');

       
        dateDivTemp.className = 'dateDivTemp';

        if(i < firstDay){
            
            newDiv.className = 'fakeDay';
        }
        else if(curretDay === (index + 1) && currentMonth === monthValue && currentYear === yearValue){
         

            const todayDiv = document.createElement('div');
          
            index++;
            todayDiv.textContent = index
            totalDiv.className = 'totalDivToday';
            todayDiv.style.color="white";
            newDiv.addEventListener("click", () => dayPressed(todayDiv.innerHTML, monthH1.innerHTML, yearH1.innerHTML, totalDiv.innerHTML));

            if(getEpoch(currentMonth, index, currentYear) >= newestDate){
               
             
                if(runningTotals.get(newestDate) >= 0){
                    todayDiv.className = 'todayDiv';
                    newDiv.className = 'realDay';
                    totalDiv.textContent= "+$" + runningTotals.get(newestDate)
                }
                else{
                    totalDiv.textContent= "-$" + (runningTotals.get(newestDate) * -1)
                    newDiv.className = "negativeDay";
                    todayDiv.className = 'todayDivNegative';
                    isNegative = 1;
                }
               
            }
            else if(getEpoch(currentMonth, index, currentYear) < oldestDate){
                todayDiv.className = 'todayDiv';
                newDiv.className = 'realDay';
                totalDiv.textContent= "+$0"
            }
            else{

                if(runningTotals.get(getEpoch(currentMonth, index, currentYear)) >= 0){
                    todayDiv.className = 'todayDiv';
                    newDiv.className = 'realDay';
                    totalDiv.textContent= "+$" + runningTotals.get(getEpoch(currentMonth, index, currentYear))
                }
                else{
                    totalDiv.textContent= "-$" + (runningTotals.get(getEpoch(currentMonth, index, currentYear)) *-1)
                    newDiv.className = "negativeDay";
                    todayDiv.className = 'todayDivNegative'
                    isNegative = 1;
                }
            }
        
            newDiv.appendChild(todayDiv)

           

            if(totalsMap.has(getEpoch(currentMonth, index, currentYear))){

             

                if(isNegative === 1){
                    totalDiv.className = "addedEventNegative totalDivToday ";
                }
                else{
                    totalDiv.className = "addedEvent totalDivToday";
                }
            }
        
            newDiv.appendChild(totalDiv)
          
        }
        else{
            newDiv.className = 'realDay';
            index++;
            totalDiv.className = 'totalDiv';
            dateDivTemp.textContent = index
            newDiv.addEventListener("click", () => dayPressed(dateDivTemp.innerHTML, monthH1.innerHTML, yearH1.innerHTML, totalDiv.textContent));
            
            let epochnow = getEpoch(months.indexOf(monthH1.innerHTML), dateDivTemp.innerHTML, yearH1.innerHTML)
         
            
            if(epochnow >= newestDate){
               
            
             
                if(runningTotals.get(newestDate) >= 0){
                    totalDiv.textContent= "+$" + runningTotals.get(newestDate)
                }
                else{
                    totalDiv.textContent= "-$" + (runningTotals.get(newestDate) * -1)
                    newDiv.className = "negativeDay";
                    isNegative = 1;
                }
               
            }
            else if(epochnow < oldestDate){
                totalDiv.textContent= "+$0"
            }
            else{

                if(runningTotals.get(epochnow) >= 0){
                    totalDiv.textContent= "+$" + runningTotals.get(epochnow)
                }
                else{
                    totalDiv.textContent= "-$" + (runningTotals.get(epochnow) * -1)
                    newDiv.className = "negativeDay";
                    isNegative = 1;
                }
            }
            newDiv.appendChild(dateDivTemp);

            if(totalsMap.has(epochnow)){

                if(isNegative === 1){
                    totalDiv.className = "addedEventNegative totalDiv ";
                }
                else{
                    totalDiv.className = "addedEvent totalDiv";
                }
            
            }
      
            newDiv.appendChild(totalDiv);
          
        
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

function dayPressed(curretDay, currentMonth, currentYear, currentBalance){

    

    backDrop.style.display='flex';
    let weekDayTitle = weekdays[new Date(currentMonth + " " + curretDay + "," + yearValue).getDay()];

   popupTitleH1.textContent = weekDayTitle + " " + currentMonth + " " + curretDay + ", " + currentYear

   historyDiv.innerHTML='';
   totalDiv.innerHTML='';

   loadFinanceHistory(currentMonth, curretDay, currentYear, currentBalance)

   

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

    const lineDiv = document.createElement('div');
    lineDiv.className = "lineBreakDiv"

 
    console.log("start: " + bal)

    let runningTotal;

    if(form.reportValidity()){

      

        const log = document.createElement('p');

        if(incomeClass === "active"){
           

            log.textContent = "+ $" +  amountValue + " - " + descriptionValue
            
        }
        else{
          
            log.textContent = "- $" +  amountValue + " - " + descriptionValue
        }

        historyDiv.appendChild(log);

        if( totalsMap.has(epochDate)){
            runningTotal = calculateTotal();
            console.log("second time")
        }
        else{
            runningTotal = calculateTotal() + bal;
        }

    

        console.log("as;lkdfj: " + calculateTotal())
        console.log("as;asdfsfasfsdf: " + bal)

        totalDiv.innerHTML = '';
        const newTotal = document.createElement('h1');
    
        newTotal.id = "total"

        if(runningTotal >= 0){
            newTotal.textContent = "New Balance: +$" + runningTotal;
        }
        else{
            newTotal.textContent = "New Balance: -$" + runningTotal.toString().slice(1);
        }

        totalDiv.appendChild(lineDiv);
        totalDiv.appendChild(newTotal);



      
    }




}

function loadFinanceHistory(currentMonth,  curretDay, currentYear, currentBalance){

    epochDate = new Date(Date.UTC(currentYear, months.indexOf(currentMonth), curretDay, 12)).getTime();
    dateKey = currentMonth + " " + curretDay + ", " + currentYear

    let startingBlance = 0;
    const lineDiv = document.createElement('div');
    lineDiv.className = "lineBreakDiv"

    const lineDiv2 = document.createElement('div');
    lineDiv2.className = "lineBreakDiv"

    if(currentBalance[0] === '-'){
        startingBlance = parseFloat(currentBalance.slice(2)) *-1
    }
    else{
        startingBlance = parseFloat(currentBalance.slice(2)) 
    }


    bal = startingBlance;
    console.log("big baller brand")

    const newTotal = document.createElement('h1');
    const balanceH1 = document.createElement('h3');
 
    fullDate = dateKey;

    if(logMap.has(dateKey)){

        
        logs = logMap.get(dateKey)
        allExpenseLogs = expenseMap.get(epochDate)

        currentExpenseVal = 0;



        for( i = 0; i < logs.length; i++){

        
           currentExpenseVal += allExpenseLogs[i];
           
    
        }

        if(startingBlance - currentExpenseVal < 0){
            balanceH1.textContent = "Start Balance: -$" + Math.abs(startingBlance - currentExpenseVal);
        }
        else{
            balanceH1.textContent = "Start Balance: +$" +  (startingBlance - currentExpenseVal);
        }
        
      
        historyDiv.appendChild(balanceH1)
        historyDiv.appendChild(lineDiv)
        currentExpenseVal = 0;

        for( i = 0; i < logs.length; i++){

            
            const log = document.createElement('p');
            

            log.textContent = logs[i];

          
           currentExpenseVal += allExpenseLogs[i];
           
            historyDiv.appendChild(log);

        }

        
       
        newTotal.id = "total"

        if(currentExpenseVal >= 0){
            newTotal.textContent = "New Balance: " + currentBalance;
        }
        else{
            newTotal.textContent = "New Balnce: " + currentBalance;
        
        }

        totalDiv.appendChild(lineDiv2);
        totalDiv.appendChild(newTotal);

    }  
    else{
        balanceH1.textContent = "Start Balance: " +  currentBalance;
        historyDiv.appendChild(balanceH1)
        historyDiv.appendChild(lineDiv)
        totalDiv.appendChild(lineDiv2); 
        newTotal.id = "total"
        newTotal.textContent = "New Balance: " + currentBalance
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

    

         currentEntry = parseFloat( numericArray[0], 10)

         if(sign === "negative"){

            currentEntry *= -1;
         }

        
        expenseMap.get(epochDate).push(currentEntry);

        sign = " ";

    }

    newTotal = calculateTotal();


    console.log("Date: " + (new Date(epochDate).toDateString()));

    totalsMap.set(epochDate, newTotal);

    if(epochDate < oldestDate || first == 0){

       
        oldestDate = epochDate;
        oldestVal = newTotal;
    }

    if(epochDate > newestDate  || first == 0){

   
        newestDate = epochDate;
        newestVal = newTotal;
    }

    first = 1;
    
    
    
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

      

         currentEntry = parseFloat( numericArray[0], 10)

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