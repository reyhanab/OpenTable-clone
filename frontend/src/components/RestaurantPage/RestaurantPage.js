import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Rating from "../HomePage/Rating";
import { getAllRestaurants } from "../../store/restaurants";
import Reservation from "./Reservation";
import { loadAllReservations } from "../../store/reservations";
import { loadReviews } from "../../store/reviews";
import { Modal } from "../../context/Modal"
import ReviewModal from "./ReviewModal";
import Review from "./Review";
import { loadImages } from "../../store/images";
import Images from "./Images";
// import { getUrl } from "../../store/googleApi";


const RestaurantPage = () =>{

    const dispatch = useDispatch()
    const {restaurantId} = useParams()
    const showMore = useRef(null)
    const reservationDiv = useRef(null)
    const [readMore, setReadMore] = useState(true)
    const [reviewModal, setReviewModal] = useState(false)
    const [reviewOptionsModal, setReviewOptionsModal] = useState({})
    const user = useSelector(state => state.session.user)
    const restaurant = useSelector((state => state.restaurants[restaurantId]))
    const reviews = useSelector(state => Object.values(state.reviews))
    const userReview = reviews.filter(review => (review?.user_id == user?.id &&
                                                review?.restaurant_id == restaurant?.id ))
    const API_KEY = process.env.REACT_APP_API_KEY;

    const splittedName = restaurant?.name.split(" ").join("+")

    useEffect(()=> {
        async function inner(){
            const data = await dispatch(getAllRestaurants())
            await dispatch(loadAllReservations(Object.keys(data.Restaurants)))
        }
        if(!restaurant) inner()
        else {
            dispatch(loadReviews(restaurant?.id))
            dispatch(loadImages(restaurant?.id))
        }
    },[dispatch, restaurant?.id])


    const handleShowMore = () =>{
        if(readMore){
            showMore.current.classList.remove("line-clamp-3")
        }else{
            showMore.current.classList.add("line-clamp-3")
        }
        setReadMore(state => !state)
    }

    const toggleReviewModal = () =>{
        setReviewModal((state) => !state)
    }

    const toggleReviewOptionsModal = (idx) => () => {
        setReviewOptionsModal((state) => ({
          ...state,
          [idx]: !state[idx],
        }));
      };

      useEffect(() => {
        reviews?.forEach((_, idx) => {
          setReviewOptionsModal((state) => ({
            ...state,
            [idx]: false,
          }));
        });
      }, []);


    return (
        <div className="flex flex-col w-full max-w-screen-2xl m-auto bg-white h-full
                        justify-center font-outfit">
            <div className="flex relative">
                <img className="w-full h-[460px] object-cover"
                src={restaurant?.preview_image}/>


                <div className="w-[640px] bg-white absolute z-2
                                top-[410px] left-auto right-[630px] rounded-t p-8">
                    <p className="text-5xl font-semibold border-b border-gray-200 pb-10 text-black"
                    >{restaurant?.name} - {restaurant?.city}</p>
                    <div className="flex space-x-5 mt-5 mb-8">
                        <Rating rate={restaurant?.rating} size="medium"/>
                        <p>{restaurant?.rating}</p>
                        <p className="text-mg pl-2 flex space-x-2"
                        >
                            <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            focusable="false"><g fill="none"
                            fill-rule="evenodd">
                            <path d="M19,4 L5,4 C3.8954305,4 3,4.8954305 3,6 L3,15 C3,16.1045695 3.8954305,17 5,17 L11,17 L15.36,20.63 C15.6583354,20.8784924 16.0735425,20.9318337 16.4250008,20.7668198 C16.776459,20.6018059 17.0006314,20.2482681 17,19.86 L17,17 L19,17 C20.1045695,17 21,16.1045695 21,15 L21,6 C21,4.8954305 20.1045695,4 19,4 Z M19,15 L15,15 L15,17.73 L11.72,15 L5,15 L5,6 L19,6 L19,15 Z" fill="#2D333F" fill-rule="nonzero"></path></g></svg>
                            <p>{reviews.length} Reviews</p>
                            </p>
                        <p className="text-mg pl-2 flex space-x-2">
                            <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            focusable="false"><g fill="none"
                            fill-rule="evenodd">
                            <path d="M11,2 C12.1045695,2 13,2.8954305 13,4 L13,11 C13,12.1045695 12.1045695,13 11,13 L10,13 L10,21 C10,21.5522847 9.55228475,22 9,22 L8,22 C7.44771525,22 7,21.5522847 7,21 L7,13 L6,13 C4.8954305,13 4,12.1045695 4,11 L4,4 C4,2.8954305 4.8954305,2 6,2 L11,2 Z M11,11 L11,4 L10,4 L10,8.5 C10,8.77614237 9.77614237,9 9.5,9 C9.22385763,9 9,8.77614237 9,8.5 L9,4 L8,4 L8,8.5 C8,8.77614237 7.77614237,9 7.5,9 C7.22385763,9 7,8.77614237 7,8.5 L7,4 L6,4 L6,11 L11,11 Z M19.45,2 C19.7537566,2 20,2.24624339 20,2.55 L20,21 C20,21.5522847 19.5522847,22 19,22 L18,22 C17.4477153,22 17,21.5522847 17,21 L17,17 L16,17 C14.8954305,17 14,16.1045695 14,15 L14,7.45 C14,4.44004811 16.4400481,2 19.45,2 Z M16,15 L18,15 L18,4.32 C16.7823465,4.88673047 16.0026709,6.10692278 16,7.45 L16,15 Z" fill="#2D333F" fill-rule="nonzero"></path></g></svg>
                            <p>{restaurant?.type}</p>
                        </p>
                    </div>
                    <div
                    ref={showMore}
                    className="text-md text-gray-600 font-thin line-clamp-3">
                        {restaurant?.description}
                    </div>
                    <button
                    onClick={handleShowMore}
                    className="text-red-400"
                    >{readMore ?"+ Read more" : "- Read less"}</button>
                    <div>
                        <Images />
                    </div>
                    <div className="mt-16">
                        {reviews.length == 1 &&
                            <p className="pb-5 border-b text-2xl font-semibold"
                        >What {reviews.length} person is saying</p>}
                        {reviews.length > 1 &&
                            <p className="pb-5 border-b text-2xl font-semibold"
                        >What {reviews.length} people are saying</p>}
                        <div>
                            {reviews.map((review, i)=>{
                                return <Review
                                review={review}
                                key={i}
                                toggleReviewOptionsModal={toggleReviewOptionsModal}
                                reviewOptionsModal ={reviewOptionsModal}
                                />
                            })
                            }
                        </div>
                        <div>
                            <div className="mt-8 flex justify-center">
                                <button
                                disabled={userReview.length > 0 ? true : false}
                                className="w-full h-[48px] border bg-red-600 text-white rounded"
                                onClick={toggleReviewModal}
                                >
                                {userReview.length > 0 ? "You have already reviewed this restaurant":"Leave a review"}
                                </button>
                            </div>
                            {reviewModal && (
                                <Modal onClose={toggleReviewModal}>
                                    <ReviewModal
                                    restaurant={restaurant}
                                    onClose={toggleReviewModal}
                                    type="create"
                                    />
                                </Modal>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col absolute left-auto right-[280px]
                                    top-[410px] space-y-10">
                        <div
                        ref = {reservationDiv}
                        className="w-[320px] h-[330px] z-2 bg-white rounded-t">
                            <Reservation
                            reservationRef = {reservationDiv}
                            restaurant = {restaurant}
                            />
                        </div>
                        <div
                        className="w-[320px] h-[320px] z-2 bg-white
                        rounded-t border flex flex-col items-center justify-center">
                            <a href=
                            {`https://www.google.com/maps/place/?q=${splittedName}/?q=${restaurant?.lat},${restaurant?.lng}`}
                             target="_blank">
                                <img
                                src={`https://maps.googleapis.com/maps/api/staticmap?center=
                                ${restaurant?.lat},${restaurant?.lng}&zoom=17&size=300x300&markers=color:
                                red%7Clabel:%7C${restaurant?.lat},${restaurant?.lng}&key=${API_KEY}`}
                                />
                            </a>


    {/* https://maps.googleapis.com/maps/api/staticmap?center=Berkeley,CA&zoom=14&size=400x400&key=YOUR_API_KEY&signature=YOUR_SIGNATURE */}
    {/* https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&format=png&&zoom=14&size=400x400&key=YOUR_API_KEY&signature=YOUR_SIGNATURE */}
    {/* https://maps.googleapis.com/maps/api/staticmap?center=Williamsburg,Brooklyn,NY&zoom=13&size=400x400&
    markers=color:blue%7Clabel:S%7C11211%7C11206%7C11222&key=YOUR_API_KEY&signature=YOUR_SIGNATURE */}
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )


}

export default RestaurantPage;