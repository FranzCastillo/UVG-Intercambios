import {supabase} from './client';

const insertStudent = async ({id, name, mail, career_id, gender}) => {
    const {error} = await supabase
        .from('estudiantes')
        .insert([
            {carnet: id, nombre: name, correo: mail, id_carrera: career_id, genero: gender}
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
    const intRegex = /^\d+$/;
    if (!intRegex.test(id)) {
        throw new Error(`'${id}' no es un carné válido`);
    }
    const {data, error} = await supabase
        .from('estudiantes')
        .select(`
            carnet,
            nombre,
            correo,
            genero,
            carreras(
                id,
                nombre,
                facultades(
                    id,
                    nombre_corto
                 )
            )
        `)
        .eq('carnet', id)

    if (error) {
        throw new Error(`Error getting student with id ${id}: ${error.message}`);
    } else {
        const transformedData = data.map(({carnet, nombre, correo, genero, carreras}) => ({
            id: carnet,
            name: nombre,
            mail: correo,
            gender: genero,
            career: carreras.nombre,
            career_id: carreras.id,
            faculty: carreras.facultades.nombre_corto,
            faculty_id: carreras.facultades.id,
        }));
        if (transformedData.length === 0) {
            throw new Error(`El estudiante con el carné '${id}' no existe`);
        } else {
            return transformedData[0];
        }
    }
}

const getStudents = async () => {
    const {data, error} = await supabase
        .from('estudiantes')
        .select(`
            carnet,
            nombre,
            correo,
            genero,
            carreras(
                nombre,
                facultades(
                    nombre_corto
                 )
            )
        `)

    if (error) {
        throw new Error(`Error getting students: ${error.message}`);
    } else {
        return data.map(({carnet, nombre, correo, genero, carreras}) => ({
            id: carnet,
            name: nombre,
            mail: correo,
            gender: genero,
            career: carreras.nombre,
            faculty: carreras.facultades.nombre_corto,
        }));
    }
}

const updateStudent = async ({id, name, mail, career_id, gender}) => {
    const {error} = await supabase
        .from('estudiantes')
        .update({
            carnet: id,
            nombre: name,
            correo: mail,
            id_carrera: career_id,
            genero: gender
        })
        .eq('carnet', id)

    if (error) {
        throw new Error(`Error updating student with id ${id}: ${error.message}`);
    }
}

export {
    updateStudent,
    getStudents,
    getStudentById,
    doesStudentExist,
    insertStudent,
};