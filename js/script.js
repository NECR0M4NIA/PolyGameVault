
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const clearAllBtn = document.getElementById('clearAll');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render existing tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <div class="actions">
                    <button class="complete-btn" onclick="toggleComplete(${index})">✓</button>
                    <button class="delete-btn" onclick="deleteTask(${index})">×</button>
                </div>
            `;
            taskList.appendChild(li);
        });
        saveTasks();
    }

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add new task
    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({
                text: text,
                completed: false
            });
            taskInput.value = '';
            renderTasks();
        }
    }

    // Toggle task completion
    window.toggleComplete = function(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Delete task
    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Clear all tasks
    function clearAll() {
        tasks = [];
        renderTasks();
    }

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    clearAllBtn.addEventListener('click', clearAll);

    // Initial render
    renderTasks();

    // Add animations for task list items
    const style = document.createElement('style');
    style.textContent = `
        #taskList li {
            animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
            from {
                transform: translateX(-20px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});
