import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "../../context/Modal"
import { deleteReservationthunk } from "../../store/reservations"
import ReserveModal from "../RestaurantPage/ReserveModal"
import getDate from "../Utills/GetDate"

const OptionsModal = ({reservation, onClose})=>{

    const dispatch = useDispatch()
    const [showReserveModal, setShowReserveModal] = useState(false)
    const restaurant = useSelector(state => state.restaurants[reservation?.restaurant_id])

    const handleDelete = (e)=>{
        e.preventDefault()
        dispatch(deleteReservationthunk(reservation?.id))
        onClose()
    }

    const handleEdit = () =>{
        setShowReserveModal((state)=> !state)
    }

    return(
        <div className="w-[500px] h-[150px] flex flex-col
                        items-center text-black">
            <div
            onClick={handleDelete}
            className="w-full text-center border-b h-[50px] pt-3
                     hover:text-red-600 hover:cursor-pointer">
                Cancel reservation
            </div>
            <div
            onClick={handleEdit}
            className="w-full text-center border-b  h-[50px] pt-3
                      hover:text-red-600 hover:cursor-pointer">
                Edit reservation
            </div>
            <div
            onClick={() => onClose()}
            className="h-[50px] pt-3 hover:text-red-600
                            hover:cursor-pointer">
                Cancel
            </div>
            {showReserveModal && (
                <Modal onClose={handleEdit}>
                    <ReserveModal
                    onClose={handleEdit}
                    restaurant={restaurant}
                    date={new Date(reservation?.date)}
                    time={(reservation?.time).slice(0,5)}
                    people={`${reservation.count} people`}
                    type="edit"
                    reservation={reservation}
                    />
                </Modal>
            )}
        </div>
    )
}
export default OptionsModal;