
const getDate = (date) => {

    // newDate = new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000)
    if (!String(date).includes('-')){
      date = new Date(date)
      console.log("date in if", date)
    }else{
      console.log("date in else", date)
      if(typeof date != 'object'){
        console.log("date in type of", date)
        date = new Date([date, "00:00"])
      }
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    console.log("month, day, year:", month, day, year)

    let result = `${months[month]} ${day} ${year}`;

    return result
};

export default getDate;

