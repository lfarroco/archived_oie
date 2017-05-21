import { Item } from "./components/Taxonomy/Taxonomy";
import { ItemFieldsCollection } from "./components/Taxonomy/TaxonomyItem";
import { ItemFields } from "./components/Taxonomy/ItemFields";

export interface Person extends ItemFieldsCollection {
    name: ItemFields;
    email: ItemFields;
    birthDate: ItemFields;
    phone: ItemFields;
}

export interface TaxonomyMap {
    [index: string]: Item
}

const personFields: Person = {
    name: { label: "Nome" },
    email: { label: "Email", type: "email" },
    birthDate: { label: "Data de Nascimento", type: "date", cols: "col-xs-6" },
    phone: { label: "Telefone", cols: "col-xs-6" }
};

const classesFields: ItemFieldsCollection = {
    name: { label: "Nome" },
    content: { label: "Conteúdo Programático" }
};

const lessonsFields: ItemFieldsCollection = {
    name: { label: "Nome" },
    startDate: { label: "Data Inicial", type: "date", cols: "col-sm-3 col-xs-6 col-md-2" },
    endDate: { label: "Data Final", type: "date", cols: "col-sm-3 col-xs-6 col-md-2" },
    students: { label: "Alunos", type: "itemPicker", taxonomy: "clients" },
    content: { label: "Conteúdo Programático" }
};

const disciplineFields: ItemFieldsCollection = {
    name: { label: "Nome" },
    content: { label: "Conteúdo Programático" }
};

const taxonomyFields: ItemFieldsCollection = {
    name: { label: "Nome" },
    namePlural: { label: "Plural" },
    slug: { label: "Slug" },
    fields: { label: "Campos", type: "fieldEditor" }
};

const routeFields: ItemFieldsCollection = {
    path: { label: "Path" },
    action: { label: "Action" }
};

const clientsTaxonomy: Item = {
    key: "dalva_p",
    slug: "clients",
    name: "Aluno",
    namePlural: "Alunos",
    fields: personFields
};

const employeesTaxonomy: Item = {
    key: "dalva_e",
    slug: "employees",
    name: "Funcionário",
    namePlural: "Funcionários",
    fields: personFields
};

const lessonsTaxonomy: Item = {
    key: "dalva_l",
    slug: "lessons",
    name: "Aula",
    namePlural: "Aulas",
    fields: lessonsFields
};

const classesTaxonomy: Item = {
    key: "dalva_c",
    slug: "classes",
    name: "Turma",
    namePlural: "Turmas",
    fields: classesFields
};

const disciplineTaxonomy: Item = {
    key: "dalva_d",
    slug: "disciplines",
    name: "Matéria",
    namePlural: "Matérias",
    fields: disciplineFields
};

const taxonomyTaxonomy: Item = {
    key: "dalva_taxonomies",
    slug: "taxonomies",
    name: "Taxonomia",
    namePlural: "Taxonomias",
    fields: taxonomyFields
};

const routesTaxonomy: Item = {
    key: "dalva_routes",
    slug: "routes",
    name: "Rota",
    namePlural: "Rotas",
    fields: routeFields
};

export const DefaultTaxonomyMap: TaxonomyMap = {

    clients: clientsTaxonomy,
    employees: employeesTaxonomy,
    classes: classesTaxonomy,
    lessons: lessonsTaxonomy,
    disciplines: disciplineTaxonomy,
    taxonomies: taxonomyTaxonomy,
    routes: routesTaxonomy

};