import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ListAdminOrders, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'


function OrderListSreen({ history }) {

    const dispatch = useDispatch()

    const adminListOrder = useSelector(state => state.adminListOrder)
    const { loading, error, orders } = adminListOrder

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(ListAdminOrders())
        }else{
            history.push('/login')
        }
        

    }, [dispatch, history, userInfo])

    
    return (
        <div>
            <h1>Orders</h1>
            {loading ? (<Loader />)
                : error ?(<Message variant='dange'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm'> 
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.isPaid ? (
                                            order.paidAt.substring(0, 10)
                                        ): (  
                                            <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}
                                        </td>
                                        <td>{order.isDelivered ? (
                                            order.deliveredAt.substring(0, 10)
                                        ): (  
                                            <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button variant='light' className='btn-sm'>
                                                    Details
                                                </Button>
                                            </LinkContainer>

                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
        </div>
    )
}


export default OrderListSreen
