import { useState } from 'react';
import HospitalMap from './HospitalMap';
import Appointments from './Appointments';

const BookingPage = () => {
  const [hospitals, setHospitals] = useState([]);

  return (
    <div>
      <HospitalMap setHospitals={setHospitals} hospitals={hospitals} />
      <Appointments hospitals={hospitals} />
    </div>
  );
};

export default BookingPage;