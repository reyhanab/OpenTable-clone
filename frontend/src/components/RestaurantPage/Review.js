import { useSelector } from "react-redux";
import Rating from "../HomePage/Rating";
import ReviewOptionsModal from "./ReviewOptionsModal";
import { Modal } from '../../context/Modal'

const Review = ({review, toggleReviewOptionsModal, reviewOptionsModal}) =>{

    // const user = useSelector(state => state.users[review?.user_id])

    return (
        <div className="flex mt-5 space-x-8 border-b pb-5">
            <div className="flex flex-col place-items-center">
                <img
                className="w-16 h-16 rounded-full"
                src={(review?.user_pp) ? review?.user_pp : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-default-avatar-profile-icon-vector-social-media-user-image-vector-illustration-227787227.jpg"}/>
                <p>{review?.user_name}</p>
            </div>
            <div className="flex flex-col pt-2 w-[450px]">
                <Rating rate={review?.rating} size="medium" />
                <p className="text-black font-extralight"
                >{review?.review}</p>
            </div>
            <div
            onClick={toggleReviewOptionsModal(review?.id)}
            className="ml-auto ">
                <svg
                aria-label="More options"
                className="_ab6-"
                color="#262626"
                fill="#262626"
                height="20"
                role="img"
                viewBox="0 0 24 18"
                width="20"
                >
                <circle cx="12" cy="12" r="1.5"></circle>
                <circle cx="6" cy="12" r="1.5"></circle>
                <circle cx="18" cy="12" r="1.5"></circle>
                </svg>
            </div>
            {
                reviewOptionsModal[review?.id] && (
                    <Modal onClose={toggleReviewOptionsModal(review?.id)}>
                        <ReviewOptionsModal
                        onClose={toggleReviewOptionsModal(review?.id)}
                        review = {review}
                         />

                    </Modal>
                )
            }
        </div>
    )
}

export default Review;