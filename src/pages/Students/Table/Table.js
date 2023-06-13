import * as React from 'react';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';
import {RenderButton, RenderEdit} from "../../../components/Buttons/TableButtons";

const columns = [
    { field: 'id', headerName: 'Carné', width: 100, type: 'number' },
    { field: 'name', headerName: 'Nombre', width: 300 },
    {
        field: 'email',
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
    {
        field: 'redirect',
        headerName: 'Más Información',
        renderCell: (params) => <RenderButton path={"estudiantes"} id={params.row.id}/>,
        width: 150,
        sortable: false,
        filterable: false,
    },
    {
        field: 'edit',
        headerName: 'Editar',
        renderCell: (params) => <RenderEdit path={"estudiantes"} id={params.row.id}/>,
        width: 150,
        sortable: false,
        filterable: false,
    },
];

const rows = [
    {"id": 1, "name": "John Doe", "email": "johndoe@example.com", "career": "Computer Science", "faculty": "Engineering", "gpa": 3.5, "gender": "Male"},
    {"id": 2, "name": "Jane Smith", "email": "janesmith@example.com", "career": "Marketing", "faculty": "Business", "gpa": 3.2, "gender": "Female"},
    {"id": 3, "name": "Bob Johnson", "email": "bobjohnson@example.com", "career": "Mechanical Engineering", "faculty": "Engineering", "gpa": 3.8, "gender": "Male"},
    {"id": 4, "name": "Sara Lee", "email": "saralee@example.com", "career": "Nursing", "faculty": "Health Sciences", "gpa": 3.6, "gender": "Female"},
    {"id": 5, "name": "David Kim", "email": "davidkim@example.com", "career": "Finance", "faculty": "Business", "gpa": 3.4, "gender": "Male"},
    {"id": 6, "name": "Emily Chen", "email": "emilychen@example.com", "career": "Computer Science", "faculty": "Engineering", "gpa": 3.9, "gender": "Female"},
    {"id": 7, "name": "Tom Smith", "email": "tomsmith@example.com", "career": "Electrical Engineering", "faculty": "Engineering", "gpa": 3.7, "gender": "Male"},
    {"id": 8, "name": "Amy Lee", "email": "amylee@example.com", "career": "Psychology", "faculty": "Social Sciences", "gpa": 3.1, "gender": "Female"},
    {"id": 9, "name": "Mike Johnson", "email": "mikejohnson@example.com", "career": "Computer Science", "faculty": "Engineering", "gpa": 3.2, "gender": "Male"},
    {"id": 10, "name": "Linda Kim", "email": "lindakim@example.com", "career": "Marketing", "faculty": "Business", "gpa": 3.5, "gender": "Female"},
    {"id": 11, "name": "Chris Lee", "email": "chrislee@example.com", "career": "Mechanical Engineering", "faculty": "Engineering", "gpa": 3.6, "gender": "Male"},
    {"id": 12, "name": "Grace Chen", "email": "gracechen@example.com", "career": "Computer Science", "faculty": "Engineering", "gpa": 3.8, "gender": "Female"},
    {"id": 13, "name": "Alex Smith", "email": "alexsmith@example.com", "career": "Finance", "faculty": "Business", "gpa": 3.3, "gender": "Male"},
    {"id": 14, "name": "Jenny Kim", "email": "jennykim@example.com", "career": "Marketing", "faculty": "Business", "gpa": 3.7, "gender": "Female"},
    {"id": 15, "name": "Peter Johnson", "email": "peterjohnson@example.com", "career": "Computer Science", "faculty": "Engineering", "gpa": 3.9, "gender": "Male"},
    {"id": 1, "name": "John Doe", "email": "johndoe@example.com", "career": "Computer Science", "faculty": "Engineering", "gpa": 3.5, "gender": "Male"},
    {"id": 2, "name": "Jane Smith", "email": "janesmith@example.com", "career": "Marketing", "faculty": "Business", "gpa": 3.2, "gender": "Female"},
    {"id": 3, "name": "Bob Johnson", "email": "bobjohnson@example.com", "career": "Mechanical Engineering", "faculty": "Engineering", "gpa": 3.8, "gender": "Male"},
    {"id": 4, "name": "Sara Lee", "email": "saralee@example.com", "career": "Nursing", "faculty": "Health Sciences", "gpa": 3.6, "gender": "Female"},
    {"id": 5, "name": "David Kim", "email": "davidkim@example.com", "career": "Finance", "faculty": "Business", "gpa": 3.4, "gender": "Male"},
    {"id": 6, "name": "Emily Chen", "email": "emilychen@example.com", "career": "Computer Science", "faculty": "Engineering", "gpa": 3.9, "gender": "Female"},
    {"id": 7, "name": "Tom Smith", "email": "tomsmith@example.com", "career": "Electrical Engineering", "faculty": "Engineering", "gpa": 3.7, "gender": "Male"},
    {"id": 8, "name": "Amy Lee", "email": "amylee@example.com", "career": "Psychology", "faculty": "Social Sciences", "gpa": 3.1, "gender": "Female"},
    {"id": 9, "name": "Mike Johnson", "email": "mikejohnson@example.com", "career": "Computer Science", "faculty": "Engineering", "gpa": 3.2, "gender": "Male"},
    {"id": 10, "name": "Linda Kim", "email": "lindakim@example.com", "career": "Marketing", "faculty": "Business", "gpa": 3.5, "gender": "Female"},
    {"id": 11, "name": "Chris Lee", "email": "chrislee@example.com", "career": "Mechanical Engineering", "faculty": "Engineering", "gpa": 3.6, "gender": "Male"},
    {"id": 12, "name": "Grace Chen", "email": "gracechen@example.com", "career": "Computer Science", "faculty": "Engineering", "gpa": 3.8, "gender": "Female"},
    {"id": 13, "name": "Alex Smith", "email": "alexsmith@example.com", "career": "Finance", "faculty": "Business", "gpa": 3.3, "gender": "Male"},
    {"id": 14, "name": "Jenny Kim", "email": "jennykim@example.com", "career": "Marketing", "faculty": "Business", "gpa": 3.7, "gender": "Female"},
    {"id": 15, "name": "Peter Johnson", "email": "peterjohnson@example.com", "career": "Computer Science", "faculty": "Engineering", "gpa": 3.9, "gender": "Male"},
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