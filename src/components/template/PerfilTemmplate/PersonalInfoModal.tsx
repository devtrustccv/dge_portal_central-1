import React, { useState } from 'react';

import { Check, Plus, Trash, Upload } from 'lucide-react';
import { Modal } from '@/components/atoms/modal';


interface Contact {
  type: string;
  value: string;
  belongsTo: string;
}

interface AcademicInfo {
  schoolYear: string;
  studyArea: string;
  average: string;
  file?: File;
}

interface PersonalInfo {
  contacts: Contact[];
  academicInfo: AcademicInfo[];
  socialSecurityNumber: string;
  healthIssues: string;
  availabilityPeriod: string;
}

interface PersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (info: PersonalInfo) => void;
  initialData: PersonalInfo;
}

export function PersonalInfoModal({ isOpen, onClose, onSave, initialData }: PersonalInfoModalProps) {
  const [formData, setFormData] = useState<PersonalInfo>(initialData);
  const [newContact, setNewContact] = useState<Contact>({
    type: '',
    value: '',
    belongsTo: ''
  });

  const [newAcademicInfo, setNewAcademicInfo] = useState<AcademicInfo>({
    schoolYear: '',
    studyArea: '',
    average: '',
  });

  const contactTypes = [
    'Telefone',
    'Email',
    'WhatsApp',
    'Outro'
  ];

  const belongsToOptions = [
    'Próprio',
    'Pai/Mãe',
    'Outro Familiar',
    'Outro'
  ];

  const schoolYears = [
    '9º Ano',
    '10º Ano',
    '11º Ano',
    '12º Ano',
    'Licenciatura',
    'Mestrado'
  ];

  const handleAddContact = () => {
    if (newContact.type && newContact.value && newContact.belongsTo) {
      setFormData({
        ...formData,
        contacts: [...formData.contacts, newContact]
      });
      setNewContact({ type: '', value: '', belongsTo: '' });
    }
  };

  const handleRemoveContact = (index: number) => {
    setFormData({
      ...formData,
      contacts: formData.contacts.filter((_, i) => i !== index)
    });
  };

  const handleAddAcademicInfo = () => {
    if (newAcademicInfo.schoolYear && newAcademicInfo.studyArea) {
      setFormData({
        ...formData,
        academicInfo: [...formData.academicInfo, newAcademicInfo]
      });
      setNewAcademicInfo({ schoolYear: '', studyArea: '', average: '' });
    }
  };

  const handleRemoveAcademicInfo = (index: number) => {
    setFormData({
      ...formData,
      academicInfo: formData.academicInfo.filter((_, i) => i !== index)
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const updatedAcademicInfo = [...formData.academicInfo];
      updatedAcademicInfo[index] = {
        ...updatedAcademicInfo[index],
        file
      };
      setFormData({
        ...formData,
        academicInfo: updatedAcademicInfo
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Atualizar Informações Pessoais" maxWidth="4xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contato</h3>
          <div className="space-y-4">
            {formData.contacts.map((contact, index) => (
              <div key={index} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-3 gap-4 flex-1">
                  <div className="text-sm text-gray-600">{contact.type}</div>
                  <div className="text-sm font-medium">{contact.value}</div>
                  <div className="text-sm text-gray-600">{contact.belongsTo}</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveContact(index)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))}

            <div className="grid grid-cols-3 gap-4">
              <select
                value={newContact.type}
                onChange={(e) => setNewContact({ ...newContact, type: e.target.value })}
                className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61C3A8]"
              >
                <option value="">Tipo de Contato</option>
                {contactTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <input
                type="text"
                value={newContact.value}
                onChange={(e) => setNewContact({ ...newContact, value: e.target.value })}
                placeholder="Contato"
                className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61C3A8]"
              />

              <div className="flex gap-2">
                <select
                  value={newContact.belongsTo}
                  onChange={(e) => setNewContact({ ...newContact, belongsTo: e.target.value })}
                  className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61C3A8]"
                >
                  <option value="">Pertence a?</option>
                  {belongsToOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleAddContact}
                  className="p-2 text-[#61C3A8] hover:bg-[#61C3A8]/10 rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações Acadêmicas</h3>
          <div className="space-y-4">
            {formData.academicInfo.map((info, index) => (
              <div key={index} className="flex items-start gap-4 bg-gray-50 p-3 rounded-lg">
                <div className="grid grid-cols-4 gap-4 flex-1">
                  <div className="text-sm text-gray-600">{info.schoolYear}</div>
                  <div className="text-sm font-medium">{info.studyArea}</div>
                  <div className="text-sm text-gray-600">{info.average}</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      id={`file-${index}`}
                      className="hidden"
                      onChange={(e) => handleFileChange(e, index)}
                      accept=".pdf,.doc,.docx"
                    />
                    <label
                      htmlFor={`file-${index}`}
                      className="flex items-center gap-2 text-sm text-[#61C3A8] cursor-pointer hover:text-[#2470B8]"
                    >
                      <Upload className="w-4 h-4" />
                      {info.file ? info.file.name : 'Anexar ficheiro'}
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveAcademicInfo(index)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            ))}

            <div className="grid grid-cols-4 gap-4">
              <select
                value={newAcademicInfo.schoolYear}
                onChange={(e) => setNewAcademicInfo({ ...newAcademicInfo, schoolYear: e.target.value })}
                className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61C3A8]"
              >
                <option value="">Ano Escolar</option>
                {schoolYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              <input
                type="text"
                value={newAcademicInfo.studyArea}
                onChange={(e) => setNewAcademicInfo({ ...newAcademicInfo, studyArea: e.target.value })}
                placeholder="Área de Estudo"
                className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61C3A8]"
              />

              <input
                type="text"
                value={newAcademicInfo.average}
                onChange={(e) => setNewAcademicInfo({ ...newAcademicInfo, average: e.target.value })}
                placeholder="Média"
                className="p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61C3A8]"
              />

              <button
                type="button"
                onClick={handleAddAcademicInfo}
                className="p-2 text-[#61C3A8] hover:bg-[#61C3A8]/10 rounded-lg transition-colors duration-200"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Outros Detalhes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 line-clamp-1">
                Número de Cadastro Social Único (NIA)
              </label>
              <input
                type="text"
                value={formData.socialSecurityNumber}
                onChange={(e) => setFormData({ ...formData, socialSecurityNumber: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61C3A8]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 line-clamp-1">
                Tens algum problema de saúde?
              </label>
              <select
                value={formData.healthIssues}
                onChange={(e) => setFormData({ ...formData, healthIssues: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61C3A8]"
              >
                <option value="">Selecione uma opção</option>
                <option value="Não">Não</option>
                <option value="Sim">Sim</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 line-clamb-1">
                Período Disponível para Formação
              </label>
              <select
                value={formData.availabilityPeriod}
                onChange={(e) => setFormData({ ...formData, availabilityPeriod: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#61C3A8]"
              >
                <option value="">Selecione um período</option>
                <option value="Manhã">Manhã</option>
                <option value="Tarde">Tarde</option>
                <option value="Noite">Noite</option>
                <option value="Integral">Integral</option>
              </select>
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-[#61C3A8] to-[#2470B8] text-white rounded-lg hover:shadow-md transition-all duration-200 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
}