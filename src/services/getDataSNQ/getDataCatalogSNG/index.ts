export function getDataCatalogSNG() {
    return {
        banner: {
            title: 'fORMAÇÃO PROFISSIONAL',
            subTitle: 'catálogo nacional de qualificações',
            image: '/brooke-cagle-g1Kr4Ozfoac-unsplash 2.png',
        },

        descriptionPage: {
            description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,\n' +
                ' eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem\n' +
                ' quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.\n' +
                ' Neque porro quisquam est, qui dolorem Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,\n' +
                ' totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam\n' +
                ' voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione\n' +
                ' voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem'
        },

        sider_filter: [
            {
                value: "familia-profissional",
                label: "Familia Profissional",
                items: [
                    {
                        value: "tecnologia",
                        label: "Tecnologia"
                    },
                    {
                        value: "gestao",
                        label: "Gestão"
                    },
                    {
                        value: "marketing",
                        label: "Marketing"
                    }
                ]
            },
            {
                value: "requisito-acesso",
                label: "Requisito Acesso",
                items: [
                    {
                        value: "bacharel",
                        label: "Bacharel"
                    },
                    {
                        value: "tecnico",
                        label: "Técnico"
                    },
                    {
                        value: "pos-graduacao",
                        label: "Pós-graduação"
                    }
                ]
            },
            {
                value: "nivel",
                label: "Nivel",
                items: [
                    {
                        value: "junior",
                        label: "Junior"
                    },
                    {
                        value: "pleno",
                        label: "Pleno"
                    },
                    {
                        value: "senior",
                        label: "Senior"
                    }
                ]
            },
            {
                value: "referencial-rvcc",
                label: "Referencial RVCC",
                items: [
                    {
                        value: "rvcc-1",
                        label: "RVCC 1"
                    },
                    {
                        value: "rvcc-2",
                        label: "RVCC 2"
                    },
                    {
                        value: "rvcc-3",
                        label: "RVCC 3"
                    }
                ]
            }
        ]
    }
}