// import catchAsync from './catchAsync';
// import AppError from './appError';
import APIFeatures from './apiFeatures';

export const getAll = async (Model, query) => {
  const filter = {};
  const features = new APIFeatures(Model.find(filter), query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;
  return doc;
};
