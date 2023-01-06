

const Rating = ({rate, size}) =>{

    return (
        <>
        {
            size == "small" && (
                <span>
                    <span className={rate >= 1 ? "fa fa-star pr-1 text-sm text-red-500" : "fa fa-star pr-1 text-sm text-gray-200"}></span>
                    <span className={rate >= 2 ? "fa fa-star pr-1 text-sm text-red-500" : "fa fa-star pr-1 text-sm text-gray-200"}></span>
                    <span className={rate >= 3 ? "fa fa-star pr-1 text-sm text-red-500" : "fa fa-star pr-1 text-sm text-gray-200"}></span>
                    <span className={rate >= 4 ? "fa fa-star pr-1 text-sm text-red-500" : "fa fa-star pr-1 text-sm text-gray-200"}></span>
                    <span className={rate >= 5 ? "fa fa-star pr-1 text-sm text-red-500" : "fa fa-star pr-1 text-sm text-gray-200"}></span>
                </span>

            )
        }
          {
            size == "medium" && (
                <span>
                    <span className={rate >= 1 ? "fa fa-star pr-1 text-lg text-red-600" : "fa fa-star pr-1 text-lg text-gray-200"}></span>
                    <span className={rate >= 2 ? "fa fa-star pr-1 text-lg text-red-600" : "fa fa-star pr-1 text-lg text-gray-200"}></span>
                    <span className={rate >= 3 ? "fa fa-star pr-1 text-lg text-red-600" : "fa fa-star pr-1 text-lg text-gray-200"}></span>
                    <span className={rate >= 4 ? "fa fa-star pr-1 text-lg text-red-600" : "fa fa-star pr-1 text-lg text-gray-200"}></span>
                    <span className={rate >= 5 ? "fa fa-star pr-1 text-lg text-red-600" : "fa fa-star pr-1 text-lg text-gray-200"}></span>
                </span>

            )
        }
        </>
    )
}

export default Rating;