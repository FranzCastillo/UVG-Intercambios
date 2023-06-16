import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {getUniversities} from "../../../supabase/UniversitiesQueries";
import LinearProgress from '@mui/material/LinearProgress';
import "./Table.scss";
import {RenderButton, RenderEdit} from "../../../components/Buttons/TableButtons";

const columns = [
    {
        field: 'year',
        headerName: 'Año',
        width: 100,
        type: 'number'},
    {
        field: 'semester',
        headerName: 'Semestre',
        width: 100,
        type: 'number'},
    {
        field: 'student',
        headerName: 'Estudiante',
        width: 350},
    {
        field: 'modality',
        headerName: 'Modalidad',
        width: 100,
    },
    {
        field: 'cycle',
        headerName: 'Ciclo',
        width: 100,
    },
    {
        field: 'university',
        headerName: 'Universidad a visitar',
        width: 200,
    },
    {
        field: 'state',
        headerName: 'Estado de Nominación',
        width: 100,
    },
    {
        field: 'date',
        headerName: 'Fecha de Viaje',
        width: 100,
    },
    {
        field: 'assignation',
        headerName: 'Asignación',
        width: 100,
    },
    {
        field: 'coursesUvg',
        headerName: 'Cursos UVG',
        width: 100,
    },
    {
        field: 'coursesExchange',
        headerName: 'Cursos de Intercambio',
        width: 100,
    },
    {
        field: 'comments',
        headerName: 'Comentarios',
        width: 100,
    },
];

export default function Table() {
    // const [rows, setRows] = useState([{}]);

    const rows = [
        {
            id: 1,
            year: 2023,
            semester: 1
        }
    ]

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
