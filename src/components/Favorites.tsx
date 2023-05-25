import DummyImg from '../assets/dummy.jpg';

type VisitedProps = {
    _id: string,
    name: string,
    description: string,
    rating: number,
    url: string
}

type Props = {
    visited: VisitedProps[] 
}

const Favorites = (props: Props) => {
    const { visited } = props;
    const placesWithHighestRating = visited ? visited.sort((a, b) => b.rating - a.rating).slice(0, 3) : [];
    return ( 
        <section className="section-2">
            <h2 className="section-heading">
                Meals We Love
            </h2>
            <div className="cards-container">
                {
                    placesWithHighestRating && placesWithHighestRating.map((places) => {
                        return (
                            <div key={places._id} className="card">
                                <img className="card-img" src={DummyImg} alt="" />
                                <h3 className="card-name">{places.name}</h3>
                                <button className="card-btn" onClick={() => window.open(places.url, '_blank', 'noopener,noreferrer')}>Visit Website</button>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}
 
export default Favorites;