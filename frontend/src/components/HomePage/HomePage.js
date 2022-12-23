import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../../store/restaurants";
import FindTableBar from "./FindTableBar";
import RestaurantPreview from "./RestaurantPreview";

const HomePage = ()=> {

    const dispatch = useDispatch();
    const restaurants = useSelector((state) => Object.values(state.restaurants))

    useEffect(()=>{
        dispatch(getAllRestaurants())
    },[dispatch])

    return (
        <div className="w-full max-w-screen-xl m-auto">
            <div className="flex flex-col items-center justify-center h-52 text-white bg-gradient-to-r from-gdblue to-glblue">
                <h1 className="font-semibold text-4xl"
                >Find your table for any occasion</h1>
                <FindTableBar />
            </div>
            <div className="max-w-6xl mx-auto mt-10"
            >
                <div className="flex pb-4 border-b items-center">
                    <p className="font-medium text-xl "
                    >Available for dinner now</p>
                    <p className="ml-auto text-xs text-red-600"
                    >View all</p>
                </div>
                <div className="flex space-x-5 mt-4">
                    {restaurants?.slice(0,5).map((restaurant, idx) =>{
                        return <RestaurantPreview restaurant={restaurant} key={idx}/>
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage;