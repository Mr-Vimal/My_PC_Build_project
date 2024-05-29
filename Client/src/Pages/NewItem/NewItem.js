import React from "react";
import './NewItem.css'

export default function NewItem(){

    return(

        <section class="about" id="about">
          <div class="container">

            <figure class="about-banner">

              <img src="./about-img.avif" alt="M shape" class="about-img"/>

            </figure>
            <div class="about-content">

              <h2 class="about-title">New Arrival just for PC Lovers <strong>PC Lovers</strong> </h2>

              <p class="about-text">
                Nullam quis ante. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum
                viverra felis nunc
                et lorem. In auctor lobortis lacus. Phasellus gravida semper nisi. Aliquam lobortis.
              </p>

              <p class="about-bottom-text">
                <ion-icon name="arrow-forward-circle-outline"></ion-icon>

                <span>Click to See More </span>
              </p>

            </div>

          </div>
        </section>
    )
}