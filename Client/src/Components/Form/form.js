import React from "react";
import './form.css'
import Button from '../Button/button'

function Form() {
    return (
        <div className="container">
            <form action="action_page.php">

                <label for="fname">First Name</label>
                <input type="text"  name="firstname" placeholder="Your name.." />

                <label for="lname">Last Name</label>
                <input type="text"  name="lastname" placeholder="Your last name.." />
                <label for="Date">Date</label>
                <input type="date" name="date" placeholder="Date"/>

                <label for="country">Country</label>
                <select  name="country">
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="usa">USA</option>
                </select>

                <label for="subject">Subject</label>
                <textarea  name="subject" placeholder="Write something.."  />

                <input type="submit" value="Save" />
                <Button name="blue"/>

            </form>
        </div>
    )
}

export default Form;