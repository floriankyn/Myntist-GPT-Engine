import { Router } from 'express';
const router = Router();

import { authenticate } from '../middleware/authentication.js';
import { save, compute, list, chat } from '../controller/vectors.js';
import {
  validateCreateVector,
  validateComputeVector,
  validateChat
} from '../validator/vectors.js';

router.post('/api/v1/vectors/save', [authenticate, validateCreateVector], save);
router.post(
  '/api/v1/vectors/compute',
  [authenticate, validateComputeVector],
  compute
);
router.get('/api/v1/vectors/list/:source', [authenticate], list);
router.post('/api/v1/vectors/chat', [authenticate, validateChat], chat);
// router.delete("/api/v1/vectors/delete", [authenticate], remove);

export { router };
