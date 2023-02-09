import { useState } from "react";
import { useDispatch } from "react-redux";
import { createReservation, editReservation } from "../../store/reservations";
import FindTableBar from "../HomePage/FindTableBar";

const ReserveModal = ({restaurant, date, time, people, onClose, type = "create", reservation={}}) =>{

    const dispatch = useDispatch()
    const [payload, setPayload] = useState({})
    const [confirmation, setConfirmation] = useState(false)
    const [error, setError] = useState("")

    const handleSubmit = async (e) =>{
        setError("")
        setConfirmation(false)
        e.preventDefault();
        let data;
        if(type == "edit"){
            data = await dispatch(editReservation(payload, reservation?.id))
        }
        else{
            data = await dispatch(createReservation(payload, restaurant?.id))
        }
        if (data.errors){
            setError(data.errors);
        }
        else{
            setConfirmation(true)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5 w-[600px] h-[600px] p-8">
                <svg
                onClick={e => onClose()}
                className="w-6 h-6 ml-auto cursor-pointer"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                focusable="false"><g fill="none"
                fill-rule="evenodd"><path d="M11,11 L11,4.5 C11,4.22385763 11.2238576,4 11.5,4 L12.5,4 C12.7761424,4 13,4.22385763 13,4.5 L13,11 L19.5,11 C19.7761424,11 20,11.2238576 20,11.5 L20,12.5 C20,12.7761424 19.7761424,13 19.5,13 L13,13 L13,19.5 C13,19.7761424 12.7761424,20 12.5,20 L11.5,20 C11.2238576,20 11,19.7761424 11,19.5 L11,13 L4.5,13 C4.22385763,13 4,12.7761424 4,12.5 L4,11.5 C4,11.2238576 4.22385763,11 4.5,11 L11,11 Z" fill="#2D333F" fill-rule="nonzero" transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000)"></path></g></svg>
                <p className="text-gray-700 text-lg font-semibold mb-8"
                >You're almost done!</p>
                <div className="flex space-x-5">
                    <img
                    className="w-20 h-20 rounded object-cover"
                    src={restaurant?.preview_image}
                    />
                    <p className="text-gray-700 text-2xl font-semibold"
                    >{restaurant?.name}</p>
                </div>
                <div>
                    <FindTableBar
                    date={date}
                    time={time}
                    people={people}
                    type={type}
                    setPayload={setPayload}
                    status={false}
                    />
                </div>
                <button
                type="submit"
                className="w-full h-12 bg-red-500 text-white rounded-md">
                    Complete reservation
                </button>
                { confirmation && (
                    <div className="flex justify-center space-x-2">
                        <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        focusable="false"><g
                        fill="none"
                        fill-rule="evenodd">
                        <path d="M11.0355339,12.863961 L9.62132034,11.4497475 C9.23079605,
                        11.0592232 8.59763107,11.0592232 8.20710678,11.4497475 C7.81658249,
                        11.8402718 7.81658249,12.4734367 8.20710678,12.863961 L10.3284271,
                        14.9852814 C10.5236893,15.1805435 10.7796116,15.2781746 11.0355339,
                        15.2781746 C11.2914562,15.2781746 11.5473785,15.1805435 11.7426407,
                        14.9852814 L15.9852814,10.7426407 C16.3758057,10.3521164 16.3758057,
                        9.71895142 15.9852814,9.32842712 C15.5947571,8.93790283 14.9615921,
                        8.93790283 14.5710678,9.32842712 L11.0355339,12.863961 Z M12,
                        21 C7.02943725,21 3,16.9705627 3,12 C3,7.02943725 7.02943725,
                        3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,
                        21 12,21 Z" fill="#39A25E"></path></g></svg>
                        <p>Reservation confirmed</p>
                    </div>
                )
                }
                  {
                    error.length > 0 && (
                        <div className="text-red-500 text-center">
                            <p>{error}</p>
                        </div>
                    )
                    }
            </div>
        </form>
    )
}

export default ReserveModal;