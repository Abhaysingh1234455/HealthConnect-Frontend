import { useState } from 'react';
import { getSpecialists } from '../services/api';

const Search = () => {
    const [disease, setDisease] = useState('');
    const [specialists, setSpecialists] = useState([]);

    const handleSearch = async () => {
        const data = await getSpecialists(disease);
        setSpecialists(data);
    };

    return (
        <div>
            <input type="text" value={disease} onChange={(e) => setDisease(e.target.value)} placeholder="Enter disease" />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {specialists.map((spec, index) => (
                    <li key={index}>{spec.name} - {spec.location}</li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
