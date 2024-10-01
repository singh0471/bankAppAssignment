const Bank = require("../bank/bank.js");
const PassbookDetails = require("../passbookDetails/passbookDetails.js");

class Account{
    static #accountNumbers = 0;
    #accountBankID;
    #balance;
    #accountNumber;
    #accountHolderPersonID;
    #isActive;
    getAccountNumber(){
        return this.#accountNumber;
    }

    getBalance(){
        return this.#balance;
    }

    getAccountBankID(){
        return this.#accountBankID;
    }

    getAccountHolderPersonID(){
        return this.#accountHolderPersonID;
    }

    getIsActive(){
        return this.#isActive;
    }

    constructor(accountNumber,accountBankID,accountHolderPersonID,balance,isActive,passbook){
        this.#accountNumber = accountNumber;
        this.#accountBankID = accountBankID;
        this.#accountHolderPersonID = accountHolderPersonID;
        this.#balance = balance;
        this.#isActive =isActive;
        this.passbook = passbook;
    }

    static newAccount(accountBankID,accountHolderPersonID){
        try{
            if(typeof accountBankID !== "number"){
                throw new Error("invalid bank id");
            }
            if(typeof accountHolderPersonID !== "number"){
                throw new Error("invalid number");}
            const accountNo = ++Account.#accountNumbers;
            const account = new Account(accountNo,accountBankID,accountHolderPersonID,1000,true,[]);
            return account;
        }
        catch(error){
            console.log(error);
        }
    }

    setBalance(amount){
        try{
        if(typeof amount !== "number")
            throw new Error("invalid amount");
        this.#balance = amount;}
        catch(error){
            console.log(error);
        }
    }

    deleteAccount(){
        try{
            if(this.#balance !== 0)
                throw new Error("account cannot be deleted");
            this.#isActive = false;
        }
        catch(error){
            console.log(error);
        }
    }

    credit(amount){
        try{
            if(typeof amount !== "number")
                throw new Error("invalid amount");
            

            this.#balance += amount;        
            this.passbook.push((new Date()).toLocaleString(),"credit",amount,this.#balance);
        }
        catch(error){
            console.log(error);
        }
    }

    debit(amount){
        try{
            if(typeof amount !== "number")
                throw new Error("invalid amount");
            if(amount>this.#balance)
                throw new Error("insufficient balance");
            this.#balance -= amount;
            this.passbook.push((new Date()).toLocaleString(),"debit",amount,this.#balance);           
        }
        catch(error){
            console.log(error);
        }
    }

    withdraw(amount){
        try{
            if(typeof amount !== "number")
                throw new Error("invalid amount");
            if(amount>this.#balance)
                throw new Error("insufficient balance");
            this.#balance -= amount;  
            this.passbook.push(PassbookDetails.newPassBookDetails((new Date()).toLocaleString(),"withdraw",amount,this.#balance));
        }
        catch(error){
            console.log(error);
        }
    }

    deposit(amount){
        try{
            if(typeof amount !== "number")
                throw new Error("invalid amount");
            

            this.#balance += amount;        
            this.passbook.push((new Date()).toLocaleString(),"deposit",amount,this.#balance);
        }
        catch(error){
            console.log(error);
        }
    }

    viewPassbook(pageNumber){
        try{
            if (typeof pageNumber !== "number") {
                throw new Error("Invalid page number");
            }
            if(this.passbook.length===0){
                throw new Error("passbook is empty");
            }
    
             const pageSize = 10;  
             const totalPages = Math.ceil(this.passbook.length / pageSize); 
            if (pageNumber <= 0 || pageNumber > totalPages) {
                throw new Error("Page number does not exist");
        }
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return this.passbook.slice(startIndex, endIndex);
        }
        catch(error){
            console.log(error);
        }
    }

    static getUserAccountByBankID(bankID,accountID){
        try{
            let currentBank = Bank.findBank(bankID);
            let allAccounts = currentBank.getAllAccounts();
            for(let account of allAccounts){
                if(account.getAccountNumber()===accountID && account.getIsActive())
                    return account;
            }
        }
        catch(error){
            console.log(error);
        }
    }

    

}
module.exports = Account;
