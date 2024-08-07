const taskList = document.getElementById('task-list');
        const newTaskInput = document.getElementById('new-task-input');
        const addTaskButton = document.getElementById('add-task-button');
        const darkModeCheckbox = document.getElementById('dark-mode-checkbox');

        let tasks = loadTasks();
        renderTasks();

        addTaskButton.addEventListener('click', addTask);
        newTaskInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                addTask();
            }
        });
        darkModeCheckbox.addEventListener('change', toggleDarkMode);

        function addTask() {
            const newTaskText = newTaskInput.value.trim();
            if (newTaskText !== '') {
                tasks.push({ text: newTaskText, completed: false });
                newTaskInput.value = '';
                renderTasks();
                saveTasks();
            }
        }

        function deleteTask(index) {
            tasks.splice(index, 1);
            renderTasks();
            saveTasks();
        }

        function toggleTaskCompletion(index) {
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
            saveTasks();
        }

        function renderTasks() {
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${index})" aria-label="Marcar tarea como completada">
                    <span>${task.text}</span>
                    <button class="delete-button" onclick="deleteTask(${index})" aria-label="Eliminar tarea">Eliminar</button>
                `;
                if (task.completed) {
                    listItem.classList.add('completed');
                }
                taskList.appendChild(listItem);
            });
        }

        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        function loadTasks() {
            const storedTasks = localStorage.getItem('tasks');
            return storedTasks ? JSON.parse(storedTasks) : [];
        }

        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        }

        // Cargar el estado del modo oscuro al iniciar la página
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            darkModeCheckbox.checked = true;
        }