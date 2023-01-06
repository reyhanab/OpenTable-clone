
const getDate = (date) => {

    // newDate = new Date(newDate.getTime() + newDate.getTimezoneOffset() * 60000)
    if(date.length == 10){
      date += "T00:00:00-05:00"
    }
    let newDate = new Date(date);
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
    const month = newDate.getMonth();
    const day = newDate.getDate();
    const year = newDate.getFullYear();

    let result = `${months[month]} ${day} ${year}`;

    return result
};

export default getDate;

