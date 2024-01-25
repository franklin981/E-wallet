// I wish you good luck and happy coding 🥰🤠🥳🥳💯💯

document
  .querySelector("#ewallet-form")
  .addEventListener('submit', (e) => {
    e.preventDefault() // this code allows it not to reload wjen the button is clicked
    let desc = document
      .querySelector('.add__description')
      .value;
    
    let val = document
      .querySelector('.add__value')
      .value;
    let type = document.querySelector('.add__type').value;
    
    if (val.length > 0 && desc.length > 0){
        addItem(type, desc, val);
        resetForm()
    }
  
})
// Formatting time

function getFormattedTime(){
    const now = new Date().toLocaleTimeString('en-us', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      
      console.log(now)
      
      const date = now.split(',')[0].split(' ');
      const time = now.split(',')[1];
      return `${date[1]} ${date[0]}, ${time}`;
}

  // Reset the form to clear input
resetForm = ()=>{
    document.querySelector('.add__type').value = '+';
    document.querySelector('.add__description').value = '';
    document.querySelector('.add__value').value = '';
 }

 // Show item after reload
 showItem();
 function showItem(){
  let items = getItemFromLS()
  const timeDate = getFormattedTime()
  const collection = document.querySelector('.collection')
  

  for (let item of items){
    const newHTML = `<div class="item">
    <div class="item-description-time">
        <div class="item-description">
            <p>${item.desc}</p>
        </div> 
        <div class="item-time">
            <p>${timeDate}</p>
        </div>
    </div>
    <div class="item-amount ${item.type === '+'? 'income-amount' : 'expense-amount'}">
        <p>${item.type}$${item.val}</p>
    </div>
</div>`

collection.insertAdjacentHTML('afterbegin', newHTML)
  };
 }

 // adding item functions
 function addItem(type, desc, val){
    const timeDate = getFormattedTime()
    const newHTML = 
    `<div class="item">
            <div class="item-description-time">
                <div class="item-description">
                    <p>${desc}</p>
                </div> 
                <div class="item-time">
                    <p>${timeDate}</p>
                </div>
            </div>
            <div class="item-amount ${type === '+'? 'income-amount' : 'expense-amount'}">
                <p>${type}$ ${sep(val)}</p>
            </div>
      </div>`

     const collection = document.querySelector('.collection')
     collection.insertAdjacentHTML('afterbegin', newHTML)

     addItemtoLocalStorage(type, desc, val, timeDate)

     // Show data on income and expense after add button
    showTotalExpense()
    showTotalIncome()
    // totalBalance()
    showBalance()
};

// show expense and income and balance
showTotalExpense()
showTotalIncome()
showBalance()
// totalBalance()

function getItemFromLS(){
  let items = localStorage.getItem('items')
  if (items){
    items = JSON.parse(items)
  }else{
  items = [];
  }

  return items
}

function addItemtoLocalStorage(type, desc, val, time){
  let items = getItemFromLS()
    items.push({
      desc,
      time,
      val,  
      type
    })
    localStorage.setItem('items', JSON.stringify(items))

 }

 // Working on income and expense dynamic

 function showTotalIncome(){
  // get all the array data
  items = getItemFromLS();
  let totalIncome = 0;
 
  for (let item of items){
    if (item.type === '+'){
      totalIncome += parseInt(item.val)
    }
  }

  document.querySelector('.income__amount p').textContent = `$${sep(totalIncome)}`
  return totalIncome;
 }

 
 function showTotalExpense(){

  // get all the array data
  let totalExpense = 0
  items = getItemFromLS();

  for (const item of items) {
    if(item.type === '-'){
      totalExpense += parseInt(item.val)
    }
  }
  
  document.querySelector('.expense__amount p').textContent = `$${sep(totalExpense)}`
  return totalExpense
 }


 // Show Balance 

 function showBalance(){
  let items = getItemFromLS()
  let balance = 0;

  for (let item of items) {
    if(item.type === '+'){
      balance += parseInt(item.val);
    }else{
      balance -= item.val;
    }
  }
  document.querySelector('.balance__amount p').textContent = `${sep(balance)}`
  // toLocalString() changes from 1000 to 1,000

  // if (balance > 0){
  //   document.querySelector('header').className = 'green';
  // }else{
  //    document.querySelector('header').className = 'red';
  // }
  // replace the above code with a one line code
  document.querySelector('header').className = (balance > 0) ? 'green' : 'red';
 }

 // Seperating function
 function sep(amount){
  amount = parseInt(amount)
  return amount.toLocaleString()
 }
 // My way Calculating balance

//  function totalBalance(){
//   let expense = showTotalExpense()
//   let income = showTotalIncome()
//   console.log(typeof income)
//   let balance = income - expense

//   document.querySelector('.balance__amount p').textContent = `$${balance}`
//  
// } 
 //Expense and Income Columns

//  function expense(){
//   let items = getItemFromLS();
//   let expense = 0;
//   let income = 0;

//   for (let item of items){
//     if (item.type === '-'){
//       expense -= Number(item.val);
//     }else{
//       income += Number(item.val);
//     }
//   }
//   console.log(income, expense)
//   return [income, expense]
//  }

/*
<div class="item">
<div class="item-description-time">
  <div class="item-description">
    <p>Salary</p>
  </div>
  <div class="item-time">
    <p>24 Feb, 09:45 AM</p>
  </div>
</div>
<div class="item-amount income-amount">
  <p>+$1000</p>
</div>
</div>
*/