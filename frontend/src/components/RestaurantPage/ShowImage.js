
const ShowImage = ({image}) =>{

    return (
        <div>
            <img
            className="w-[800px] h-[600px] object-cover rounded-md select-none"
            src={image?.url}/>

        </div>
    )
}

export default ShowImage;