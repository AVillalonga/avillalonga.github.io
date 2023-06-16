//*******************************************************************
//* @author    avillalonga <adrien.villalonga@gmail.com>            *
//* @license   ARR (all rights reserved)                            *
//*******************************************************************

/**
 * Load http url and return the body part as a string (text/html)
 * 
 * @param {string} url 
 * @returns {string}
 */
export async function fetchHtml(url) {
    try {
        const request = await fetch(url, { headers: { 'Content-Type': 'text/html' } });
        if(request.ok) {
            const responseBody = new Response(request.body, { headers: { 'Content-Type': 'text/html' } });
            const body = await responseBody.text();
            return body;
        } else {
            return false;
        }
    } catch (exception) {
        return false;
    }
}

/**
 * Display or hide laoder
 * 
 * @param {boolean} show 
 */
export async function hideLoader(show=true) {
    const loader = document.querySelector('body .loader');
    loader.style.opacity = "0";
    setTimeout(() => {
        loader.style.display = "none";
    }, 900)
}