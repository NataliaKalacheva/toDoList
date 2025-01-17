const tasks = [
  // {
  //   _id: "5d2ca9e29c8a94095c1288e0",
  //   completed: false,
  //   body: "Some task..\r\n",
  //   title: "Task title 1."
  // },
  // {
  //   _id: "5d2ca9e2e03d40b3232496aa7",
  //   completed: true,
  //   body: "Some task.",
  //   title: "Task title 2."
  // },
  // {
  //   _id: "5d2ca9e29c8a94095564788e0",
  //   completed: false,
  //   body: "Some task.\r\n",
  //   title: "Task title 3."
  // }

];

(function(arrOfTasks) {

  let objOfTasks = arrOfTasks.reduce((acc, task) => {

    acc[task._id] = task;
    return acc;
  }, {});

  for (i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.includes("task-0")) {
      let task = JSON.parse(localStorage.getItem(key));
      let id = task._id;
      objOfTasks[id] = task;
    }
  }

  const themes = {
    default: {
      "--base-text-color": "#212529",
      "--base-bg": "#fff",
      "--header-bg": "#007bff",
      "--header-text-color": "#fff",
      "--default-btn-bg": "#007bff",
      "--default-btn-text-color": "#fff",
      "--default-btn-hover-bg": "#0069d9",
      "--default-btn-border-color": "#0069d9",
      "--danger-btn-bg": "#dc3545",
      "--danger-btn-text-color": "#fff",
      "--danger-btn-hover-bg": "#bd2130",
      "--danger-btn-border-color": "#dc3545",
      "--success-btn-bg": "#30b137",
      "--success-btn-text-color": "#fff",
      "--success-btn-hover-bg": "#229127",
      "--success-btn-border-color": "#21bb21",
      "--warning-btn-bg": "#ffc107",
      "--warning-btn-text-color": "#000",
      "--warning-btn-hover-bg": "#e0bd3f",
      "--warning-btn-border-color": "#ffc107",
      "--input-border-color": "#ced4da",
      "--input-bg-color": "#fff",
      "--input-text-color": "#495057",
      "--input-focus-bg-color": "#fff",
      "--input-focus-text-color": "#495057",
      "--input-focus-border-color": "#80bdff",
      "--input-focus-box-shadow": "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"
    },
    dark: {
      "--base-text-color": "#212529",
      "--base-bg": "#666",
      "--header-bg": "#343a40",
      "--header-text-color": "#fff",
      "--default-btn-bg": "#58616b",
      "--default-btn-text-color": "#fff",
      "--default-btn-hover-bg": "#292d31",
      "--default-btn-border-color": "#343a40",
      "--default-btn-focus-box-shadow":
        "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
      "--danger-btn-bg": "#b52d3a",
      "--danger-btn-text-color": "#fff",
      "--danger-btn-hover-bg": "#88222c",
      "--danger-btn-border-color": "#88222c",
      "--success-btn-bg": "#306b33",
      "--success-btn-text-color": "#fff",
      "--success-btn-hover-bg": "#214d23",
      "--success-btn-border-color": "#214d23",
      "--warning-btn-bg": "#a8a551",
      "--warning-btn-text-color": "#fff",
      "--warning-btn-hover-bg": "#8f8c38",
      "--warning-btn-border-color": "#8f8c38",
      "--input-border-color": "#ced4da",
      "--input-bg-color": "#e3e3e3",
      "--input-text-color": "#495057",
      "--input-focus-bg-color": "#fff",
      "--input-focus-text-color": "#495057",
      "--input-focus-border-color": "#78818a",
      "--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)"
    },
    light: {
      "--base-text-color": "#212529",
      "--base-bg": "#fff",
      "--header-bg": "#fff",
      "--header-text-color": "#212529",
      "--default-btn-bg": "#fff",
      "--default-btn-text-color": "#212529",
      "--default-btn-hover-bg": "#e8e7e7",
      "--default-btn-border-color": "#343a40",
      "--default-btn-focus-box-shadow":
        "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
      "--danger-btn-bg": "#f1b5bb",
      "--danger-btn-text-color": "#212529",
      "--danger-btn-hover-bg": "#ef808a",
      "--danger-btn-border-color": "#e2818a",
      "--success-btn-bg": "#b0d1b1",
      "--success-btn-text-color": "#000",
      "--success-btn-hover-bg": "#7ec481",
      "--success-btn-border-color": "#7ec481",
      "--warning-btn-bg": "#f0e7a8",
      "--warning-btn-text-color": "#000",
      "--warning-btn-hover-bg": "#d4d066",
      "--warning-btn-border-color": "#d4d066",
      "--input-border-color": "#ced4da",
      "--input-bg-color": "#fff",
      "--input-text-color": "#495057",
      "--input-focus-bg-color": "#fff",
      "--input-focus-text-color": "#495057",
      "--input-focus-border-color": "#78818a",
      "--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)"
    }
  };


  let lastSelectedTheme = localStorage.getItem("app_theme") || "default";


  // Elements UI
  const listContainer = document.querySelector(
    ".tasks-list-section .list-group"
  );
  const form = document.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"];
  const btnGroup = document.querySelector(".btn-group");
  const allTasksBtn = document.querySelector(".allTasks-btn");
  const activeTasksBtn = document.querySelector(".activeTasks-btn");
  const themeSelect = document.getElementById("themeSelect");


  // Events

  setTheme(lastSelectedTheme);
  renderAllTasks(objOfTasks);
  form.addEventListener("submit", onFormSubmitHandler);
  listContainer.addEventListener("click", onDeleteHandler);
  listContainer.addEventListener("click", onCompleteHandler);
  listContainer.addEventListener("click", onEditHandler);
  allTasksBtn.addEventListener("click", onAllTaskHandler);
  activeTasksBtn.addEventListener("click", onActiveTaskHandler);
  themeSelect.addEventListener("change", onThemeSelectHandler);




  function renderAllTasks(tasksList) {

    if (!tasksList) {
      console.error("Передайте список задач!");
      return;
    }

     if (Object.keys(tasksList).length === 0) {
        noTasks();
        return;
    }

    const fragment = document.createDocumentFragment();

    Object.values(tasksList).forEach(task => {

      const li = listItemTemplate(task);
      completeTaskInHTML(task.completed, li);
      fragment.appendChild(li);

    });
    listContainer.appendChild(fragment);
  }

  function listItemTemplate({ _id, title, body } = {}) {

    const li = document.createElement("li");

    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2"
    );
    li.setAttribute("data-task-id", _id);

    const span = document.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";
    span.classList.add("p-2");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");

    const article = document.createElement("p");
    article.textContent = body;
    article.classList.add("mt-2", "w-100", "p-2");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Completed";
    completeBtn.classList.add("btn", "btn-success", "ml-auto", "complete-btn");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("btn", "btn-primary", "ml-0", "edit-btn");

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(article);
    li.appendChild(editBtn);
    li.appendChild(completeBtn);

    return li;
  }


  function noTasks() {
    let p = document.createElement("p");
    p.textContent = "На сегодня задач еще нет";
    p.align = "center";
    p.classList.add("mt-5", "ml-auto", "no-tasks");
    document.querySelector(".form-section.mt-5").appendChild(p);
    if (btnGroup) {
      btnGroup.remove();
    }
  }

  function onFormSubmitHandler(event) {
    event.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert("Пожалуйста введите title и body");
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);

    listContainer.insertAdjacentElement("afterbegin", listItem);
    form.reset();
    if (listContainer.children.length === 1) {
      document.querySelector(".no-tasks").remove();
      listContainer.insertAdjacentElement("beforebegin", btnGroup);
    }
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`
    };

    objOfTasks[newTask._id] = newTask;

    localStorage.setItem(newTask._id, JSON.stringify(newTask));
    return { ...newTask };
  }

  //Удалить задачу
  function deleteTask(id) {
    const title = objOfTasks[id].title;
    const isConfirm = confirm(
      `Вы уверены, что хотите удалить эту задачу: ${title}?`
    );
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    localStorage.removeItem(id);

    return isConfirm;
  }

  function deleteTaskFromHTML(confirmed, el) {

    if (!confirmed) return;
    el.remove();
  }


  function onDeleteHandler({ target }) {

    if (target.classList.contains("delete-btn")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHTML(confirmed, parent);

      if (Object.values(objOfTasks).length === 0) {
        noTasks();
      }
    }
  }


  function onEditHandler({ target }) {
    if (target.classList.contains("edit-btn")) {
      const parent = target.closest("[data-task-id]");

      let title = parent.querySelector("span");
      let p = parent.querySelector("p");
      title.contentEditable = true;
      p.contentEditable = true;
      p.classList.add("border", "bg-light");
      title.classList.add("border", "bg-light");
      title.focus();
      saveEditableTask(parent, title, p);
    }
  }

  function saveEditableTask(el, title, p) {
    const id = el.dataset.taskId;
    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.classList.add("btn", "btn-primary", "ml-0", "save-btn");
    const editBtn = el.querySelector(".edit-btn");
    editBtn.replaceWith(saveBtn);

    saveBtn.addEventListener("click", function() {
      title.contentEditable = false;
      objOfTasks[id].title = title.innerHTML;
      p.contentEditable = false;
      objOfTasks[id].body = p.innerHTML;
      saveBtn.replaceWith(editBtn);
      p.classList.remove("border", "bg-light");
      title.classList.remove("border", "bg-light");
    });
  }


  function completeTask(id) {
    const title = objOfTasks[id].title;
    const isConfirm = confirm(`Задача ${title} выполнена!`);

    if (!isConfirm) return isConfirm;
    objOfTasks[id].completed = true;
    return isConfirm;
  }

  function completeTaskInHTML(confirmed, el) {
    if (!confirmed) return;
    el.style = "background: rgba(0,0,0,.1)";
    const completeBtn = el.querySelector(".complete-btn");
    const restoreBtn = document.createElement("button");
    restoreBtn.textContent = "Restore";
    restoreBtn.classList.add("btn", "btn-success", "ml-auto", "restore-btn");
    completeBtn.replaceWith(restoreBtn);

    restoreBtn.addEventListener("click", function({ target }) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      restoreTask(id);
      restoreTaskInHtml(el, restoreBtn, completeBtn);
    });
  }
  function restoreTask(id) {
    objOfTasks[id].completed = false;

  }

  function restoreTaskInHtml(el, restoreBtn, completeBtn) {
    restoreBtn.replaceWith(completeBtn);
    el.style = "background: rgb(255, 255, 255)";
  }
  function onCompleteHandler({ target }) {
    if (target.classList.contains("complete-btn")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      const confirmed = completeTask(id);

      completeTaskInHTML(confirmed, parent);
    }
  }

  function onAllTaskHandler() {
    listContainer.innerHTML = "";
    let allTasks = Object.values(objOfTasks);
    renderAllTasks(allTasks);
  }

  function onActiveTaskHandler() {
    listContainer.innerHTML = "";
    let activeTasks = Object.values(objOfTasks).filter(task => !task.completed);
    renderAllTasks(activeTasks);
  }

  function onThemeSelectHandler(e) {
    const selectedTheme = themeSelect.value;
    const isConfirmed = confirm(
      `Вы действительно хотите изменить тему: ${selectedTheme}`
    );
    if (!isConfirmed) {
      themeSelect.value = lastSelectedTheme;
      return;
    }
    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
    localStorage.setItem("app_theme", selectedTheme);
  }

  function setTheme(name) {
    const setectedThemObj = themes[name];
    Object.entries(setectedThemObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
})(tasks);
