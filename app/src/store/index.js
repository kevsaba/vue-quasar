import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const store = new Vuex.Store({
    state: {
      todos: []
    },
    mutations: {
      setTodos (state, todos) {
        state.todos = todos
      },
      addTodo (state, todo) {
        state.todos.push(todo)
      },
      deleteTodo (state, index) {
        state.todos.splice(index, 1)
      },
      updateTodo (state, payload) {
        const todo = state.todos[payload.index]
        todo.title = payload.title
        todo.todoState = payload.todoState
      },
      deleteAll (state) {
        state.todos = []
      }
    },
    actions: {
      fetchTodos ({ commit }) {
        axios.get('http://localhost/todos').then(resp =>
          resp.data
        ).then(todos => {
          commit('setTodos', todos)
        }
        )
      },
      addTodo ({ commit }, todo) {
        axios.post('http://localhost/todos', {
          title: todo
        }).then(resp => resp.data)
          .then(todo => commit('addTodo', todo))
      },
      deleteTodo ({ commit }, payload) {
        axios.delete('http://localhost/todos/' + payload.todo._id)
          .then(commit('deleteTodo', payload.index))
      },
      updateTodo ({ commit }, payload) {
        axios.put('http://localhost/todos/' + payload._id, {
          title: payload.title,
          todoState: payload.todoState
        })
          .then(commit('updateTodo', payload))
      },
      deleteAll ({ commit }) {
        axios.delete('http://localhost/todos').then(commit('deleteAll'))
      }
    },

    strict: process.env.DEV
  })
  return store
}
