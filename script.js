document.addEventListener("DOMContentLoaded", () => {

    const placeCheckboxes = document.querySelectorAll(".place");
    const guideCheckbox = document.getElementById("guide");
    const selectedPlacesList = document.getElementById("selectedPlaces");
    const totalAmountSpan = document.getElementById("totalAmount");

    function updateSummary() {
        let total = 0;
        selectedPlacesList.innerHTML = "";
 
        placeCheckboxes.forEach(cb => {
            if (cb.checked) {
                const name = cb.getAttribute("data-name");
                const price = parseInt(cb.getAttribute("data-price"));

                total += price;

                const li = document.createElement("li");
                li.textContent = `${name} - ₹${price}`;
                selectedPlacesList.appendChild(li);
            }
        });

        if (guideCheckbox.checked) {
            const guidePrice = parseInt(guideCheckbox.getAttribute("data-price"));
            total += guidePrice;

            const li = document.createElement("li");
            li.textContent = `Travel Guide - ₹${guidePrice}`;
            selectedPlacesList.appendChild(li);
        }

        totalAmountSpan.textContent = total;
    }

    
    placeCheckboxes.forEach(cb => {
        cb.addEventListener("change", updateSummary);
    });

    guideCheckbox.addEventListener("change", updateSummary);
    

    const confirmBtn = document.getElementById("confirmBooking");
    const bookingStatus = document.getElementById("bookingStatus");

    confirmBtn.addEventListener("click", () => {

        const total = totalAmountSpan.textContent;

        if (total === "0") {
            bookingStatus.textContent = "Please select at least one destination.";
            bookingStatus.style.color = "red";
            return;
        }

        bookingStatus.textContent =
            "Booking Confirmed ✅\nTotal Price: ₹" + total;

        bookingStatus.style.color = "green";
    });


    const form = document.getElementById("feedbackForm");
    const status = document.getElementById("feedbackStatus");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const rating = document.getElementById("rating").value;
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !rating || !message) {
            status.textContent = "Please fill all fields!";
            status.style.color = "red";
            return;
        }

        const feedbackText =
`TravelVista Feedback
----------------------
Name   : ${name}
Email  : ${email}
Rating : ${rating} / 5
Message:${message}
----------------------`;

        const blob = new Blob([feedbackText], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "feedback.txt";
        link.click();

        status.textContent = "Thank you! Feedback submitted successfully.";
        status.style.color = "green";

        form.reset();
    });

});
