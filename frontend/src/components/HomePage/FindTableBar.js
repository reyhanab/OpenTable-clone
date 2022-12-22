import { useState } from "react";
import getDate from "../Utills/GetDate";

const FindTableBar = () => {

    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [people, setPeople] = useState(2)


    return (
        <div className="flex items-center space-x-4 mt-5">
            <div >

                <input
                className="h-10 w-36 border rounded-l"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                >
                </input>
                <input
                type="time"
                className="h-10 w-36"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                ></input>
                <input
                className="h-10 w-36 border rounded-r"
                type="number"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                ></input>
            </div>
            <button className=" bg-red-600 w-32 h-10 border border-red-600 rounded text-sm"
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