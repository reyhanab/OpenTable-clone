import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRestaurants } from "../../store/restaurants";
import FindTableBar from "./FindTableBar";
import RestaurantPreview from "./RestaurantPreview";
import { loadAllReservations } from "../../store/reservations";
import { Link } from "react-router-dom";

const HomePage = ()=> {

    const dispatch = useDispatch();
    const restaurants = useSelector((state) => Object.values(state.restaurants))

    useEffect(()=> {
        async function inner(){
            const data = await dispatch(getAllRestaurants())
            dispatch(loadAllReservations(Object.keys(data.Restaurants)))
        }
        inner()
    },[dispatch])


    return (
        <div className="w-full max-w-screen-2xl m-auto bg-white h-full font-outfit">
            <div className="flex flex-col items-center justify-center h-60
                         text-white bg-gradient-to-r from-gdblue to-glblue">
                <h1 className="font-semibold text-5xl"
                >Find your table for any occasion</h1>
                <div className="flex space-x-5">
                    <FindTableBar tyep ="edit"/>
                    <Link to="/nearest">
                        <button className="bg-red-600 w-36 h-10 border
                                        border-red-600 rounded text-sm mt-7"
                        >Let's go</button>
                    </Link>
                </div>

            </div>
            <div className="max-w-7xl mx-auto mt-10"
            >
                <div className="flex pb-4 border-b items-center">
                    <p className="font-medium text-2xl"
                    >Available for dinner now</p>
                    <p className="ml-auto text-xs font-medium text-red-600"
                    >View all</p>
                </div>
                <div className="flex space-x-5 mt-5 m-auto mb-12 overflow-auto">
                    {restaurants?.slice(5).map((restaurant, idx) =>{
                        return <RestaurantPreview restaurant={restaurant} key={idx}/>
                    })
                    }
                </div>

                <div className="flex pb-4 border-b items-center">
                    <p className="font-medium text-2xl"
                    >Order takeout </p>
                    <p className="ml-auto text-xs font-medium text-red-600"
                    >View all</p>
                </div>
                <div className="flex space-x-5 mt-5 m-auto pb-20 overflow-auto">
                    {restaurants?.slice(10).map((restaurant, idx) =>{
                        return <RestaurantPreview restaurant={restaurant} takeout={true} key={idx}/>
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage;