// Dom Reference
const taskForm = document.getElementById('taskForm');



const taskName = document.getElementById('taskName');
const taskDuration = document.getElementById('taskDuration');
const taskCategory = document.getElementById('taskCategory');


const deepList = document.getElementById('deepWork-list');
const personalList = document.getElementById('personal-list');
const learningList = document.getElementById('learning-list');
const clearBtn = document.getElementById('clearAllTasks');



// Load tasks from localStorage if available
let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Initialize tasks from localStorage or an empty array

// dont know very much abou this below window things but chatGPT say it is important to run the code after the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    tasks.forEach(task => renderTaskList(task));
});


// main scenario for adding a task

// declare a event listnere whenever the form is submitted
taskForm.addEventListener('submit', function (event) {

    event.preventDefault(); // Prevent the default form submission

    const name = taskName.value;
    const duration = parseFloat(taskDuration.value);
    const category = taskCategory.value;
    console.log(`Task Name: ${name}, Duration: ${duration}, Category: ${category}`);

    // Create a task object
    task = { name, duration, category };

    // Call renderTaskList with the task
    tasks.push(task);

    // Play a sound when a task is added
    const audio = new Audio('bell-notification.mp3');
    audio.play();
    // Save the task to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // calling the renderTaskList function to display the task
    renderTaskList(task);

    // Optionally, clear the form
    taskForm.reset();
});

// Render the task list
function renderTaskList(task) {
    const li = document.createElement('li');
    li.classList.add('task-item');

    li.innerHTML = `
        <button class="complete-btn">&#9989;</button>
        <span class="task-text"><strong>${task.name}</strong> | ${task.duration} hrs</span>
    `;

    if (task.category === 'Deep Work') {
        deepList.appendChild(li);
    } else if (task.category === 'Personal') {
        personalList.appendChild(li);
    } else if (task.category === 'Learning') {
        learningList.appendChild(li);
    }

    const completeBtn = li.querySelector('.complete-btn');
    const textSpan = li.querySelector('.task-text');

    completeBtn.addEventListener('click', () => {
        task.completed = !task.completed;
        textSpan.classList.toggle('completed');
        // Sound when task is completed
        const audio = new Audio('harp.mp3');
        audio.play();
        // Update the task in localStorage

        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

}

clearBtn.addEventListener('click', () => {

    tasks = [];

    // Clear localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // Clear all task lists
    deepList.innerHTML = '';
    personalList.innerHTML = '';
    learningList.innerHTML = '';
});

