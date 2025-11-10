import { router } from "./router.js";
import { initDropdowns } from "./components/dropdown.js";

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
initDropdowns(document.body);