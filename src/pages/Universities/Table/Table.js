import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {getUniversities} from "../../../supabase/UniversitiesQueries";
import LinearProgress from '@mui/material/LinearProgress';
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import "./Table.scss";

const RenderButton = ({id}) => {
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
                navigate(`/universidades/${id}`);
            }}
        >
            Abrir
            <OpenInNewIcon className={'icon'}/>
        </Button>
    );
};

const RenderEdit = ({id}) => {
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
                navigate(`/universidades/edit/${id}`);
            }}
        >
            Editar
            <EditIcon className={'icon'}/>
        </Button>
    );
};

const columns = [
    {field: 'name', headerName: 'Nombre', width: 350},
    {field: 'short_name', headerName: 'Nombre Corto', width: 200},
    {field: 'country', headerName: 'País', width: 300},
    {
        field: 'redirect',
        headerName: 'Más Información',
        renderCell: (params) => <RenderButton id={params.row.id}/>,
        width: 150,
        sortable: false,
        filterable: false,
    },
    {
        field: 'edit',
        headerName: 'Editar',
        renderCell: (params) => <RenderEdit id={params.row.id}/>,
        width: 150,
        sortable: false,
        filterable: false,
    },
];

export default function Table() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const universities = await getUniversities();
                setRows(universities);
            } catch (error) {
                console.error('Error fetching universities:', error);
            }
        };

        fetchUniversities();
    }, []);

    return (
        <>
            {rows.length === 0 ? (
                <LinearProgress/>
            ) : (
                <div style={{height: '85', width: '100%'}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {page: 0, pageSize: 15},
                            },
                        }}
                        pageSizeOptions={[15, 25, 50]}
                        disableRowSelectionOnClick={true}
                        slots={{toolbar: GridToolbar}}
                    />
                </div>
            )}
        </>
    );
}
