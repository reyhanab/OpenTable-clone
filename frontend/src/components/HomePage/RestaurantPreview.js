import getTime from "../Utills/GetTime";

const RestaurantPreview = ({restaurant}) =>{

    const rate = restaurant?.rating
    const timeRange = getTime()


    return (
        <div className="flex flex-col w-56 h-64 rounded border border-gray-400/75">
            <div >
                <img className="rounded-t h-28 w-56"
                src={restaurant?.preview_image} />
            </div>
            <div className="m-2.5">
                <p className="text-base font-semibold truncate"
                >{restaurant?.name}</p>
                <div>
                    <span className={rate >= 1 ? "fa fa-star pr-1 text-sm text-red-500" : "fa fa-star pr-1 text-sm text-gray-200"}></span>
                    <span className={rate >= 2 ? "fa fa-star pr-1 text-sm text-red-500" : "fa fa-star pr-1 text-sm text-gray-200"}></span>
                    <span className={rate >= 3 ? "fa fa-star pr-1 text-sm text-red-500" : "fa fa-star pr-1 text-sm text-gray-200"}></span>
                    <span className={rate >= 4 ? "fa fa-star pr-1 text-sm text-red-500" : "fa fa-star pr-1 text-sm text-gray-200"}></span>
                    <span className={rate >= 5 ? "fa fa-star pr-1 text-sm text-red-500" : "fa fa-star pr-1 text-sm text-gray-200"}></span>
                    <span className="text-xs pl-2"
                    >{restaurant.num_of_reviews} reviews</span>
                </div>

                <p className="truncate text-sm"
                >{restaurant?.type} . {restaurant?.city} </p>
                <div className="flex space-x-2 my-4 justify-center">
                    <button className="time-btn"> {timeRange[0]}</button>
                    <button className="time-btn"> {timeRange[1]}</button>
                    <button className="time-btn"> {timeRange[2]}</button>
                </div>
            </div>
        </div>
    )
}

export default RestaurantPreview;