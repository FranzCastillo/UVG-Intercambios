import {supabase} from './client';

const insertStudent = async ({id, name, career_id}) => {
    const {error} = await supabase
        .from('estudiantes')
        .insert([
            {carnet:id, nombre: name, id_carrera: career_id}
        ])

    if (error) {
        throw new Error(`Error inserting student with id ${id}: ${error.message}`);
    }
}

const doesStudentExist = async (id) => {
    const {data, error} = await supabase
        .from('estudiantes')
        .select()
        .eq('carnet', id)

    if (error) {
        throw new Error(`Error checking if student with id ${id} exists: ${error.message}`);
    } else {
        return data.length > 0;
    }
}

const getStudentById = async (id) => {
    const {data, error} = await supabase
        .from('estudiantes')
        .select(`
            carnet,
            nombre,
            carreras(
                nombre,
                facultades(
                    nombre_corto
                 )
            )
        `)
        .eq('carnet', id)

    if (error) {
        throw new Error(`Error getting student with id ${id}: ${error.message}`);
    } else {
        const transformedData = data.map(({carnet, nombre, carreras}) => ({
            id: carnet,
            name: nombre,
            career: carreras.nombre,
            faculty: carreras.facultades.nombre_corto,
        }));
        if (transformedData.length === 0) {
            throw new Error(`El estudiante con el carné '${id}' no existe`);
        } else {
            return transformedData[0];
        }
    }
}

export {
    getStudentById,
    doesStudentExist,
    insertStudent,
};