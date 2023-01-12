import Rating from "../HomePage/Rating";
import { Link } from "react-router-dom";

const NearestRestaurant = ({restaurant}) =>{

    return (
        <div className="flex w-[800px] m-auto p-8 border-b space-x-5">
            <div>
                <img
                className="w-[205px] h-[205px] object-cover rounded"
                src={restaurant?.preview_image}/>
            </div>
            <div
            className="flex flex-col space-y-2 pt-2"
            >
            <p className="font-bold text-xl text-name_blue "
            >{restaurant?.name} - {restaurant?.city}</p>
            <Rating rate={restaurant?.rating} size="medium" color="yellow"/>
            <p className="text-[15px] text-gray-600"
            >{restaurant?.type}</p>
            <Link to={`/restaurants/${restaurant?.id}`}>
                <button className="text-white bg-red-600 w-[200px] h-8 rounded"
                >
                Check availability
                </button>
            </Link>

            </div>

        </div>
    )

}

export default NearestRestaurant;