const STATUS = {
  EMAIL: {
    VALID: 200,
    DUPLICATED: 422,
  },
  STATIONS: {
    VALID: 201,
    DUPLICATED: 400,
    USED: 400,
  },
  LINES: {
    DUPLICATED: 400,
  },
  SECTIONS: {
    INVALID: 400,
  },
};

export default STATUS;
