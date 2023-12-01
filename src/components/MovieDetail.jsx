
import PropTypes from 'prop-types';


const MovieDetail = ({ onBack }) => {
  return (
    <div>
      <button onClick={onBack}>Volver</button>
      <h1>Hola</h1>
    </div>
  );
};

MovieDetail.propTypes = {
  onBack: PropTypes.func.isRequired,
};

export default MovieDetail;

