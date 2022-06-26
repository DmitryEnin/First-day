const addNewTask = document.querySelector('#addNewTask');
const formAddTask = document.querySelector('#formAddTask');
const addInputName = document.querySelector('#addInputName');
const addInputDescription = document.querySelector('#addInputDescription');
const addInputAssignedTo = document.querySelector('#addInputAssignedTo');
const addInputDueDate = document.querySelector('#addInputDueDate');
const addInputStatus = document.querySelector('#addInputStatus');
const addSubmitBtn = document.querySelector('#addSubmitBtn');
const addResetBtn = document.querySelector('#addResetBtn');
const addCloseModal = document.querySelector('#addCloseModal');

const showDate = document.querySelector('#showDate');
const showTime = document.querySelector('#showTime');

// Todos array (Data Storage)
let todos = [];

// Validation Class: Handles Validation
class Validation {
  static isRequired(input) {
    return input === '' ? false : true;
  }

  static isBetween(inputLength, min, max) {
    return inputLength > min && inputLength <= max ? true : false;
  }

  static isFormattedDate(input) {
    const pattern =
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    return input.match(pattern);
  }

  static checkName() {
    let valid = false;
    const min = 3;
    const max = 10;
    const name = addInputName.value.trim();

    if (!Validation.isRequired(name)) {
      Validation.showError(addInputName, 'Name cannot be blank.');
    } else if (!Validation.isBetween(name.length, min, max)) {
      Validation.showError(
        addInputName,
        `Name must be between ${min} and ${max} characters.`
      );
    } else {
      Validation.showSuccess(addInputName);
      valid = true;
    }

    return valid;
  }

  static checkDescription() {
    let valid = false;
    const description = addInputDescription.value.trim();
    if (Validation.isRequired(description)) {
      Validation.showSuccess(addInputDescription);
      valid = true;
    } else {
      Validation.showError(addInputDescription, 'Description cannot be blank.');
    }
    return valid;
  }

  static checkAssignedTo() {
    let valid = false;
    const assignedTo = addInputAssignedTo.value.trim();
    if (Validation.isRequired(assignedTo)) {
      Validation.showSuccess(addInputAssignedTo);
      valid = true;
    } else {
      Validation.showError(addInputAssignedTo, 'Assigned to cannot be blank.');
    }
    return valid;
  }

  static checkDueDate() {
    let valid = false;
    const dueDate = addInputDueDate.value.trim();
    if (!Validation.isRequired(dueDate)) {
      Validation.showError(addInputDueDate, 'Due date cannot be blank.');
    } else if (!Validation.isFormattedDate(dueDate)) {
      Validation.showError(
        addInputDueDate,
        'Due date have to be in this format : DD-MM-YYYY'
      );
    } else {
      Validation.showSuccess(addInputDueDate);
      valid = true;
    }
    return valid;
  }

  static checkStatus() {
    let valid = false;
    const status = addInputStatus.value.trim();
    if (Validation.isRequired(status)) {
      Validation.showSuccess(addInputStatus);
      valid = true;
    } else {
      Validation.showError(addInputStatus, 'Status cannot be blank.');
    }
    return valid;
  }

  static showError(input, message) {
    const formField = input.parentElement;
    const small = formField.querySelector('small');
    small.textContent = message;
  }

  static showSuccess(input) {
    const formfield = input.parentElement;
    const small = formfield.querySelector('small');
    small.textContent = '';
  }

  static resetAddFormFields() {
    Validation.showSuccess(addInputName);
    Validation.showSuccess(addInputDescription);
    Validation.showSuccess(addInputAssignedTo);
    Validation.showSuccess(addInputDueDate);
    Validation.showSuccess(addInputStatus);
    formAddTask.reset();
  }
}

// Utility Class: Provides Utility Methods
class Utility {
  static create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }

  static showDate() {
    const date = new Date();
    const today =
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const dateTextNode = document.createTextNode(today);
    return dateTextNode;
  }

  static showTime() {
    const date = new Date();
    const timeTextNode = document.createTextNode(date.toLocaleTimeString());
    return timeTextNode;
  }
}

//////////////////////////////////////////////////// Events Section /////////////////////////////////////////////////////

// Event: Adding Submit Form
formAddTask.addEventListener('submit', e => {
  e.preventDefault();
  // console.log(addInputName.value);
  // console.log(addInputDescription.value);
  // console.log(addInputAssignedTo.value);
  // console.log(addInputDueDate.value);
  // console.log(addInputStatus.value);

  let isNameValid = Validation.checkName(),
    isDescriptionValid = Validation.checkDescription(),
    isAssignedToValid = Validation.checkAssignedTo(),
    isDueDateValid = Validation.checkDueDate(),
    isStatusValid = Validation.checkStatus();

  let isFormValid =
    isNameValid &&
    isDescriptionValid &&
    isAssignedToValid &&
    isDueDateValid &&
    isStatusValid;

  if (isFormValid) {
    const id = Utility.create_UUID();
    const name = addInputName.value;
    const description = addInputDescription.value;
    const assignedTo = addInputAssignedTo.value;
    const dueDate = addInputDueDate.value;
    const status = addInputStatus.value;

    const todo = {
      id: id,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };

    //Add todo to the todos array
    todos.push(todo);
    console.log(todos);
    Validation.resetAddFormFields();

    // To fix the Modal from not closing after click Submit button (from e.preventDefault());
    addSubmitBtn.setAttribute('data-bs-dismiss', 'modal');
    addSubmitBtn.click();
    // To remove this attribute from the modal (IIFE)
    (() => {
      addSubmitBtn.setAttribute('data-bs-dismiss', '');
    })();
  }
});

// Event: Click on Reset Button on Add Modal
addResetBtn.addEventListener('click', Validation.resetAddFormFields);

// Event: Click on X Button on Add Modal
addCloseModal.addEventListener('click', Validation.resetAddFormFields);

// Event : Show Date and Time when the page load.
showDate.appendChild(Utility.showDate());
showTime.appendChild(Utility.showTime());
