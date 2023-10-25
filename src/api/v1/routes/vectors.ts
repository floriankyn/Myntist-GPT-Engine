import express from "express";
const router = express.Router();

import { authenticate } from "../middleware/authentication.js";
import { save, compute, list } from "../controller/vectors.js";
import { validateCreateVector } from "../validator/vectors.js";


router.post("/api/v1/vectors/save", [authenticate, validateCreateVector], save);
router.post("/api/v1/vectors/compute", [authenticate], compute);
router.get("/api/v1/vectors/list/:source", [authenticate], list);
//router.delete("/api/v1/vectors/delete", [authenticate], remove);

export {
    router
};