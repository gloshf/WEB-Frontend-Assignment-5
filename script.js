const userProfile = {
    name: "Almadi",
    birthYear: 2007,
    isDeveloper: false,
    hobbies: ["Programming", "Reading", "Playing guitar"]
};

const currentYear = new Date().getFullYear();

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const taskMessage = document.getElementById("taskMessage");

function renderHobbies() {
    document.getElementById("hobbyCount").textContent = userProfile.hobbies.length;
    taskCount.textContent = userProfile.hobbies.length;

    const hobbyTags = document.getElementById("hobbyTags");
    hobbyTags.innerHTML = "";

    for (let i = 0; i < userProfile.hobbies.length; i++) {
        const tag = document.createElement("span");
        tag.className = "hobby-tag";
        tag.textContent = userProfile.hobbies[i];
        hobbyTags.appendChild(tag);
    }

    taskList.innerHTML = "";

    for (let i = 0; i < userProfile.hobbies.length; i++) {
        const item = document.createElement("li");
        item.textContent = userProfile.hobbies[i];
        taskList.appendChild(item);
    }
}

function showProfile() {
    const age = currentYear - userProfile.birthYear;

    document.getElementById("profileName").textContent = userProfile.name;
    document.getElementById("profileAvatar").textContent = userProfile.name.charAt(0).toUpperCase();
    document.getElementById("profileAge").textContent = age;

    if (userProfile.isDeveloper) {
        document.getElementById("developerStatus").textContent = "Developer";
    } else {
        document.getElementById("developerStatus").textContent = "Learning to code";
    }

    document.getElementById("profileDetails").textContent =
        "Born in " + userProfile.birthYear + ". Approximate age in months: " + age * 12 + ".";

    renderHobbies();

    console.log("Profile:", userProfile);
    console.log("Name type:", typeof userProfile.name);
    console.log("Birth year type:", typeof userProfile.birthYear);
    console.log("Developer status type:", typeof userProfile.isDeveloper);
    console.log("Age:", age);
    console.log("Age in months:", age * 12);
    console.log("Number of hobbies:", userProfile.hobbies.length);
}

showProfile();


const profileForm = document.getElementById("profileForm");

document.getElementById("birthYear").max = currentYear;

profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("username").value.trim();
    const year = Number(document.getElementById("birthYear").value);
    const message = document.getElementById("formMessage");

    if (name === "") {
        message.textContent = "Please enter your name.";
        message.className = "message error";
        return;
    }

    if (year < 1900 || year > currentYear || !Number.isInteger(year)) {
        message.textContent = "Please enter a valid birth year.";
        message.className = "message error";
        return;
    }

    userProfile.name = name;
    userProfile.birthYear = year;

    showProfile();

    message.textContent = "Profile updated.";
    message.className = "message success";
});

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        taskMessage.textContent = "Enter an item first.";
        taskMessage.className = "message error";
        return;
    }

    userProfile.hobbies.push(text);
    renderHobbies();

    taskInput.value = "";

    taskMessage.textContent = "Item added.";
    taskMessage.className = "message success";
});

document.getElementById("removeTaskButton").addEventListener("click", function () {
    if (userProfile.hobbies.length === 0) {
        taskMessage.textContent = "There are no items to remove.";
        taskMessage.className = "message error";
        return;
    }

    userProfile.hobbies.pop();
    renderHobbies();

    taskMessage.textContent = "Last item removed.";
    taskMessage.className = "message success";
});