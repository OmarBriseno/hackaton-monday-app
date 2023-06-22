import { Avatar, Heading } from "monday-ui-react-core";
import './index.css';
import logoIA from '../img/LogoAI.PNG';

const Header = () =>{
    return (
        <div className="Header-Container">
            <Avatar
                ariaLabel="AI Assistant"
                size={Avatar.sizes.LARGE}
                src={logoIA}
                type="img"
            />
            <Heading
                style={{ paddingLeft : '10px'}}
                type={Heading.types.h4}
                value="AI Assistant"
                suggestEditOnHover
            />
        </div>
    )

}

export default ( Header );