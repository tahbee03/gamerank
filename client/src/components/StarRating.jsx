import { Rating } from 'react-simple-star-rating';

function StarRating({ rank, setRank }) {

  // Catch Rating value
  const handleRating = (rate) => {
    console.log("Stars clicked!");
    setRank(rate);

    // other logic
  };

  // Optional callback functions
  const onPointerEnter = () => console.log('Enter');
  const onPointerLeave = () => console.log('Leave');
  const onPointerMove = (value, index) => console.log(value, index);

  return (
    <div>
      <Rating
        onClick={handleRating}
        /* Available Props */
        allowFraction={true}
        transtion={true}
      />
      <p>{rank}</p>
      <button onClick={() => setRating(0)}>Clear</button>
    </div>
  );
}

export default StarRating;