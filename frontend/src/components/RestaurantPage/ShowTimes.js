import { useState } from "react";
import GetTime from "../Utills/GetTime";
import { Modal } from "../../context/Modal";
import ReserveModal from "./ReserveModal";

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
                        {!timeRange[0].includes("undefined") && <button
                        onClick={(e)=> toggleReserveModal(timeRange[0])}
                        className="time-btn-lg"> {timeRange[0]}</button>}
                        {!timeRange[1].includes("undefined") && <button
                        onClick={(e)=> toggleReserveModal(timeRange[1])}
                        className="time-btn-lg"> {timeRange[1]}</button>}
                        {!timeRange[2].includes("undefined") && <button
                        onClick={(e)=> toggleReserveModal(timeRange[2])}
                        className="time-btn-lg"> {timeRange[2]}</button>}
                        {!timeRange[3].includes("undefined") && (<button
                        onClick={(e)=> toggleReserveModal(timeRange[3])}
                        className="time-btn-lg"> {timeRange[3]}</button>)}
                        {!timeRange[4].includes("undefined") && (<button
                        onClick={(e)=> toggleReserveModal(timeRange[4])}
                        className="time-btn-lg"> {timeRange[4]}</button>)}
                    </div>
                </div>

            )}
            {!resPage &&(
                <div className="flex space-x-2 mb-4 justify-center">
                    {!timeRange[0].includes("undefined") && <button
                        onClick={(e)=> toggleReserveModal(timeRange[0])}
                        className="time-btn"> {timeRange[0]}</button>}
                        {!timeRange[1].includes("undefined") && <button
                        onClick={(e)=> toggleReserveModal(timeRange[1])}
                        className="time-btn"> {timeRange[1]}</button>}
                        {!timeRange[2].includes("undefined") && <button
                        onClick={(e)=> toggleReserveModal(timeRange[2])}
                        className="time-btn"> {timeRange[2]}</button>}
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