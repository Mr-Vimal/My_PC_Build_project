import React from "react";
import './User.css'
import AccountSetting from "./AccountSetting";
import PasswordChange from "./Password";
import Info from "./Info";



export default function UserProfile() {

    return (
        <div class="user-profile">
            <div class="profile-nav">
                <a href="/accountsetting" class="profile-tools">Account Setting</a>
                <a href="/passwordchange" class="profile-tools">Change Password</a>
                <a href="/info" class="profile-tools">Info</a>
                <a href="#account-social-links" class="profile-tools">Social Links</a>
                <a href="#account-connections" class="profile-tools">Connections</a>
                <a href="#account-notifications" class="profile-tools">Notifications</a>
            </div>

            <div className="user-right">
                {/* <AccountSetting /> */}
                {/* <PasswordChange /> */}
                {/* <Info /> */}
            </div>
        </div>
    )
}