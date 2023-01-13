import { useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../context/Modal"
import ImagesModal from "./ImagesModal";

const Images = () => {

    const images = useSelector(state => Object.values(state.images))
    const [imagesModal, setImagesModal] = useState(false)

    const toggleImageModal = () =>{
        setImagesModal(state => !state)
    }

    return (
        <div className="mt-5">
            <p className="pb-7 border-b text-2xl font-semibold"
            >{images.length} photos</p>
            <div className="flex mt-5 space-x-[2px] w-full">
                <div className="">
                    <img
                    className="w-[302px] h-[324px] rounded object-cover"
                    src={images[1]?.url}/>
                </div>
                <div className="w-[268px] h-[324px] flex flex-wrap justify-center items-center
                 space-x-[2px] relative">
                    <img className="w-[131px] h-[160px] rounded object-cover" src={images[2]?.url}/>
                    <img className="w-[131px] h-[160px] rounded object-cover" src={images[3]?.url}/>
                    <img className="w-[131px] h-[160px] rounded object-cover" src={images[4]?.url}/>
                    <img className="w-[131px] h-[160px] rounded object-cover brightness-50" src={images[5]?.url}/>

                    <p
                    onClick={toggleImageModal}
                    className="absolute top-[230px] right-[40px] text-white text-lg
                                  hover:cursor-pointer"
                    >+{images.length - 5} More </p>
                    {
                        imagesModal && (
                            <Modal onClose={toggleImageModal}>
                                <ImagesModal
                                onClose={toggleImageModal}
                                images={images}
                                 />

                            </Modal>
                        )
                    }

                </div>

            </div>

        </div>

    )
}
export default Images;