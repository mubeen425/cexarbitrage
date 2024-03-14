const useRouter = (app) => {
    app.use("/api/auth", require("./authRoutes"));
    app.use("/api/exchange", require("./exchangeRoutes"));
    app.use("/api/coin", require("./coinRouters"));
};

module.exports = useRouter;
