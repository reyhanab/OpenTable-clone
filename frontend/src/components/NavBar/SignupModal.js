import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";


const SignupModal = ({onClose}) => {

    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState([])
    const [firstNamePl, setFirstNamePl] = useState("First name")
    const [lastNamePl, setLastNamePl] = useState("Last name")
    const [emailPl, setEmailPl] = useState("Email")
    const [passwordPl, setPasswordPl] = useState("Password")
    const [confirmPasswordPl, setConfirmPasswordPl] = useState("Confirm password")
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordC, setShowPasswordC] = useState(false);

    const onSubmit = async (e) => {
        setErrors([])
        e.preventDefault()
        if (password === confirmPassword){
            const data = await dispatch(signUp(firstName ,lastName, email, password))
            console.log(data.errors)
            if (data.errors){
                setErrors(data.errors)
            }
            else{
                onClose()
            }
        }else{
            setErrors(['Confirm Password field must be the same as the Password field']);
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-3 w-[460px] h-[700px] bg-white p-8">
                <div className="flex mt-2">
                    <div>
                        <p
                        className="text-xl font-semibold"
                        >Sign Up</p>
                        <span
                        className="text-sm text-gray-500"
                        >Enter some information about yourself.</span>
                    </div>
                    <svg
                    onClick={e => onClose()}
                    className="w-6 h-6 ml-auto cursor-pointer"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    focusable="false"><g fill="none"
                    fill-rule="evenodd"><path d="M11,11 L11,4.5 C11,4.22385763 11.2238576,4 11.5,4 L12.5,4 C12.7761424,4 13,4.22385763 13,4.5 L13,11 L19.5,11 C19.7761424,11 20,11.2238576 20,11.5 L20,12.5 C20,12.7761424 19.7761424,13 19.5,13 L13,13 L13,19.5 C13,19.7761424 12.7761424,20 12.5,20 L11.5,20 C11.2238576,20 11,19.7761424 11,19.5 L11,13 L4.5,13 C4.22385763,13 4,12.7761424 4,12.5 L4,11.5 C4,11.2238576 4.22385763,11 4.5,11 L11,11 Z" fill="#2D333F" fill-rule="nonzero" transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000)"></path></g></svg>
                </div>
                <div className="flex flex-col space-y-8">
                    <input
                    className="w-full h-12 border border-gray-300 rounded-md
                     placeholder:text-gray-500 hover:border-1 hover:border-black pl-3"
                    placeholder={firstNamePl}
                    onClick={e => setFirstNamePl("")}
                    onBlur={e => setFirstNamePl("First name")}
                    value={firstName}
                    type="text"
                    onChange={e => setFirstName(e.target.value)}
                    >
                    </input>
                    <input
                    className="w-full h-12 border border-gray-300 rounded-md pl-3
                     placeholder:text-gray-500 hover:border-1 hover:border-black"
                    placeholder={lastNamePl}
                    value={lastName}
                    onClick={e => setLastNamePl("")}
                    onBlur={e => setLastNamePl("Last name")}
                    onChange={e => setLastName(e.target.value)}
                    >
                    </input>
                    <input
                    className="w-full h-12 border border-gray-300 rounded-md pl-3
                     placeholder:text-gray-500 hover:border-1 hover:border-black"
                    placeholder={emailPl}
                    onClick={e => setEmailPl("")}
                    onBlur={e => setEmailPl("Email")}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    >
                    </input>
                    <input
                    className="w-full h-12 border border-gray-300 rounded-md pl-3
                     placeholder:text-gray-500 hover:border-1 hover:border-black"
                    placeholder={passwordPl}
                    onClick={e => setPasswordPl("")}
                    onBlur={e => setPasswordPl("Password")}
                    value={password}
                    type={showPassword ? "text" : "password"}
                    onChange={e => setPassword(e.target.value)}
                    />
                    <span
                    className="absolute top-[325px] right-[45px] text-[14px]"
                    onClick={()=> setShowPassword(state => !state)}
                    >
                    {showPassword ?
                    <img src="https://img.icons8.com/material-outlined/24/null/hide.png"/>
                    :
                    <img src="https://img.icons8.com/material-outlined/24/null/visible--v1.png"/>
                    }
                    </span>

                    <input
                    className="w-full h-12 border border-gray-300 rounded-md pl-3
                     placeholder:text-gray-500 hover:border-1 hover:border-black"
                    placeholder={confirmPasswordPl}
                    onClick={e => setConfirmPasswordPl("")}
                    onBlur={e => setConfirmPasswordPl("Confirm password")}
                    value={confirmPassword}
                    type={showPasswordC ? "text" : "password"}
                    onChange={e => setConfirmPassword(e.target.value)}
                    />
                    <span
                    className="absolute top-[405px] right-[45px] text-[14px]"
                    onClick={()=> setShowPasswordC(state => !state)}
                    >
                    {showPasswordC ?
                     <img src="https://img.icons8.com/material-outlined/24/null/hide.png"/>
                    :
                    <img src="https://img.icons8.com/material-outlined/24/null/visible--v1.png"/>
                     }
                    </span>
                    <button
                    type="submit"
                    className="w-full h-12 bg-red-500 text-white rounded-md"
                    >
                        Create an account
                    </button>
                </div>
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

export default SignupModal;