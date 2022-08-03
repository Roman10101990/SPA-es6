import router from "./router/router.js";
import 'jquery';
import 'jquery-validation';

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    window.addEventListener("hashchange", router);
    router();
});