const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    if (body.classList.contains('light-theme')) {
        themeToggle.textContent = '🌙 Dark Theme';
    } else {
        themeToggle.textContent = '🌞 Light Theme';
    }
});

document.getElementById('eventForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventVenue = document.getElementById('eventVenue').value;
    const eventDescription = document.getElementById('eventDescription').value;

    const event = {
        name: eventName,
        date: eventDate,
        time: eventTime,
        venue: eventVenue,
        description: eventDescription
    };

    saveEvent(event);

    displayEvent(event);

    addEventToRSVP(event);

    populateEventDropdown();
});

function saveEvent(event) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
}

function displayEvent(event) {
    const eventList = document.getElementById('eventList');
    const eventDiv = document.createElement('div');
    eventDiv.classList.add('event-card');
    eventDiv.innerHTML = `
        <h3>${event.name}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <p><strong>Time:</strong> ${event.time}</p>
        <p><strong>Venue:</strong> ${event.venue}</p>
        <p><strong>Description:</strong> ${event.description}</p>
    `;
    eventList.appendChild(eventDiv);
}

function addEventToRSVP(event) {
    const rsvpEvents = document.getElementById('rsvpEvents');
    const rsvpDiv = document.createElement('div');
    rsvpDiv.classList.add('rsvp-card');
    rsvpDiv.innerHTML = `
        <h3>${event.name}</h3>
        <p><strong>Date:</strong> ${event.date}</p>
        <button onclick="registerForEvent('${event.name}')">Register</button>
    `;
    rsvpEvents.appendChild(rsvpDiv);
}

function registerForEvent(eventName) {
    alert(`You have successfully registered for ${eventName}!`);
}

document.getElementById('taskForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const taskName = document.getElementById('taskName').value;
    const assignee = document.getElementById('assignee').value;
    const deadline = document.getElementById('deadline').value;

    const task = {
        name: taskName,
        assignee: assignee,
        deadline: deadline
    };

    displayTask(task);
});

function displayTask(task) {
    const taskList = document.getElementById('taskList');
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-card');
    taskDiv.innerHTML = `
        <h3>${task.name}</h3>
        <p><strong>Assigned To:</strong> ${task.assignee}</p>
        <p><strong>Deadline:</strong> ${task.deadline}</p>
    `;
    taskList.appendChild(taskDiv);
}

document.getElementById('searchEvent').addEventListener('input', function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const events = document.querySelectorAll('.rsvp-card');
    events.forEach(event => {
        const eventName = event.querySelector('h3').textContent.toLowerCase();
        if (eventName.includes(searchTerm)) {
            event.style.display = 'block';
        } else {
            event.style.display = 'none';
        }
    });
});

document.getElementById('sponsorForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const sponsorName = document.getElementById('sponsorName').value;
    const sponsorAmount = document.getElementById('sponsorAmount').value;

    const sponsor = {
        name: sponsorName,
        amount: sponsorAmount
    };

    displaySponsor(sponsor);
});

function displaySponsor(sponsor) {
    const sponsorList = document.getElementById('sponsorList');
    const sponsorDiv = document.createElement('div');
    sponsorDiv.classList.add('sponsor-card');
    sponsorDiv.innerHTML = `
        <h3>${sponsor.name}</h3>
        <p><strong>Amount:</strong> Rs.${sponsor.amount}</p>
    `;
    sponsorList.appendChild(sponsorDiv);
}

const feedbackForm = document.getElementById('feedbackForm');
const eventSelect = document.getElementById('eventSelect');
const feedbackList = document.getElementById('feedbackList');

function populateEventDropdown() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    eventSelect.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select an event';
    eventSelect.appendChild(defaultOption);

    events.forEach(event => {
        const option = document.createElement('option');
        option.value = event.name;
        option.textContent = event.name;
        eventSelect.appendChild(option);
    });
}

feedbackForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const eventName = eventSelect.value;
    const rating = document.getElementById('feedbackRating').value;
    const comments = document.getElementById('feedbackComments').value;

    const feedback = {
        event: eventName,
        rating: rating,
        comments: comments
    };

    saveFeedback(feedback);
    displayFeedback(feedback);
    feedbackForm.reset();
});
function saveFeedback(feedback) {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
}
function displayFeedback(feedback) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.classList.add('feedback-card');
    feedbackDiv.innerHTML = `
        <h3>${feedback.event}</h3>
        <p><strong>Rating:</strong> ${feedback.rating}/5</p>
        <p><strong>Comments:</strong> ${feedback.comments}</p>
    `;
    feedbackList.appendChild(feedbackDiv);
}

function loadFeedbacks() {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
    feedbacks.forEach(feedback => displayFeedback(feedback));
}


document.addEventListener('DOMContentLoaded', function () {
    populateEventDropdown();
    loadFeedbacks();
});
localStorage.removeItem('feedbacks');
