import React, { useState } from 'react';

function CascadingDropdown() {
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [capacity, setCapacity] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    // Define options for each category
    const optionsByCategory = {
        motherboard: [],
        'hard-disk': ['WD', 'Seagate']
    };

    // Define options for each brand
    const brandsByCategory = {
        WD: ['WD 1TB', 'WD 2TB'],
        Seagate: ['Seagate 1TB', 'Seagate 2TB']
    };

    // Handle category change
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        setBrand('');
        setCapacity('');
    };

    // Handle brand change
    const handleBrandChange = (event) => {
        const selectedBrand = event.target.value;
        setBrand(selectedBrand);
        setCapacity('');
    };

    // Handle capacity change
    const handleCapacityChange = (event) => {
        const selectedCapacity = event.target.value;
        setCapacity(selectedCapacity);
        setSelectedOptions([
            ...selectedOptions,
            { category, brand, capacity: selectedCapacity }
        ]);
    };

    return (
        <div>
            <label>Category:</label>
            <select value={category} onChange={handleCategoryChange}>
                <option value="">Select Category</option>
                <option value="motherboard">Motherboard</option>
                <option value="hard-disk">Hard Disk</option>
            </select>

            {category && (
                <>
                    <label>Brand:</label>
                    <select value={brand} onChange={handleBrandChange}>
                        <option value="">Select Brand</option>
                        {optionsByCategory[category].map((brandOption) => (
                            <option key={brandOption} value={brandOption}>
                                {brandOption}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {brand && (
                <>
                    <label>Capacity:</label>
                    <select value={capacity} onChange={handleCapacityChange}>
                        <option value="">Select Capacity</option>
                        {brandsByCategory[brand].map((capacityOption) => (
                            <option key={capacityOption} value={capacityOption}>
                                {capacityOption}
                            </option>
                        ))}
                    </select>
                </>
            )}

            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Capacity</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedOptions.map((option, index) => (
                        <tr key={index}>
                            <td>{option.category}</td>
                            <td>{option.brand}</td>
                            <td>{option.capacity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CascadingDropdown;
