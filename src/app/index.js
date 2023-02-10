import { addsElems, planElems, formElems } from "./elements.js";

formElems();
planElems("./src/data/plan.json", false);
addsElems("./src/data/adds.json", false);
