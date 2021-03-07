import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetail, updateUserAdmin } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'



function EditUserScreen({ match, history }) {

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetail = useSelector(state => state.userDetail)
    const { error, loading, user } = userDetail

    const updateUser = useSelector(state => state.updateUser)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = updateUser

   


    useEffect(()  => {

        if(successUpdate){
            dispatch({type:USER_UPDATE_RESET})
            history.push('/admin/userlist')
        }else {
            if(!user.name || user._id !== Number(userId)){
                dispatch(getUserDetail(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
                
            }

        }
       
    
    }, [user, userId, successUpdate])


    const submitHandler = (e) => {
        e.preventDefault()
        if((name.length !== 0) && (email.length !== 0)){
            dispatch(updateUserAdmin({
                'id': user._id,
                'name': name,
                'email': email,
                'isAdmin': isAdmin
            }))
            
        } else{
            setMessage('Field Empty !')
            console.log('Error:', error, 'ErrorUpdate:', errorUpdate, 'Message:', message)
        
        }
        
        
        
    }

    return (
        <div>
            <Link to='/admin/userlist'>
                Go Back
            </Link>
                <FormContainer>
                    <h1>Edit User</h1>
                    {loadingUpdate && <Loader/>}
                    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                    {message && <Message variant='danger'>{message}</Message>}
                    {loading ? <Loader/> : error ? <Message variant='danger'>{message}</Message>
                    : (

                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Your Name</Form.Label>
                                <Form.Control
                                    
                                    type='name'
                                    placeholder='Enter your Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}>

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>E-mail Adress</Form.Label>
                                <Form.Control
                                    
                                    type='email'
                                    placeholder='Enter your E-mail'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}>

                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='isadmin'>
                                <Form.Check
                                    
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}>

                                </Form.Check>
                            </Form.Group>
                            
                            <Button type='submit' variant='primary'>
                                Update 
                            </Button>
                        </Form>
            )} 
            </FormContainer>
            
        </div>
    )
}

export default EditUserScreen
