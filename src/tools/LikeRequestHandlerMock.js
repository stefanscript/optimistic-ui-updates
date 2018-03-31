const LikeRequestHandler = {
    idsToFail: [],
    shouldSucceed: id => LikeRequestHandler.idsToFail.indexOf(id) === -1,
    like: (productId, likeValue) => {
        console.log(`HTTP /like/${productId}?like=${likeValue}`);
        return new Promise(((resolve, reject) => {
            setTimeout(() => {
                LikeRequestHandler.shouldSucceed(productId) ?
                    resolve({header: "success"}) :
                    reject({header: "error"});
            }, 1200);
        }));
    },
};

export default LikeRequestHandler;

