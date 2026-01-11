let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let isEditing = false;
let currentEditId = null;

const titleInput = document.getElementById("task-title");
const descInput = document.getElementById("task-desc");
const addBtn = document.getElementById("add-btn");
const cancelBtn = document.getElementById("cancel-btn");
const pendingList = document.getElementById("pending-list");
const completedList = document.getElementById("completed-list");

function renderTasks() {
    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(task => {
        const date = new Date(task.id).toLocaleDateString() + " " + new Date(task.id).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        const taskHTML = `
            <div class="task-card">
                <div class="task-info">
                    <div class="task-title">${task.title}</div>
                    <div class="task-desc">${task.desc}</div>
                    <div class="task-meta">Created: ${date}</div>
                </div>
                <div class="actions">
                    ${!task.completed ? `<button class="action-btn check-btn" onclick="toggleComplete(${task.id})">✔</button>` : `<button class="action-btn check-btn" onclick="toggleComplete(${task.id})">↺</button>`}
                    <button class="action-btn edit-btn" onclick="editTask(${task.id})">✎</button>
                    <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">✕</button>
                </div>
            </div>
        `;

        if (task.completed) {
            completedList.innerHTML += taskHTML;
        } else {
            pendingList.innerHTML += taskHTML;
        }
    });
}

function saveTask() {
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    if (!title) {
        alert("Please enter a task title!");
        return;
    }

    if (isEditing) {
        const taskIndex = tasks.findIndex(t => t.id === currentEditId);
        tasks[taskIndex].title = title;
        tasks[taskIndex].desc = desc;
        resetForm();
    } else {
        const newTask = {
            id: Date.now(),
            title: title,
            desc: desc,
            completed: false
        };
        tasks.push(newTask);
    }

    saveToLocal();
    renderTasks();
    titleInput.value = "";
    descInput.value = "";
}

function deleteTask(id) {
    if(confirm("Are you sure you want to delete this task?")) {
        tasks = tasks.filter(task => task.id !== id);
        saveToLocal();
        renderTasks();
    }
}

function toggleComplete(id) {
    const taskIndex = tasks.findIndex(t => t.id === id);
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveToLocal();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    titleInput.value = task.title;
    descInput.value = task.desc;
    
    isEditing = true;
    currentEditId = id;
    
    addBtn.innerText = "Update Task";
    cancelBtn.style.display = "block";
    titleInput.focus();
}

function resetForm() {
    isEditing = false;
    currentEditId = null;
    addBtn.innerText = "Add Task";
    cancelBtn.style.display = "none";
    titleInput.value = "";
    descInput.value = "";
}

function saveToLocal() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();