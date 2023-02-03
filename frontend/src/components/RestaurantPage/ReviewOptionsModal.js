import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "../../context/Modal"
import { deleteReviewThunk } from "../../store/reviews"
import ReviewModal from "./ReviewModal"
import { getRestDetails } from "../../store/restaurants"


const ReviewOptionsModal = ({review, onClose})=>{

    const dispatch = useDispatch()
    const [showReviewModal, setShowReviewModal] = useState(false)
    const restaurant = useSelector(state => state.restaurants[review?.restaurant_id])

    const handleDelete = async (e)=>{
        e.preventDefault()
        await dispatch(deleteReviewThunk(review?.id))
        dispatch(getRestDetails(restaurant?.id))
        onClose()
    }

    const handleEdit = () =>{
        setShowReviewModal((state)=> !state)
    }

    return(
        <div className="w-[500px] h-[150px] flex flex-col
                        items-center text-black">
            <div
            onClick={handleDelete}
            className="w-full text-center border-b h-[50px] pt-3
                     hover:text-red-600 hover:cursor-pointer">
                Delete review
            </div>
            <div
            onClick={handleEdit}
            className="w-full text-center border-b  h-[50px] pt-3
                      hover:text-red-600 hover:cursor-pointer">
                Edit review
            </div>
            <div
            onClick={() => onClose()}
            className="h-[50px] pt-3 hover:text-red-600
                            hover:cursor-pointer">
                Cancel
            </div>
            {showReviewModal && (
                <Modal onClose={handleEdit}>
                    <ReviewModal
                    onClose={handleEdit}
                    restaurant = {restaurant}
                    type="edit"
                    preReview={review}
                    />

                </Modal>
            )}
        </div>
    )
}
export default ReviewOptionsModal;