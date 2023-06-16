//*******************************************************************
//* @author    avillalonga <adrien.villalonga@gmail.com>            *
//* @license   ARR (all rights reserved)                            *
//*******************************************************************

import router from './router.mjs';

async function onClickMainElement(ev) {
    ev.preventDefault();
    router.updateRoute([ ev.target.dataset.id ]);
    await this.renderSecondNavigation();
    await this.renderNavigationsItems();
    await this.renderContent();

    const navigation = document.querySelector('nav.navigation.main');
    const profile = document.querySelector('header.header .profile');
    navigation.classList.remove('open');
    navigation.dataset.expend = 'true';
    profile.style.display = 'flex';
}

async function onClickSecondElement(ev) {
    ev.preventDefault();
    router.updateRoute([ router.route[0], ev.target.dataset.id ]);
    await this.renderNavigationsItems();
    await this.renderContent();
}

async function toggleResponsiveMenuItems() {
    const navigation = document.querySelector('nav.navigation.main');
    const profile = document.querySelector('header.header .profile');

    navigation.dataset.expend = navigation.dataset.expend === 'false' ? 'true' : 'false';
    if(navigation.dataset.expend === 'false') {
        navigation.classList.add('open');
        profile.style.display = 'none';
    } else {
        navigation.classList.remove('open');
        profile.style.display = 'flex';
    }
}

class UI {
    routes              = undefined;
    contentTo           = undefined;
    responsiveInterval  = undefined;
    responsiveMode      = undefined;
    loaded              = false;
    
    async render() {
        await this.renderMainNavigation();
        await this.renderSecondNavigation();
        await this.renderContent();
        await this.renderNavigationsItems();
        if(this.loaded === false) {
            this.reponsiveInterval = setTimeout(this.reponsiveUpdate.bind(this), 333);
        }
        this.loaded = true;
    }

    // Responsive

    async reponsiveUpdate() {
        this.responsiveMode = window.getComputedStyle(document.body, ':before').content.replaceAll('"', '');
        clearTimeout(this.reponsiveInterval);
        this.reponsiveInterval = setTimeout(this.reponsiveUpdate.bind(this), 333);
    }

    // Navigations

    async renderMainNavigation() {
        const mainNavigation = document.querySelector('nav.navigation.main');
        mainNavigation.innerHTML = "";

        const createMainElement = function(label, id, onclick, navigation, styleClass=undefined) {
            const a = document.createElement('a');
            a.innerText = label;
            a.dataset.id = id;
            a.onclick = onclick;

            if(styleClass !== undefined) {
                a.classList.add(...styleClass);
            }

            navigation.appendChild(a);
        }

        for(const route of this.routes) {
            createMainElement(route.label, route.id, onClickMainElement.bind(this), mainNavigation);
        }

        createMainElement('', '', toggleResponsiveMenuItems, mainNavigation, ['expend']);
    }

    async renderSecondNavigation() {
        const secondNavigation = document.querySelector('nav.navigation.second ul')
        const currentRoute = this.routes.find(route => route.id === router.route[0]);
        const subElements = currentRoute.data;
        secondNavigation.innerHTML = '';

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.innerText = currentRoute.label;
        a.dataset.id = -1;
        a.onclick = onClickSecondElement.bind(this);
        li.appendChild(a);
        secondNavigation.appendChild(li);

        if(subElements.length > 0) {
            let inc = 0;
            for(const subElement of subElements) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.innerText = subElement.id;
                a.dataset.id = inc;
                a.onclick = onClickSecondElement.bind(this);
                inc++;
                li.appendChild(a);
                secondNavigation.appendChild(li);
            }
        }
    }

    async renderNavigationsItems() {
        const elements = [...document.querySelectorAll('nav.navigation.main a')];
        
        for(const element of elements) {
            if(element.dataset.id === router.route[0]) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        }

        const subElements = [...document.querySelectorAll('nav.navigation.second ul a')];
        if(router.route.length > 1) {
            for(const subElement of subElements) {
                console.log(subElement.dataset.id, router.route[1]);
                if(subElement.dataset.id === router.route[1]) {
                    subElement.classList.add('active');
                } else {
                    subElement.classList.remove('active');
                }
            }
        } else {
            subElements[0].classList.add('active');
        }
    }

    // Content

    async renderContent() {
        const section = document.querySelector('main.main>section');
        section.classList.add('hide');

        if(this.contentTo !== undefined) {
            clearTimeout(this.contentTo);
        }
        
        this.contentTo = setTimeout(async () => {
            const parentRoute = this.routes.find(route => route.id === router.route[0]);
            const dataRoute = parentRoute.data;
            section.innerHTML = (router.route.length > 1 && Number(router.route[1]) > -1
                ? dataRoute[Number(router.route[1])].html
                : parentRoute.html)

                section.scrollTop = 0;

            section.classList.remove('hide');
        }, 0);
    }

}

let ui = new UI();
export default ui;