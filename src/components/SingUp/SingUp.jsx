import React from 'react';
import { Link } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap';
import S from './CreateNote.module.css';

export default function CreateNote() {
 


  return (
    <Container className={S.Small_Container}>
      <div className={S.Form_Div}>
        <h1 className="my-3">Escribe una Nota</h1>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Header</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" required />
          </Form.Group>
          <div className="mb-3">
            <Button variant="success" type="submit">
              Iniciar con Google
            </Button>
          </div>
          <div className="mb-3">
            <Button type="submit">Iniciar sesion</Button>
          </div>
          <div className="mb-3">
           
          </div>
        </Form>
      </div>
    </Container>
  );
}
