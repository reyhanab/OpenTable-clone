
const Footer = () =>{
    return (
        <div className="flex space-x-64">
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
                <p className="pt-5">
                    Technology used in this project
                </p>
                <div className="flex flex-wrap justify-between">

                    <i class="devicon-javascript-plain colored"></i>
                    <i class="devicon-react-original-wordmark colored"></i>
                    <i class="devicon-redux-plain colored"></i>
                    <i class="devicon-python-plain-wordmark colored"></i>
                    <i class="devicon-postgresql-plain-wordmark colored"></i>
                    <i class="devicon-sequelize-plain-wordmark" style="color: rgb(72, 74, 76);"></i>
                    <i class="devicon-express-original-wordmark" style="color: rgb(72, 74, 76);"></i>
                    <i class="devicon-nodejs-plain colored"></i>
                    <i class="devicon-amazonwebservices-original" style="color: rgb(72, 74, 76);"></i>
                    <i class="devicon-sqlalchemy-plain" style="color: rgb(72, 74, 76);"></i>
                    <i class="devicon-flask-original-wordmark" style="color: rgb(72, 74, 76);"></i>
                    <i class="devicon-html5-plain-wordmark colored"></i>
                    <i class="devicon-css3-plain-wordmark colored"></i>
                    <i class="devicon-heroku-plain-wordmark colored"></i>
                    <i class="devicon-git-plain-wordmark colored"></i>
                    <i class="devicon-docker-plain-wordmark colored"></i>

                </div>
            </div>
            </div>
        </div>

    )
}

export default Footer;