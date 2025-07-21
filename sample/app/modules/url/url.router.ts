import { Router } from "express";
import { urlController } from "./url.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { urlValidation } from "./url.validation";

const router = Router();

/**
 * @swagger
 * /urls:
 *   post:
 *     summary: Create a new short URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 format: url
 *               expiresAt:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *               password:
 *                 type: string
 *                 nullable: true
 *               custom:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: object
 *                  properties:
 *                   _id:
 *                     type: string
 *                   original:
 *                     type: string
 *                   shortCode:
 *                     type: string
 *                   numOfClicks:
 *                     type: number
 */
router.post("/", validateRequest(urlValidation.create), urlController.create);

/**
 * @swagger
 * /urls:
 *   get:
 *     summary: Get all short URLs.
 *     parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *          type: string
 *        required: false
 *        description: Number of URLs to return.
 *     responses:
 *      200:
 *       description: OK
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              data:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    original:
 *                      type: string
 *                    shortCode:
 *                      type: string
 *                    expiresAt:
 *                      type: string
 *                    numOfClicks:
 *                      type: number
 */
router.get("/", validateRequest(urlValidation.list), urlController.list);

/**
 * @swagger
 * /{code}:
 *   get:
 *     summary: Redirect to the original URL.
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Short code of the URL.
 *     responses:
 *       200:
 *         description: OK
 *       302:
 *         description: Found
 *       404:
 *         description: Not Found
 */
router.get("/:code", urlController.redirect);

/**
 * @swagger
 * /urls/{id}:
 *   delete:
 *     summary: Delete a short URL by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the URL to delete.
 *     responses:
 *       200:
 *         description: OK
 */
router.delete(
  "/:id",
  validateRequest(urlValidation.deleteUrl),
  urlController.deleteUrl
);

export const urlRouter = router;
