// Cache planner page elements.
const taskInput = document.querySelector('#task-input');
const addTaskButton = document.querySelector('#add-task-button');
const taskList = document.querySelector('#task-list');

const timerDisplay = document.querySelector('.timer-display');
const startButton = document.querySelector('#timer-start');
const pauseButton = document.querySelector('#timer-pause');
const resetButton = document.querySelector('#timer-reset');

// Use a dedicated key so task data persists across page reloads.
const TASK_STORAGE_KEY = 'unihub-planner-tasks';

// Pomodoro default is 25 minutes = 1500 seconds.
const INITIAL_TIME = 1500;
let timeLeft = INITIAL_TIME;
let timerIntervalId = null;

function saveTasks() {
  const tasks = Array.from(taskList.querySelectorAll('li .task-text')).map((item) => item.textContent);
  localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
}

function createTaskItem(taskText) {
  const listItem = document.createElement('li');

  const taskTextSpan = document.createElement('span');
  taskTextSpan.className = 'task-text';
  taskTextSpan.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.type = 'button';
  deleteButton.className = 'delete-task';
  deleteButton.textContent = 'Delete';

  listItem.append(taskTextSpan, deleteButton);
  return listItem;
}

function addTask() {
  const newTaskText = taskInput.value.trim();
  if (!newTaskText) {
    return;
  }

  const newTaskItem = createTaskItem(newTaskText);
  taskList.appendChild(newTaskItem);

  taskInput.value = '';
  taskInput.focus();
  saveTasks();
}

function loadTasks() {
  const storedTasks = localStorage.getItem(TASK_STORAGE_KEY);
  if (!storedTasks) {
    return;
  }

  const parsedTasks = JSON.parse(storedTasks);
  parsedTasks.forEach((taskText) => {
    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);
  });
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
}

function startTimer() {
  if (timerIntervalId !== null || timeLeft <= 0) {
    return;
  }

  timerIntervalId = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft -= 1;
      updateTimerDisplay();
    }

    // Stop at 00:00 and clear the interval.
    if (timeLeft === 0) {
      clearInterval(timerIntervalId);
      timerIntervalId = null;
    }
  }, 1000);
}

function pauseTimer() {
  if (timerIntervalId === null) {
    return;
  }

  clearInterval(timerIntervalId);
  timerIntervalId = null;
}

function resetTimer() {
  pauseTimer();
  timeLeft = INITIAL_TIME;
  updateTimerDisplay();
}

// Add task on button click.
addTaskButton.addEventListener('click', addTask);

// Allow quick task adding with Enter inside the input field.
taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Handle task deletion using event delegation.
taskList.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.delete-task');
  if (!deleteButton) {
    return;
  }

  const listItem = deleteButton.closest('li');
  if (listItem) {
    listItem.remove();
    saveTasks();
  }
});

// Timer control listeners.
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Load persistent tasks and initialize the timer text on page load.
loadTasks();
updateTimerDisplay();
