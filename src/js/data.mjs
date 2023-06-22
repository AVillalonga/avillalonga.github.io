import {
    fetchHtml,
    hideLoader
} from './utils.mjs'

import ui from './ui.mjs';

let data = {
    routes: [{
            id: 'home',
            label: 'accueil',
            html: '../static/home.html',
            data: []
        },
        {
            id: 'presentation',
            label: 'présentation',
            html: '../static/presentation.html',
            data: []
        },
        {
            id: 'realisations',
            label: 'réalisations',
            html: '../static/realisations.html',
            data: [{
                    id: 'MyMRS',
                    html: '../static/realisations/0.html'
                },
                {
                    id: 'Rush',
                    html: '../static/realisations/1.html'
                },
                {
                    id: 'Métronome',
                    html: '../static/realisations/2.html'
                }
            ]
        },
        {
            id: 'tech-skills',
            label: 'compétences techniques',
            html: '../static/techskills.html',
            data: [{
                    id: 'Maîtriser son environnement',
                    html: '../static/techskills/0.html'
                },
                {
                    id: 'L\'art de la Refactorisation',
                    html: '../static/techskills/1.html'
                },
                {
                    id: '',
                    html: '../static/techskills/2.html'
                }
            ]
        },
        {
            id: 'third-skills',
            label: 'compétences transverses',
            html: '../static/thirdskills.html',
            data: [{
                    id: 'Créatif',
                    html: '../static/thirdskills/0.html'
                },
                {
                    id: 'Vigilant',
                    html: '../static/thirdskills/1.html'
                },
                {
                    id: 'Collaboratif',
                    html: '../static/thirdskills/2.html'
                }
            ]
        },
        {
            id: 'contact',
            label: 'CV & contact',
            html: '../static/contact.html',
            data: []
        },
        {
            id: 'github',
            label: 'git',
            html: '../static/github.html',
            data: []
        },
    ]
};


(async () => {
    for (const route of data.routes) {
        const content = await fetchHtml(route.html);
        route.html = content !== false ? content : route.html;
        for (const subRoute of route.data) {
            const subContent = await fetchHtml(subRoute.html);
            subRoute.html = subContent !== false ? subContent : subRoute.html;
        }
    }

    await ui.render();
    await hideLoader();
})()

export default data;