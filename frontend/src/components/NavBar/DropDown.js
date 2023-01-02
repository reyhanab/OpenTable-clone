import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

const DropDown = ({user, setDropDown}) =>{

    return(
        <div className="w-72 h-72 p-5 space-y-6 z-1 mt-10
        inline-block absolute bg-white border border-gray-300 rounded">
            <div
            className="relative font-semibold border-b pb-4"
            >Hello, {user?.first_name}!</div>
            <div
            className="text-gray-700"
            >
                <NavLink
                onClick={()=> setDropDown(state => !state)}
                to='/users/profile'
                exact={true}
                activeClassName='active'>
                My Profile

                </NavLink>
            </div>
            <div
            className="text-gray-700"
            >
                <NavLink
                onClick={()=> setDropDown(state => !state)}
                to='/users/reservations'
                exact={true}
                activeClassName='active'
                >My Reservations
                </NavLink>
            </div>
            <div
            className="text-gray-700"
            >
                <NavLink
                onClick={()=> setDropDown(state => !state)}
                to='/users/saved'
                exact={true}
                activeClassName='active'
                >My Saved Restaurants
                </NavLink>
            </div>
            <LogoutButton setDropDown={setDropDown} />
        </div>
    )
}

export default DropDown;