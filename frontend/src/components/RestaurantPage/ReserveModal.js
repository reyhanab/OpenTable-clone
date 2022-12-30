
const ReserveModal = ({restaurant, date, time, onClose}) =>{
    return (
        <div className="flex flex-col w-[600px] h-[600px] p-10">
            <p className="text-gray-700 text-lg font-semibold mb-8"
            >You're almost done!</p>
            <div className="flex space-x-5">
                <img
                className="w-20 h-20 rounded"
                src={restaurant?.preview_image}
                />
                <p className="text-gray-700 text-2xl font-semibold"
                >{restaurant?.name}</p>
            </div>

        </div>
    )
}

export default ReserveModal;