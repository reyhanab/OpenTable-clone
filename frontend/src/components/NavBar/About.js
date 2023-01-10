
const About = () =>{
    return (
        <div className="flex flex-col w-[750px] h-[300px] bg-white rounded-md
        m-auto mt-12 p-5 space-y-8">
            <div className="text-2xl font-medium border-b pb-5">
                About
            </div>
            <div className="flex items-center space-x-5">
                <img className="w-10 h-10"
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"/>
                <a
                className="text-xl"
                target="_blank"
                href="https://github.com/reyhanab">
                    Github
                </a>
            </div>
            <div className="flex items-center space-x-5">
                <img className="w-10 h-10"
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png"/>
                <a
                className="text-xl"
                target="_blank"
                href="https://www.linkedin.com/in/reyhaneh-abdollahi-408895110/">
                    LinkedIn
                </a>
            </div>

        </div>
    )
}

export default About;