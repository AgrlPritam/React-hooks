import React,{useContext} from 'react';
import NotesContext from '../context/Notes-Context'

const Note = ({note}) => {
    const {dispatch} = useContext(NotesContext)
    // useEffect(() => {
    //   console.log('Setting up effect!');
    //   //For cleaning the useEffect dependencies we create a function inside this useEffect function
    //   return () => {
    //     console.log('Cleaning up effect');
    //   }
    // }, [])

    return (
      <div>
        <h3>{note.title}</h3>
        <h5>{note.body}</h5>
        <button onClick={() => dispatch({type: 'REMOVE_NOTE', title: note.title})}>x</button>
      </div>
    )
}
export {Note as default}