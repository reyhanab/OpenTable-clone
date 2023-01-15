import { useSelector } from "react-redux";
import NearestRestaurant from "./NearestRestaurant";

const NearestRestos = () =>{

    const restaurants = useSelector((state) => Object.values(state.restaurants))

    return (
        <div className="w-full max-w-screen-2xl m-auto bg-white">
            <div className="">
                <p className="p-5 border-b text-2xl font-semibold text-center">
                   All Restaurants
                </p>
                <div className="flex flex-col m-auto">
                    {restaurants?.map((restaurant, idx) =>{
                        return <NearestRestaurant restaurant={restaurant} key={idx}/>
                    })
                    }
                </div>

            </div>

        </div>
    )
}

export default NearestRestos;