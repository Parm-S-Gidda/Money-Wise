let monthValue = new Date().getMonth();
let yearValue = new Date().getFullYear();
const nextButton = document.getElementById("nextButton")
const prevButton = document.getElementById("previousButton")
const monthH1 = document.getElementById("month")
const yearH1 = document.getElementById("year")
const calendar = document.getElementById("calendar")


const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January","February", "March","April","May","June","July","August","September","October","November","December"];

nextButton.addEventListener("click", () => changeMonth(1));
prevButton.addEventListener("click", () => changeMonth(-1));



function load(){


    const todayDate = new Date();

    const curretDay = todayDate.getDate();
    const currentMonth = todayDate.getMonth();
    const currentYear = todayDate.getFullYear();

 

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
            newDiv.className = 'today';
            index++;
            newDiv.textContent = index
        }
        else{
            newDiv.className = 'realDay';
            index++;
            newDiv.textContent = index

        
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

setMonthYear()
load()