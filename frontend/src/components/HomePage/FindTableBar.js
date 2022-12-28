import { useState, useRef, useEffect } from "react";
import { applyMiddleware } from "redux";
import getDate from "../Utills/GetDate";
import getTime from "../Utills/GetTime";
import getTimeNav, { allTimes } from "../Utills/GetTimeNavbar";

const FindTableBar = () => {

	const datePicker = useRef(null)
	const timePicker = useRef(null)
    const [date, setDate] = useState(getDate(new Date()));
    const [time, setTime] = useState(getTimeNav());
    const [people, setPeople] = useState(2)
	const [isFocused, setIsFocused] = useState(false)

	const times = allTimes()

	const clickDatePicker = (e) => {
        datePicker.current.showPicker()

	}
	console.log("outside render")
	const clickTimePicker = () => {

        // timePicker.current.show()

		console.log("time picker render")
		timePicker.current.focus()
		timePicker.current.classList.remove("z-\[-1\]")
		timePicker.current.classList.add("z-\[1\]")
		timePicker.current.size = timePicker.current.length
		// if(isFocused){

		// 	timePicker.current.blur()
		// 	setIsFocused(false)
		// }else{
		// 	setTimeout(()=>{
		//

		// 	},0)
		// 	setIsFocused(true)
		// }
	}
	// useEffect(()=>{
	// 	if(isFocused){
	// 		timePicker.current.size = timePicker.current.length
	// 	}else{
	// 		timePicker.current.size = 0
	// 	}
	// },[isFocused])

    return (
        <div className="flex items-center space-x-4 mt-7">
            <div className='flex items-center'>
				<div className="inline-flex items-center justify-end h-10 w-40 cursor-pointer relative">
					<input
						className="w-[100%] h-[100%] z-[-1] absolute"
						type="date"
						onChange={(e) => setDate(getDate(e.target.value))}
						ref={datePicker}
					>
					</input>
					<div className='border-y border-r h-10
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

						{date}
					</div>
				</div>
                {/* <input
                type="time"
                className="h-10 w-40 text-black"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                ></input> */}
				<div className="inline-flex items-center justify-end h-10 w-40 cursor-pointer relative">
					<div className='border-y border-r h-10 text-center
									inline-flex w-[100%] text-black bg-white
									items-center justify-around'
						 onClick={(e) => clickTimePicker()}
						>
						<select
						ref={timePicker}

						className="w-[100%] h-16 z-[-1] absolute"
						onChange={(e) => setTime(getTimeNav(e.target.value) )}
						>
							{times.map((time, i) =>{
									return <option value ={time} key={i}>{time}</option>
								})
							}
						</select>

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
						{time}
					</div>

				</div>
                <input
                className="h-10 w-40 border rounded-r text-black"
                type="number"
                value={people}
                placeholder="2"
                onChange={(e) => setPeople(e.target.value)}
                >
				</input>
            </div>
            <button className=" bg-red-600 w-36 h-10 border border-red-600 rounded text-sm"
            >Let's go</button>
            {/* <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"><g
            fill="none"
            fill-rule="evenodd"><path d="M17,5 L19,5 C20.1045695,5 21,5.8954305 21,7 L21,19 C21,20.1045695 20.1045695,21 19,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,7 C3,5.8954305 3.8954305,5 5,5 L7,5 L7,4 C7,3.44771525 7.44771525,3 8,3 C8.55228475,3 9,3.44771525 9,4 L9,5 L15,5 L15,4 C15,3.44771525 15.4477153,3 16,3 C16.5522847,3 17,3.44771525 17,4 L17,5 Z M19,9 L19,7 L5,7 L5,9 L19,9 Z M19,11 L5,11 L5,19 L19,19 L19,11 Z" fill="#2D333F"></path></g></svg> */}
        </div>
    )
}

export default FindTableBar;