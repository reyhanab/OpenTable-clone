import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NearestRestaurant from "./NearestRestaurant";
import { getAllRestaurantsLimited } from "../../store/nearestRestos";
import { getAllRestaurants } from "../../store/restaurants";

const NearestRestos = () =>{

    const dispatch = useDispatch()
    const allRestaurants = useSelector((state) => Object.values(state.restaurants))
    const restaurants = useSelector((state) => Object.values(state.nearestRestos))
    const [pages, setPages] = useState(new Array(Math.round(allRestaurants.length % 5)).fill('1'))
    const [page, setPage] = useState(0)

    const fetchRestPage = (idx) =>{
        dispatch(getAllRestaurantsLimited(idx))
    }

    useEffect(()=>{
        async function inner(){
            if (allRestaurants.length == 0) {
                const data = await dispatch(getAllRestaurants())
                const arr = new Array(Math.round(data.Restaurants.length % 5)).fill('1')
                setPages(arr)
            }
            dispatch(getAllRestaurantsLimited(page))
        }
        inner()
    },[dispatch])
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
                <div>
                    <div className="flex justify-center space-x-4 mt-10 pb-10">

                    {

                     pages?.map((value, idx) =>{
                        return (<button
                            className="border rounded-full text-5 w-10 h-10 border-gray-300 focus:border-red-600 focus:border-2 "
                            onClick={() => fetchRestPage(idx)}
                            key={idx}>{idx+1}</button>)
                    })
                    }
                    </div>

                </div>
            </div>

        </div>
    )
}

export default NearestRestos;