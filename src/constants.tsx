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

let clientsTaxonomy: Item = {
    key: "dalva_p",
    slug: "clients",
    name: "Aluno",
    namePlural: "Alunos",
    fields: personFields,
    items: {}
};

const employeesTaxonomy: Item = {
    key: "dalva_e",
    slug: "employees",
    name: "Funcionário",
    namePlural: "Funcionários",
    fields: personFields,
    items: {}
};

const lessonsTaxonomy: Item = {
    key: "dalva_l",
    slug: "lessons",
    name: "Aula",
    namePlural: "Aulas",
    fields: lessonsFields,
    items: {}
};

const classesTaxonomy: Item = {
    key: "dalva_c",
    slug: "classes",
    name: "Turma",
    namePlural: "Turmas",
    fields: classesFields,
    items: {}
};

const disciplineTaxonomy: Item = {
    key: "dalva_d",
    slug: "disciplines",
    name: "Matéria",
    namePlural: "Matérias",
    fields: disciplineFields,
    items: {}
};

const routesTaxonomy: Item = {
    key: "dalva_routes",
    slug: "routes",
    name: "Rota",
    namePlural: "Rotas",
    fields: routeFields,
    items: {}
};

export const OIE_TAXONOMY: Item = {
    key: "dalva_taxonomies",
    slug: "taxonomies",
    name: "Taxonomia",
    namePlural: "Taxonomias",
    fields: taxonomyFields,
    items: {
        [routesTaxonomy.slug]: routesTaxonomy,
        [disciplineTaxonomy.slug]: disciplineTaxonomy,
        [classesTaxonomy.slug]: classesTaxonomy,
        [lessonsTaxonomy.slug]: lessonsTaxonomy,
        [employeesTaxonomy.slug]: employeesTaxonomy,
        [clientsTaxonomy.slug]: clientsTaxonomy
    }
};

Object.keys(OIE_TAXONOMY.items).map((slug, index) => {

    let taxonomy = OIE_TAXONOMY.items[slug];

    let localData = localStorage.getItem(taxonomy.key);

    if (localData) {
        console.log(taxonomy.name, 'has local data, overwriting')
        OIE_TAXONOMY.items[slug] = JSON.parse(localData);
    }
    else
        localStorage.setItem(taxonomy.key, JSON.stringify(taxonomy));

});

console.log('OIE_TAXONOMY:', OIE_TAXONOMY)

interface PageMap {
    [key: string]: PageConfig;
}

export interface PageConfig {
    title: string;
    /**
   * The data mode for this component
   * Single: a single item is displayed (will fetch a key from the route to get the item)
   * All: all items for the taxonomy are displayed
   * Data is fetched in the PageContainer and then supplied to the presentional component
   */
    dataType: "single" | "all";
    components: ComponentMap;

}

export interface ComponentMap {
    [key: string]: ComponentOptions;
}

export interface ComponentOptions {
    key: string;

    /**
     * The title of the component
     * It is possible to use %name% or %namePlural% to display the name of the taxonomy
     */
    title: string;

    filter?: any;
    onClick?: string;
    onSubmit?: string;
    onDelete?: string;
}

export const PAGES: PageMap = {

    "list": {
        title: "Listar %namePlural%",
        dataType: "all",
        components: {
            "list": {
                key: "list",
                title: "Lista",
                onClick: "view",
                onDelete: "delete"
            }
        }
    },
    "view": {
        title: "Ver %namePlural%",
        dataType: "single",
        components: {
            "view": {
                key: "view",
                title: "Ver",
                onSubmit: "update"
            }
        }
    },
    "add": {
        title: "Cadastrar %namePlural%",
        dataType: "single",
        components: {
            "add": {
                key: "add",
                title: "Cadastrar",
                onSubmit: "add"
            }
        }
    }
}