const Person = require("./person/person.js");

const Person = require("./person/person.js");

// creating admin
const admin  = Person.createNewAdmin("deependra","singh",23);

// creating new bank
const bank1 = admin.createNewBank("state bank of india", "SBI");
const bank2 = admin.createNewBank("Bank of America","BOI");
const bank3 = admin.createNewBank("Axis Bank","AB");

// creating users
const user1 = admin.createNewCustomer("Rohit","Singh",38);
const user2 = admin.createNewCustomer("Virat","Kohli",28);
const user3 = admin.createNewCustomer("Shubman","Gill",22);
const user4 = admin.createNewCustomer("KL","Rahul",29);

// creating accounts
user1.createAccountWithBankID(1);
user1.createAccountWithBankID(2);
user2.createAccountWithBankID(2);
user2.createAccountWithBankID(3);
user3.createAccountWithBankID(3);
user4.createAccountWithBankID(1);
user4.createAccountWithBankID(1);
user4.createAccountWithBankID(2);

// transfer account in own account
user1.transferAmountInOwnAccount(1,2,1000); // transfering money from account number 1 to account number 2.
user1.transferAmountWithBankID(2,1,8,1000); // transfering money from user1's account number 2 to account number 8 which belong to bank id 1.
user4.withdrawMoneyFromAccount(8,100); // withdrawing 1000 rupees from account number 8.
user4.depositMoneyWithAccountNumber(8,100); // deposit rupees 1000 to bank 8 of user.


// admin viewing account passbook with page number.
admin.viewAccountPassbookWithBankID(1,1,1); // bank id 1, account number 1, page number 1.

// admin viewing bank ledger with page number.
admin.viewBankLedgerWithBankID(2,1); // bank id 2, page number 1.
