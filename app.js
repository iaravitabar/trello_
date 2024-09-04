document.addEventListener('DOMContentLoaded', initializeTaskManager);

function initializeTaskManager() {
    const openModalButton = document.getElementById('openModalButton');
    const closeModalButton = document.getElementById('closeModalButton');
    const taskModal = document.getElementById('taskModal');
    const saveTaskButton = document.getElementById('saveTaskButton');
    const cancelTaskButton = document.getElementById('cancelTaskButton');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescriptionInput = document.getElementById('taskDescription');
    const todoTasksContainer = document.getElementById('todoTasks');

    let tasks = []; 

    function openModal() {
        taskModal.classList.add('is-active');
    }

    function closeModal() {
        taskModal.classList.remove('is-active');
        clearInputs(); 
    }

    function clearInputs() {
        taskTitleInput.value = '';
        taskDescriptionInput.value = '';
    }

    function addTask() {
        const taskTitle = taskTitleInput.value.trim();
        const taskDescription = taskDescriptionInput.value.trim();

        if (taskTitle && taskDescription) {
            const newTask = { title: taskTitle, description: taskDescription };
            tasks.push(newTask);
            renderTasks(); 
            closeModal(); 
        } else {
            alert('Por favor, completa todos los campos.');
        }
    }

    function renderTasks() {
        todoTasksContainer.innerHTML = ''; 
    
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item', 'box');
            taskElement.innerHTML = `
                <h4 class="title is-6">${task.title}</h4>
                <p>${task.description}</p>
            `;
            

            taskElement.addEventListener('click', function() {
                removeTask(index);
            });
    
            todoTasksContainer.appendChild(taskElement);
        });
    }
    function removeTask(index) {
        tasks.splice(index, 1); 
        renderTasks(); 
    }

    openModalButton.addEventListener('click', openModal);
    closeModalButton.addEventListener('click', closeModal);
    cancelTaskButton.addEventListener('click', closeModal);
    saveTaskButton.addEventListener('click', addTask);
}