//*******************************************************************
//* @author    avillalonga <adrien.villalonga@gmail.com>            *
//* @license   ARR (all rights reserved)                            *
//*******************************************************************

class Router {
    route = [ 'home' ];

    async updateRoute(route) {
        console.log(`update route: ${route}`);
        this.route = route;
    }
}

let router = new Router();
export default router;