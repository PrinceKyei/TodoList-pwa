const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const todayCount = document.getElementById('today-count');
const scheduledCount = document.getElementById('scheduled-count');
const allCount = document.getElementById('all-count');
const completedCount = document.getElementById('completed-count');

function updateCounts() {
    const tasks = document.querySelectorAll('.task-item');
    const completed = document.querySelectorAll('.task-text.completed');
    allCount.textContent = tasks.length;
    completedCount.textContent = completed.length;
    // For demo purposes "Today" and "Scheduled" use same counts
    todayCount.textContent = tasks.length;
    scheduledCount.textContent = tasks.length;
}

function createTask(text) {
    const li = document.createElement('li');
    li.className = 'task-item';

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;

    const btns = document.createElement('div');
    btns.className = 'task-buttons';

    const done = document.createElement('button');
    done.textContent = '✔';
    done.onclick = () => {
        span.classList.toggle('completed');
        updateCounts();
    };

    const edit = document.createElement('button');
    edit.textContent = '✏';
    edit.onclick = () => {
        const newText = prompt('Edit reminder:', span.textContent);
        if (newText) span.textContent = newText;
    };

    const del = document.createElement('button');
    del.textContent = '🗑';
    del.onclick = () => {
        li.remove();
        updateCounts();
    };

    btns.append(done, edit, del);
    li.append(span, btns);
    return li;
}

function addTask() {
    const text = taskInput.value.trim();
    if (!text) return;
    taskList.appendChild(createTask(text));
    taskInput.value = '';
    updateCounts();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
});

updateCounts();