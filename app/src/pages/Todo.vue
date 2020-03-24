<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary column">
      <q-input v-model="newTodo" @keyup.enter="addTodo()" square bg-color="white" placeholder=" New todo" dense>
        <template>
          <q-btn color="primary" round dense flat icon="add" title="add new" @click="addTodo()"/>
        </template>
        <template v-slot:append>
          <q-btn round dense flat color="red" icon="delete" title="delete all" @click="deleteAll()"/>
        </template>
      </q-input>
    </div>
    <q-list separator bordered class="bg-white">
      <q-item v-for="(todo,index) in this.$store.state.todos" :key="index"
              @click="updateTodoState(todo,index)"
              clickable
              v-ripple
              :class="[todo.todoState?'bg-blue-1 done': '']">
        <q-item-section avatar>
          <q-checkbox v-model="todo.todoState" color="primary" class="no-pointer-events"/>
        </q-item-section>
        <q-item-section>
          <q-input v-model="todo.title" :disable="!todo.isEditing" borderless :value="todo.title"
                   :class="[ !todo.isEditing?'view':'', todo.todoState?'done':'']"
                   @keyup.enter="updateTodo(todo,index), todo.isEditing=false"/>
        </q-item-section>
        <q-item-section side>
          <q-btn flat round dense color="primary" icon="edit" @click="todo.isEditing = true"/>
        </q-item-section>
        <q-item-section v-if="todo.todoState" side>
          <q-btn flat round dense color="primary" icon="delete" @click.stop="deleteTodo(todo,index)"/>
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!this.$store.state.todos.length" class="no-todos absolute-center">
      <q-icon name="check" color="primary" size="100px"/>
      <div class="text-h5 text-primary text-center"> No Todos</div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      newTodo: ''
    }
  },
  mounted () {
    this.$store.dispatch('fetchTodos')
  },
  methods: {
    deleteTodo (todo, index) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to delete this item?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$store.dispatch('deleteTodo', {
          todo: todo,
          index: index
        })
        this.$q.notify({
          message: 'Item deleted.',
          color: 'primary'
        })
      })
    },
    addTodo () {
      if (this.newTodo) {
        this.$store.dispatch('addTodo', this.newTodo)
        this.newTodo = ''
      }
    },
    updateTodoState (todo, index) {
      this.$store.dispatch('updateTodo', {
        _id: todo._id,
        title: todo.title,
        todoState: !todo.todoState,
        index: index
      })
    },
    updateTodo (todo, index) {
      this.$store.dispatch('updateTodo', {
        _id: todo._id,
        title: todo.title,
        todoState: todo.todoState,
        index: index
      })
    },
    deleteAll () {
      if (this.$store.state.todos.length) {
        this.$q.dialog({
          title: 'Confirm',
          message: 'Would you like to delete all items?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$store.dispatch('deleteAll')
          this.$q.notify({
            message: 'All items deleted.',
            color: 'primary'
          })
        })
      }
    }
  }
}
</script>
<style lang="scss">
  .done .q-item__section .column .q-item__section--main .justify-center {
    .label {
      text-decoration: line-through !important;
      color: grey !important;
    }
  }

  label.done {
    text-decoration: line-through;
    color: grey;
  }

  .view {
    border-color: transparent;
    background-color: initial;
    color: initial;
    pointer-events: none;
  }

  .no-todos {
    opacity: 0.5;
  }
</style>
