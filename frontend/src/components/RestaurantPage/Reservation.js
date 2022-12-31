import { useState, useRef } from "react";
import getDate from "../Utills/GetDate";
import { allTimes } from "../Utills/GetTimeNavbar";
import PartySize from "../Utills/PartySize";
import Svg from "./Svg";
import ShowTimes from "./ShowTimes";

const Reservation = ({reservationRef, restaurant}) =>{

    const times = allTimes()
    const partySize = PartySize()

    const datePicker = useRef(null)
    const [date, setDate] = useState(getDate(new Date()));
    const [time, setTime] = useState(times[0]);
    const [people, setPeople] = useState(partySize[1])
    const [showTimes, setShowTimes] = useState(false)
    const currentDate = new Date().toISOString().slice(0, 10);


    const clickDatePicker = (e) => {
        datePicker.current.showPicker()
	}

    const handleShowTimes = () => {
        reservationRef.current.classList.remove("h-[330px]")
        reservationRef.current.classList.add("h-[500px]")
        setShowTimes(true)
    }

    return (
        <>
            <div
            className="flex flex-col p-4 space-y-4 text-black ">
                <p className="text-center text-lg font-bold border-b border-gray-300 pb-3"
                >Make a reservation</p>
                <div>
                    <p className="text-sm"
                    >Party Size</p>
                    <div className="inline-flex items-center h-10 w-full cursor-pointer relative mt-2">
                        <div className='flex border-b h-10 text-center justify-between
                                            text-black bg-white items-center w-full'>

                            <p className="text-[14px] text-gray-600 font-thin"
                            >{people}</p>
                            <Svg />
                        </div>
                        <select
                        className="w-[100%] h-[100%] absolute opacity-0"
                        onChange={(e) => setPeople(e.target.value)}
                        >
                            {partySize.map((item, i) =>{
                                    return <option value ={item} key={i}>{item}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="w-full">
                    Date
                    <div className="inline-flex items-center space-y-4 h-10 w-full cursor-pointer relative">
                        <input
                            className="w-[100%] h-[100%] z-[-1] absolute"
                            type="date"
                            onChange={(e) => setDate(getDate(e.target.value))}
                            ref={datePicker}
                            min={currentDate}
                        >
                        </input>
                        <div className='border-b h-10 flex w-full bg-white
                                        items-center justify-between'
                            onClick={(e) => clickDatePicker()}>
                            <p className="text-[13px] text-gray-600 font-thin">
                            {date}
                            </p>
                            <Svg />
                        </div>
                    </div>
                    </div>
                    <div className="w-full">
                    Time
                        <div className="inline-flex items-center h-10 w-full cursor-pointer relative mt-2">
                            <div className='flex border-b h-10 text-center justify-between
                                            text-black bg-white items-center w-full'>

                                <p className="text-[13px] text-gray-600 font-thin"
                                >{time}</p>
                                <Svg />
                            </div>
                            <select
                                className="w-[100%] h-[100%] absolute opacity-0"
                                onChange={(e) => setTime(e.target.value)}
                                >
                                    {times.map((time, i) =>{
                                            return <option value ={time} key={i}>{time}</option>
                                        })
                                    }
                            </select>

                        </div>
                    </div>
                </div>
                <button
                className="bg-red-600 h-12 rounded text-white"
                onClick={(e) => handleShowTimes()}
                >
                    Find a time
                </button>
                {showTimes && (
                    <ShowTimes
                    date={new Date(date)}
                    restaurant = {restaurant}
                    time={new Date("1970-01-01T" + time)}
                    people={people}
                    resPage={true}
                    />
                )
                }
            </div>
        </>
    )
}

export default Reservation;