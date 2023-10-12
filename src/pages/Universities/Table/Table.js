import * as React from 'react';
import {useEffect, useState} from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {getUniversities} from "../../../supabase/UniversitiesQueries";
import LinearProgress from '@mui/material/LinearProgress';
import "./Table.scss";
import {RenderButton, RenderEdit} from "../../../components/Buttons/TableButtons";

const columns = [
    {field: 'name', headerName: 'Nombre', width: 350},
    {field: 'short_name', headerName: 'Nombre Corto', width: 200},
    {field: 'country', headerName: 'País', width: 300},
    // {
    //     field: 'redirect',
    //     headerName: 'Más Información',
    //     renderCell: (params) => <RenderButton path={"universidades"} id={params.row.id}/>,
    //     width: 150,
    //     sortable: false,
    //     filterable: false,
    // },
    {
        field: 'edit',
        headerName: 'Editar',
        renderCell: (params) => <RenderEdit path={"universidades"} id={params.row.id}/>,
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
