import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";

const RenderButton = ({path, id}) => {
    const navigate = useNavigate();

    return (
        <Button
            component="button"
            variant="contained"
            size="small"
            style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                width: 100,
                justifyItems: 'center',
                alignItems: 'center'
            }}
            onKeyDown={(event) => {
                if (event.key === ' ') {
                    event.stopPropagation();
                }
            }}
            onClick={() => {
                navigate(`/${path}/${id}`);
            }}
        >
            Abrir
            <OpenInNewIcon className={'icon'}/>
        </Button>
    );
};

const RenderEdit = ({path, id}) => {
    const navigate = useNavigate();

    return (
        <Button
            component="button"
            variant="contained"
            size="small"
            style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                width: 100,
                justifyItems: 'center',
                alignItems: 'center'
            }}
            onKeyDown={(event) => {
                if (event.key === ' ') {
                    event.stopPropagation();
                }
            }}
            onClick={() => {
                navigate(`/${path}/edit/${id}`);
            }}
        >
            Editar
            <EditIcon className={'icon'}/>
        </Button>
    );
};

export {RenderButton, RenderEdit};