
export const allTimes = () =>{
    const date = new Date();

    const hour = date.getHours();
    const minutes = date.getMinutes();

    const result = ['9:00', '9:30', '10:00','10:30','11:00', '11:30', '12:00',
    '12:30','13:00','13:30', '14:00', '14:30','15:00', '15:30','16:00','16:30',
    '17:00', '17:30','18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30','21:00', '21:30', '22:00', '22:30', '23:00', '23:30']

    return result;
}


const getTimeNav = () =>{

    let result = ""
    const date = new Date();

    const hour = date.getHours();
    const minutes = date.getMinutes();
    if (minutes < 30){

        result = `${hour}:30`
    }else{
        result = `${hour+1}:00`
    }
    return result
}

export default getTimeNav;