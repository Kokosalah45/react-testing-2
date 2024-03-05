import { HttpResponse, http } from "msw";

export const handlers = [
  // Intercept the "GET /resource" request.
  http.get("http://localhost:3030/order-selection", () => {
    return HttpResponse.json([
      {
        category: "toppings",
        multiSelect: true,
        max: 3,
        options: [
          {
            id: 1,
            name: "chocolate",
            price: 1,
          },
          {
            id: 2,
            name: "strawberry",
            price: 1,
          },
          {
            id: 3,
            name: "vanilla",
            price: 1,
          },
          {
            id: 4,
            name: "Caramel",
            price: 1,
          },
          {
            id: 5,
            name: "Hot fudge",
            price: 1,
          },
        ],
      },
      {
        category: "scoops",
        multiSelect: false,
        max: 1,
        options: [
          {
            id: 6,
            name: "chocolate",
            price: 2,
          },
          {
            id: 7,
            name: "vanilla",
            price: 2,
          },
          {
            id: 8,
            name: "strawberry",
            price: 2,
          },
          {
            id: 9,
            name: "caramel",
            price: 2,
          },
          {
            id: 10,
            name: "hot fudge",
            price: 2,
          },
        ],
      },
    ]);
  }),
];
