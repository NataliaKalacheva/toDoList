const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7", //уникальный id
    completed: true, //завершена ли задача
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n", //текст
    title: "Eu ea incididunt sunt consectetur fugiat non." //заголовок
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non."
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
  }
];

// Чтобы добавить новую задачу при запонении формы нам нужно:
// 1) Найти форму
// 2) Обработать введенные данные
// 3) При сабмите закинуть данные в объект
// 4) Добавить задачу вверх разметки

//Добавляем все задачи из объекта в разметку

(function(arrOfTasks) {
  // самовызывающаяся функция, чтобы закрыть переменные от глобальной области видимости
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    //Получаем из массива объектов, объект объектов,
    acc[task._id] = task; //где ключ - id элемента массива, а значение весь объект
    return acc;
  }, {});

  // Elements UI
  const listContainer = document.querySelector(
    ".tasks-list-section .list-group"
  );
  const form = document.forms["addTask"]; //document.forms - хранит коллекцию всех форм на странице и получаем доступ по значению атрибута name
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"]; //получаем доступ по имени или айди

  // Events
  renderAllTasks(objOfTasks);
  form.addEventListener("submit", onFormSubmitHandler); //вешаем на форму событие сабмита
  listContainer.addEventListener("click", onDeleteHandler);

  //отрисовываем все задачи
  function renderAllTasks(tasksList) {
    if (!tasksList) {
      // если задач нет, то прерываем выполнение функции
      console.error("Передайте список задач!");
      return;
    }

    const fragment = document.createDocumentFragment(); //создаем фрагмент будущего списка

    Object.values(tasksList).forEach(task => {
      //Перебираем все задачи
      const li = listItemTemplate(task);
      fragment.appendChild(li);
      //Возвращаем DOM объект одного элемента задачи
    });
    listContainer.appendChild(fragment); //Добавляем весь фрагмент на страницу
  }
  // создаем один элемент LI на переданном объекте
  function listItemTemplate({ _id, title, body } = {}) {
    //генерируем разметку одного элемента списка
    //сразу деструкторизировали получаемый в качестве аргумента объект
    const li = document.createElement("li");

    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2"
    );
    li.setAttribute("data-task-id", _id); // добавляем элементу айдишник в атрибут

    const span = document.createElement("span");
    span.textContent = title; //задаем title из объекта
    span.style.fontWeight = "bold";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");

    const article = document.createElement("p");
    article.textContent = body;
    article.classList.add("mt-2", "w-100");

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(article);

    return li; //возвращаем один наполненный li
  }

  //событие сабмита, читаем данные пользователя
  function onFormSubmitHandler(event) {
    event.preventDefault(); //Прекращаем стандартную отправку формы
    const titleValue = inputTitle.value; // в value хранится текущее значение, которое записано в этом inputе
    const bodyValue = inputBody.value;

    //проверка, что данные не пустые

    if (!titleValue || !bodyValue) {
      alert("Пожалуйста введите title и body");
      return;
    }

    const task = createNewTask(titleValue, bodyValue); //передаем введенные данные в функцию по созданию новой задачи
    const listItem = listItemTemplate(task); // получаем новый DOM элемент
    listContainer.insertAdjacentElement("afterbegin", listItem); //вставляем узел в начало списка
    form.reset(); //сбрасываем состояние формы до начального
  }
  //функция создает новую задачу
  function createNewTask(title, body) {
    const newTask = {
      title, //cпособ объявления одноименных св-в в объекте
      body,
      completed: false,
      _id: `task-${Math.random()}`
    };

    objOfTasks[newTask._id] = newTask;
    return { ...newTask }; //поверхностное копирование нового объекта
  }

  //удаляем задачу
  function deleteTask(id) {
    const title = objOfTasks[id].title;
    const isConfirm = confirm(
      `Вы уверены, что хотите удалить эту задачу: ${title}?`
    ); //подтверждение удаления задачи

    if (!isConfirm) return isConfirm; //возвращаем false
    delete objOfTasks[id];
    return isConfirm;
  }

  function deleteTaskFromHTML(confirmed, el) {
    //убираем в отдельную функцию, т.к. приложение может усложняться
    if (!confirmed) return;
    el.remove();
  }

  //Мы не можем повесить обработчик на кнопку, т.к. блоки генерируются динамически, с помощью JS. Нам поможет делегирование событие на родителя, и проверка на таргет.
  function onDeleteHandler({ target }) {
    //деструктурировали объект event(event.target)
    if (target.classList.contains("delete-btn")) {
      const parent = target.closest("[data-task-id]"); //ищем ближайший атрибут с айдишником
      const id = parent.dataset.taskId; //получили id
      const confirmed = deleteTask(id);
      deleteTaskFromHTML(confirmed, parent);
    }
  }
})(tasks);
