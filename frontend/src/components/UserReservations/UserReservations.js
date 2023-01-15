import { useDispatch, useSelector } from "react-redux";
import ReservationComponent from "./ReservationComponent";
import { useState, useEffect } from "react";
import { getAllRestaurants } from "../../store/restaurants";
import { loadAllReservations } from "../../store/reservations";

const UserReservations = () =>{

    const dispatch = useDispatch()
    const user = useSelector((state => state.session.user))
    const allReservations = useSelector(state => Object.values(state.reservations))
    const userReservations = allReservations.filter(res =>
        {
            console.log((res?.date), "res.date")
            console.log(new Date(res?.date), " new Date (res.date)")

            let reservationDate = new Date((res?.date).replace("00:00:00", res?.time))
            reservationDate = new Date(reservationDate.getTime() + (reservationDate.getTimezoneOffset() * 60000))
            let currentDate = new Date(Date.now())
            console.log("current time", currentDate)
            console.log("reservation time", reservationDate)
            return (res.user_id == user?.id) && (reservationDate >= currentDate)
        })

    const [optionsModal, setOptionsModal] = useState({})

    useEffect(()=> {
        async function inner(){
            const data = await dispatch(getAllRestaurants())
            dispatch(loadAllReservations(Object.keys(data.Restaurants)))
        }
        inner()
    },[dispatch])

    const toggleOptionsModal = (idx) => () => {
        setOptionsModal((state) => ({
          ...state,
          [idx]: !state[idx],
        }));
      };

      useEffect(() => {
        userReservations?.forEach((_, idx) => {
          setOptionsModal((state) => ({
            ...state,
            [idx]: false,
          }));
        });
      }, []);

    return (

        <div>
            <div className="flex w-full max-w-screen-2xl items-center h-20
                            bg-white m-auto border-b">
                <p className="text-2xl font-semibold text-black ml-10"
                >{user?.first_name} {user?.last_name} Reservations</p>

            </div>
            <div className="flex flex-col w-[750px] bg-white rounded-md
                            m-auto mt-12 p-5 space-y-8">
                <p className="text-xl font-semibold text-black"
                >Upcoming reservations</p>
                <div className="flex flex-col place-items-center">
                    {userReservations.map((reservation, i)=>{
                        console.log(reservation, "reservation in map")
                        return (<ReservationComponent
                                key={i}
                                reservation={reservation}
                                toggleOptionsModal={toggleOptionsModal}
                                optionsModal={optionsModal}
                                />)
                    })
                    }
                </div>
            </div>
        </div>
    )
}
export default UserReservations;