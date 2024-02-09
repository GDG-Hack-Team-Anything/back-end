const notFound = {
    status: "404",
    message: "Your search couldn't be found",
  };
  const notValid = {
    status: "400",
    message: "Your request couldn't be handled",
  };
  const InternalError = {
    status: "500",
    message: "Something went wrong, Please try again",
  };
    const errorHandler = (err, req, res, next) => {
        if (err.status === 404) {
        res.status(404).json(notFound);
        } else if (err.status === 400) {
        res.status(400).json(notValid);
        } else {
        res.status(500).json(InternalError);
        }
    };