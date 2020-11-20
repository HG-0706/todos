<template>
  <div id="app">
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          autofocus=""
          autocomplete="off"
          placeholder="What needs to be done?"
          v-model="newTodoRef"
          @keyup.enter="addTodo"
        />
      </header>
      <section class="main" v-show="todoRef.length">
        <input 
          id="toggle-all" 
          class="toggle-all" 
          type="checkbox" 
          v-model="allDoneRef"
          />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li 
            class="todo"
            v-for="(todo) in filterTodosRef"
            :key="todo.id"
            :class="{ 
              completed: todo.completed, 
              editing: todo === editingTodoRef
              }"
            >
            <div class="view">
              <input class="toggle"  type="checkbox" v-model="todo.completed"/>
              <label @dblclick="editTodo(todo)" >{{ todo.title }}</label>
              <button class="destroy" @click="todoDel(todo)"></button>
            </div>
            <input
              v-model="todo.title" 
              class="edit" 
              @keyup.enter="editDone(todo)"
              @keyup.esc="editCancel(todo)"
              type="text" 
              @blur="editDone(todo)"
              />
          </li>
        </ul>
      </section>
      <footer class="footer" v-show="todoRef.length">
        <span class="todo-count">
          <strong>{{ uncompletedTodo }}</strong>
          <span>item{{uncompletedTodo === 1 ? "": "s"}} left</span>
        </span>
        <ul class="filters">
          <li><a href="#/all" :class="{selected : showRef === 'all'}">All</a></li>
          <li><a href="#/active" :class="{selected : showRef === 'active'}">Active</a></li>
          <li><a href="#/completed" :class="{selected : showRef === 'completed'}">Completed</a></li>
        </ul>
        <button 
          class="clear-completed" 
          style="display: none" 
          v-show="completedTodo > 0"
          @click="todoDelAllComplete"
          >
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import  useTodoList  from './compsition/useTodoList'
import useNewtodo from './compsition/useNewtodo'
import useFilter from './compsition/useFilter'
import useEditTodo from './compsition/useEditTodo'
import useDelTodo from './compsition/useDelTodo'
export default {
  setup() {
    const { todoRef }= useTodoList();
    return {
      todoRef,
      ...useNewtodo(todoRef),
      ...useFilter(todoRef),
      ...useEditTodo(todoRef),
      ...useDelTodo(todoRef),
    };
  },
};
</script>
