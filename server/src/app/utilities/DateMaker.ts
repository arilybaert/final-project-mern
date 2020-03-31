class DateMaker  {

    // ZERO BEFORE DATE
    public static addZero = (input: number, n: number) => {
        let inputString = String(input);
        while(inputString.length < n) {
            inputString = `0${inputString}`;
        }
        return inputString;
    };

    // MAKE READABLE DATE FOR NBA API
    public static date = () => {

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const readable = `${year}${DateMaker.addZero(month+1, 2)}${DateMaker.addZero(day, 2)}`;
        return readable;
    };
//     // GET CURRENT DATE OR CHANGE DATE DEPENDING ON PARAMETERS
//     changeDate = (mod, add) => {
//         const date = new Date;
//         if(mod){
//             if(add){
//                 date.setDate(date.getDate()+1);
//             }else {
//                 date.setDate(date.getDate()-1);
//             }
//         }
//         const day = date.getDate();
//         const month = date.getMonth();
//         const year = date.getFullYear();
//         // setActDate(date);
//         const readable = `${this.addZero(day, 2)}/${this.addZero(month+1, 2)}/${year}`;
//         return readable;
//     }
}

export default DateMaker;