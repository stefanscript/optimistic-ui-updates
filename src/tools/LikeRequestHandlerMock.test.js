import LikeRequestHandler from "./LikeRequestHandlerMock";

describe("LikeRequestHandler Mock", () => {
    it("given the request should succeed rq should resolve with success", async () => {
        expect.assertions(1);
        LikeRequestHandler.idsToFail = [22];
        const data = await LikeRequestHandler.like(7, 1);
        expect(data.header).toEqual("success");
    });
    it("given the request should succeed rq should reject", () => {
        LikeRequestHandler.idsToFail = [7];
        return LikeRequestHandler.like(7, 1).catch((err) => {
            expect(err.header).toEqual("error");
        });
    });
});
