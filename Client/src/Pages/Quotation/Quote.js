import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [motherboards, setMotherboards] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedMotherboard, setSelectedMotherboard] = useState('');

    useEffect(() => {
        // Fetch motherboards on mount
        axios.get(`http://localhost:3002/product/getProduct/getCategory`)
            .then(response => setMotherboards(response.data))
            .catch(error => console.error('Error fetching motherboards:', error));
    }, []);

    useEffect(() => {
        if (selectedMotherboard) {
            // Fetch brands when a motherboard is selected
            axios.get(`http://localhost:3000/brands/${selectedMotherboard}`)
                .then(response => setBrands(response.data))
                .catch(error => console.error('Error fetching brands:', error));
        } else {
            setBrands([]);
        }
    }, [selectedMotherboard]);

    return (
        <div className="App">
            <label htmlFor="motherboard">Motherboard:</label>
            <select
                id="motherboard"
                value={selectedMotherboard}
                onChange={(e) => setSelectedMotherboard(e.target.value)}
            >
                <option value="">Select Motherboard</option>
                {motherboards.map(motherboard => (
                    <option key={motherboard.name} value={motherboard.name}>
                        {motherboard.name}
                    </option>
                ))}
            </select>

            <label htmlFor="brand">Brand:</label>
            <select id="brand">
                <option value="">Select Brand</option>
                {brands.map(brand => (
                    <option key={brand} value={brand}>
                        {brand}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default App;
