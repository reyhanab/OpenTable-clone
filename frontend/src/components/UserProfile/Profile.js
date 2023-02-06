import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../store/session";

const Profile = () =>{

    const dispatch = useDispatch()
    const user = useSelector((state)=> state.session.user)
    const [firstName, setFirstName] = useState(user?.first_name)
    const [lastName, setLastName] = useState(user?.last_name)
    const [email, setEmail] = useState(user?.email)
    const [phoneNumber, setPhoneNumber] = useState(user?.phone_number != undefined ? user?.phone_number : "" )
    const [city, setCity] = useState(user?.city != "null"? user?.city : "")
    const [address, setAddress] = useState(user?.address != "null" ? user?.address : "")
    const [profilePicture, setProfilePicture] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const is_demo = user?.email == "demo@aa.io"

    const onSubmit = async (e) =>{
        e.preventDefault();
        setErrors([])
        const data = new FormData()
        data.append('first_name', firstName)
        data.append('last_name', lastName)
        data.append('email', email)
        data.append('phone_number', phoneNumber)
        data.append('city', city)
        data.append('address', address)
        data.append('profile_picture', profilePicture)

        const res = await dispatch(editProfile(data))

        if (res.ok) {
            // await res.json()
            setImageLoading(false)
        }else{

            setErrors(res.errors)
            setImageLoading(false)
        }
    }

    const updateImage = (e) =>{
        const file = e.target.files[0]
        setProfilePicture(file)
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col w-[750px] h-[950px] bg-white rounded-md
                            m-auto mt-12 p-5 space-y-6">
            <div className="text-2xl font-medium">
                About me
            </div>
            <div>
                <p>First name</p>
                <input
                data-bs-toggle={is_demo?"tooltip":""} title={is_demo?"Editing first name is not allowed!":""}
                    className="w-full h-12 border border-gray-300 rounded-md pl-3 mt-3
                        placeholder:text-gray-500 hover:border-1 hover:border-black
                        disabled:text-red-600 ease-in-out"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    disabled = {is_demo}
                    >
                </input>
            </div>
            <div>
                <p>Last name</p>
                <input
                    data-bs-toggle={is_demo?"tooltip":""} title={is_demo?"Editing last name is not allowed!":""}
                    className="w-full h-12 border border-gray-300 rounded-md pl-3 mt-3
                        placeholder:text-gray-500 hover:border-1 hover:border-black
                        disabled:text-red-600 ease-in-out"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    disabled = {is_demo}
                    >
                </input>
            </div>
            <div>
                <p>Email </p>
                <input
                    data-bs-toggle={is_demo?"tooltip":""} title={is_demo?"Editing email is not allowed!":""}
                    className="w-full h-12 border border-gray-300 rounded-md pl-3 mt-3
                        placeholder:text-gray-500 hover:border-1 hover:border-black
                        disabled:text-red-600 ease-in-out"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled = {is_demo}
                    >
                </input>
            </div>
            <div>
                <p>Phone number </p>
                <input
                    className="w-full h-12 border border-gray-300 rounded-md pl-3 mt-3
                        placeholder:text-gray-500 hover:border-1 hover:border-black"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    >
                </input>
            </div>
            <div>
                <p>City</p>
                <input
                    className="w-full h-12 border border-gray-300 rounded-md pl-3 mt-3
                        placeholder:text-gray-500 hover:border-1 hover:border-black"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    >
                </input>
            </div>
            <div>
                <p>Address</p>
                <input
                    className="w-full h-12 border border-gray-300 rounded-md pl-3 mt-3
                        placeholder:text-gray-500 hover:border-1 hover:border-black"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    >
                </input>
            </div>
            <div
            className="flex flex-row items-center"
            >
                <p className="pr-4">
                    Profile picture
                </p>
                <input
                type="file"
                accept="image/*"
                onChange={updateImage}
                >

                </input>
                {
                user?.profile_picture && (
                <img
                className='w-8 h-8 border rounded-full'
                src={user?.profile_picture}
                />
                )
                }
                {(imageLoading) && <p>Loading ...</p>}

            </div>
            <button
                    type="submit"
                    className="w-full h-12 bg-red-500 text-white rounded-md"
                    >
                    Save Changes
            </button>
            {
                errors.length > 0 && (
                    <div className="text-red-500 text-center">
                        <ul>
                            {errors.map((value, key) =>{
                            return   <li key={key}>{value}</li>
                            })}
                        </ul>
                    </div>
                )
            }
            </div>
        </form>
    )
}

export default Profile;