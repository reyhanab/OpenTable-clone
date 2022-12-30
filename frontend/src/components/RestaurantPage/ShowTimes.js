import GetTime from "../Utills/GetTime";

const ShowTimes = ({restaurant, date, time}) =>{

    const resPage = true
    const timeRange = GetTime({restaurant, date, time , resPage})

    return (
        <div>
            <div>Select a time</div>
            <div className="flex flex-wrap m-2">
                {!timeRange[0].includes("undefined") && <button className="time-btn-lg"> {timeRange[0]}</button>}
                {!timeRange[1].includes("undefined") && <button className="time-btn-lg"> {timeRange[1]}</button>}
                {!timeRange[2].includes("undefined") && <button className="time-btn-lg"> {timeRange[2]}</button>}
                {!timeRange[3].includes("undefined") && <button className="time-btn-lg"> {timeRange[3]}</button>}
                {!timeRange[4].includes("undefined") && <button className="time-btn-lg"> {timeRange[4]}</button>}
            </div>

        </div>
    )
}

export default ShowTimes;