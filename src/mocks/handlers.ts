import { HttpResponse, http } from "msw";

export const handlers = [
  // Intercept the "GET /resource" request.
  http.get("http://localhost:3030/order-selection", () => {
    return HttpResponse.json({
      toppings: {
        multiSelect: true,
        price: 1.5,
        max: 3,
        options: [
          {
            id: 1,
            name: "M&Ms",
            imagePath: "/images/m-and-ms.png",
          },
          {
            id: 2,
            name: "Hot fudge",
            imagePath: "/images/hot-fudge.png",
          },
          {
            id: 3,
            name: "Peanut butter cups",
            imagePath: "/images/peanut-butter-cups.png",
          },
          {
            id: 4,
            name: "Gummi bears",
            imagePath: "/images/gummi-bears.png",
          },
          {
            id: 5,
            name: "Mochi",
            imagePath: "/images/mochi.png",
          },
          {
            id: 6,
            name: "Cherries",
            imagePath: "/images/cherries.png",
          },
        ],
      },
      scoops: {
        multiSelect: false,
        price: 3.5,
        max: 1,
        options: [
          {
            id: 6,
            name: "chocolate",
            imgPath: "/images/chocolate.png",
          },
          {
            id: 7,
            name: "vanilla",
            imgPath: "/images/vanilla.png",
          },
          {
            id: 9,
            name: "salted caramel",
            imgPath: "/images/salted-caramel.png",
          },
          {
            id: 1,
            name: "Mint chip",
            imagePath: "/images/mint-chip.png",
          },
        ],
      },
    });
  }),
];

export const errorHandlers = [
  http.get("http://localhost:3030/order-selection", () => {
    return HttpResponse.json({ message: "no data found" }, { status: 404 });
  }),
];
