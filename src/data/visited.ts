import WasabiLogo from '../assets/Wasabi_logo.png'
import PFChangs from '../assets/PFChangs.jpg'
import StreetPizza from '../assets/14Street_logo.jpg'
import CheeseFactor from '../assets/CheeseFactor_logo.png'
import Cheesious from '../assets/Cheesious_logo.jpg'
import LaMexicana from '../assets/LaMexicanan_logo.png'


type VisitedProps = {
    name: string,
    description: string,
    img: string,
    rating: number,
    url: string
}

const visited: VisitedProps[] = [
    {
        name: "Wasabi",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error, velit itaque distinctio numquam nobis.",
        img: WasabiLogo,
        rating: 9.0,
        url: "https://www.instagram.com/wasabipakistan/?hl=en"
    },
    {
        name: "P.F. Chang's",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error, velit itaque distinctio numquam nobis.",
        img: PFChangs,
        rating: 4.0,
        url: "https://www.pfchangspk.com/"
    },
    {
        name: "14th Street Pizza",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error, velit itaque distinctio numquam nobis.",
        img: StreetPizza,
        rating: 7.0,
        url: "https://www.14thstreetpizza.com/"
    },
    {
        name: "The Cheese Factor",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error, velit itaque distinctio numquam nobis.",
        img: CheeseFactor,
        rating: 7.0,
        url: "https://thecheesefactor.com/"
    },
    {
        name: "Cheesious",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error, velit itaque distinctio numquam nobis.",
        img: Cheesious,
        rating: 6.0,
        url: "https://www.cheezious.com/"
    },
    {
        name: "La Mexicana Kitchen",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque error, velit itaque distinctio numquam nobis.",
        img: LaMexicana,
        rating: 2.0,
        url: "https://www.instagram.com/lamexicanakitchendha/?hl=en"
    },
]

export default visited