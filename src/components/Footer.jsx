import './index.css';
import { TextField, Button } from "monday-ui-react-core";

const Footer = ({onFuntClick, onFuntChange, messageValue, onFuntKeyDown }) =>{

    return (
        <footer>
            <div className="Footer-Container">
            <TextField
                className   = 'TextField-Container'
                placeholder = "Escribe un mensaje"
                size        = {TextField.sizes.MEDIUM}
                onChange    = {onFuntChange }
                value       = {messageValue}
                onKeyDown   = {onFuntKeyDown}
            />
            <Button
                style = {{ marginRight: "10px"}}
                onClick = { onFuntClick }
            >Ask AI</Button>
            </div>
        </footer>
    )

}

export default ( Footer );