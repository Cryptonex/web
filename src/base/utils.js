const ERROR = 'ERROR';
const SUCCESS = 'SUCCESS';

export const generateArrayConst = (constant) => {
  return [constant, `${constant}_${ERROR}`, `${constant}_${SUCCESS}`];
};
