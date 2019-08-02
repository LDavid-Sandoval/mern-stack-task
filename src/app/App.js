import React, { Component } from 'react';

class App extends Component {

    constructor (){
        super();
        this.state = {
            _id: '',
            title: '',
            description: '',
            tasks: []
        };
        this._handleChange =this._handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }
    fetchTask(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => { 
                this.setState({tasks: data});
            });
    }

    addTask(e) {
        if(this.state._id){
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: data.status });
                    this.setState({_id:'', title: '', description: ''});
                    this.fetchTask();
                })
                .catch(err => console.log(err) );
        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body:JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: data.status });
                    this.setState({title: '', description: ''});
                    this.fetchTask();
                })
                .catch(err => console.log(err) );
        }
        e.preventDefault();       
    }

    updateTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    _id: data._id,
                    title: data.title,
                    description: data.description
                })
        });
    }

    deleteTask(id) {
        if(confirm('Estas seguro de querer eliminar el elemento')){
            fetch('/api/tasks/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: data.status});
                    this.fetchTask();
                });
        }
    }

    _handleChange(e) {
        const { name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    componentDidMount(){
        this.fetchTask();
    }

    render(){
        return (
            <div>
                <nav className="blue-grey darken-1" >
                    <div className="nav-wrapper container">
                        <a href="/" className="brand-logo">MERN Stack</a>
                        <ul className="right hide-on-med-and-down">

                        </ul>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field cols12">
                                                <input name="title" onChange={this._handleChange} type="text" placeholder="Task title" value={this.state.title}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field cols12">
                                                <textarea onChange={this._handleChange} name="description" placeholder="Description" className="materialize-textarea" value={this.state.description}> 
                                                </textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn blue darken-2">Enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="white col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn btn blue darken-2" style={{margin: '4px'}} onClick={ () => this.updateTask(task._id)}>
                                                            <i className="material-icons" style={{color: 'white'}}>edit</i>
                                                        </button>
                                                        <button className="btn btn blue darken-2" onClick={() => this.deleteTask(task._id)}>
                                                            <i className="material-icons" style={{color: 'white'}}>delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>            
            </div>
        )
    }
}

export default App;