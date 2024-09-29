class LedgerDetails{
    #bankID;
    #bankFullName;
    #abbreviation;
    #netBalance;

    getBankID(){
        return this.#bankID;
    }

    getBankFullName(){
        return this.#bankFullName;
    }

    getAbbreviation(){
        return this.#abbreviation;
    }

    getNetBalance(){
        return this.#netBalance;
    }

    constructor(bankID,bankFullName,abbreviation,netBalance){
        this.#bankID = bankID;
        this.#bankFullName = bankFullName;
        this.#abbreviation = abbreviation;
        this.#netBalance = netBalance;
    }

    static newLedgerDetails(bankID,bankFullName,abbreviation){
                try{
                    if(typeof bankID !== "number")
                        throw new Error("invalid bank id");
                    if(typeof bankFullName !== "string")
                        throw new Error("invalid bank name");
                    if(typeof abbreviation !== "string")
                        throw new Error("invalid abbreviation");

                    const newLedgerDetail = new LedgerDetails(bankID,bankFullName,abbreviation,0);
                    return newLedgerDetail;
                }
                catch(error){
                    console.log(error);
                }
    }

    updateNetBalance(amount){
        this.#netBalance += amount;
        return this.#netBalance;
    }

    


}

module.exports = LedgerDetails;
