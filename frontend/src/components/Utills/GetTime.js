import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadReservations } from "../../store/reservations";


const GetTime = ({restaurant, date = new Date(), time = new Date(), resPage = false}) =>{

    const checkAvailableHours = (timeFrames, hour) =>{
        let offset;
        while(hour < 23){
            if (parseInt(timeFrames[hour]) >= parseInt(restaurant?.capacity)){
                hour += 1
                offset = true
            }else{
                return [hour, offset]
            }
        }
        return ""
    }

    const reservations = useSelector((state)=> Object.values(state.reservations))

    const filteredRes = reservations.filter((res)=>
                    {   let resDate = new Date(res.date)
                        resDate = new Date(resDate.getTime() + resDate.getTimezoneOffset() * 60000)

                        return (res.restaurant_id === restaurant?.id &&
                        (resDate.getDate() === date.getDate()) &&
                        (resDate.getMonth() === date.getMonth()) &&
                        (resDate.getFullYear() === date.getFullYear()))
                    })
    const timeFrames = {}
    filteredRes.forEach((e)=> {
        let timeKey = (new Date("1970-01-01T" + e.time)).getHours()
        if (timeFrames[timeKey]){
            timeFrames[timeKey] += e.count
        }else{
            timeFrames[timeKey] = e.count
        }
    })

    let result = []
    let hour = time.getHours();
    let minutes = time.getMinutes();

            if(resPage){
                const timeSlot1 =  checkAvailableHours(timeFrames, hour-1)
                const timeSlot2 =  checkAvailableHours(timeFrames, hour)
                const timeSlot3 =  checkAvailableHours(timeFrames, hour+1)
                if (minutes < 30){

                    if(timeSlot1[1]){
                        if (timeSlot2[0] == timeSlot3[0]) {
                            timeSlot3[0] += 1
                        }
                        result = [
                           `${timeSlot1[0]}:00`, `${timeSlot1[0]}:30`, `${timeSlot2[0]}:00`, `${timeSlot2[0]}:30`, `${timeSlot3[0]}:00`
                        ]
                    }else{
                        if (timeSlot2[0] == timeSlot3[0]) {
                            timeSlot3[0] += 1
                        }

                        result = [
                            `${timeSlot1[0]}:00`, `${timeSlot1[0]}:30`, `${timeSlot2[0]}:00`, `${timeSlot2[0]}:30`, `${timeSlot3[0]}:00`
                         ]
                    }
                }else{
                    if(timeSlot1[1]){

                        if (timeSlot2[0] == timeSlot3[0]) {
                            timeSlot3[0] += 1
                        }

                        result = [
                            `${timeSlot1[0]}:30`, `${timeSlot2[0]}:00`, `${timeSlot2[0]}:30`, `${timeSlot3[0]}:00`, `${timeSlot3[0]}:30`
                        ]

                    }else{
                        if (timeSlot2[0] == timeSlot3[0]) {
                            timeSlot3[0] += 1
                        }

                        result = [
                            `${timeSlot1[0]}:30`, `${timeSlot2[0]}:00`, `${timeSlot2[0]}:30`, `${timeSlot3[0]}:00`, `${timeSlot3[0]}:30`
                        ]
                    }
                }

            }else{
                const timeSlot1 =  checkAvailableHours(timeFrames, hour)
                const timeSlot2 =  checkAvailableHours(timeFrames, hour+1)
                const timeSlot3 =  checkAvailableHours(timeFrames, hour+2)
                if (minutes < 30){

                    if(timeSlot1[1]){
                        if (timeSlot1[0] == timeSlot2[0]) {
                            timeSlot2[0] += 1
                        }
                        result = [
                           `${timeSlot1[0]}:00`, `${timeSlot1[0]}:30`, `${timeSlot2[0]}:00`
                        ]
                    }else{
                        result = [
                            `${timeSlot1[0]}:30`, `${timeSlot2[0]}:00`, `${timeSlot2[0]}:30`
                        ]
                    }
                }else{
                    if(timeSlot1[1]){
                        if (timeSlot2[0] == timeSlot3[0]) {
                            timeSlot3[0] += 1
                        }
                        result = [
                            `${timeSlot2[0]}:00`, `${timeSlot2[0]}:30`, `${timeSlot3[0]}:00`
                        ]
                    }else{
                        result = [
                            `${timeSlot2[0]}:00`, `${timeSlot2[0]}:30`, `${timeSlot3[0]}:00`
                        ]
                    }
                }
            }
    return result
}

export default GetTime;

