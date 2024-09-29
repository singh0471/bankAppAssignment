const Bank = require("../bank/bank.js");
const Account = require("../account/account.js");

class Person{
    static #personIDs = 0;
    
    #firstName;
    #lastName;
    #fullName;
    #isActive;
    #personID;
   
    #isAdmin;
    #age;
    #accounts;


    static #allAdmins = [];
    static #allCustomers = [];



    getPersonID(){
        return this.#personID;
    }

    

    getFirstName(){
        return this.#firstName;
    }

    getLastName(){
        return this.#lastName;
    }

    getIsActive(){
        return this.#isActive;
    }

    setIsActive(value){
        if(typeof value !== "boolean")
            throw new Error("invalid active type");
        this.#isActive = value;
    }
    

    getIsAdmin(){
        return this.#isAdmin;
    }

    getFullName(){
        return this.#fullName;
    }

    getAllAccounts(pageNumber){
        if (typeof pageNumber !== "number") {
            throw new Error("Invalid page number");
        }
        if(this.#accounts.length===0){
            throw new Error("no account is associated with this person");
        }

         const pageSize = 10;  
         const totalPages = Math.ceil(this.#accounts.length / pageSize); 
        if (pageNumber <= 0 || pageNumber > totalPages) {
            throw new Error("Page number does not exist");
    }
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.#accounts.slice(startIndex, endIndex);
    }

    static getAllAdmins(pageNumber){
        return Person.#allAdmins;
    }

    static getAllCustomers(){
        return Person.#allCustomers;
    }

    #updateFullName(){
        this.#fullName = `${this.#firstName} ${this.#lastName}`;
    }

