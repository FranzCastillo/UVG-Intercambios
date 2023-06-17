import {supabase} from './client';

const getStudentsInExchanges = async () => {
    const {data, error} = await supabase
        .from('intercambios')
        .select(`
            id,
            anio,
            semestre,
            estudiantes(
                carnet,
                nombre
            ),
            modalidades(
                id,
                modalidad
            ),
            ciclo,
            universidades(
                id,
                nombre
            ),
            estados(
                id,
                estado
            ),
            fecha_viaje,
            asignacion,
            cursos_uvg,
            cursos_intercambio,
            comentarios
        `);

    if (error) {
        throw error;
    } else {
        console.log(data)
        return data.map((student) => {
            return {
                id: student.id,
                year: student.anio,
                semester: student.semestre,
                student: student.estudiantes.nombre,
                student_id: student.estudiantes.id,
                modality: student.modalidades.modalidad,
                modality_id: student.modalidades.id,
                cycle: student.ciclo,
                university: student.universidades.nombre,
                university_id: student.universidades.id,
                state: student.estados.estado,
                state_id: student.estados.id,
                date: student.fecha_viaje,
                assignation: student.asignacion,
                coursesUvg: student.cursos_uvg,
                coursesExchange: student.cursos_intercambio,
                comments: student.comentarios,
            }
        });
    }
}

export {
    getStudentsInExchanges,
}