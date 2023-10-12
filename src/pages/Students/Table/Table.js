import * as React from 'react';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import {RenderButton, RenderEdit} from "../../../components/Buttons/TableButtons";
import {getStudents} from "../../../supabase/StudentQueries";
import {useEffect, useState} from "react";
import LinearProgress from "@mui/material/LinearProgress";

const columns = [
    { field: 'id', headerName: 'Carné', width: 100},
    { field: 'name', headerName: 'Nombre', width: 300 },
    {
        field: 'mail',
        headerName: 'Correo',
        width: 200,
    },
    {
        field: 'career',
        headerName: 'Carrera',
        width: 200,
    },
    {
        field: 'faculty',
        headerName: 'Facultad',
        width: 200,
    },
    {
        field: 'gender',
        headerName: 'Género',
        width: 100,
    },
    // {
    //     field: 'redirect',
    //     headerName: 'Más Información',
    //     renderCell: (params) => <RenderButton path={"estudiantes"} id={params.row.id}/>,
    //     width: 150,
    //     sortable: false,
    //     filterable: false,
    // },
    {
        field: 'edit',
        headerName: 'Editar',
        renderCell: (params) => <RenderEdit path={"estudiantes"} id={params.row.id}/>,
        width: 150,
        sortable: false,
        filterable: false,
    },
];

export default function Table() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const students = await getStudents();
                setRows(students);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
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
