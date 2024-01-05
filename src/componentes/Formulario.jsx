import {useState, useEffect} from 'react';
import Error from './Error';

function Formulario({pacientes, setPacientes, paciente, setPaciente}){
    
    const[nombre, setNombre] = useState('');
    const[propietario, setPropietario] = useState('');
    const[email, setEmail] = useState('');
    const[fecha, setFecha] = useState('');
    const[sintomas, setSintomas] = useState('');
    const[error, setError]= useState(false); 
    const generarId = () => {
        const random = Math.random().toString(36).substr(2)
        const fecha = Date.now().toString(36)
        return random + fecha
    }

    useEffect(() => {
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
    },[paciente])

  

    const handleSubmit = (e)=>{
        e.preventDefault();
        // validacion del formulario
            if([nombre,propietario, email, fecha, sintomas].includes('')){
                setError(true)          
                return;
            }
            setError(false);

            //Objeto del paciente actual 
            const objetoPaciente = {
                nombre,
                propietario,
                email,
                fecha,
                sintomas,
               
            } 


            if(paciente.id ){
                //Editando registro
                objetoPaciente.id = paciente.id;
                
                const pacienteActualizados = pacientes.map(
                    pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState);
                    setPacientes(pacienteActualizados);
                    setPaciente({})
            }else{
                //nuevo registro
                objetoPaciente.id = generarId();
                setPacientes([...pacientes, objetoPaciente]);

             }
            //...paciente crear una copia del objeto paciente 
            // y le agrega el paciente creado actualmente arriba        
            
            
            //reiniciar el form
            setNombre('');
            setPropietario('');
            setEmail(''); 
            setFecha('');
            setSintomas('');
        }
        
    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5 ml-10 mt-0 ">
            <h2 className="font-black text-3xl text-center">Seguimiento de pacientes</h2>
            <p className="text-lg mt-5 text-center mb-5">Añade Pacientes y {' '}<span className="text-indigo-600 font-bold">Administralos</span></p>
         
 <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-2 px-5 mb-10">
     {error && <Error  mensaje='Todos los campos son obligatorios' /> 
      }

 <div className="mb-5">
     <label className=" text-gray-700 uppercase font-bold " htmlFor="mascota">Nombre Mascota:
     <span className='font-normal normal-case'> {nombre}</span> </label>
     <input id='mascota' className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400 "
     type="text" placeholder="Nombre de la Mascota" value = {nombre} onChange={ (e)=>setNombre(e.target.value)} />
</div>

 <div className="mb-5">
     <label className="block text-gray-700 uppercase font-bold " htmlFor="propietario">Nombre Propietario:
     <span className='font-normal normal-case'> {propietario} </span> </label>

    <input id='propietario' className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400 "
    type="text" placeholder="Nombre del propietario" value = {propietario} onChange={ (e)=>setPropietario(e.target.value)} />
</div>

<div className="mb-5">
    <label className="block text-gray-700 uppercase font-bold " htmlFor="email">Email: 
    <span className='font-normal normal-case'>  {email} </span></label>

    <input  id='email'type='email' className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400 " 
    placeholder="Email de contacto" value = {email} onChange={ (e)=>setEmail(e.target.value)} /> 
</div>

 <div className="mb-5">
     <label className="block text-gray-700 uppercase font-bold " htmlFor="fecha">Fecha de Alta:
     <span className='font-normal normal-case'>  {fecha} </span></label>

    <input id='fecha' type='date' className="border-2 w-full p-2 mt-2 rounded-md placeholder-gray-400 "
     placeholder="Email de contacto"  value = {fecha} onChange={ (e)=>setFecha(e.target.value)}/>
</div>

<div className="mb-5">
    <label className="block text-gray-700 uppercase font-bold " htmlFor="sintomas">Sintomas
    </label>
    <textarea  id="sintomas" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
      placeholder="Describe los sintomas" value = {sintomas} onChange={ (e)=>setSintomas(e.target.value)} />
</div>

 <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold
     hover:bg-indigo-700 cursor-pointer transition-colors" value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}/>     
</form>

        </div>
        )
    }
    export default Formulario;