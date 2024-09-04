document.addEventListener('DOMContentLoaded', initializeTaskManager);

function initializeTaskManager() {
    //para abrir
    const openModalButtonTodo = document.getElementById('openModalButtonTodo');
    const openModalButtonDoing = document.getElementById('openModalButtonDoing');
    const openModalButtonRevision = document.getElementById('openModalButtonRevision');
    const openModalButtonDone = document.getElementById('openModalButtonDone');


    const closeModalButton = document.getElementById('closeModalButton');
    const taskModal = document.getElementById('taskModal');
    const saveTaskButton = document.getElementById('saveTaskButton');
    const cancelTaskButton = document.getElementById('cancelTaskButton');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescriptionInput = document.getElementById('taskDescription');


    const todoTasksContainer = document.getElementById('todoTasks');
    const doingTasksContainer = document.getElementById('doingTasks');
    const revisionTasksContainer = document.getElementById('revisionTasks');
    const doneTasksContainer = document.getElementById('doneTasks');

    let tasksTodo = [];
    let tasksDoing = [];
    let tasksRevision = [];
    let tasksDone = [];


    function openModal(saveTaskFunc) {
        currentSaveTaskFunction = saveTaskFunc;
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

    function addTask(taskArray, container) {
        const taskTitle = taskTitleInput.value.trim();
        const taskDescription = taskDescriptionInput.value.trim();

        if (taskTitle && taskDescription) {
            const newTask = { title: taskTitle, description: taskDescription };
            taskArray.push(newTask);
            renderTasks(container, taskArray); 
            closeModal(); 
        } else {
            alert('Por favor, completa todos los campos.');
        }
    }

    function renderTasks(container, taskArray) {
        container.innerHTML = ''; 
    
        taskArray.forEach((task, index) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item', 'box');
            taskElement.innerHTML = `
                <h4 class="title is-6">${task.title}</h4>
                <p>${task.description}</p>
            `;
            

            taskElement.addEventListener('click', function() {
                removeTask(taskArray, index);
            });
    
            container.appendChild(taskElement);
        });
    }
    function removeTask(taskArray, index) {
        taskArray.splice(index, 1); 
        renderTasks(
            taskArray === tasksTodo? todoTasksContainer:
            taskArray === tasksDoing? doingTasksContainer:
            taskArray === tasksRevision? revisionTasksContainer:
            doneTasksContainer,
            taskArray
        ); 
    }

    openModalButtonTodo.addEventListener('click', function(){
        openModal(()=> addTask(tasksTodo, todoTasksContainer));
    });
    openModalButtonDoing.addEventListener('click', function(){
        openModal(()=> addTask(tasksDoing, doingTasksContainer));
    });
    openModalButtonRevision.addEventListener('click', function(){
        openModal(()=> addTask(tasksRevision, revisionTasksContainer));
    });
    openModalButtonDone.addEventListener('click', function(){
        openModal(()=> addTask(tasksDone, doneTasksContainer));
    });
    saveTaskButton.addEventListener('click', function() {
        if (currentSaveTaskFunction) currentSaveTaskFunction(); 
    });
    closeModalButton.addEventListener('click', closeModal);
    cancelTaskButton.addEventListener('click', closeModal);
}