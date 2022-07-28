import React from 'react';
import S from './MyNotes.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNote, deleteNote, setNotes, updateNote } from '../../redux/actions';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import arrow from '../../assets/img/leftarrow.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert'
import { useAuth0 } from "@auth0/auth0-react";
import archive from '../../assets/img/upload.png'
import blackFlag from '../../assets/img/flag.png'
import redFlag from '../../assets/img/red-flag.png'
import del from '../../assets/img/trash-solid.svg'
import edit from '../../assets/img/file-pen-solid.svg'

export default function MyNotes() {
  const [checkbox, setCheckbox] = React.useState(false)
  const { user, isAuthenticated, isLoading } = useAuth0(); 
  const dispatch = useDispatch();
  useEffect(() => {
   
  },[]);

  const navigate = useNavigate();
  const notes = useSelector((state) => state.notes);
  const localNotes = useSelector((state) => state.localNotes);

  const activeValidate = (active) =>{
    if (active === true && checkbox === true) return true;
    if (checkbox === false) return true;
    return false  
  }

  const checkFlag = (note) => {
    swal({
      title: 'Do you want to disable this note?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('this note was flagged', {
          icon: 'success',
        });
        dispatch(updateNote({...note, active: false}))
      } else {
        swal( {
          title: 'Proccess canceled',
        });
      }
    }); 
  }

  const handleDeleteNote = (id, email) => {

    swal({
        title: 'Do you want to delete this note?',
        text: 'Once deleted, will not be recovered',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal('The note was deleted', {
            icon: 'success',
          });
          dispatch(deleteNote(id, email));
        } else {
          swal( {
            title: 'Proccess canceled',
          });
        }
      });
  }
  const archiveNote = (note, email, id) => {
    swal({
      title: 'Do you want to archive this note?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('The note was archived', {
          icon: 'success',
        });
        dispatch(setNotes({...note, email: email}, id))
      } else {
        swal( {
          title: 'Proccess canceled',
        });
      }
    });
    

  }

  return (
    <div>

      <div className={S.container}>
        <div >
            <div>
                <img src={arrow} alt="back" />
                <a onClick={() => navigate(-1)}>
                    <h2>Back</h2>
                </a>
            </div>
        </div>
        {(notes?.length || localNotes?.length)?(<div>
            <span className={S.onlyActive}>onlyActive <input onChange={()=>setCheckbox(!checkbox)} type="checkbox"></input></span>
            
            <Table
            striped
            bordered
            hover
            responsive="sm"
            >
            <thead>
                <tr>
                <th>DATE</th>
                <th >HEADER</th>
                <th >BODY</th>
                <th>ARCHIVE</th>
                <th>UPDATE</th>
                <th>DELETE</th>
                <th>STATE</th>
                
                </tr>
            </thead>
            <tbody>
            {localNotes?.map((note, id) =>  activeValidate(note?.active) && (
                <tr key={note?.id}>
                    <td>{note?.date}</td>
                    <td className={S.maxWidth}>
                    <Link to="/detail" onClick={()=>dispatch(getNote(note?.id))}>
                        {note?.header}
                    </Link>
                    </td>
                    <td className={S.maxWidth}> {note?.body.substring(0,30)}</td>
                   
                    <td>                    
                            <button
                        className="btn-danger button"
                        onClick={() => {
                            user?.email && archiveNote(note, user?.email, id)
                        }}
                        >
                        <img src={archive}  />
                        </button></td>
                    <td>
                    </td>
                    <td>
                    </td>
                    <td>
                    </td>
                </tr>
                )).reverse()}
                {notes?.map((note) => activeValidate(note?.active) && (
                <tr key={note?.id}>
                    <td>{note?.date}</td>
                    <td className={S.maxWidth}>
                    <Link to="/detail" onClick={()=>dispatch(getNote(note?.id))}>
                        {note?.header}
                    </Link>
                    </td>
                    <td className={S.maxWidth}> {note?.body.substring(0,30)}</td>
                    
                    <td></td>
                    <td>
                        <button
                        className="btn-danger button"
                        onClick={() => {
                            dispatch(getNote(note?.id))
                            navigate('/updateNote')
                        }}
                        >
                        <img src={edit} alt="edit" />
                        </button>
                    </td>
                    <td>
                        <button
                        className="btn-danger button"
                        onClick={() => handleDeleteNote(note?.id, user?.email)}
                        >
                        <img src={del} alt="delete" />
                        </button>
                    </td>
                    
                      {note?.active
                      ?<td><img onClick={()=>checkFlag(note)} src={redFlag} alt="" /></td>
                      :<td><img src={blackFlag} alt="inactive" /></td>

                    }
                    
                </tr>
                )).reverse()}
            </tbody>
            </Table>
        </div>)
        :
        <h1>Nothing to Show</h1>}
      </div>
    </div>
  );
}
