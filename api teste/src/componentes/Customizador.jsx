import estilos from './Customizador.module.css'

export function Customizador (props){
    return(
        <div className ={estilos.conteiner}>
            {props.children}
        </div>
    )
}