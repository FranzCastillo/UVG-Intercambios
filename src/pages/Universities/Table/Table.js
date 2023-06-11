import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const RenderButton = ({ id }) => {
    const navigate = useNavigate();

    return (
        <Button
            component="button"
            variant="contained"
            size="small"
            style={{ marginLeft: 16 }}
            // Remove button from tab sequence when cell does not have focus
            onKeyDown={(event) => {
                if (event.key === ' ') {
                    // Prevent key navigation when focus is on button
                    event.stopPropagation();
                }
            }}
            onClick={() => {
                navigate(`/universities/${id}`);
            }}
        >
            Abrir
        </Button>
    );
};

const columns = [
    { field: 'name', headerName: 'Nombre', width: 350 },
    { field: 'short_name', headerName: 'Nombre Corto', width: 100 },
    { field: 'country', headerName: 'País', width: 150 },
    {
        field: 'redirect',
        headerName: 'Más Información',
        renderCell: (params) => <RenderButton id={params.row.id} />,
        width: 150,
    },
];

const rows = [
    { id: 1, name: 'Universidad del Valle de Guatemala', short_name: 'UVG', country: 'Guatemala', redirect: 'https://www.uvg.edu.gt/' },
];

export default function Table() {
    return (
        <div style={{ height: '85', width: '100%' }}>
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