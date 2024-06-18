/** JavaScript for the signup page. */

// Stop the user from having to enter their info twice if they're the camp lead.
const userIsCampLeadCheckBox = document.querySelector("#user-is-camp-lead");
const yourContactInfoFields = document.querySelector("#your-contact-info-fields");
userIsCampLeadCheckBox.addEventListener("change", () => {
  if (userIsCampLeadCheckBox.checked) {
    yourContactInfoFields.style.visibility = "hidden";
  } else {
    yourContactInfoFields.style.visibility = "visible";
  }
});
