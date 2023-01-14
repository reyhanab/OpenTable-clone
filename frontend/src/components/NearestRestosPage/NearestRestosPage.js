import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNearestRestaurants } from "../../store/nearRestaurants";
import NearestRestaurant from "./NearestRestaurant";

const NearestRestos = () =>{

    const dispatch = useDispatch()
    const restaurants = useSelector((state) => Object.values(state.nearRestaurants))

    useEffect(() =>{
        dispatch(getNearestRestaurants())
    },[dispatch])

    return (
        <div className="w-full max-w-screen-2xl m-auto bg-white">
            <div className="">
                <p className="p-5 border-b text-2xl font-semibold text-center">
                    Restaurants near you
                </p>
                <div className="flex flex-col m-auto">
                    {restaurants?.slice(0,10).map((restaurant, idx) =>{
                        return <NearestRestaurant restaurant={restaurant} key={idx}/>
                    })
                    }
                </div>

            </div>

        </div>
    )
}

export default NearestRestos;