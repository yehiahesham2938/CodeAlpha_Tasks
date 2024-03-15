function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    var li = document.createElement('li');
    
    var taskText = document.createElement('span');
    taskText.textContent = taskInput.value;
    taskText.classList.add('task-text');
    li.appendChild(taskText);

        var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-dark', 'mx-1');
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("class", "bi bi-trash");
    svg.setAttribute("viewBox", "0 0 16 16");
    var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z");
    svg.appendChild(path1);
    var path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z");
        svg.appendChild(path2);
    deleteBtn.appendChild(svg);

    deleteBtn.onclick = function() {
        taskList.removeChild(li);
    };

    li.appendChild(deleteBtn);


    var editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-dark', 'mx-1');

    var svgEdit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEdit.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgEdit.setAttribute("width", "16");
    svgEdit.setAttribute("height", "16");
    svgEdit.setAttribute("fill", "currentColor");
    svgEdit.setAttribute("class", "bi bi-pen");
    svgEdit.setAttribute("viewBox", "0 0 16 16");

    var pathEdit = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathEdit.setAttribute("d", "m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z");
    svgEdit.appendChild(pathEdit);

    editBtn.appendChild(svgEdit);

    var editText = document.createTextNode("");
    editBtn.appendChild(editText);

    editBtn.onclick = function() {
        var newText = prompt('Edit task:', taskText.textContent);
        if (newText !== null && newText.trim() !== '') {
            taskText.textContent = newText;
        }
    };
    li.appendChild(editBtn);



    var doneBtn = document.createElement('button');
    doneBtn.textContent = 'Done';
    doneBtn.classList.add('btn', 'btn-dark', 'mx-1');
    var isDone = false; 
    doneBtn.onclick = function() {
        if (isDone) {
            taskText.style.textDecoration = 'none'; 
        } else {
            taskText.style.textDecoration = 'line-through';
        }
        isDone = !isDone; 
    };
    li.appendChild(doneBtn);

    taskList.appendChild(li);

    taskInput.value = '';
}
