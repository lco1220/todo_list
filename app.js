const btn = document.querySelector('.input-btn');
const inputTodo = document.getElementById('input-td');
const todo_container = document.querySelector('[data-lists]');
const todo_template = document.getElementById('todo-template');
let storedTodos;

const getTodo = () => {
  if(localStorage.getItem('storedTodos') === null ) {
    storedTodos = [];
  } else {
    storedTodos = JSON.parse(localStorage.getItem('storedTodos'));
  }

  return storedTodos;
}

const addTodo = todo => {

  const currentTodos = getTodo();
  currentTodos.push(todo);
  localStorage.setItem('storedTodos', JSON.stringify(currentTodos));
}

const updateTodos = (target) => {
  const currentTodos = getTodo();
  currentTodos.forEach(todo => {
    if(todo.id === target.id) {
      todo.completed = target.checked
    }
  })
  localStorage.setItem('storedTodos', JSON.stringify(currentTodos))
}

const removeTodo = (target) => {
  const currentTodos = getTodo();
  currentTodos.forEach((todo, index) => {
    if(todo.id === target) {
      currentTodos.splice(index, 1)
    }
  })
  localStorage.setItem('storedTodos', JSON.stringify(currentTodos))

}

const createTodo = todo => {
  return {
    id: Date.now().toString(),
    todo,
    completed: false
  };
}

const templateTodoItem = item => {

  const todo_element = document.importNode(todo_template.content, true);
  const todo_item = todo_element.querySelector('.todo-item');
  const checkbox = todo_element.querySelector('.input-check');
  checkbox.id = item.id;
  checkbox.checked = item.completed;
  const label = todo_element.querySelector('.todo-content');
  const span = todo_element.querySelector('.content-inner')
  label.htmlFor = item.id
  span.append(item.todo)
  const button = todo_element.querySelector('.todo-delete');
  const span_icon = todo_element.querySelector('.material-icons');

  todo_container.classList.add('todo-list-height')
  todo_container.appendChild(todo_element);
}

const renderTodoApp = () => {

  const currentTodos = getTodo();
  currentTodos.forEach(todo => templateTodoItem(todo));
}

todo_container.addEventListener('click' , e => {
  if((e.target.tagName.toLowerCase() === 'label') ||  e.target.className.toLowerCase() === 'content-inner') {
    updateTodos(e.target)
  } else  if(e.target.tagName.toLowerCase() === 'span') {
    e.target.parentElement.parentElement.classList.add('todo-item-exit')
    e.target.parentElement.parentElement.addEventListener('animationend', () => {
      e.target.parentElement.parentElement.remove();
    })
    
    removeTodo(e.target.parentElement.previousElementSibling.htmlFor);
  } else {
    return
  }

})



btn.addEventListener('click', (e) => {
  e.preventDefault()

  const todoName = inputTodo.value;
  if(todoName == null || todoName == "") {
    return
  }
  const todo = createTodo(todoName);
  addTodo(todo);
  templateTodoItem(todo);

  inputTodo.value = '';

})

renderTodoApp();