const LedgerDetails = require("../ledgerDetails/ledgerDetails.js");

class Bank{
    static #bankIDs = 0;
    static #banks = [];
    #bankID;
    #bankFullName;
    #abbreviation;
    #accounts;
    ledger;
    #isActive;

    constructor(bankID,bankFullName,abbreviation,accounts,ledger,isActive){
        this.#bankID = bankID;
        this.#bankFullName = bankFullName;
        this.#abbreviation = abbreviation;
        this.#accounts = accounts;
        this.ledger = ledger;
        this.#isActive = isActive;
    }  

    getBankID(){
        return this.#bankID;
    }

    getFullName(){
        return this.#bankFullName;
    }

    getAbbreviation(){
        return this.#abbreviation;
    }

    getIsActive(){
        return this.#isActive;
    }

    

    getAllAccounts(){
        return this.#accounts;
        }


      

    static createNewBank(bankFullName,abbreviation){
            try{
                if(typeof bankFullName !== "string")
                    throw new Error("invalid bank name");
                if(typeof abbreviation !== "string")
                    throw new Error("invalid abbreviation");
                const bankID = ++Bank.#bankIDs;
                const newBank = new Bank(bankID,bankFullName,abbreviation,[],[],true);
                
               for(let i=0;i<Bank.#banks.length;i++){
                    let bankObj = Bank.#banks[i];
                    newBank.ledger.push(LedgerDetails.newLedgerDetails(bankObj.getBankID(),bankObj.getFullName(),bankObj.getAbbreviation()));
                    bankObj.ledger.push(LedgerDetails.newLedgerDetails(bankID,bankFullName,abbreviation));
                }
                Bank.#banks.push(newBank);

                return newBank;
            }
            catch(error){
                console.log(error);
            }
    }


    static findBank(bankID){
        try{
            if(typeof bankID !== "number")
                throw new Error("bank id does not exist");
            if(bankID<1 || bankID>=Bank.#banks.length)
                throw new Error("bank id does not exist");

            for(let i=0;i<Bank.#banks.length;i++){
                let bank = Bank.#banks[i];
                if(bank.getBankID() === bankID && bank.getIsActive())
                    return bank;
            }

            throw new Error("bank does not exists");

        }
        catch(error){
            console.log(error);
        }
    }

    updateBank(parameter,value){
        try{
            if(typeof parameter !== "string")
                throw new Error("invalid parameter");

            switch(parameter){
                case "bankName":
                    this.#updateBankName(value);
                    break;
                case "abbreviation":
                    this.#updateBankAbbreviation(value);
                    break;
                default:
                    throw new Error("invalid paramter");        
            }}
            catch(error){
                console.log(error);
            }

            
        }

     


    #updateBankName(value){
        try{
            if(typeof value !== "string")
                throw new Error("invalid bank name value");
            this.#bankFullName = value;
            return this.#bankFullName;
        }
        catch(error){
            console.log(error);
        }
    }

    #updateBankAbbreviation(value){
        try{
            if(typeof value !== "string")
                throw new Error("invalid bank name value");
            this.#abbreviation = value;
            return this.#abbreviation;
        }
        catch(error){
            console.log(error);
        }
    }


    deleteBank(){
        try{
            if(this.#accounts.length!==0)
                throw new Error("bank cannot be deleted");

            this.#isActive = false;
        }
        catch(error){
            console.log(error);
        }
    }


    addNewAccount(account){
        try{
            this.#accounts.push(account);
        }
        catch(error){
            console.log(error);
        }
    }

    static updateLedgerDetailsWithBankIDs(debitBankID,creditBankID,amount){
        try{
            const debitBank = Bank.findBank(debitBankID);
            const creditBank = Bank.findBank(creditBankID);
            const creditBankLedgerDetailObject = creditBank.getLedgerDetailByBankID(debitBankID);
            const debitBankLedgerDetailObject = debitBank.getLedgerDetailByBankID(creditBankID);
            debitBankLedgerDetailObject.updateNetBalance(-amount);
            creditBankLedgerDetailObject.updateNetBalance(amount);
        }
        catch(error){
            console.log(error);
        }
    }

    getLedgerDetailByBankID(bankID){
        try{
            if(typeof bankID !== "number")
                throw new Error("invalid bank id");
            if(bankID<1 || bankID>=Bank.#banks.length)
                throw new Error("invalid bank id");

            for(let i=0;i<this.ledger.length;i++){
                let ledgerObj = this.ledger[i];
                if(ledgerObj.getBankID()===bankID)
                    return ledgerObj;
            }
        }
        catch(error){
            console.log(error);
        }
    }

    getBankLedgerDetails(pageNumber){
        try{
            if (typeof pageNumber !== "number") {
                throw new Error("Invalid page number");
            }
            if(this.ledger.length===0){
                throw new Error("passbook is empty");
            }
    
             const pageSize = 10;  
             const totalPages = Math.ceil(this.ledger.length / pageSize); 
            if (pageNumber <= 0 || pageNumber > totalPages) {
                throw new Error("Page number does not exist");
        }
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return this.ledger.slice(startIndex, endIndex);
        }
        catch(error){
            console.log(error);
        }
    }
    
    
    


}

module.exports = Bank;
