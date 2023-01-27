import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReview, editReview } from "../../store/reviews";
import { getRestDetails } from "../../store/restaurants";

const ReviewModal = ({preReview ={}, restaurant, onClose, type}) =>{

    const dispatch = useDispatch()
    const [review, setReview] = useState(type =="create"? '' : preReview?.review)
    const [rating, setRating] = useState(type =="create"? '' : preReview?.rating)
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {review, rating}
        let data;
        if (type == "create"){
            data = await dispatch(createReview(payload, restaurant?.id))
        }else{
            data = await dispatch(editReview(payload, preReview?.id))
        }
        if (data.errors){
            setError(data.errors);
        }else{
            dispatch(getRestDetails(restaurant?.id))
            setReview('')
            setRating('')
            onClose()
        }
    }

    return (
            <form
            className="flex flex-col space-y-4 w-[500px] h-[370px] p-8"
            onSubmit={handleSubmit}>
                <div className="flex">
                    <p className=" w-full pb-5 border-b text-2xl font-semibold"
                    >Leave a review </p>
                      <svg
                        onClick={e => onClose()}
                        className="w-6 h-6 cursor-pointer ml-auto"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        focusable="false"><g fill="none"
                        fill-rule="evenodd">
                        <path d="M11,11 L11,4.5 C11,4.22385763 11.2238576,
                        4 11.5,4 L12.5,4 C12.7761424,4 13,4.22385763 13,
                        4.5 L13,11 L19.5,11 C19.7761424,11 20,11.2238576 20,
                        11.5 L20,12.5 C20,12.7761424 19.7761424,13 19.5,13 L13,
                        13 L13,19.5 C13,19.7761424 12.7761424,20 12.5,20 L11.5,
                        20 C11.2238576,20 11,19.7761424 11,19.5 L11,13 L4.5,
                        13 C4.22385763,13 4,12.7761424 4,12.5 L4,11.5 C4,
                        11.2238576 4.22385763,11 4.5,11 L11,11 Z"
                        fill="#2D333F"
                        fill-rule="nonzero"
                        transform="translate(12.000000, 12.000000)
                        rotate(45.000000) translate(-12.000000, -12.000000)">
                        </path></g></svg>
                </div>
                <div className="mt-5">
                    <p>Review</p>
                    <textarea
                    className="w-full border rounded hover:border-black pl-1"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    />
                </div>
                <div>
                    <p>Rating</p>
                    <input
                    type="number"
                    min={0}
                    max={5}
                    step={0.1}
                    className="w-full border rounded hover:border-black pl-1"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    />
                </div>
                <div>
                    <button
                    className="w-full h-12 bg-red-500 text-white rounded-md"
                    type="submit"
                    >
                    Submit
                    </button>
                </div>
                {
                    error.length > 0 && (
                        <div className="text-red-500 text-center">
                            <p>{error}</p>
                        </div>
                    )
                    }
            </form>
    )
}

export default ReviewModal;