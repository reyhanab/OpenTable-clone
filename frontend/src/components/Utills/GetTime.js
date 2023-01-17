// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadReservations } from "../../store/reservations";


// const GetTime = ({restaurant, date = new Date(), time = new Date(), resPage = false}) =>{

//     const checkAvailableHours = (timeFrames, hour) =>{
//         let offset;
//         while(hour < 23){
//             if (parseInt(timeFrames[hour]) >= parseInt(restaurant?.capacity)){
//                 hour += 1
//                 offset = true
//             }else{
//                 return [hour, offset]
//             }
//         }
//         return ""
//     }

//     const reservations = useSelector((state)=> Object.values(state.reservations))

//     const filteredRes = reservations.filter((res)=>
//                     {   let resDate = new Date(res.date)
//                         resDate = new Date(resDate.getTime() + resDate.getTimezoneOffset() * 60000)

//                         return (res.restaurant_id === restaurant?.id &&
//                         (resDate.getDate() === date.getDate()) &&
//                         (resDate.getMonth() === date.getMonth()) &&
//                         (resDate.getFullYear() === date.getFullYear()))
//                     })
//     const timeFrames = {}
//     filteredRes.forEach((e)=> {
//         let timeKey = (new Date("1970-01-01T" + e.time)).getHours()
//         if (timeFrames[timeKey]){
//             timeFrames[timeKey] += e.count
//         }else{
//             timeFrames[timeKey] = e.count
//         }
//     })

//     let result = []
//     let hour = time.getHours();
//     let minutes = time.getMinutes();

//             if(resPage){
//                 const timeSlot1 =  checkAvailableHours(timeFrames, hour-1)
//                 const timeSlot2 =  checkAvailableHours(timeFrames, hour)
//                 const timeSlot3 =  checkAvailableHours(timeFrames, hour+1)
//                 if (minutes < 30){

//                     if(timeSlot1[1]){
//                         if (timeSlot2[0] == timeSlot3[0]) {
//                             timeSlot3[0] += 1
//                         }
//                         result = [
//                            `${timeSlot1[0]}:00`, `${timeSlot1[0]}:30`, `${timeSlot2[0]}:00`, `${timeSlot2[0]}:30`, `${timeSlot3[0]}:00`
//                         ]
//                     }else{
//                         if (timeSlot2[0] == timeSlot3[0]) {
//                             timeSlot3[0] += 1
//                         }

//                         result = [
//                             `${timeSlot1[0]}:00`, `${timeSlot1[0]}:30`, `${timeSlot2[0]}:00`, `${timeSlot2[0]}:30`, `${timeSlot3[0]}:00`
//                          ]
//                     }
//                 }else{
//                     if(timeSlot1[1]){

//                         if (timeSlot2[0] == timeSlot3[0]) {
//                             timeSlot3[0] += 1
//                         }

//                         result = [
//                             `${timeSlot1[0]}:30`, `${timeSlot2[0]}:00`, `${timeSlot2[0]}:30`, `${timeSlot3[0]}:00`, `${timeSlot3[0]}:30`
//                         ]

//                     }else{
//                         if (timeSlot2[0] == timeSlot3[0]) {
//                             timeSlot3[0] += 1
//                         }

//                         result = [
//                             `${timeSlot1[0]}:30`, `${timeSlot2[0]}:00`, `${timeSlot2[0]}:30`, `${timeSlot3[0]}:00`, `${timeSlot3[0]}:30`
//                         ]
//                     }
//                 }

//             }else{
//                 const timeSlot1 =  checkAvailableHours(timeFrames, hour)
//                 const timeSlot2 =  checkAvailableHours(timeFrames, hour+1)
//                 const timeSlot3 =  checkAvailableHours(timeFrames, hour+2)
//                 if (minutes < 30){

//                     if(timeSlot1[1]){
//                         if (timeSlot1[0] == timeSlot2[0]) {
//                             timeSlot2[0] += 1
//                         }
//                         result = [
//                            `${timeSlot1[0]}:00`, `${timeSlot1[0]}:30`, `${timeSlot2[0]}:00`
//                         ]
//                     }else{
//                         result = [
//                             `${timeSlot1[0]}:30`, `${timeSlot2[0]}:00`, `${timeSlot2[0]}:30`
//                         ]
//                     }
//                 }else{
//                     if(timeSlot1[1]){
//                         if (timeSlot2[0] == timeSlot3[0]) {
//                             timeSlot3[0] += 1
//                         }
//                         result = [
//                             `${timeSlot2[0]}:00`, `${timeSlot2[0]}:30`, `${timeSlot3[0]}:00`
//                         ]
//                     }else{
//                         result = [
//                             `${timeSlot2[0]}:00`, `${timeSlot2[0]}:30`, `${timeSlot3[0]}:00`
//                         ]
//                     }
//                 }
//             }
//     return result
// }

// export default GetTime;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loadReservations } from "../../store/reservations";


// const GetTime = ({restaurant, date = new Date(), time = new Date(), resPage = false}) =>{

