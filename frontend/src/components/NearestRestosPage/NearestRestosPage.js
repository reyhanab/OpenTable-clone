import { useSelector } from "react-redux";
import NearestRestaurant from "./NearestRestaurant";

const NearestRestos = () =>{

    const restaurants = useSelector((state) => Object.values(state.restaurants))

    return (
        <div className="w-full max-w-screen-2xl m-auto bg-white">
            <div className="">
                <p className="p-5 border-b text-2xl font-semibold text-center">
                    Restaurants near you
                </p>
                <div className="flex flex-col m-auto">
                    {restaurants?.slice(1,6).map((restaurant, idx) =>{
                        return <NearestRestaurant restaurant={restaurant} key={idx}/>
                    })
                    }
                </div>

            </div>

        </div>
    )
}

export default NearestRestos;