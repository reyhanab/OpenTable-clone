import { useSelector } from "react-redux"

const ReservationComponent = ({reservation}) => {

    const restaurant = useSelector(state => state.restaurants[reservation?.restaurant_id])
    console.log(restaurant)

    return (
        <div className="flex w-[650px] h-[160px] shadow-lg justify-center">
            <div>
                <img
                className="w-28 h-28 rounded"
                src={restaurant?.preview_image}
                />
            </div>

        </div>
    )
}

export default ReservationComponent