
const Footer = () =>{
    return (
        <div className="flex justify-between text-lg">
            <div>
                <p>
                    Contact Me
                </p>
                <ul class="text-icons pt-5">
                    <li><a href="https://www.linkedin.com/in/reyhaneh-abdollahi-408895110/" target="_blank">
                        <i class="fa fa-linkedin-square w-8 h-8" aria-hidden="true"></i>
                        <span class="label">LinkedIn</span></a></li>
                    <li><a href="https://github.com/reyhanab" target="_blank">
                        <i class="fa fa-github w-8 h-8" aria-hidden="true"></i>
                        <span class="label">Github</span></a></li>
                    <li><a href="mailto: Reyhaneh.Abdollahi2@gmail.com">
                    <i class="fa fa-envelope-o w-8 h-8" aria-hidden="true"></i>
                        <span class="label">Email</span></a></li>
                </ul>
            </div>
            <div>
                <p>
                    Checkout my work!
                </p>
                <ul class="text-icons pt-5">
                    <li><a href="https://instagram-clone-6n2p.onrender.com/" target="_blank">
                    <i class="fa fa-instagram w-8 h-8" aria-hidden="true"></i>
                        <span class="label">Instantgram</span></a></li>
                    <li><a href="https://meetup-fba7.onrender.com/" target="_blank">
                    <i class="fa fa-meetup w-8 h-8" aria-hidden="true"></i>
                        <span class="label">MeetUp</span></a></li>
                </ul>
            </div>
            <div>
                <i class="fa fa-copyright" aria-hidden="true"></i><span className="pl-4">RA</span>
                <div>
                    <p className="pt-5 pb-5">
                        Technology used in this project
                    </p>
                    <div className="flex flex-wrap justify-between">
                        <i class="fa-brands fa-square-js"></i>
                        <i class="fa-brands fa-python"></i>
                        <i class="fa-brands fa-react"></i>
                        <i class="fa-brands fa-html5"></i>
                        <i class="fa-brands fa-css3-alt"></i>




                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer;