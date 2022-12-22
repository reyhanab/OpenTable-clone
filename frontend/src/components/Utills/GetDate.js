
const getDate = () => {
    const date = new Date();
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUNE",
      "JULY",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    let result = `${months[month]} ${day} ${year}`;

    return result
};

export default getDate;

