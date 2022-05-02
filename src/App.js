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



  render() {
    var tasks = this.state.todoList
    return (
      <div className="container">
        
        <div id="task-container">
            <div id="form-wrapper">
                <form id="form">
                  <div className="flex-wrapper">
                    <div style={{flex: 6}}>
                      <input className="form-control" id="title" type="text" placeholder="Add Task"></input>
                    </div>  

                    <div style={{flex: 1}}>
                      <input id="submit" className="btn btn-warning" type="submit" name="Add"></input>
                    </div>
                  </div>
                </form>
            </div>
            <div id="list-wrapper">
              {tasks.map(function(tasks,index){
                return(
                    <div key={index} className="task-wrapper flex-wrapper">


                      <div style={{flex:7}}>
                          <span>{tasks.title}</span>
                      </div>

                      <div style={{flex:1}}>
                          <button className="btn btn-sm btn-outline-info">Edit</button>
                      </div>

                      <div style={{flex:1}}>
                      <button className="btn btn-sm btn-outline-dark delete">Delete</button>
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
