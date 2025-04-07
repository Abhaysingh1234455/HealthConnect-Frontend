import HospitalMap from "./HospitalMap";
import PropTypes from 'prop-types';

const Home = ({ setHospitals }) => {
  return (
    <>
      <h1>Nearby Hospitals</h1>
      <HospitalMap setHospitals={setHospitals} />
    </>
  );
};

Home.propTypes = {
  setHospitals: PropTypes.func.isRequired,
};

export default Home;
