import { Curso } from '@/app/(layout-with-banner)/ofertas-formativas/candidatura/actions';
import { formatDate } from '@/lib/utils';
import React from 'react';

interface CoursesListProps {
    courses: Curso[];
}

const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
    if (!courses.length) return <span className="text-gray-500 text-sm italic">Nenhum curso selecionado</span>;

    return (
        <div className="grid gap-3">
            {courses.map((course, index) => (
                <div
                    key={course.cursoCandatoId}
                    className={`p-6 rounded-2xl transition-all duration-300 ${index === 0
                        ? 'bg-gradient-to-r from-[#61C3A8]/10 to-[#2470B8]/10 border border-[#61C3A8]/20'
                        : 'bg-gradient-to-r from-[#2470B8]/10 to-[#61C3A8]/10 border border-[#2470B8]/20'
                        }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className={`
                            px-3 py-1 rounded-full text-sm font-medium
                            ${index === 0 ? 'bg-[#61C3A8] text-white' : 'bg-[#2470B8] text-white'}
                            `}>
                            {course.ordemPreferencia}ª Opção
                        </span>
                    </div>
                    <h3 className="font-medium text-gray-900">{course.denominacaoQualif + (course?.nivel ? ` - ${course?.nivel}` : "")} </h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                        <span className="px-2 py-1 bg-gray-100 rounded">{course?.nomeEntidade}</span>
                        {course.concelho && <>
                            <span className="text-primary">•</span>
                            <span>{course.concelho}</span>
                        </>}
                        {course.dataInicioCurso && <>
                            <span className="text-primary">•</span>
                            <span>{formatDate(course.dataInicioCurso)}</span>
                        </>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoursesList;