const events = [
    {
        id: 1,
        name: "Annual College Cultural Fest",
        category: "Cultural",
        date: "15 December 2026",
        eventDate: "2026-12-15T09:00:00",
        location: "College Main Campus",
        price: 299,
        image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=700",
        description: "Experience an exciting celebration of music, dance, art and creativity. Participate in cultural performances, enjoy live entertainment and connect with students from different colleges. This festival brings together talent, energy and unforgettable campus memories."
    },
    {
        id: 2,
        name: "24-Hour National Hackathon",
        category: "Technical",
        date: "20 December 2026",
        eventDate: "2026-12-20T09:00:00",
        location: "School of Computer Science",
        price: 199,
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700",
        description: "Put your coding and problem-solving skills to the test in this 24-hour hackathon. Work in teams, develop innovative solutions, learn from mentors and compete with talented student developers."
    },
    {
        id: 3,
        name: "Inter-College Sports Championship",
        category: "Sports",
        date: "25 December 2026",
        eventDate: "2026-12-25T09:00:00",
        location: "University Sports Complex",
        price: 149,
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=700",
        description: "Bring your competitive spirit to the Inter-College Sports Championship. Compete in different sporting events, represent your college and enjoy a day of teamwork, fitness and sportsmanship."
    },
    {
        id: 4,
        name: "AI & Machine Learning Workshop",
        category: "Workshop",
        date: "28 December 2026",
        eventDate: "2026-12-28T10:00:00",
        location: "School of Engineering",
        price: 99,
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700",
        description: "Explore the fundamentals and real-world applications of Artificial Intelligence and Machine Learning. Take part in practical sessions, interact with instructors and understand how AI technologies are shaping the future."
    },
    {
        id: 5,
        name: "National Student Project Exhibition",
        category: "Exhibition",
        date: "05 January 2027",
        eventDate: "2027-01-05T10:00:00",
        location: "College Main Auditorium",
        price: 0,
        image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=700",
        description: "Discover innovative projects created by students across different disciplines. Explore creative ideas, interact with project teams and experience technology, research and innovation under one roof."
    },
    {
        id: 6,
        name: "Inter-College Coding Competition",
        category: "Competition",
        date: "10 January 2027",
        eventDate: "2027-01-10T09:00:00",
        location: "School of Computer Science",
        price: 49,
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700",
        description: "Challenge yourself with programming problems and compete against other talented students. Test your logical thinking, algorithmic knowledge and coding speed in this competitive programming event."
    }
];


const eventContainer = document.getElementById("eventContainer");
const eventDetails = document.getElementById("eventDetails");
const eventDetailsContent = document.getElementById("eventDetailsContent");
const eventsSection = document.getElementById("events");
const searchInput = document.getElementById("searchInput");

let countdownInterval;


function displayEvents(eventList) {

    if (eventList.length === 0) {
        eventContainer.innerHTML = `
            <p class="no-events">No events found. Try another search.</p>
        `;
        return;
    }

    eventContainer.innerHTML = eventList.map(event => `
        <div class="event-card">

            <div class="event-image">
                <img src="${event.image}" alt="${event.name}">

                <span class="event-category">
                    ${event.category}
                </span>
            </div>

            <div class="event-info">

                <h3>${event.name}</h3>

                <p class="event-date">
                    📅 ${event.date}
                </p>

                <p class="event-location">
                    📍 ${event.location}
                </p>

                <div class="event-countdown"
                    data-event-time="${event.eventDate}">
                    Loading countdown...
                </div>

                <div class="event-bottom">

                    <span class="event-price">
                        ${event.price === 0 ? "Free" : "₹" + event.price}
                    </span>

                    <button class="event-btn" data-event-id="${event.id}">
                        View Details
                    </button>

                </div>

            </div>

        </div>
    `).join("");

    updateCountdowns();
}


function searchEvents(searchText) {

    const filteredEvents = events.filter(event => {

        const searchValue = searchText.toLowerCase();

        return (
            event.name.toLowerCase().includes(searchValue) ||
            event.category.toLowerCase().includes(searchValue) ||
            event.location.toLowerCase().includes(searchValue)
        );

    });

    displayEvents(filteredEvents);
}


function showEventDetails(eventId) {

    const event = events.find(item => item.id === Number(eventId));

    if (!event) {
        return;
    }

    eventContainer.closest(".events-section");

    eventDetailsContent.innerHTML = `
        <div class="event-detail-card">

            <div class="event-detail-image">
                <img src="${event.image}" alt="${event.name}">
            </div>

            <div class="event-detail-info">

                <span class="event-category">
                    ${event.category}
                </span>

                <h1>${event.name}</h1>

                <p class="event-detail-description">
                    ${event.description}
                </p>

                <div class="event-detail-meta">

                    <div>
                        <strong>📅 Event Date</strong>
                        <p>${event.date}</p>
                    </div>

                    <div>
                        <strong>📍 Venue</strong>
                        <p>${event.location}</p>
                    </div>

                    <div>
                        <strong>🎟 Entry Fee</strong>
                        <p>${event.price === 0 ? "Free" : "₹" + event.price}</p>
                    </div>

                    <div>
                        <strong>🏷 Category</strong>
                        <p>${event.category}</p>
                    </div>

                </div>

                <div class="event-detail-countdown">
                    <h3>Event Countdown</h3>

                    <div class="event-countdown"
                        data-event-time="${event.eventDate}">
                        Loading countdown...
                    </div>
                </div>

            </div>

        </div>
    `;

    eventsSection.hidden = true;
    eventDetails.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    updateCountdowns();
}


function goBackToEvents() {

    eventDetails.hidden = true;
    eventsSection.hidden = false;

    window.scrollTo({
        top: eventsSection.offsetTop - 80,
        behavior: "smooth"
    });

}


function updateCountdowns() {

    const timers = document.querySelectorAll(".event-countdown");

    timers.forEach(timer => {

        const eventTime = new Date(timer.dataset.eventTime).getTime();
        const now = new Date().getTime();
        const difference = eventTime - now;

        if (Number.isNaN(eventTime)) {
            timer.innerHTML = "Date unavailable";
            return;
        }

        if (difference <= 0) {
            timer.innerHTML = "🎉 Event Started!";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        timer.innerHTML = `
            ⏳ Starts in:
            ${days}d ${hours}h ${minutes}m ${seconds}s
        `;

    });

}


eventContainer.addEventListener("click", function (event) {

    const button = event.target.closest("[data-event-id]");

    if (button) {
        showEventDetails(button.dataset.eventId);
    }

});


document.getElementById("backToEvents").addEventListener("click", goBackToEvents);


searchInput.addEventListener("input", function () {
    searchEvents(this.value);
});


const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme") || "dark";

document.documentElement.setAttribute("data-theme", savedTheme);


function updateThemeButton(theme) {

    if (theme === "dark") {
        themeToggle.innerHTML = "☀️ Light Mode";
    } else {
        themeToggle.innerHTML = "🌙 Dark Mode";
    }

}


updateThemeButton(savedTheme);


themeToggle.addEventListener("click", function () {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);

    updateThemeButton(newTheme);

});


const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);

});


navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });

});


document.getElementById("homeLink").addEventListener("click", function () {

    eventDetails.hidden = true;
    eventsSection.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


document.getElementById("exploreLink").addEventListener("click", function () {

    eventDetails.hidden = true;
    eventsSection.hidden = false;

});


document.getElementById("year").textContent = new Date().getFullYear();


displayEvents(events);


countdownInterval = setInterval(updateCountdowns, 1000);