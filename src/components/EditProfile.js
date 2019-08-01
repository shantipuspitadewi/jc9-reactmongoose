import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from '../config/axios';

class EditProfile extends Component {
    state = {
        data:null
    }

    onButtonClick = () => {

        const formData = new FormData()

        const avatar = this.avatar.files[0]
        const data_name = this.name.value
        const data_email = this.email.value
        const data_age = this.age.value
        const data_password = this.password.value

        // field
        formData.append('ravatar', avatar)
        formData.append('name', data_name)
        formData.append('email', data_email)
        formData.append('age', data_age)
        formData.append('password', data_password)

        axios.patch(
            '/users/' + this.props.userid,
            formData
        ).then (res => {
            console.log(res.data)
        })
        
    }

    componentDidMount() {
        // Get Profile
        axios.get('/users/' + this.props.userid)
            .then(res => {
                this.setState({data: res.data});
                
            })
    }

    render() {
        if(this.state.data){
            var {name, email, age} = this.state.data

            return (
                    <div className='container'>
                        <form>
                            <h1>Edit Profile</h1>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input ref={input => this.name = input} type="text" className="form-control" id="name" defaultValue={name}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input ref={input => this.email = input} type="email" className="form-control" id="email" defaultValue={email}/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="age">Age</label>
                                <input ref={input => this.age = input} type="number" className="form-control" id="age" defaultValue={age}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input ref={input => this.password = input} type="password" className="form-control" id="password"/>
                            </div>
                            <div className='custom-file'>
                                <input type='file' ref={input => {this.avatar = input}}/>
                            </div>
                        </form>
                        
                        <button
                            className='btn btn-primary'
                            onClick={this.onButtonClick}
                        >Update Profile</button>
                    </div>
            )
        }
        return <h1>Loading</h1>
        
    }
}
const mps = state => {
    return {
        userid: state.auth.id
    }
}
export default connect(mps)(EditProfile)