// 	let result = []
//     let hour = time.getHours();
//     let minutes = time.getMinutes();

// 	const availableSlots = []

//     const checkAvailableHours = (timeFrames, hour, minutes, res) =>{
//         let offset;
// 		let current_hour = hour
// 		let iter = 2
// 		if (res){
// 			current_hour -= 1
// 			iter = 3
// 		}
// 		for (let i = 0; i < iter; i++){
// 			current_hour += i
// 			while(current_hour < 23){
// 				if (parseInt(timeFrames[current_hour]) >= parseInt(restaurant?.capacity)){
// 					current_hour += 1
// 					offset = true
// 				} else if (i === 2 || (iter === 2 && i === 1)){
// 					if (offset){
// 						availableSlots.push(`${current_hour}:00`)
// 					} else {
// 						availableSlots.push(`${current_hour}:30`)
// 					}
// 					break
// 				}

// 				else{
// 					//  return [hour, offset]
// 					// `${timeSlot1[0]}:00`, `${timeSlot1[0]}:30`, `${timeSlot2[0]}:00`, `${timeSlot2[0]}:30`, `${timeSlot3[0]}:00`
// 					if (minutes < 30){
// 						if (offset){
// 							availableSlots.push(`${current_hour}:00`)
// 							availableSlots.push(`${current_hour}:30`)
// 						} else {
// 							availableSlots.push(`${current_hour}:30`)
// 							availableSlots.push(`${current_hour + 1}:00`)
// 						}
// 					} else {
// 						availableSlots.push(`${current_hour}:30`)
// 						availableSlots.push(`${current_hour + 1}:00`)
// 					}
// 					break
// 				}
// 			}
// 			offset = false
// 		}
//     }

//     const reservations = useSelector((state)=> Object.values(state.reservations))

//     const filteredRes = reservations.filter((res)=>
//                     {   let resDate = new Date(res.date)
//                         resDate = new Date(resDate.getTime() + resDate.getTimezoneOffset() * 60000)

//                         return (res.restaurant_id === restaurant?.id &&
//                         (resDate.getDate() === date.getDate()) &&
//                         (resDate.getMonth() === date.getMonth()) &&
//                         (resDate.getFullYear() === date.getFullYear()))
//                     })

//     const timeFrames = {}
//     filteredRes.forEach((e)=> {
//         let timeKey = (new Date("1970-01-01T" + e.time)).getHours()
//         if (timeFrames[timeKey]){
//             timeFrames[timeKey] += e.count
//         }else{
//             timeFrames[timeKey] = e.count
//         }
//     })

//             if(resPage){
// 				checkAvailableHours(timeFrames, hour, minutes, true)
// 				result = availableSlots

//             } else {
// 				checkAvailableHours(timeFrames, hour, minutes, false)
// 				result = availableSlots
// 			}
//     return result
// }

// export default GetTime;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadReservations } from "../../store/reservations";


const GetTime = ({restaurant, date = new Date(), time = new Date(), resPage = false}) =>{

	let result = []
    let hour = time.getHours();
    let minutes = time.getMinutes();

	const availableSlots = []

	const addTime = (current_hour_minutes, condition) => {
		let new_time = new Date(0,0,0, current_hour_minutes[0], current_hour_minutes[1])
		// turn the 30 minutes to an hour
		new_time = new_time.setMinutes(condition)
		new_time = new Date(new_time)
		current_hour_minutes[0] = new_time.getHours()
		current_hour_minutes[1] = new_time.getMinutes()
	}

    const checkAvailableHours = (timeFrames, hours, minutes, res) =>{
		let iter = 3
		if (res) iter = 5
		if (minutes > 30) { hours += 1; minutes = 0}
		if (minutes < 30 && minutes !== 0) minutes = 30
		if (res && hours > 9) {hours -= 1}
		const current_hour_minutes = [hours, minutes]

		for (let i = 0; i < iter; i++){
			while (current_hour_minutes[0] < 23){
				if (parseInt(timeFrames[current_hour_minutes[0]]) >= parseInt(restaurant?.capacity)){
					if (current_hour_minutes[1] === 30) {
						addTime(current_hour_minutes, 60)
					} else {
						addTime(current_hour_minutes, 30)
					}
				}
				else {
					// add the time to the available time slots
					availableSlots.push(`${current_hour_minutes[0]}:${current_hour_minutes[1] === 0 ? '00' : current_hour_minutes[1]}`)
					// increase the time by 30 minutes each time
					if (current_hour_minutes[1] === 30) {
						addTime(current_hour_minutes, 60)
					} else {
						addTime(current_hour_minutes, 30)
					}
					break
				}
			}
		}
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

            if(resPage){
				checkAvailableHours(timeFrames, hour, minutes, true)
				result = availableSlots

            } else {
				checkAvailableHours(timeFrames, hour, minutes, false)
				result = availableSlots
			}
	if (result.length == 0) result = ["No available time"]
    return result
}

export default GetTime;