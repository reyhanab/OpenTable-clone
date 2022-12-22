
const getTime = () =>{

    let result = []
    const date = new Date();

    const hour = date.getHours();
    const minutes = date.getMinutes();
    if (minutes < 30){
        result = [`${hour}:30`,`${hour+1}:00`, `${hour+1}:30`]
    }else{
        result = [`${hour+1}:00`,`${hour+1}:30`, `${hour+2}:00`]
    }
    return result
}

export default getTime;