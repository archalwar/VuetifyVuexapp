import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {   
    search: null,
    tasks: [
      { id: 1, title: "Wake up", done: false, dueDate: '2021-2-26' },
      { id: 2, title: "Get Bananas", done: false,  dueDate: '2021-2-27' },
      { id: 3, title: "Eat Bananas", done: false,  dueDate: null }
    ],
    snackbar: {
      show: false,
      text: 'Hey from Snackbar'
    }
  },
  mutations: {
    setSearch(state, value){
      state.search = value
    },
    addTask(state, newTaskTitle){  
      let newTask = { 
                      id: Date.now(),
                      title: newTaskTitle, 
                      done:false,
                      dueDate: null
                    }
  
      state.tasks.push(newTask) 
      },

      doneTask(state, id) {
        let task = state.tasks.filter((task) => task.id === id)[0]
        task.done = !task.done
      },

      deleteTask(state, id){
        state.tasks = state.tasks.filter(task => task.id != id)
      },
      updateTaskTitle(state, payload){
        let task = state.tasks.filter(task => task.id ==payload.id)[0]
        task.title = payload.title
      },
      updateTaskDueDate(state, payload){
        let task = state.tasks.filter(task => task.id ==payload.id)[0]
        task.dueDate = payload.dueDate
      },
      showSnackBar(state, text){
        let timeout = 0

        if(state.snackbar.show){
          state.snackbar.show = false
          timeout = 300
        }

        setTimeout(()=> {
          state.snackbar.show = true
          state.snackbar.text = text
        }, timeout)

      },

      hideSnackbar(state){
        state.snackbar.show = false
      }

  },
  actions: {

    addTask({commit}, newTaskTitle){
        commit('addTask', newTaskTitle)
        commit('showSnackBar', 'Task Added')
    },
    
    //calling deleteTask from mutations
    deleteTask({commit}, id){
      commit('deleteTask', id)
      commit('showSnackBar', 'Task Deleted')
    },

    updateTaskTitle({commit}, playload){
      commit('updateTaskTitle', playload)
      commit('showSnackBar', 'Task Updated')
    },
    updateTaskDueDate({commit}, playload){
      commit('updateTaskDueDate', playload)
      commit('showSnackBar', 'Due Date updated!')
    }

  },
  getters: {
      taskFiltered(state){
        if(!state.search){
          return state.tasks
        }
        else{
          return state.tasks.filter( task => 
              task.title.toLowerCase().includes(state.search.toLowerCase())
            )
        }
      }
  },
  modules: {
  }
})
