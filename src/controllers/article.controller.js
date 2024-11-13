import {
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../service/index.js";
import {
  statusCodes,
  ApiError,
  errorMessages,
  logger,
} from "../utils/index.js";

export const getAllArticlesController = async (req, res, next) => {
  try {
    logger.info("Route: /api/v1/article METHOD: GET");
    const data = await getArticle();
    res.status(statusCodes.OK).send({
      Articles: data,
    });
  } catch (error) {
    logger.error(`Route: /api/v1/article METHOD: GET, ${error.message}`);
    next(error);
  }
};
export const createArticlesController = async (req, res, next) => {
  try {
    logger.info("Route: /api/v1/article METHOD: POST");
    const { title, content, author_id, category_id } = req.body;
    const data = await createArticle(title, content, author_id, category_id);
    res.status(200).send(data);
  } catch (error) {
    logger.error(`Route: /api/v1/article METHOD: POST, ${error.message}`);
    next(error);
  }
};
export const updateArticlesController = async (req, res, next) => {
  try {
    logger.info("Route: /api/v1/article/:title METHOD: PUT");
    const title = req.params.title;
    const update = await updateArticle(title, req.body);
    res.status(statusCodes.OK).send(update);
  } catch (error) {
    logger.error(`Route: /api/v1/article/:title METHOD: PUT, ${error.message}`);
    next(error);
  }
};
export const deleteArticlesController = async (req, res, next) => {
  try {
    logger.info("Route: /api/v1/article/:title METHOD: DELETE");
    const title = req.params.title;
    const deleted = await deleteArticle(title);
    res.send(deleted);
    logger.error(
      `Route: /api/v1/article/:title METHOD: DELETE, ${error.message}`
    );
  } catch (error) {
    next(error);
  }
};
