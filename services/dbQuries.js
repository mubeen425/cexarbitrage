const isDataExist = async (model, keyObj, next, res) => {
    try {
        let res = await model.exists(keyObj);
        next(res);
    } catch (error) {
        console.log("error", error);
        // res.status(404).json({message: ''})
    }
};

module.exports = {
    isDataExist,
};