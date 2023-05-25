type RatingComponentProps = {
    rating: number;
    onChange: (rating: number) => void;
  };

const Rating = ({ rating, onChange }: RatingComponentProps) => {
  return (
    <div className="rating-component">
      <label>Provide your rating:</label>
      <input
        type="number"
        min="0"
        max="5"
        value={rating}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </div>
  );
};

export default Rating;