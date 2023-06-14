import {supabase} from './client';

const getFaculties = async () => {
    const {data, error} = await supabase
        .from('facultades')
        .select(`
            id,
            nombre,
            nombre_corto
        `)

    if (error) {
        throw new Error(`Error al obtener las facultades: ${error.message}`)
    } else {
        return data.map(({id, nombre, nombre_corto}) => ({
            id,
            name: nombre,
            short_name: nombre_corto,
        }));
    }
}

const getCareersByFaculty = async (facultyId) => {
    const {data, error} = await supabase
        .from('carreras')
        .select(`
            id,
            nombre
        `)
        .eq('id_facultad', facultyId)

    if (error) {
        throw error;
    } else {
        return data.map(({id, nombre}) => ({
            id,
            name: nombre,
        }));
    }
}

const getCareers = async () => {
    const {data, error} = await supabase
        .from('carreras')
        .select(`
            id,
            nombre,
            facultades(
                nombre_corto
            )
        `)

    if (error) {
        throw error;
    } else {
        return data.map(({id, nombre, facultades}) => ({
            id,
            name: nombre,
            faculty: facultades.nombre_corto,
        }));
    }
}


export {
    getFaculties,
    getCareersByFaculty,
    getCareers,
};