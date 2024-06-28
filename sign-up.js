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
    document.querySelector("#contact-name").value = document.querySelector("#lead-name").value;
    document.querySelector("#contact-phone-number").value = document.querySelector("#lead-phone-number").value;
    document.querySelector("#contact-email").value = document.querySelector("#lead-email").value;
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
  const endpointPath = `${apiBaseUrl}/events/current`;
  return fetch(endpointPath)
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

function submitForm(event) {
  event.preventDefault();
  const event_id = document.querySelector("#event_id").textContent;
  const endpointPath = `${apiBaseUrl}/events/${event_id}/regs`;
  // TODO: basic validation on client-side - required values, etc. ?
  const formData = new FormData();
  formData.append('lead_name', document.querySelector('#lead-name').value);
  formData.append('lead_phone', document.querySelector('#lead-phone-number').value);
  formData.append('lead_email', document.querySelector('#lead-phone-number').value); // Note: This seems to be a mistake in the HTML. The email input should have its own ID.
  formData.append('contact_name', document.querySelector('#contact-name').value);
  formData.append('contact_phone', document.querySelector('#contact-phone-number').value);
  formData.append('contact_email', document.querySelector('#contact-email').value);
  formData.append('camp_name', document.querySelector('#camp-name').value);
  formData.append('desired_number', document.querySelector('#desired-number').value);
  formData.append('desired_callerid', document.querySelector('#desired-caller-id').value);
  formData.append('own_phone', document.querySelector('input[name="phone-to-use"]:checked').value);
  formData.append('message', document.querySelector('#notes').value);
  fetch(endpointPath, {
    method: 'POST',
    body: formData,
  })
  // TODO: improve error handling
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Form submission successful', data);
    alert('Form submitted successfully!');
  })
  .catch(error => {
    console.error('There has been a problem with your form submission:', error);
    alert('Error submitting form');
  });
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
