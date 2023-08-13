import { expect } from "chai";
import request, { Response } from "supertest";
import app from "../app";
import { Itineraries } from "../models/Itinerary";

const server = request(app);

const mockItineraryBody: Itineraries = {
    user_id: "6eafecd1-788b-453d-9714-576a7f3f3fc7",
    date: "2023-12-08",
    name_of_day: "name of day",
    destination_id: "ec8afa68-8286-4f31-986f-5b9f2db3c8a5",
    activities: [{
        name: "test activity",
        place: "place"
    }]
};

const fakeUUID = "8e297de1-5586-4355-a699-48c0ebbe8f66"

const userData = {
    email: "user@gmail.com",
    password: "Aa@2233445566"
}

describe("Itinerary testing", () => {
    let token: string | undefined;
    before(async () => {
        const res: Response = await server.post("/auth/login").send(userData)
        token = res.body.token;

        expect(token).to.be.not.undefined
    });

    describe("POST /itineraries", () => {
        it("should create itinerary based on found destination id on db", async () => {
            const res = await server.post("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send(mockItineraryBody)

            mockItineraryBody.itinerary_id = res.body.newItinerary.itinerary_id;

            expect(res.body.status).to.be.equal("Success")
            expect(res.status).to.be.equal(201)
        });

        it("should not create itinerary if destination id not exist", async () => {

            const res = await server.post("/itineraries")
                .set("Authorization", `Bearer ${token}`)
                .send({ ...mockItineraryBody, destination_id: fakeUUID })

            expect(res.status).to.be.equal(400)
        });

    });

    describe("PATCH /itineraries/itienraryId", () => {
        it("should update itinerary", async () => {
            const res = await server.patch(`/itineraries/${mockItineraryBody.itinerary_id}`)
                .set("Authorization", `Bearer ${token}`)
                .send(mockItineraryBody);

            expect(res.body.status).to.be.equal("Success")
            expect(res.status).to.be.equal(200)
        });

        it("should not update itinerary if it not exist", async () => {
            const res = await server.patch(`/itineraries/${fakeUUID}`)
                .set("Authorization", `Bearer ${token}`)
                .send(mockItineraryBody)

            expect(res.status).to.be.equal(400)
        });

    });

    describe("GET /itineraries/itienraryId", () => {
        it("should get itinerary by id", async () => {
            const res = await server.get(`/itineraries/${mockItineraryBody.itinerary_id}`)
                .set("Authorization", `Bearer ${token}`)

            expect(res.body.status).to.be.equal("Success")
            expect(res.status).to.be.equal(200)
        });

        it("should not get itinerary if it not exist", async () => {
            const res = await server.get(`/itineraries/${fakeUUID}`)
                .set("Authorization", `Bearer ${token}`)

            expect(res.status).to.be.equal(400)
        });

    });

    describe("GET /itineraries/get/destinationId", () => {
        it("should get itineraries by destination id", async () => {
            const res = await server.get(`/itineraries/get/${mockItineraryBody.destination_id}`)
                .set("Authorization", `Bearer ${token}`)

            expect(res.body.status).to.be.equal("Success")
            expect(res.status).to.be.equal(200)
        });

    });
    
    describe("DELETE /itineraries/itineraryId", () => {
        it("should delete itinerary by id", async () => {
            const res = await server.delete(`/itineraries/${mockItineraryBody.itinerary_id}`)
                .set("Authorization", `Bearer ${token}`)

            expect(res.status).to.be.equal(204)
        });

    });

});