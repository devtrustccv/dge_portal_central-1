import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { ICandidatura } from '@/app/(layout-with-banner)/ofertas-formativas/candidatura/actions';
import ScoreBadge from '@/components/atoms/score-badge';
import CoursesList from './CoursesList';

interface ArchivedApplicationsTableProps {
    applications: ICandidatura[];
}

const ArchivedApplicationsTable: React.FC<ArchivedApplicationsTableProps> = ({ applications }) => {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const toggleRow = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-PT');
    };

    return (
        <div className="bg-white rounded-3xl p-4  md:p-6 lg:px-8 space-y-4 md:space-y-12">
            <div className="border-b border-gray-100 bg-white">
                <h2 className="text-2xl font-bold text-gray-800">Candidaturas Arquivadas</h2>
                <p className="text-sm text-gray-600 mt-1">Listagem de todas as candidaturas encerradas ou arquivadas</p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Código
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Nome
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Pontuação
                            </th>
                            {/*<th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Data de Criação
                            </th>*/}
                            <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Data de Encerramento
                            </th>
                            <th scope="col" className="relative px-6 py-4">
                                <span className="sr-only">Detalhes</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {applications.map((app) => (
                            <React.Fragment key={app.id}>
                                <tr className={`group hover:bg-blue-50/50 transition-colors duration-150 ${expandedRow === app.id ? 'bg-blue-50 border-b-0' : ''
                                    }`}>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                            {app.codigoCandidatura}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className="text-sm font-medium text-gray-900">{app.nome}</span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        {/*<StatusBadge status={app.statusCandidatura} statusCode={app.statusCandidaturaCode} />*/}
                                        {app.statusCandidatura}
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <ScoreBadge score={app.pontuacao || 0} />
                                    </td>
                                    {/*<td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar size={16} className="mr-2 text-gray-400" />
                                            {formatDate(app.dateCreate)}
                                        </div>
                                    </td>*/}
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Clock size={16} className="mr-2 text-gray-400" />
                                            {formatDate(app.dataFimCandidatura)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-right">
                                        <button
                                            onClick={() => toggleRow(app.id)}
                                            className="text-gray-400 hover:text-blue-600 transition-colors duration-150"
                                        >
                                            {expandedRow === app.id ? (
                                                <ChevronUp size={20} />
                                            ) : (
                                                <ChevronDown size={20} />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                                {expandedRow === app.id && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-4 bg-blue-50">
                                            <div className="border-t border-blue-100 pt-4">
                                                <h4 className="text-sm font-semibold text-gray-700 mb-3">Cursos Selecionados</h4>
                                                <CoursesList courses={app.cursos} />
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ArchivedApplicationsTable;