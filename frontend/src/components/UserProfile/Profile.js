import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../../store/session";

const Profile = () =>{

    const dispatch = useDispatch()
    const user = useSelector((state)=> state.session.user)
    const [firstName, setFirstName] = useState(user?.first_name)
    const [lastName, setLastName] = useState(user?.last_name)
    const [email, setEmail] = useState(user?.email)
    const [phoneNumber, setPhoneNumber] = useState(user?.phone_number)
    const [city, setCity] = useState(user?.city)
    const [address, setAddress] = useState(user?.address)
    const [profilePicture, setProfilePicture] = useState(null)
    const [imageLoading, setImageLoading] = useState(false)

    const onSubmit = async (e) =>{
        e.preventDefault();

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
            await res.json()
            setImageLoading(false)
        }else{
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
                            m-auto mt-12 p-5 space-y-8">
            <div className="text-2xl font-medium">
                About me
            </div>
            <div>
                <p>First name</p>
                <input
                    className="w-full h-12 border border-gray-300 rounded-md pl-3 mt-3
                        placeholder:text-gray-500 hover:border-1 hover:border-black"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    >
                </input>
            </div>
            <div>
                <p>Last name</p>
                <input
                    className="w-full h-12 border border-gray-300 rounded-md pl-3 mt-3
                        placeholder:text-gray-500 hover:border-1 hover:border-black"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    >
                </input>
            </div>
            <div>
                <p>Email </p>
                <input
                    className="w-full h-12 border border-gray-300 rounded-md pl-3 mt-3
                        placeholder:text-gray-500 hover:border-1 hover:border-black"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
            <div>
                Profile picture
                <input
                type="file"
                accept="image/*"
                onChange={updateImage}
                >
                </input>
                {(imageLoading) && <p>Loading ...</p>}
            </div>
            <button
                    type="submit"
                    className="w-full h-12 bg-red-500 text-white rounded-md"
                    >
                    Save Changes
                </button>
            </div>
        </form>
    )
}

export default Profile;