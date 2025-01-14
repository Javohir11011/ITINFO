import {
  createComment,
  deleteComment,
  getCommentByContent,
  getComments,
  updateComment,
} from "../service/index.js";
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";
export const getAllCommentsController = async (req, res, next) => {
  try {
    logger.info("Route: /api/v1/comments METHOD: GET");
    const data = await getComments();
    return res.status(statusCodes.OK).send({
      message: "All courses",
      Comments: data,
    });
  } catch (error) {
    logger.error(`Route: /api/v1/comments METHOD: GET, ${error.message}`);
    next(new ApiError(error.statusCode, error.message));
  }
};
export const getByContentCommentController = async (req, res, next) => {
  try {
    logger.info("Route: /api/v1/comment/:content METHOD: GET");

    const content = req.params.content;
    const data = await getCommentByContent(content);
    return res.status(statusCodes.OK).send({
      message: "Comment",
      data: data,
    });
  } catch (error) {
    logger.error(
      `Route: /api/v1/comment:content METHOD: GET, ${error.message}`
    );

    next(new ApiError(error.statusCode, error.message));
  }
};
export const createCommentController = async (req, res, next) => {
  try {
    logger.info("Route: /api/v1/comment METHOD: POST");

    const { content, course_id, article_id } = req.body;
    const commentitems = req.body;
    const data = await createComment(
      content,
      commentitems,
      course_id,
      article_id
    );
    res.send(data);
  } catch (error) {
    logger.error(`Route: /api/v1/comment METHOD: POST, ${error.message}`);
    next(new ApiError(error.statusCode, error.message));
  }
};
export const updateCommentController = async (req, res, next) => {
  try {
    logger.info("Route: /api/v1/comment/:content METHOD: PUT");

    const content = req.params.content;
    const data = await updateComment(content, req.body);
    res.status(statusCodes.OK).send(data);
  } catch (error) {
    logger.error(
      `Route: /api/v1/comment/:content METHOD: PUT, ${error.message}`
    );

    next(new ApiError(error.statusCode, error.message));
  }
};
export const deleteCommentController = async (req, res, next) => {
  try {
    logger.info("Route: /api/v1/comment/:content METHOD: DELETE");

    const content = req.params.content;
    const data = await deleteComment(content);
    res.status(statusCodes.OK).send(data);
  } catch (error) {
    logger.error(
      `Route: /api/v1/comment/:content METHOD: DELETE, ${error.message}`
    );
    next(new ApiError(error.statusCode, error.message));
  }
};
