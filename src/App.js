import React from "react";
import "./App.css";

class App extends React.Component {
  
  constructor(props){
    super(props);
      this.state = {
        todoList:[],
        activeItem:{
          id:null,
          title:'',
          completed:false,
        },
        editing:false
      }
      this.fetchTasks = this.fetchTasks.bind(this)
      this.handleValueChange = this.handleValueChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.editTask = this.editTask.bind(this)
      this.deleteTask = this.deleteTask.bind(this)
      this.comNocom = this.comNocom.bind(this)
  };

  componentWillMount(){
    this.fetchTasks()
  }

  fetchTasks(){
    console.log('Fetching....')
    fetch('https://djpyapi.herokuapp.com/todo/task-list/')
    .then(response => response.json())
    .then(data =>
      this.setState({
        todoList:data
      }))
    .catch(err =>{
      console.log(err.message)
    })
  }

  handleValueChange(e){
    var name = e.target.name
    var value = e.target.value

    console.log('Name: ',name)
    console.log('Value: ',value)

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title:value
      }
    })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log('ITEM',this.state.activeItem)

    var url = 'https://djpyapi.herokuapp.com/todo/task-create/'


    if(this.state.editing == true){
      // Templete literals
      url = `https://djpyapi.herokuapp.com/todo/task-update/${this.state.activeItem.id}`
      this.setState({
        editing:false
      })
    }

    fetch(url,{
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(this.state.activeItem)
    }).then((response) =>{
      this.fetchTasks()
      this.setState({

        activeItem:{
        id:null,
        title:'',
        completed:false,
        }
      })
    }).catch(err =>{
      console.log(err.message)
    })
  }

  editTask(tasks){
    this.setState({
      activeItem:tasks,
      editing:true,
    })

  }


  deleteTask(task){
    fetch(`https://djpyapi.herokuapp.com/todo/task-delete/${task.id}`,{
      method:'DELETE',
      headers:{
        'Content-type':'application/json',
      },
    }).then((response) =>{
      this.fetchTasks()
    })
  }




  comNocom(task){
    task.completed = !task.completed

    var url = `https://djpyapi.herokuapp.com/todo/task-update/${task.id}`

    fetch(url,{
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify({'completed':task.completed,'title':task.title})
    }).then((response) =>{
      this.fetchTasks()
    })




    console.log('Task status',task.completed)
  }

  render() {
    var tasks = this.state.todoList
    var self = this
    return (
      <div className="container">
        
        <div id="task-container">
            <div id="form-wrapper">
                <form onSubmit={this.handleSubmit} id="form">
                  <div className="flex-wrapper">
                    <div style={{flex: 6}}>
                      <input onChange={this.handleValueChange} className="form-control" id="title" value={this.state.activeItem.title} type="text" placeholder="Add Task"></input>
                    </div>  

                    <div style={{flex: 1}}>
                      <input id="submit" className="btn btn-warning" type="submit" name="Add"></input>
                    </div>
                  </div>
                </form>
            </div>
            <div id="list-wrapper">
              {tasks.map(function(task,index){
                return(
                    <div key={index} className="task-wrapper flex-wrapper">

                      <div onClick={() => self.comNocom(task)} style={{flex:7}}>
                        {task.completed == false ?(
                          <span>{task.title}</span>
                          ) : (
                          <strike>{task.title}</strike>
                      )}
                      </div>

                      <div style={{flex:1}}>
                          <button onClick={() => self.editTask(task)} className="btn btn-sm btn-outline-info">Edit</button>
                      </div>

                      <div style={{flex:1}}>
                      <button onClick={() => self.deleteTask(task)} className="btn btn-sm btn-outline-dark delete">Delete</button>
                      </div>


                    </div>
                )
              })}
            </div>
        </div>


      </div>
    );
  }
}

export default App;
