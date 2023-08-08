import { expect } from "chai";
import request, { Response } from "supertest";
import app from "../app";
import { Destination } from "../models/Destination";

const server = request(app)

const mockDestinationBody: Destination = {
    name: "Test Destination",
    description: "ths is a best country",
    country: "Australia",
    city: "sydney",
    user_id: "6eafecd1-788b-453d-9714-576a7f3f3fc7"
};

const userData = {
    email: "user@gmail.com",
    password: "Aa@2233445566"
}

describe("Destination testing", () => {
    let token: string | undefined;
    before(async () => {
        const res: Response = await server.post("/auth/login").send(userData)
        token = res.body.token;

        expect(token).to.be.not.undefined
    });

    describe('POST /destinaions', function () {
        it("Should create destination", async () => {
            const res = await server.post("/destinations")
                .set("Authorization", `Bearer ${token}`)
                .send(mockDestinationBody);

            mockDestinationBody.destination_id = res.body.Destination.destination_id;

            expect(res.body.status).to.be.equal("Success");
            expect(res.body).have.property("Destination")
            expect(res.status).to.be.equal(201);
        });
    });

    describe('PATCH /destinaions/:id', function () {
        it("Should update destination", async () => {
            const res = await server.patch(`/destinations/${mockDestinationBody.destination_id}`)
                .set("Authorization", `Bearer ${token}`)
                .send(mockDestinationBody);

            expect(res.body.status).to.be.equal("Success");
            expect(res.body).have.property("destination")
            expect(res.status).to.be.equal(200);
        });
    });
   
    describe('GET /destinaions', function () {
        it("Should update destination", async () => {
            const res = await server.get(`/destinations`)
                .set("Authorization", `Bearer ${token}`)

            expect(res.body.status).to.be.equal("Success");
            expect(res.body).have.property("destinations")
            expect(res.status).to.be.equal(200);
        });
    });

    describe('GET /destinaions/:id', function () {
        it("Should Get destination by id", async () => {
            const res = await server.get(`/destinations/${mockDestinationBody.destination_id}`)
                .set("Authorization", `Bearer ${token}`)

            expect(res.body.status).to.be.equal("Success");
            expect(res.body).have.property("destination")
            expect(res.status).to.be.equal(200);
        });
    });

    describe('DELETE /destinaions/:id', function () {
        it("Should delete destination", async () => {
            const res = await server.delete(`/destinations/${mockDestinationBody.destination_id}`)
                .set("Authorization", `Bearer ${token}`)

            expect(res.status).to.be.equal(204);
        });
    });

});