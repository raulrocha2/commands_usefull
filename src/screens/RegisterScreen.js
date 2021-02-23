import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen({location, history}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister
    

    useEffect(()  => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password != passwordConfirm) {
            setMessage('Password do not match !')
        } else {
            dispatch(register(name, email, password))

        }
        
    }

    return (
        <FormContainer>
            <h1>Sing In</h1>
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
                        required
                        type='password'
                        placeholder='Enter your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Confirm PassWord</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter your Password'
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have a Account? <Link 
                                    to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                                    Sing In
                                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