    #updateFirstName(firstName){
        if(typeof firstName != "string")
            throw new Error("invalid firstName value");
        this.#firstName = firstName;
        this.#updateFullName();
    }

    #updateLastName(lastName){
        if(typeof lastName != "string")
            throw new Error("invalid lastName value");
        this.#lastName = lastName;
        this.#updateFullName();
    }

    #updateAge(age){
        if(typeof age != "number")
            throw new Error("invalid age value");
        this.#age = age;
    }

    #checkAdminPrivileges() {
        if (!this.#isAdmin) {
            throw new Error("This functionality is only for admins");
        }
    }

    constructor(personID,firstName,lastName,age,isActive,isAdmin,accounts){
            this.#personID = personID;
            this.#firstName = firstName;
            this.#lastName = lastName;
            this.#updateFullName();
            this.#age = age;
            this.#isActive = isActive;
            this.#isAdmin = isAdmin;
             
            this.#accounts = accounts;
    }
    static createNewAdmin(firstName,lastName,age){
        try{
            if(typeof firstName !== "string")
                throw new Error("invalid first name");
            if(typeof lastName!=="string")
                throw new Error("invalid last name");
            if(typeof age !== "number")
                throw new Error("invalid age");

            const personID = ++Person.#personIDs;
            const newAdmin = new Person(personID,firstName,lastName,age,true,true,0,[]);
            Person.getAllAdmins().push(newAdmin);
            return newAdmin;

        }
        catch(error){
            console.log(error);
        }
    }

    getTotalBalance(){
        try{
            let totalBalance = 0;
            for(let account of this.#accounts){
                totalBalance += account.getBalance();
            }
            return totalBalance;
        }
        catch(error){
            console.log(error);
        }
    }

    createNewCustomer(firstName,lastName,age){
        try{
            this.#checkAdminPrivileges();
            if(typeof firstName !== "string")
                throw new Error("invalid first name");
            if(typeof lastName!=="string")
                throw new Error("invalid last name");
            if(typeof age !== "number")
                throw new Error("invalid age");

            const personID = ++Person.#personIDs;
            const newCustomer= new Person(personID,firstName,lastName,age,true,false,0,[]);
            Person.getAllCustomers().push(newCustomer);
            return newCustomer;    

        }
        catch(error){
            console.log(error);
        }
    }

    static validateCustomerID(customerID){
        try{
            if(typeof customerID !== "number")
                throw new Error("invalid customer id");
    
            if(customerID<1 || customerID>Person.#personIDs)
                throw new Error("invalid customer id");
    
            for(let i=0;i<Person.getAllCustomers().length;i++){
                let person = person.getAllCustomers()[i];
                if(person.getPersonID()===customerID && person.getIsActive())
                    return person;
        }
        throw new Error("Customer does not exist");
    }
        catch(error){
            console.log(error);
        }
    }

    getCustomerByCustomerID(customerID){
        try{
        this.#checkAdminPrivileges();   
        return Person.validateCustomerID(customerID);
         }
        
    
    catch(error){
        console.log(error);
    }
 }


    updateCustomerWithCustomerID(customerID,parameter,value){
        try{
            this.#checkAdminPrivileges();
            if(typeof customerID !== "number")
                throw new Error("invalid customer id");
            if(typeof parameter !== "string")
                throw new Error("invalid parameter");
            const customer = this.getCustomerByCustomerID(customerID);

            switch(parameter){
                case "firstName":
                    customer.#updateFirstName(value);
                    break;
                case "lastName":
                    customer.#updateLastName(value);
                    break;
                case "age":
                    customer.#updateAge(value);
                    break;
                default:
                    throw new Error("invalid parameter");            
            }

        }
        catch(error){
            console.log(error);
        }
        
        
    }

    deleteCustomerWithCustomerID(customerID){
        try{
            this.#checkAdminPrivileges();
            if(typeof customerID !== "number")
                throw new Error("invalid customer id");
            

            const customer = this.getCustomerByCustomerID(customerID);
            if(customer.getAllAccounts(1).length===0)
                throw new Error("Customer cannot be deleted as they have accounts associated with them.");
            customer.setIsActive(false);
        }
        catch(error){
            console.log(error);
        }
    }

    createNewBank(bankName,bankAbbreviation){
        try{
            this.#checkAdminPrivileges();
            if(typeof bankName !== "string")
                throw new Error("invalid bank name");
            if(typeof bankAbbreviation !== "string")
                throw new Error("invalid bank abbreviation");
            return Bank.createNewBank(bankName,bankAbbreviation);
        }
        catch(error){
            console.log(error);
        }
    }

    getBankWithBankID(bankID){
        try{
            if(typeof bankID !== "number")
                throw new Error("invalid bank id");
            return Bank.findBank(bankID);
        }
        catch(error){
            console.log(error);
        }
    }

    updateBankWithBankID(bankID,parameter,value){
        try{
            this.#checkAdminPrivileges();
            if(typeof bankID !== "number")
                throw new Error("invalid bank id");
            if(typeof parameter !== "string")
                throw new Error("invalid parameter");
            if(typeof value !== "string")
                throw new Error("invalid value");

            const bank = Bank.findBank(bankID);
            bank.updateBank(parameter,value);

        }
        catch(error){
            console.log(error);
        }
    }

    deleteBankWithBankID(bankID){
        try{
            this.#checkAdminPrivileges();
            if(typeof bankID !== "number")
                throw new Error("invalid bank id");
            const bank = Bank.findBank(bankID);
            bank.deleteBank();

        }
        catch(error){
            console.log(error);
        }
    }



    createAccountWithBankID(bankID){
        try{
            if(typeof bankID !== "number")
                throw new Error("invalid bank id");

            const bank = Bank.findBank(bankID);
            const account = Account.newAccount(bankID,this.#personID);
            this.#accounts.push(account);
            bank.addNewAccount(account);
            
            return account;
        }
        catch(error){
            console.log(error);
        }
    }

    validateAccountNumber(accountNumber){
        try{
            if(typeof accountNumber !== "number")
                throw new Error("invalid account number");

            for(let i=0;i<this.#accounts;i++){
                let account = this.#accounts[i];
                if(account.getAccountNumber()===accountNumber && account.getIsActive())
                    return account;
            }
        }
        catch(error){
            console.log(error);
        }
    }

    deleteAccountWithAccountNumber(accountNumber){
        try{
            if(typeof accountNumber !== "number")
                throw new Error("invalid account number");
            const account = this.validateAccountNumber(accountNumber)
            account.deleteAccount();

        }
        catch(error){
            console.log(error);
        }
    }


    transferAmountInOwnAccount(debitAccountNumber,creditAccountNumber,amount){
        try{
            if(typeof debitAccountNumber !== "number")
                throw new Error("invalid debit account number");
            if(typeof creditAccountNumber !== "number")
                throw new Error("invalid credit account number");
            if(typeof amount !== "number")
                throw new Error("invalid amount entered");

            const debitAccount = this.validateAccountNumber(debitAccountNumber);
            const creditAccount = this.validateAccountNumber(creditAccountNumber);
            const debitBankID = debitAccount.getAccountBankID();
            const creditBankID = creditAccount.getAccountBankID();
            Bank.updateLedgerDetailsWithBankIDs(debitBankID,creditBankID,amount);
            debitAccount.debit(amount);
            creditAccount.credit(amount);
            
        }
        catch(error){
            console.log(error);
        }
    }

    transferAmountWithBankID(debitAccountNumber,bankID,creditAccountNumber,amount){
            try{
                if(typeof debitAccountNumber !== "number")
                    throw new Error("invalid debit account number");
                if(typeof creditAccountNumber !== "number")
                    throw new Error("invalid credit account number");
                if(typeof bankID !== "number")
                    throw new Error("invalid bank id");
                if(typeof amount !== "number")
                    throw new Error("invalid amount value");
                const debitAccount = this.validateAccountNumber(debitAccountNumber);
                const creditAccount = Account.getUserAccountByBankID(bankID,creditAccountNumber);
                const debitBankID = debitAccount.getAccountBankID();
                const creditBankID = creditAccount.getAccountBankID();
                Bank.updateLedgerDetailsWithBankIDs(debitBankID,creditBankID,amount);
                debitAccount.debit(amount);
                creditAccount.credit(amount);

            }
            catch(error){
                console.log(error);
            }
    }

    withdrawMoneyFromAccount(accountNumber,amount){
        try{
            if(typeof accountNumber !== "number")
                throw new Error("invalid account number");
            if(typeof amount !== "number")
                throw new Error("invalid amount");

            const account = this.validateAccountNumber(accountNumber);
            account.withdraw(amount);
        }
        catch(error){
            console.log(error);
        }
    }

    viewAccountPassbookWithCustomerID(personID,accountNumber,pageNumber){
        try{
            this.#checkAdminPrivileges();
            if(typeof personID !== "number")
                throw new Error("invalid person id");
            if(typeof accountNumber !== "number")
                throw new Error("invalid account number");
            if(typeof pageNumber !== "number")
                throw new Error("invalid page number");

            const customer = this.getCustomerByCustomerID(personID);
            const account = customer.validateAccountNumber(accountNumber);
            return account.viewPassbook(pageNumber);

        }
        catch(error){
            console.log(error);
        }
    }

    viewAccountPassbookWithBankID(bankID,accountNumber,pageNumber){
        try{
            this.#checkAdminPrivileges();
            const account = Account.getUserAccountByBankID(bankID,accountNumber);
            return account.viewPassbook(pageNumber);
        }
        catch(error){
            console.log(error);
        }
    }

    viewBankLedgerWithBankID(bankID,pageNumber){
        try{
            this.#checkAdminPrivileges();
            const bank = this.getBankWithBankID(bankID);
            return bank.getBankLedgerDetails(pageNumber);
        }
        catch(error){
            console.log(error);
        }
    }




}

module.exports = Person;
