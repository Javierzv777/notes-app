import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import S from './CreateNote.module.css';
import { useDispatch } from 'react-redux'
import { setNotes, addNote } from '../../redux/actions'
import { useAuth0 } from "@auth0/auth0-react";
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';


export default function CreateNote() {
    var today = new Date();
    const navigate = useNavigate()
    const { user, loginWithRedirect } = useAuth0();
    const dispatch = useDispatch();
    const [categories, setCategories] = React.useState(['Family',
    'Study',
    'Clients',
    'Job',
    'Events',
    'Rutine',
    'Friends']) 
    const [note, setNote] = React.useState({
        date: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate(),
        header:'',
        body: '',
        categories: []
    })
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        
          
        dispatch(addNote({...note, email: user.email}))
        
        
        
        setNote({body:'', category:'', header:''})
        swal({
          title: `Notificación editada`,
          icon: 'success',
        }); 
        navigate('/myNotes')
        
    }
    const handleOnChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

    const handleOnChangeCategory = (cat) => {
      setCategories([...categories.filter(category => category !== cat)])
      setNote({
          ...note,
          categories: [...note.categories, cat]
      })
  }

  const deleteCategory = (id) =>{
    let catFound = note.categories.find((cat, i) => i === id)
   
    setCategories([...categories, catFound])
    setNote({
      ...note,
      categories: [...note.categories.filter(cat => cat !== catFound)]
    })
  }

  return (
    <Container className={S.Small_Container}>
      <div className={S.Form_Div}>
        <h1 className="my-3">New Note</h1>
        <Form onSubmit={(e)=>{
          user?.email
          ? handleOnSubmit(e)
          : loginWithRedirect()
          }}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Header</Form.Label>
            <Form.Control
            value={note.header}
            name='header'
             onChange={(e)=> handleOnChange(e)}
            type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Description</Form.Label>
            <Form.Control 
            value={note.body}
            name='body'
            onChange={(e)=> handleOnChange(e)}
            as="textarea" rows={5} />
          </Form.Group>
          <Form.Label>Categories</Form.Label>
          <br />
          {note?.categories?.length > 0 && note.categories.map( (cat, id)=> (
            <span style={{marginRight:12 +'px'}}>{cat} <label onClick={()=> deleteCategory(id)}>X</label></span>
          ))}
          <Form.Select
          value={note.category}
          name='category'
          onChange={(e)=>handleOnChangeCategory(e.target.value)}
          aria-label="Default select example">
            <option value="" default >__chose a category</option>
            {categories.map((cat, i) => <option key={i}>{cat}</option>)}
          </Form.Select>
          <div className="mb-3">
          </div>
          <div className="mb-3">
            <Button type="submit">Add</Button>
          </div>
          <div className="mb-3">
          </div>
        </Form>
      </div>
    </Container>
  );
}
