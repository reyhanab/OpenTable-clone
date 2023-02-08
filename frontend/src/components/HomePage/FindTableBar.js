import { useState, useRef, useEffect } from "react";
import { applyMiddleware } from "redux";
import Svg from "../RestaurantPage/Svg";
import getDate from "../Utills/GetDate";
import getTime from "../Utills/GetTime";
import getTimeNav, { allTimes } from "../Utills/GetTimeNavbar";
import PartySize from "../Utills/PartySize";

const FindTableBar = (
	{type, setPayload, date = Date.now(), time = getTimeNav(), people="2 people"}
	) => {

	const times = allTimes()
	const partySize = PartySize()
	const datePicker = useRef(null)
    const [dateInput, setDateInput] = useState(getDate(date, true));
    const [timeInput, setTimeInput] = useState(time);
    const [peopleInput, setPeopleInput] = useState(people)
	const [currentDate, setCurrentDate] = useState(new Date())
	let month = currentDate.getMonth() +1
	if (month<10) month = `0${month}`
	const day = currentDate.getDate()
	const year = currentDate.getFullYear()

	let arr = dateInput.split(' ')
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
	]

	const dateValue = `${arr[2]}-${months.indexOf(arr[0]) + 1 < 10 ?
		 `0${months.indexOf(arr[0]) + 1}` :
		  months.indexOf(arr[0]) + 1}-${arr[1].length < 3 ?
		 `0${arr[1][0]}` : arr[1].slice(0,2) }`



	const offsetDate = new Date();
	const offset = offsetDate.getTimezoneOffset();
	const offsetInHours = offset / 60;

	useEffect(()=>{
		if(setPayload){
			setPayload({
				date: new Date(dateInput).toISOString().slice(0,10),
				// date : getDate(dateInput),
				time: timeInput,
				count: Number(peopleInput.split(" ")[0]),
				offset: offsetInHours
			})
		}
	},[peopleInput, dateInput, timeInput])

	const clickDatePicker = (e) => {
		if(type != "create"){
			datePicker.current.showPicker()
		}
	}

    return (
        <div className="flex items-center space-x-4 mt-7">
            <div className='flex items-center'>
				<div className="inline-flex items-center justify-end h-10 w-48
								cursor-pointer relative">
					<input
						className="w-[100%] h-[100%] z-[-1] absolute"
						type="date"
						value={dateValue}
						disabled={type=="create" ? true : false}
						onChange={(e) => setDateInput(getDate(e.target.value))}
						ref={datePicker}
						min={`${year}-${month}-${day}`}
					>
					</input>
					<div className='border border-r h-10
									inline-flex w-[100%] text-black bg-white
									items-center justify-around rounded-l'
						 onClick={(e) => clickDatePicker()}
									>
						<span className='inline-block leading-none h-6 w-6 min-w-[1.5rem]'>
							<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
								<g fill="none" fill-rule="evenodd">
								<path d="M17,5 L19,5 C20.1045695,5 21,5.8954305 21,7 L21,19 C21,20.1045695 20.1045695,21
										19,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,7 C3,5.8954305 3.8954305,5 5,5 L7,5 L7,4
										C7,3.44771525 7.44771525,3 8,3 C8.55228475,3 9,3.44771525 9,4 L9,5 L15,5 L15,4 C15,3.44771525
										15.4477153,3 16,3 C16.5522847,3 17,3.44771525 17,4 L17,5 Z M19,9 L19,7 L5,7 L5,9 L19,9 Z M19,11
										L5,11 L5,19 L19,19 L19,11 Z" fill="#2D333F">
								</path>
								</g>
							</svg>
						</span>
						{dateInput}
						<Svg />
					</div>
				</div>
				<div className="inline-flex items-center justify-end h-10 w-40 cursor-pointer relative">
					<div className='border-y border-r h-10 text-center
									inline-flex w-[100%] text-black bg-white
									items-center justify-around'>

						<span className='inline-block leading-none h-6 w-6 min-w-[1.5rem]'>
							<svg
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							focusable="false"><g fill="none"
							fill-rule="evenodd">
						    <path d="M13,11 L14.5,11 C14.7761424,11 15,11.2238576 15,11.5 L15,12.5 C15,12.7761424 14.7761424,13 14.5,
							13 L12.5,13 L11.5,13 C11.2238576,13 11,12.7761424 11,12.5 L11,7.5 C11,7.22385763 11.2238576,7 11.5,
							7 L12.5,7 C12.7761424,7 13,7.22385763 13,7.5 L13,11 Z M12,21 C7.02943725,21 3,16.9705627 3,12 C3,
							7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,
							21 Z M12,19 C15.8659932,19 19,15.8659932 19,12 C19,8.13400675 15.8659932,5 12,5 C8.13400675,5 5,
							8.13400675 5,12 C5,15.8659932 8.13400675,19 12,19 Z" fill="#2D333F"></path></g></svg>
						</span>
						{timeInput}
						<Svg />
					</div>
					<select
						className="w-[100%] h-[100%] absolute opacity-0"
						onChange={(e) => setTimeInput(e.target.value)}
						value={timeInput}
						disabled={type=="create" ? true : false}
						>
							{times.map((time, i) =>{
									return <option value ={time} key={i}>{time}</option>
								})
							}
					</select>
				</div>
				<div className="inline-flex items-center justify-end h-10 w-40 cursor-pointer relative">
					<div className='border-y border-r h-10 text-center rounded-r
									inline-flex w-[100%] text-black bg-white
									items-center justify-around'>

						<span className='inline-block leading-none h-6 w-6 min-w-[1.5rem]'>
							<svg
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							focusable="false"><g fill="none"
							fill-rule="evenodd">
							<path d="M14.5734892,12.2877361 C17.0042328,12.8819383 18.7345621,
							14.3964534 19.7644773,16.8312813 C19.9208947,17.2010684 20.0014914,
							17.5984917 20.0014914,18 C20.0014914,19.6568477 18.658351,
							20.9999882 17.0015032,20.9999882 L6.99926923,21 C6.59776067,
							21 6.2003371,20.9194033 5.83054967,20.7629859 C4.3045986,20.1175199 3.59082441,
							18.3572386 4.23628386,16.8312848 C5.26612228,14.3966359 6.99627139,
							12.8821638 9.42673118,12.2878687 C7.97272602,11.4134027 7,9.82029752 7,
							8 C7,5.23857625 9.23857625,3 12,3 C14.7614237,3 17,5.23857625 17,8 C17,
							9.82020554 16.0273723,11.4132417 14.5734892,12.2877361 Z M12,5 C10.3431458,
							5 9,6.34314575 9,8 C9,9.65685425 10.3431458,11 12,11 C13.6568542,11 15,
							9.65685425 15,8 C15,6.34314575 13.6568542,5 12,5 Z M17.9429826,17.6856919 C17.1294316,
							15.228564 15.1485327,14 12.000286,14 C8.85208947,14 6.87106303,15.2285248 6.05720667,
							17.6855743 L6.05721876,17.6855783 C5.88356446,18.2098444 6.16779141,18.7756206 6.69205743,
							18.9492749 C6.79348438,18.9828708 6.89964014,18.9999945 7.00648636,18.9999945 L16.99371,
							18.9999469 C17.5459684,18.9999469 17.9936623,18.552253 17.9936623,17.9999945 C17.9936623,
							17.8931928 17.9765523,17.7870807 17.9429826,17.6856919 Z" fill="#2D333F"></path></g></svg>
						</span>
						{peopleInput}
						<Svg />
					</div>
					<select
						className="w-[100%] h-[100%] absolute opacity-0"
						onChange={(e) => setPeopleInput(e.target.value)}
						value={peopleInput}
						>
							{partySize.map((item, i) =>{
									return <option value ={item} key={i}>{item}</option>
								})
							}
					</select>
				</div>
            </div>
            {/* <button className="bg-red-600 w-36 h-10 border border-red-600 rounded text-sm"
            >Let's go</button> */}
        </div>
    )
}

export default FindTableBar;