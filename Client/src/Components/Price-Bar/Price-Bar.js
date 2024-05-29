// import React, { useState, useEffect } from "react";
// import './Price-Bar.css';

// const PriceBar = () => {
//     const [isDragging, setIsDragging] = useState(false);
//     const [startOffsetX, setStartOffsetX] = useState(0);

//     useEffect(() => {
//         updateProgress(); // Initial update
//     }, []);

//     const updateProgress = () => {
//         const slider = document.querySelector(".range-slider");
//         const progress = slider.querySelector(".progress");
//         const minPriceInput = slider.querySelector(".min-price");
//         const maxPriceInput = slider.querySelector(".max-price");
//         const minInput = slider.querySelector(".min-input");
//         const maxInput = slider.querySelector(".max-input");

//         const minValue = parseInt(minInput.value);
//         const maxValue = parseInt(maxInput.value);

//         const range = maxInput.max - minInput.min;
//         const valueRange = maxValue - minValue;
//         const width = (valueRange / range) * 100;
//         const minOffset = ((minValue - minInput.min) / range) * 100;

//         progress.style.width = width + "%";
//         progress.style.left = minOffset + "%";

//         minPriceInput.value = minValue;
//         maxPriceInput.value = maxValue;
//     };

//     const updateRange = (event) => {
//         const input = event.target;

//         let min = parseInt(input.parentNode.querySelector(".min-price").value);
//         let max = parseInt(input.parentNode.querySelector(".max-price").value);

//         if (input === input.parentNode.querySelector(".min-price") && min > max) {
//             max = min;
//             input.parentNode.querySelector(".max-price").value = max;
//         } else if (input === input.parentNode.querySelector(".max-price") && max < min) {
//             min = max;
//             input.parentNode.querySelector(".min-price").value = min;
//         }

//         input.parentNode.querySelector(".min-input").value = min;
//         input.parentNode.querySelector(".max-input").value = max;

//         updateProgress();
//     };

//     const handleMouseDown = (e) => {
//         e.preventDefault();
//         setIsDragging(true);
//         setStartOffsetX(e.clientX - e.target.getBoundingClientRect().left);
//         const slider = e.target.closest(".range-slider");
//         slider.classList.add("dragging");
//     };

//     const handleMouseMove = (e) => {
//         if (isDragging) {
//             const slider = e.target.closest(".range-slider");
//             const progress = slider.querySelector(".progress");
//             const sliderRect = slider.getBoundingClientRect();
//             const progressWidth = parseFloat(progress.style.width || 0);

//             let newLeft = ((e.clientX - sliderRect.left - startOffsetX) / sliderRect.width) * 100;
//             newLeft = Math.min(Math.max(newLeft, 0), 100 - progressWidth);
//             progress.style.left = newLeft + "%";

//             const minInput = slider.querySelector(".min-input");
//             const maxInput = slider.querySelector(".max-input");
//             const range = maxInput.max - minInput.min;
//             const newMin = Math.round((newLeft / 100) * range) + parseInt(minInput.min);
//             const newMax = newMin + parseInt(maxInput.value) - parseInt(minInput.value);

//             minInput.value = newMin;
//             maxInput.value = newMax;

//             updateProgress();
//         }
//     };

//     const handleMouseUp = () => {
//         setIsDragging(false);
//         const slider = document.querySelector(".range-slider");
//         slider.classList.remove("dragging");
//     };

//     return (
//         <div className="container-pricebar">
//             <h3>Filter by Price</h3>

//             <div className="range-slider">
//                 <input type="number" className="min-price" value="25" min="1" max="100" onChange={updateRange} />
//                 <input type="number" className="max-price" value="75" min="1" max="100" onChange={updateRange} />

//                 <div className="range">
//                     <input type="range" className="min-input" value="25" min="1" max="100" onChange={updateRange} />
//                     <input type="range" className="max-input" value="75" min="1" max="100" onChange={updateRange} />

//                     <div className="slider">
//                         <div className="progress" onMouseDown={handleMouseDown}></div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PriceBar;
