import React from 'react';
import S from './MyNotes.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNote, deleteNote, setNotes, updateNote } from '../../redux/actions';
import { Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
// import arrow from '../../assets/img/leftarrow.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert'
import { useAuth0 } from "@auth0/auth0-react";
// import archive from '../../assets/img/upload.png'
// import blackFlag from '../../assets/img/flag.png'
// import redFlag from '../../assets/img/red-flag.png'
// import del from '../../assets/img/trash-solid.svg'
// import edit from '../../assets/img/file-pen-solid.svg'

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
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAACMCAMAAACu/Lx9AAAAY1BMVEX29vYAAAD////6+vrv7+/z8/Pl5eWsrKw9PT1UVFTq6uo3Nzc0NDRJSUkvLy9ERERkZGTS0tIXFxcnJyfa2tpdXV1ra2u4uLjIyMgODg5OTk5xcXF/f3+Li4ufn5+Tk5MeHh66FrmYAAACxUlEQVRoge3b7XKqMBSFYZItVEWpH2D9bHv/V3nS8UxxFBd/3uzpnNPcwDNJVoDshKL4bf93M3O0qpfoZzXh3Umzqg7BSbtaIXiMpE22IThpvZVfs6q3cs+bVYtw23L2zappCE6azetw33JpVjYPVi7NJkNWHs3mw1aOTD5mI1/flJU09I1jk4Wwwp7EhnP43dbkMD7LYRZrYC337cBaMhsbuF+OVilzyFqFzEbrl8NNha4vOV/blrVehdXAY6j7xWZD5fDAzpfMPJwNOYYNnEOVjSlsLf2sUo3hgrUK9U75nLDZUNaCtWQ2lnO/bBzh9aUsuF+FyuGUnS+Zw7r0e0YtCzYbR2F18PpytEqVwxlrRcf5kplfomU4vZY71pI5XMHra+ZnFXIM2WzIHB6jXw47tBKgnxs7uA6gsnFi56t0tEzlcMeuZVPfNis2G3J9nVhLzteZzaGnVThaUc3X2TEbsCXn68JWRq0TFvsNkLA3gYUTrEWp7eAKs9Y69I05ps3Q5/2ohn7lJO1Fauj39ph2dO1bTc+b1BrXkazR2kDS3pXGVqlGNbQOPKZt6b59KC24jiR7UjDWN/a8JWkXqe3hV7fUDq5agLV4/kHam6sGH32bp2Z2+me1Iu6kBl+QiCupfcApGdHgTaLW2C2Ot6Y2b/hWMWqN3VKZuWpyG5w2cGxRSxYG8RJ1qcpaaZPjWGD1PVZIWyr4IEiP5BE+/tTaK6zpkaSPkeUVntCwhxn64hq8ybm9yjs4kuyFl0pevEoa2rdWa/AlpVbPW2C16nNEYy/nbbTGXt0c6VtXgliaN7UCOvS5lT5e18+1Di6pfWmHJ9Ysw78ksR226ILytdmgxh6k9C2uH1fAJdvvOHF/r8G7mjvt4GZ9abdW7h9x4rq38v8Y0/cNrowMa38PH+Caj9R8rKsG1yCVtvezfH/j+20u7Q++LCTlWb0LcgAAAABJRU5ErkJggg==" alt="back" />
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
                        <img src="data:image/png;base64,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"  />
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
                        <img src="data:image/png;base64,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" alt="edit" />
                        </button>
                    </td>
                    <td>
                        <button
                        className="btn-danger button"
                        onClick={() => handleDeleteNote(note?.id, user?.email)}
                        >
                        <img src="data:image/png;base64,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" alt="delete" />
                        </button>
                    </td>
                    
                      {note?.active
                      ?<td><img onClick={()=>checkFlag(note)} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUIVMKqelBEnNH2ysICQFrsUcNql0iyOZcVg&usqp=CAU" alt="" /></td>
                      :<td><img src="https://cdn-icons-png.flaticon.com/512/8/8402.png" alt="inactive" /></td>

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
