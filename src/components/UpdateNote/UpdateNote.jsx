import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import S from './UpdateNote.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from "@auth0/auth0-react";
import { updateNote, setNote } from '../../redux/actions';
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';

export default function UpdateNote() {
    const { user,  } = useAuth0();
    const dispatch = useDispatch();
    const note = useSelector(state => state.note)
    const navigate = useNavigate()
    const [categories, setCategories] = React.useState(['Family',
    'Study',
    'Clients',
    'Job',
    'Events',
    'Rutine',
    'Friends']) 

    React.useEffect(()=>{
      note.categories?.forEach(cat =>{
        setCategories([...categories.filter(category => category !== cat.nameCategory)])
      })
    },[note?.categories])
    
    const handleOnSubmit = (e) => {
        e.preventDefault()
        user?.email&&dispatch(updateNote(note))
        swal({
            title: `Notificación editada`,
            icon: 'success',
          });  
        navigate('/myNotes')
    }
    const handleOnChange = (e) => {
        dispatch(setNote({
            ...note,
            [e.target.name]: e.target.value
        }))
    }

    const deleteCategory = (name) =>{
      let catFound = note.categories.find((cat, i) => cat.nameCategory === name)
     
      setCategories([...categories, catFound.nameCategory])
      dispatch(setNote({
        ...note,
        categories: [...note.categories.filter(cat => cat.nameCategory !== catFound.nameCategory)]
      }))
    }

    const handleOnChangeCategory = (cat) => {
      setCategories([...categories.filter(category => category !== cat)])
      dispatch(setNote({
          ...note,
          categories: [...note.categories, {nameCategory: cat}]
      }))
    }
  return (
    <Container className={S.Small_Container}>
      <div className={S.Form_Div}>
        <h1 className="my-3">Edit your Note</h1>
        <Form onSubmit={(e)=>handleOnSubmit(e)}>
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
          <br/>
          {note?.categories?.length > 0 && note.categories.map( (cat, id)=> (
            <span style={{marginRight:12 +'px'}}>{cat.nameCategory} <label onClick={()=> deleteCategory(cat.nameCategory)}>X</label></span>
          ))}
          <Form.Select
          value={note.category}
          name='category'
          onChange={(e)=>handleOnChangeCategory(e.target.value)}
          aria-label="Default select example">
            <option value="" default disabled>__chose a category</option>
           {categories?.map((cat, id)=> <option key={id}>{cat}</option>)}
          </Form.Select>
          <div className="mb-3">
        
          </div>
          <div className="mb-3">
            <span className={S.button}>
              <Button  onClick={()=>navigate("/mynotes")} className="btn-danger" >Cancel</Button>
            </span>
            <Button type="submit">Update</Button>

          </div>
          <div className="mb-3">
           
          </div>
        </Form>
      </div>
    </Container>
  );
}
