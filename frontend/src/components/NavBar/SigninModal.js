import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../../store/session";


const SigninModal = ({onClose}) => {

    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailPl, setEmailPl] = useState("Email")
    const [passwordPl, setPasswordPl] = useState("Password")
    const [errors, setErrors] = useState([])

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data.errors) {
          setErrors(data.errors);
        }else{
            onClose()
        }
      };

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-8 w-[460px] h-[700px] bg-white p-8">
                <div className="flex mt-2">
                    <div>
                        <p
                        className="text-xl font-semibold"
                        >Sign In</p>
                        <span
                        className="text-sm text-gray-500"
                        >Enter the email associated with your OpenTable account.</span>
                    </div>
                    <svg
                    onClick={(e) => onClose()}
                    className="w-6 h-6 ml-auto cursor-pointer"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    focusable="false"><g fill="none"
                    fill-rule="evenodd"><path d="M11,11 L11,4.5 C11,4.22385763 11.2238576,4 11.5,4 L12.5,4 C12.7761424,4 13,4.22385763 13,4.5 L13,11 L19.5,11 C19.7761424,11 20,11.2238576 20,11.5 L20,12.5 C20,12.7761424 19.7761424,13 19.5,13 L13,13 L13,19.5 C13,19.7761424 12.7761424,20 12.5,20 L11.5,20 C11.2238576,20 11,19.7761424 11,19.5 L11,13 L4.5,13 C4.22385763,13 4,12.7761424 4,12.5 L4,11.5 C4,11.2238576 4.22385763,11 4.5,11 L11,11 Z" fill="#2D333F" fill-rule="nonzero" transform="translate(12.000000, 12.000000) rotate(45.000000) translate(-12.000000, -12.000000)"></path></g></svg>
                </div>
                <div className="flex flex-col space-y-10">
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
                    onChange={e => setPassword(e.target.value)}
                    >
                    </input>
                    <button
                    type="submit"
                    className="w-full h-12 bg-red-500 text-white rounded-md"
                    >
                    Sign In
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
            </div>

        </form>
    )
}

export default SigninModal;