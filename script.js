let monthValue = new Date().getMonth();
let yearValue = new Date().getFullYear();

let monthCurrent;
let dayCurrent;
let yearCurrent;
let fullDate;
const logMap = new Map();
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

 

    calendar.innerHTML = '';

    let firstDay = new Date(months[monthValue] + '1, ' + yearValue).getDay();
    let daysInMonth = new Date(yearValue, monthValue + 1, 0).getDate();

    let index = 0;

    for (let i = 0; i < firstDay + daysInMonth; i++) {

        const newDiv = document.createElement('div');

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
        
            newDiv.appendChild(todayDiv)
        }
        else{
            newDiv.className = 'realDay';
            index++;
            newDiv.textContent = index
            newDiv.addEventListener("click", () => dayPressed(newDiv.innerHTML, monthH1.innerHTML, yearH1.innerHTML));

        
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

    backDrop.style.display='flex';
    let weekDayTitle = weekdays[new Date(currentMonth + " " + curretDay + "," + yearValue).getDay()];

   popupTitleH1.textContent = weekDayTitle + " " + currentMonth + " " + curretDay + ", " + currentYear

   historyDiv.innerHTML='';

   loadFinanceHistory(currentMonth + " " + curretDay + ", " + currentYear)

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

        historyDiv.appendChild(log)
      
    }




}

function loadFinanceHistory(dateKey){

    console.log("lkj: " + new Date(dateKey).valueOf() )

    fullDate = dateKey

    if(logMap.has(dateKey)){

     

        logs = logMap.get(dateKey)

        for( i = 0; i < logs.length; i++){

            
            const log = document.createElement('p');

            log.textContent = logs[i];
            historyDiv.appendChild(log)

        }
    }

}

function savePressed(){
    backDrop.style.display='none';

    const allExpenseLogs = historyDiv.getElementsByTagName("p");

    if(logMap.has(fullDate)){

        console.log("aaa");

        logMap.set(fullDate, []);

        for( i = 0; i < allExpenseLogs.length; i++){

           console.log("bbb: " + allExpenseLogs[i].textContent);
            (logMap.get(fullDate)).push(allExpenseLogs[i].textContent);
          

        }
    }
    else{

        console.log("bbb");

        logMap.set(fullDate, []);
        

        for( i = 0; i < allExpenseLogs.length; i++){

          

           console.log("bbb 2: " + allExpenseLogs[i].textContent);
            (logMap.get(fullDate)).push(allExpenseLogs[i].textContent);
          

        }

       

    }
    


    
    
}

setMonthYear()
load()