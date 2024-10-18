import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { categoryFormUrl, itemFormUrl } from '../../Redux/dataBase';

const Forms = () => {
    document.title = "Forms - Photo Gallery App";
    return (
        <div>
            <Link to={itemFormUrl}>
                <Button color="success" style={{ width: "120px", margin: "5px" }}>PhotoForm</Button>
            </Link>
            <Link to={categoryFormUrl}>
                <Button color="success" style={{ width: "120px", margin: "5px" }}>CategoryForm</Button>
            </Link>
        </div>
    )
}

export default Forms