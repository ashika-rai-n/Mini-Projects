const balance = document.getElementById("balance");
const moneyPlus = document.getElementById("add-money");
const moneyMinus = document.getElementById("sub-money");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") {
        alert("Please enter description and amount");
        return;
    }

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = "";
    amount.value = "";
}

function addTransactionDOM(transaction) {

    const li = document.createElement("li");

    li.innerHTML = `
    <div class="transaction-item">
        <span class="text">${transaction.text}</span>
        <span class="amt">${transaction.amount > 0 ? "+ " : "- "}₹${Math.abs(transaction.amount)}</span>
        <button class="delete_btn" onclick="removeTransaction(${transaction.id})">Remove</button>
    </div>
    `;


    list.appendChild(li);
}


function updateValues() {
    let total = 0;
    let income = 0;
    let expense = 0;

    for (let i = 0; i < transactions.length; i++) {
        const amt = transactions[i].amount;

        total += amt;

        if (amt > 0) {
            income += amt;
        } else {
            expense += amt;
        }
    }

    expense = expense * -1;

    balance.innerText = `₹${total.toFixed(2)}`;
    moneyPlus.innerText = `₹${income.toFixed(2)}`;
    moneyMinus.innerText = `₹${expense.toFixed(2)}`;

}

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);

    updateLocalStorage();
    init();
}

function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function init() {
    list.innerHTML = "";

    if (transactions.length === 0) {
        list.innerHTML = `<li class="no-transactions">No transaction history</li>`;
    }
    else {
        transactions.forEach(addTransactionDOM);
    }
    updateValues();
}

form.addEventListener("submit", addTransaction);

init();