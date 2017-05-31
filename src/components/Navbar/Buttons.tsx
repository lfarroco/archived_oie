export const NavBarButtons: any = {
    leftButtons: {
        "👤 Alunos": {
            icon: "user",
            children: {
                "Listar Alunos": {
                    target: "clients/list",
                    icon: "user"
                },
                "Cadastrar Aluno": {
                    target: "clients/add",
                    icon: "plus"
                }

            }
        },
        "👤 Funcionários": {
            icon: "user",
            children: {
                "Listar Funcionários": {
                    target: "employees/list",
                    icon: "user"
                },
                "Cadastrar Funcionário": {
                    target: "employees/add",
                    icon: "plus"
                }

            }
        },
        "📅 Aulas": {
            icon: "calendar",
            children: {
                "Listar Aulas": {
                    target: "lessons/list",
                    icon: "user"
                },
                "Marcar Aula": {
                    target: "lessons/add",
                    icon: "plus"
                }

            }
        },
        "💼 Turmas": {
            icon: "education",
            children: {
                "Listar Turmas": {
                    target: "classes/list",
                    icon: "users"
                },
                "Marcar Turma": {
                    target: "classes/add",
                    icon: "plus"
                }

            }
        },
        "🎓 Matérias": {
            icon: "education",
            children: {
                "Listar Matérias": {
                    target: "disciplines/list",
                    icon: "education"
                },
                "Adicionar Matérias": {
                    target: "disciplines/add",
                    icon: "plus"
                }

            }
        },
        "Administração": {
            icon: "education",
            children: {
                "Telas": {
                    target: "screens/create-screen",
                    icon: "list-alt"
                },
                "Rotas": {
                    target: "routes/list",
                    icon: "share"
                },
                "Taxonomias": {
                    target: "taxonomies/list",
                    icon: "list-th"
                }

            }
        },
    }

};