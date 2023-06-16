//*******************************************************************
//* @author    avillalonga <adrien.villalonga@gmail.com>            *
//* @license   ARR (all rights reserved)                            *
//*******************************************************************

import data from './data.mjs';
import router from './router.mjs';
import ui from './ui.mjs';

async function main(ctx) {
    ui.routes = ctx.data.routes;
    await ui.render();
}

const __main__ = main.bind(null, {
    router,
    ui,
    data
});

document.addEventListener('DOMContentLoaded', __main__);