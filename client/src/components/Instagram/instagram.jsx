
import Logo from '../../assets/logoIg.png'
import style from './instagram.module.css'

export default function Instagram () {
    
    return(
        <div>
            <a href='https://www.instagram.com/essence_nutricionestetica/'><img alt='logo' className={style.logo} src={Logo}/></a>
        </div>
    )
}; 
