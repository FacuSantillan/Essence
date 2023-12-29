import style from './services.module.css'

import { guardarInformacion, getReservas } from "../../redux/actions"
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';


const Services = ({guardarInformacion}) => {

    const informacion = useSelector(state => state.informacion);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedItems, setSelectedItems] = useState([]);
    const [isFormComplete, setIsFormComplete] = useState(false);

    const [clientData, setClientData] = useState({
      nombre: informacion.nombre,
      apellido: informacion.apellido,
      telefono: informacion.telefono,
      turnos:{
        servicios:[]
      }
    });

    useEffect(()=>{
      if(clientData.nombre === undefined || clientData.apellido=== undefined || clientData.telefono=== undefined){
        navigate('/');
      }
    },[])

    let data = clientData.turnos.servicios
    let i = data.length

    const handleSubmit = (event) => {
      guardarInformacion(clientData);
        navigate('/calendar');
      };

    const otherService = (event) => {
      guardarInformacion(clientData);
        navigate('/otherservices')
    };

    const handleSelectChange = (e) => {
       const selectedService = e.target.value;
        setClientData(prevState => ({
            ...prevState,
            turnos: {
                ...prevState.turnos,
                servicios: [...prevState.turnos.servicios, selectedService]
            }
        }));
        const formComplete = Object.values(clientData).every(value => value !== '');
        setIsFormComplete(formComplete);
      
  };
  
  const deleteItem = (value) => {
    let res = clientData.turnos.servicios.filter(item => item !== value);
    setClientData(prevState => ({
      ...prevState,
      turnos: {
        ...prevState.turnos,
        servicios: res
      }
    }));
  };

    return(
      
      <div className={style.all} >

      <div className={style.container}>
      <h1 className={style.h1}>Selecciona el servicio que desea</h1>
      <div className={style.selectContainer}>
      <select value={clientData.turnos.servicios[i]} onChange={handleSelectChange} className={style.select}>

        <option value="defaultValue" selected>Packs corporales</option>
        <option value="X6 sesiones">X6 sesiones</option>
        <option value="X8 sesiones">X8 sesiones</option>

      </select>
      <select value={clientData.turnos.servicios[i]} onChange={handleSelectChange} className={style.select}>

      <option value='defaultValue' selected>Servicios</option>
      <option value="Criolipólisis plena">Criolipólisis plana</option>
      <option value="Body Health">Body Health</option>
      <option value="Body up">Body up</option>
      <option value="Tratamientos faciales">Tratamientos faciales</option>
      <option value="Depilación definitiva">Depilación definitiva</option>
      <option value="Masajes relajantes/Descontracturantes">Masajes relajantes/Descontracturantes</option>
      <option value="Drenajes postquirúrgicos">Drenajes postquirúrgicos</option>
        
      </select>

      <select value={clientData.turnos.servicios[i]} onChange={handleSelectChange} className={style.select}>

      <option value="defaultValue" selected>Pestañas</option>
      <option value="Perfilado de cejas">Perfilado de cejas</option>
      <option value="Laminado de cejas">Laminado de cejas</option>
      <option value="Lifting de pestañas">Lifting de pestañas</option>
      <option value="Ondulación de pestañas">Ondulación de pestañas</option>
      </select>

      </div>

<div>
<ul className={style.ul}>
        {clientData.turnos.servicios.map((item, index) => (
          <li className={style.li} key={index}>
            {item} <button className={`${style.boton}`} value={item} onClick={() => deleteItem(item)}> X </button>
          </li>
        ))}
      </ul>
</div>
      
        <div className={style.buttons}>
      <button disabled={!isFormComplete} onClick={handleSubmit} type="submit" className={style.button}>Siguiente</button>
      <button onClick={otherService} type="submit" className={style.button}>Servicio personalizado</button>
        </div>
</div>

    </div>

    )
};

export default connect(null, { guardarInformacion })(Services);
