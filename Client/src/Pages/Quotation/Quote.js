import React, { useState } from "react";
import './Quote.css';
import Navbar from "../../Components/Navbar/Navbar";

export default function Quote() {
    const [category, setCategory] = useState("");
    const [details, setDetails] = useState([]);
    const [relatedDetails, setRelatedDetails] = useState([]);
    const [newDetail, setNewDetail] = useState(""); // State for adding new detail

    const categoryDetails = {
        1: {
            MSI: ["MSI Z790", "MSI B550-M Pro", "MSI B450 Gaming Plus"],
            GIGABYTE: ["GIGABYTE H81", "GIGABYTE Option H97", "GIGABYTE B250"],
            ASUS: ["Asus Z490-E", "Asus B250", "Asus B150"]
        },
        2: {
            DDR3: ["DDR3 Kingston", "DDR3 Samsung", "DDR3 Corsair"],
            DDR4: ["DDR4 Kingston", "DDR4 Samsung", "DDR4 Corsair"],
            DDR5: ["DDR5 Kingston", "DDR5 Samsung", "DDR5 Corsair"]
        },
        3: {
            "Asus Z490": ["Asus Z490-E", "Asus Z490-F "],
            "Asus B250": ["Asus B250-M "],
            DDR5: ["DDR5 Kingston", "DDR5 Samsung", "DDR5 Corsair"]
        }
    };

    const selectCategory = (event) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        setDetails(categoryDetails[selectedCategory] ? Object.keys(categoryDetails[selectedCategory]) : []);
        setRelatedDetails([]);
    }

    const selectDetails = (event) => {
        const selectedDetail = event.target.value;
        setRelatedDetails(categoryDetails[category][selectedDetail] || []);
    }

    const handleNewDetailChange = (event) => {
        setNewDetail(event.target.value);
    }

    const handleAddDetail = () => {
        if (newDetail.trim() !== "") {
            setRelatedDetails([...relatedDetails, newDetail]);
            setNewDetail("");
        }
    }

    return (
        <>
            <Navbar />
            <h1 className="quote-head">Build Your Dream PC</h1>
            <div className="quote-dropdown">
                <div className="dropdown">
                    <label htmlFor="categoryDropdown">Select Category:</label>
                    <select id="categoryDropdown" onChange={selectCategory}>
                        <option value="">Select Category</option>
                        <option value="1">Motherboard</option>
                        <option value="2">RAM</option>
                        <option value="3">GPU</option>
                    </select>
                </div>
                <div className="dropdown">
                    <label htmlFor="detailsDropdown">Select Brand</label>
                    <select id="detailsDropdown" onChange={selectDetails} disabled={!category}>
                        <option value="">Select Products</option>
                        {details.map((detail, index) => (
                            <option key={index} value={detail}>{detail}</option>
                        ))}
                    </select>
                </div>
                <div className="dropdown">
                    <label htmlFor="relatedDetailsDropdown">Select Model</label>
                    <select id="relatedDetailsDropdown" disabled={!relatedDetails.length}>
                        <option value="">Related Products</option>
                        {relatedDetails.map((detail, index) => (
                            <option key={index} value={detail}>{detail}</option>
                        ))}
                    </select>
                </div>
                <div className="dropdown">
                    <label htmlFor="newDetailInput">Add New Product:</label>
                    <input type="text" id="newDetailInput" value={newDetail} onChange={handleNewDetailChange} />
                    <button type="button" onClick={handleAddDetail}>Add</button>
                </div>
            </div>
            {/* Display newly added detail */}
            <div>
                {relatedDetails.length > 0 && (
                    <p>Newly added detail: {relatedDetails[relatedDetails.length - 1]}</p>
                )}
            </div>
        </>
    );
}
