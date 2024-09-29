class PassbookDetails{
    #dateTime;
    #transactionType;
    #currentAmount;
    #amount;
    constructor(dateTime, transactionType,amount,currentAmount){
        this.#dateTime = dateTime;
         
        this.#transactionType = transactionType;
        this.#amount = amount;
        this.#currentAmount = currentAmount;
    }


    static newPassBookDetails(dateTime,transactionType,amount,currentAmount){
        try{
            if(typeof dateTime !== "string")
                throw new Error("invalid date");
            if(typeof transactionType !== "string")
                throw new Error("invalid transaction type");
            if(typeof amount !== "number")
                throw new Error("invalid amount");
            if(typeof currentAmount !== "number")
                throw new Error("invalid current amount");

            const newPassbookDetail = new PassbookDetails(dateTime,transactionType,amount,currentAmount);
            return newPassbookDetail;
        }
        catch(error){

        }
    }
}
module.exports = PassbookDetails;
