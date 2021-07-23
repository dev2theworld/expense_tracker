const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//   {id: 1, text: 'Computer', amount: -300 },
//   {id: 2, text: 'Payment', amount: 400 },
//   {id: 3, text: 'Pizza', amount: -50 },
//   {id: 4, text: 'Salary', amount: 1260 }
// ];

// 5a - setting LS
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

// 5b - if LS is not empty use localStorageTransactions, else set empty array
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// 3b - Add transaction
function addTransaction(e) {
  e.preventDefault();

  // 3c - Check if fields are not empty
  if(text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add text and amount');
  } else {
    // 3d - Build object containing id, text and amount
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    // 3f - Push the object to array
    transactions.push(transaction);

    // 3g - Add transaction to the DOM
    addTransactionDOM(transaction);

    // 3h - Update values & clear input
    updateValues();

    // 5d - Update LS after adding item
    updateLocalStorage();

    text.value = '';
    amount.value = '';

    console.log(transaction);
  }
}

// 3e - Generate random id
function generateID() {
  return Math.floor(Math.random() * 1000000);
}

// 1a - Add transactions to DOM list
function addTransactionDOM(transaction) {
  // 1b - Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // 1c - Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;
  // 4a - Onclick added to launch removing function

  list.appendChild(item);
}

// 2a - Update the balnce, income & expense
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  //2b - Total up amounts
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  // 2c - Income
  const income = amounts
  .filter(item => item > 0)
  .reduce((acc, item) => (acc += item), 0)
  .toFixed(2);

  // 2d Expense
  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

  // 2e - Insert to the DOM
  balance.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
}

// 4b - Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  // 5e - update LS after removing item
  updateLocalStorage();

  init();
}

// 5c - Update Local Storage Transactions
function updateLocalStorage() {
   localStorage.setItem('transactions', JSON.stringify(transactions));
}

// 1d - Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

// 3a - Event listeners
form.addEventListener('submit', addTransaction);