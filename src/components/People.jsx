import PropTypes from "prop-types";
import { Person } from "./Person";
import { useState } from "react";

export const People = ( { people, setPeople } ) => {
  
  const [editingId, setEditingId] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [editedPerson, setEditedPerson] = useState(
    {
      name:'',
      role:'',
      img:''
    }
  );

  const [personToDelete, setPersonToDelete] = useState(null);

  //metodos para eliminar 

  //guardar el ID
  const handleDelete = (id) => {
    setPersonToDelete(id);
  };

  //Confirmar eliminacion
  const confirmDelete = () => {
    setPeople(people.filter(person => person.id !== personToDelete));

    setPersonToDelete(null);
  };

  const cancelDelete = () => {
    setPersonToDelete(null);
  };

  //Metodo para gestionar
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPerson(prevState => ({
      ...prevState,
      [name]: value
    }));

  };

  //Metodo crear
  const handleCreate = (e) => {
    e.preventDefault();

    //agregar persona
    setPeople([...people, { id: people.length + 1, ...editedPerson}]);

    //Reiniciar el estado del formulario
    setEditedPerson({ name: '', role:'', img:''});
  };

  //Metodo para editar 
  const handleEdit = (id) => {

    setEditingId(id);
    setIsEditing(true);
    const personToEdit = people.find(person => person.id === id);

    setEditedPerson( {...personToEdit });

  };


  //Metodo para guardar cambios 
  const handleSave = (e) => {

    e.preventDefault();

    // Array nuevo
    const updatePeople = people.map(person => person.id === editingId ? editedPerson : person)
  
    // Actualizar estado
    setPeople(updatePeople);

    setIsEditing(false);

    setEditingId(null);

    setEditedPerson({
      name:'',
      role:'',
      img:''
    });
  };



  return (
      <div>
        <h2 className='text-center my-4'>IT Team</h2>
        <div className='container'>
          <div className='row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3'>
            {
              people.map((people) => {
                return (
                  <div key={people.id}>
                    <Person
                      id={people.id}
                      name={people.name}
                      img={people.img}
                      role={people.role}
                      handleEdit={()=>handleEdit(people.id)}
                      handleDelete={()=> handleDelete(people.id)}
                    />
                  </div>
                );
              })
            }
          </div>
        </div>
        {/* Formulario */}
        <div className="container mt-4 row p-2">
          <h2 className="text-center">{isEditing ? 'Actualizando empleado' : 'Creando empleado'}</h2>
            <form action="">
              <div>
                <label htmlFor="name">Nombre</label>
                <input type="text" name="name" value={editedPerson.name} onChange={handleChange} required className="form-control"/>
              </div>
              <div>
                <label htmlFor="role">Rol</label>
                <input type="text" name="role" value={editedPerson.role} onChange={handleChange} required className="form-control"/>
              </div>
              <div>
                <label htmlFor="img">Avatar</label>
                <input type="text" name="img" value={editedPerson.img} onChange={handleChange} required className="form-control"/>
              </div>
              <div className="mt-2 text-center">
                <button type="submit" className="btn btn-primary" onClick={isEditing ? handleSave : handleCreate}>
                  {isEditing ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
        </div>
        <div id='deleteModal' className="modal fade" tabIndex='-1'>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Confirmar eliminacion</h4>
                <button type="button" className="btn-close" data-bs-dismiss='modal' onClick={cancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Esta seguro de eliminar el usuario {people.find(person => person.id ===personToDelete)?.name}? </p>
              </div>
              <div className=" modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss='modal' onClick={cancelDelete}>cancelar</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss='modal' onClick={confirmDelete}>eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

People.propTypes = {
    people: PropTypes.array,
    setPeople: PropTypes.func
}