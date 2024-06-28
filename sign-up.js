/** JavaScript for the signup page. */
// TODO: change to actual URL once deployed to prod
const apiBaseUrl = 'http://fut.localhost:8000';

// Stop the user from having to enter their info twice if they're the camp lead.
const userIsCampLeadCheckBox = document.querySelector("#user-is-camp-lead");
const yourContactInfoFields = document.querySelector("#your-contact-info-fields");
userIsCampLeadCheckBox.addEventListener("change", () => {
  if (userIsCampLeadCheckBox.checked) {
    yourContactInfoFields.style.display = "none";
  } else {
    yourContactInfoFields.style.display = "block";
  }
});

function showError(text) {
  document.querySelector("#error").textContent = "ERROR: " + text;
  document.querySelector("#error").style.display = "block";
}

function clearError() {
  document.querySelector("#error").textContent = "";
  document.querySelector("#error").style.display = "none";
}

function setEventInfo(id, name) {
  document.querySelector("#event_name").textContent = name;
  document.querySelector("#event_id").textContent = id;
}

function hideForm() {
  document.querySelector("#signup_form").style.display = "none";
}

function showForm(event_id, event_name) {
  setEventInfo(event_id, event_name);
  hideNoEvents();
  hideEventSelector();
  document.querySelector("#signup_form").style.display = "block";
}

function showNoEvents() {
  hideForm();
  hideEventSelector();
  document.querySelector("#no_events").style.display = "block";
}

function hideNoEvents() {
  document.querySelector("#no_events").style.display = "none";
}

function hideEventSelector(events) {
  document.querySelector("#multiple_events").style.display = "none";
}

function showEventSelector(events) {
  hideForm();
  hideNoEvents();
  const eventSelection = document.querySelector("#event_selection");
  const ul = document.createElement("ul");
  events.forEach(event => {
    const li = document.createElement("li");
    li.textContent = event.title;
    li.addEventListener('click', () => showForm(event.id, event.title));
    ul.appendChild(li);
  });
  eventSelection.appendChild(ul);
  document.querySelector("#multiple_events").style.display = "block";
}

async function getCurrentEvents() {
  const endpointPath = '/events/current';
  return fetch(apiBaseUrl + endpointPath)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    clearError();
    return data;
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
    showError('Error retrieving events');
  });
}

function submitForm() {
  alert('submitting form')
}

document.addEventListener("DOMContentLoaded", async () => {
  const events = await getCurrentEvents();
  if (events.length == 1) {
    // show form with event name
    showForm(events[0].id, events[0].title);
  } else if (events.length == 0) {
    showNoEvents();
  } else {
    // multiple events - show "choose event"
    showEventSelector(events);
  }
});
