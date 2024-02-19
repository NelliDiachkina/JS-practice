//Напиши скрипт управління особистим кабінетом інтернет банку
//Є об'єкт account у якому необхідно реалізувати
//методи для роботи з балансом та історією транзакцій
// Типів транзакцій лише два.
// Можна покласти чи зняти гроші з рахунку
//Кожна транзакція це об'єкт з властивостями id, type, amount

const Transaction = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
};

const account = {
  //поточний баланс рахунку
  balance: 0,
  //поточний id транзакції
  id: 0,
  //Історія транзакцій
  transactions: [],

  //Метод створює та повертає об'єкт транзакції
  //Приймає суму та тип транзакцій

  createTransaction(type, amount) {
    return {
      id: (this.id += 1),
      type: type,
      amount: amount,
    };
  },

  //Метод відповідає за додавання суми до балансу!
  //Приймає суму транзакції.
  //Викликає createTransaction для створення об'єкта транзакції
  //після чого додає їх у історію транзакцій

  deposit(amount) {
    const newTransaction = this.createTransaction(Transaction.DEPOSIT, amount);
    this.transactions.push(newTransaction);
    return (this.balance += amount);
  },

  //Метод відповідає за зняття суми з балансу.
  //Приймає суму транзакції.
  //Викликає createTransaction для створення об'єкта транзакції
  //після чого додає їх у історію транзакцій
  //Якщо amount більше ніж поточний баланс, виводимо повідомлення про те,
  //що недостатньо коштів на рахунку

  withdraw(amount) {
    if (amount > this.balance) {
      return 'Недостатньо коштів на рахунку. Транзакцію відхилено';
    }
    const newTransaction = this.createTransaction(Transaction.WITHDRAW, amount);
    this.transactions.push(newTransaction);
    return (this.balance -= amount);
  },

  //Метод повертає поточний баланс

  getBalance() {
    return this.balance;
  },

  //Метод шукає та повертає об'єкт транзакції по id

  getTransactionDetails(id) {
    const transaction = this.transactions.find(transaction => transaction.id === id);
    return transaction ? transaction : 'Транзакції с таким id не знайдено';
  },

  //Метод повертає кількість транзакції певного типу з усієї історії транзакцій

  getQuantityTransactionType(type) {
    const filteredTransactionType = this.transactions.filter(
      transaction => transaction.type === Transaction[type]
    );
    return filteredTransactionType.length;
  },
};

// Тестування

console.log(account.getBalance());
account.deposit(500);
console.log(account.getBalance());
account.deposit(2200);
console.log(account.getBalance());
account.withdraw(300);
console.log(account.getBalance());
console.log(account.getTransactionDetails(3));
console.log(account.getTransactionDetails(1));
console.log(account.withdraw(3500));
console.log(account.getBalance());
account.withdraw(100);
console.log(account.getBalance());
account.withdraw(100);
console.log(account.getBalance());
account.withdraw(200);
console.log(account.getBalance());
console.log(account.transactions);
console.log(account.getQuantityTransactionType('DEPOSIT'));
console.log(account.getQuantityTransactionType('WITHDRAW'));
console.log(account.getTransactionDetails(4));
console.log(account.getTransactionDetails(5));
console.log(account.getTransactionDetails(10));
