import { FaStar, FaStarHalf, FaStarHalfAlt, FaRegStar} from 'react-icons/fa'
import { IconType } from 'react-icons'

export default function Rating({rating = 0,}: {rating: number | undefined | void}){
    const defaultRating: boolean[] = [false, false, false, false, false]

    const initRating: number = rating

    const ratings: React.JSX.Element[] = []

    for(let i: number = 0; i < 5; i++){
        rating >= 1 ?  ratings.push(<Star filled={true}/>) : ratings.push(rating >= 0.5 ? <HalfStar/> : <Star filled={false}/>)
        rating -= 1;
    }



    return(
        <div className="flex gap-1 items-center shrink-0 text-white/60">
            {ratings} - {initRating}
        </div>
    )
}

function Star({filled = false,}: {filled: boolean}){
    return filled ? <FaStar className="fill-amber-400"/> : <FaRegStar/>
}

function HalfStar(){
    return <FaStarHalfAlt className="fill-amber-400"/>
}