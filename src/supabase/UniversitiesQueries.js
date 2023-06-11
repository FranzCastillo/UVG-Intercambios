import {supabase} from './client';

// Transforms the data according to universities table
const transformUniversities = (data) => {
    const filteredData = data.filter((obj) => 'id' in obj);

    return filteredData.map(({ id, nombre, nombre_corto, paises }) => ({
        id,
        name: nombre,
        short_name: nombre_corto,
        country: paises.nombre,
    }));

};

const transformUniversity = (data) => {
    return data.map(({ id, nombre, nombre_corto, paises }) => ({
        id,
        name: nombre,
        short_name: nombre_corto,
        country: paises.nombre,
        continent: paises.continentes.nombre,
    }));
}

const getUniversities = async () => {
    const {data, error} = await supabase
        .from('universidades')
        .select(`
            id,
            nombre,
            nombre_corto,
            paises(
                nombre
            )
        `)

    if (error) {
        throw error;
    } else {
        return transformUniversities(data);
    }
}

const getUniversityById = async (id) => {
    const {data, error} = await supabase
        .from('universidades')
        .select(`
            id,
            nombre,
            nombre_corto,
            paises(
                nombre,
                continentes(
                    nombre
                )
            )
        `)
        .eq('id', id)
    if (error) {
        throw error;
    } else {
        return transformUniversity(data)[0];
    }
}

export {
    getUniversities,
    getUniversityById,
};