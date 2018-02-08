export interface LogDTO {
    __id?: string;
    type?: string;
    description?: string;
    date?: string;
    user?: string;
}

export const log_types = ['create', 'update'];
export const log_type_strings = {
    'create' : 'Objet créé',
    'update' : 'A ete modifie',
};
