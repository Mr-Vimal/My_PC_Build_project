// import React, { useState } from "react";
// import './Searchbar.css'

// export default function SearchBar(){
//  const [searchTerm,setSearchTerm] =useState('')
//     return(
//         <div class="search-product">
//     <form name="search">
//         <input type="text" class="input-search" id="inputSearch" name="txt" onmouseout="this.value = ''; this.blur();" placeholder="Search" onChange={(event)=>{
//             setSearchTerm(event.target.value)
//         }}/>
//     </form>
//     <div className="templete-container">
//         {
//             data.filter((val)=>{
//                 if (searchTerm == ""){
//                     return val;
//                 }else if(val.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
//                     return val;
//                 }
//             })
//         }
//     </div>
//     <i class="fas fa-search"></i>
// </div>
//     )
// }