import { StarIcon as OutlineStar } from "@heroicons/react/24/outline";
import { StarIcon as SolidStar } from "@heroicons/react/24/solid";

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-1">

            {[...Array(5)].map((value, index) => (
                index < Math.floor(rating) ? (
                    <SolidStar key={index} className="w-4 h-4" />
                ) : (
                    <OutlineStar key={index} className="w-4 h-4" />
                )
            ))}
        </div>
    );
}

export default StarRating;