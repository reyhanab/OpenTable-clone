
const getDate = (date, type=false) => {

    // newDate = new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000)
    if (!String(date).includes('-')){
      date = new Date(date)
    }else{
      if(typeof date != 'object'){
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
    let day;
    const month = date.getMonth();
    if ( type == true){
       day = date.getUTCDate();
    }else{
       day = date.getDate();
    }
    const year = date.getFullYear();

    let result = `${months[month]} ${day} ${year}`;

    return result
};

export default getDate;

