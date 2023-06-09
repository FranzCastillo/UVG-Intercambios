import * as React from 'react';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'Carné', width: 100, type: 'number' },
    { field: 'firstName', headerName: 'Nombres', width: 200 },
    { field: 'lastName', headerName: 'Apellidos', width: 200 },
    {
        field: 'email',
        headerName: 'Correo',
        width: 200,
    },
    {
        field: 'gpa',
        headerName: 'Promedio',
        width: 100,
        type: 'number',
    },
    {
        field: 'gender',
        headerName: 'Género',
        width: 100,
    },
];

const rows = [
// Fetch from supabase
];

export default function Table() {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 15 },
                    },
                }}
                pageSizeOptions={[15, 25, 50]}
                sortingMode={'server'}
                disableRowSelectionOnClick={true}
                slots={{ toolbar: GridToolbar }}
            />
        </div>
    );
}