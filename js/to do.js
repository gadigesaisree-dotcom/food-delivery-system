let tasks = [];

function addTask() {
    const text = document.getElementById("taskInput").value.trim();
    const date = document.getElementById("taskDate").value;

    if (text === "" || date === "") {
        alert("Please enter task and date");
        return;
    }

    const task = { text, date, completed: false };
    tasks.push(task);

    document.getElementById("taskInput").value = "";
    document.getElementById("taskDate").value = "";

    displayTasks(tasks);
}

function displayTasks(taskArray) {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    taskArray.forEach((task, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => {
            task.completed = checkbox.checked;
            li.classList.toggle("completed");
        };

        const span = document.createElement("span");
        span.textContent = `${task.text} (${task.date})`;

        const delBtn = document.createElement("button");
        delBtn.textContent = "X";
        delBtn.className = "delete-btn";
        delBtn.onclick = () => {
            tasks.splice(index, 1);
            displayTasks(tasks);
        };

        if (task.completed) li.classList.add("completed");

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function filterTasks() {
    const from = document.getElementById("fromDate").value;
    const to = document.getElementById("toDate").value;

    if (!from || !to) {
        alert("Select both dates");
        return;
    }

    const filtered = tasks.filter(task => task.date >= from && task.date <= to);
    displayTasks(filtered);
}

function showAllTasks() {
    displayTasks(tasks);
}
