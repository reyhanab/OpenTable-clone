import { useSelector } from "react-redux";
import ReservationComponent from "./ReservationComponent";

const UserReservations = () =>{

    const user = useSelector((state => state.session.user))
    const allReservations = useSelector(state => Object.values(state.reservations))
    const userReservations = allReservations.filter(res => (res.user_id == user?.id) && (new Date(res.date) > Date.now()))

    return (

        <div>
            <div className="flex w-full max-w-screen-2xl items-center h-20
                            bg-white m-auto border-b">
                <p className="text-2xl font-semibold text-black ml-10"
                >{user.first_name} {user.last_name} Reservations</p>

            </div>
            <div className="flex flex-col w-[750px] h-[950px] bg-white rounded-md
                            m-auto mt-12 p-5 space-y-8">
                <p className="text-xl font-semibold text-black"
                >Upcoming reservations</p>
                <div className="flex justify-center">
                    {userReservations.map((reservation, i)=>{
                        return (<ReservationComponent key={i} reservation={reservation}/>)
                    })

                    }
                </div>
            </div>
        </div>
    )
}
export default UserReservations;