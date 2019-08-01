import React, { Component } from 'react'
import axios from '../config/axios'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Home extends Component {
    state = {
        tasks: []
    }

    addTask = (userid) => {
        const description = this.task.value
        console.log(userid);
        

        // Post task baru
        axios.post(
            '/tasks/' + userid,
            {
                description
            }
        ).then(() => {
            // Get tasks
            this.getTasks()
        })

    }
    changeTask = (taskid) => {
        axios.patch(
            `/tasks/${this.props.userid}/${taskid}`
        ).then(() => {
            this.getTasks()
        })

    }

    getTasks = () => {
        axios.get(
            '/tasks/' + this.props.userid
        ).then(res => {
            this.setState({tasks: res.data})
        })
    }

    componentDidMount(){
        // Get Tasks
        this.getTasks()
    }

    renderTasks = () => {
        return this.state.tasks.map(task => {
            if(!task.completed){
                return (
                    <li className='list-group-item d-flex justify-content-between'>
                        <span>{task.description}</span>
                        <span>
                            <button 
                                className='btn btn-outline-primary'
                                onClick={() => {this.changeTask(task._id)}}
                            >
                                Done
                            </button>
                        </span>
                    </li>
                )
            }

            return (
                <li className='list-group-item d-flex justify-content-between bg-warning'>
                    <span>{task.description}</span>
                    <span>
                    <button 
                        className='btn btn-outline-primary'
                        onClick={() => {this.changeTask(task._id)}}
                    >
                        Belum Selesai
                    </button>
                    </span>
                </li>
            )
        })
    }

    render() {
        // Jika user sudah login
        if(this.props.userid){
            return (
                <div className="container">
                        <h1 className="display-4 text-center animated bounce delay-1s">List Tasks</h1>
                        <form className="form-group mt-5">
                            <input type="text" className="form-control" placeholder="What do you want to do ?" ref={input => this.task = input}/>
                        </form>
                        <button type="submit" className="btn btn-block btn-primary mt-3"
                        onClick={() => this.addTask(this.props.userid)}>Up !</button>
                    
                        <ul className="list-group list-group-flush mb-5">
                            {this.renderTasks()}
                        </ul>
                        </div>
            )
        }

        return <Redirect to='/login'/>
        
    }
}

const mps = state => {
    return {
        userid: state.auth.id
    }
}

export default connect(mps)(Home)