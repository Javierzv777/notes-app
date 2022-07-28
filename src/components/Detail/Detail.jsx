import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import S from './Detail.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import calendar from '../../assets/img/calendar.png'

export default function Detail() {
    const navigate = useNavigate()
    const { user, isAuthenticated, isLoading } = useAuth0();
    const dispatch = useDispatch();
    const note = useSelector(state => state.note)
    


  return (
    <Container className={S.Small_Container}>
      <div className={S.Form_Div}>
        <h1 className="my-3">your Note</h1>
        <Form onSubmit={(e)=>{
          e.preventDefault();
          navigate("/updatenote")
        }}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Header</Form.Label>
            <Form.Control
            style={{
              backgroundColor:"beige",
              borderColor:"white"}}
            value={note.header}
            name='header'
            type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Description</Form.Label>
            <Form.Control 
            style={{
              backgroundColor:"beige",
              borderColor:"white"}}
            value={note.body}
            name='body'
            as="textarea" rows={5} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
         
            <img style={{maxWidth: 40+"px"}} src={calendar} alt='calendar' />
            <Form.Label>-{note?.date}</Form.Label>
          </Form.Group>
          <Form.Label>Categories</Form.Label>
          
            {note?.categories?.map(item =>(
             
             <Form.Control 
             style={{
               backgroundColor:"beige",
               borderColor:"white"}}
             value={item.nameCategory}
             name='body'
              />
            ))}
          
          <div className="mb-3">
        
          </div>
          <div  className="mb-3">
            <Button type="submit">edit</Button>
          </div>
          <div className="mb-3">
           
          </div>
        </Form>
      </div>
    </Container>
  );
}
