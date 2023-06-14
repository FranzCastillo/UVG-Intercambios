import {supabase} from './client';

const insertStudent = async ({id, name, career_id}) => {
    const {error} = await supabase
        .from('estudiantes')
        .insert([
            {id, nombre: name, id_carrera: career_id}
        ])

    if (error) {
        throw new Error(`Error inserting student with id ${id}: ${error.message}`);
    }
}

const doesStudentExist = async (id) => {
    const {data, error} = await supabase
        .from('estudiantes')
        .select()
        .eq('id', id)

    if (error) {
        throw new Error(`Error checking if student with id ${id} exists: ${error.message}`);
    } else {
        return data.length > 0;
    }
}

export {
    doesStudentExist,
    insertStudent,
};