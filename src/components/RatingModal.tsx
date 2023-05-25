import Rating from './Rating';

type RatingModalProps = {
  rating: number,
  setRating: (rating: number) => void,
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  error: string,
};

const RatingModal = ({ rating, setRating, isOpen, onClose, onSubmit, error }: RatingModalProps) => {
  const handleSubmit = () => {
    onSubmit(rating);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className='modal-header'>Rate the Restaurant</h2>
        <Rating rating={rating} onChange={(newRating: number) => setRating(newRating)} />
        <div className='modal-buttons'>
            <button onClick={onClose} className='modal-button modal-close'>Cancel</button>
            {error && <p className="error-msg">{error}</p>}
            <button onClick={handleSubmit} className='modal-button modal-submit'>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
