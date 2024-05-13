import React from "react";
import './Admin.css'
<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"></link>


export default function Admin() {

   return (
      <>
         <div class="admin-nav">
            <a href="/useradd" class="admin-tools">DashBoard</a>
            <a href="/passwordchange" class="admin-tools">Users</a>
            <a href="/info" class="admin-tools">Products</a>
            <a href="#account-social-links" class="admin-tools">Social Links</a>
            <a href="#account-connections" class="admin-tools">Connections</a>
            <a href="#account-notifications" class="admin-tools">Notifications</a>
         </div>

      </>

   )
}