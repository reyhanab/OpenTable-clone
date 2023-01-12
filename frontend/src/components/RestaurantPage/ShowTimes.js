import { useState } from "react";
import GetTime from "../Utills/GetTime";
import { Modal } from "../../context/Modal";
import ReserveModal from "./ReserveModal";
import { Link } from "react-router-dom";

const ShowTimes = ({restaurant, date=new Date(), time=new Date(), people="2 people", resPage = false}) =>{

    const [chosenTime, setChosenTime] = useState('')
    const [showReserveModal, setShowReserveModal] = useState(false)

    let timeRange;
    if(resPage){
        timeRange = GetTime({restaurant, date, time , resPage})
    }else{
        timeRange = GetTime({restaurant})
    }

    const toggleReserveModal = (time) =>{
        setChosenTime(time)
        setShowReserveModal(state => !state)
    }

    return (
        <div>
            {resPage && (
                <div>
                    <div>Select a time</div>
                    <div className="flex flex-wrap m-2">
                        {timeRange[0] && <button
                        onClick={(e)=> toggleReserveModal(timeRange[0])}
                        className="time-btn-lg"> {timeRange[0]}</button>}
                        {timeRange[1] && <button
                        onClick={(e)=> toggleReserveModal(timeRange[1])}
                        className="time-btn-lg"> {timeRange[1]}</button>}
                        {timeRange[2] && <button
                        onClick={(e)=> toggleReserveModal(timeRange[2])}
                        className="time-btn-lg"> {timeRange[2]}</button>}
                        {timeRange[3] && (<button
                        onClick={(e)=> toggleReserveModal(timeRange[3])}
                        className="time-btn-lg"> {timeRange[3]}</button>)}
                        {timeRange[4]&& (<button
                        onClick={(e)=> toggleReserveModal(timeRange[4])}
                        className="time-btn-lg"> {timeRange[4]}</button>)}
                    </div>
                </div>

            )}
            {!resPage &&(
                <div className="flex space-x-2 mb-4 justify-center">
                {timeRange[0].length > 5 ?
                    <Link to={`/restaurants/${restaurant?.id}`}>
                        <button className="bg-red-600 h-8 w-[200px] text-white rounded"
                        >Check availability</button>
                    </Link>
                    :
                    <p className="flex space-x-2 mb-4 justify-center">
                        {timeRange[0] && <button
                        onClick={(e)=> toggleReserveModal(timeRange[0])}
                        className="time-btn"> {timeRange[0]}</button>}
                        {timeRange[1] && <button
                        onClick={(e)=> toggleReserveModal(timeRange[1])}
                        className="time-btn"> {timeRange[1]}</button>}
                        {timeRange[2] && <button
                        onClick={(e)=> toggleReserveModal(timeRange[2])}
                        className="time-btn"> {timeRange[2]}</button>}
                    </p>
                    }
                </div>
            )}

            { showReserveModal && (
                <Modal onClose={toggleReserveModal}>
                    <ReserveModal
                    onClose={toggleReserveModal}
                    date={date}
                    time={chosenTime}
                    people={people}
                    restaurant={restaurant}
                    />
                </Modal>
            )
            }


        </div>
    )
}

export default ShowTimes;