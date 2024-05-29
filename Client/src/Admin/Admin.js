import React from "react";
import './Admin.css'
import Navbar from "../Components/Navbar/Navbar";
<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"></link>


export default function Admin() {

   return (
      <>
         <Navbar />
         <div class="admin-nav">
            <a href="/" class="admin-tools">DashBoard</a>
            <a href="/useradd" class="admin-tools">Users</a>
            <a href="/datashowing" class="admin-tools">Products</a>
         </div>

      </>

   )
}