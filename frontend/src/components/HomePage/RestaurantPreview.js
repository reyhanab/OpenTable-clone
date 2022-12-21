

const RestaurantPreview = ({restaurant}) =>{

    return (
        <div className="flex flex-col w-60 h-72 rounded border border-gray-400/75">
            <div >
                <img className="rounded-t h-32 w-60"
                src={restaurant?.preview_image} />
            </div>
            <div className="m-2.5">
                <p className="text-base font-semibold"
                >{restaurant?.name}</p>
                <p>{restaurant?.rating} </p>
                <p className="truncate"
                >{restaurant?.type} . {restaurant?.city} </p>
                <div className="flex space-x-2 my-3">
                    <button className="time-btn"> 7:30 PM</button>
                    <button className="time-btn"> 8:00 PM</button>
                    <button className="time-btn"> 8:30 PM</button>
                </div>
            </div>
        </div>
    )
}

export default RestaurantPreview;