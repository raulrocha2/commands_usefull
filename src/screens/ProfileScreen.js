import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetail, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen({ history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userDetail = useSelector(state => state.userDetail)
    const { error, loading, user } = userDetail

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success }= userUpdateProfile

    useEffect(()  => {
        if(!userInfo) {
            history.push('/login')
        }else{
            if(!user || !user.name || success){
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetail('profile'))

            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])


    const submitHandler = (e) => {
        e.preventDefault()
        if (password != passwordConfirm) {
            setMessage('Password do not match !')
        } else {
            dispatch(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
           

        }
        
    }

    return (
        <Row>
            <Col md={3}>
                <h1>User Profile</h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter your Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email'>
                        <Form.Label>E-mail Adress</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter your E-mail'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Label>PassWord</Form.Label>
                        <Form.Control
                            
                            type='password'
                            placeholder='Enter your Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm PassWord</Form.Label>
                        <Form.Control
                            
                            type='password'
                            placeholder='Enter your Password'
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>
                        Save 
                    </Button>
                </Form>
            </Col>
            <Col md={6}>
                <h2>My Order </h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
