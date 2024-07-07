"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("cars", [
      {
        id: 1,
        make: "Toyota",
        model: "Sienta",
        power: "Petrol",
        type: "MPV",
        price_per_day: 70,
        image_url:
          "https://www.freshcars.sg/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffreshcars-backend01%2Fo%2Fgallery-new%252Ftoyota-sienta-2xp170%252Fleft-1.jpg%3Falt%3Dmedia%26token%3Dc16fa415-b45a-4cfd-9e5a-6c5825c3d1c5&w=1920&q=75",
        seat_count: 7,
        make_year: 2019,
        vehicle_no: "ABC1234",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: 2,
        make: "Honda",
        model: "Stream",
        power: "Petrol",
        type: "MPV",
        price_per_day: 65,
        image_url:
          "https://www.freshcars.sg/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffreshcars-backend01%2Fo%2Fgallery-new%252Fhonda-stream-2%252Fleft-1.jpg%3Falt%3Dmedia%26token%3D17a7697d-7165-4fd8-b5c9-07e4dc531922&w=1920&q=75",
        seat_count: 7,
        make_year: 2007,
        vehicle_no: "BCD1234",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: 3,
        make: "Toyota",
        model: "Wish",
        power: "Petrol",
        type: "MPV",
        price_per_day: 65,
        image_url:
          "https://www.freshcars.sg/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffreshcars-backend01%2Fo%2Fgallery-new%252Ftoyota-wish-1ae10%252Fleft-1.jpg%3Falt%3Dmedia%26token%3D45e1f6b4-9251-4578-8318-0d56fb0a61b9&w=1920&q=75",
        seat_count: 7,
        make_year: 2006,
        vehicle_no: "CDE1234",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: 4,
        make: "Honda",
        model: "Jazz",
        power: "Petrol",
        type: "Hatchback",
        price_per_day: 55,
        image_url:
          "https://www.freshcars.sg/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffreshcars-backend01%2Fo%2Fgallery-new%252Fhonda-jazz-2%252Fleft-1.jpg%3Falt%3Dmedia%26token%3D20740a32-ea12-46ea-8f39-9918255ba3de&w=1920&q=75",
        seat_count: 5,
        make_year: 2008,
        vehicle_no: "DEF1234",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: 5,
        make: "Nissan",
        model: "Qashqai",
        power: "Petrol",
        type: "SUV",
        price_per_day: 70,
        image_url:
          "https://www.freshcars.sg/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffreshcars-backend01%2Fo%2Fgallery-new%252Fnissan-qashqai-2j11%252Fleft-1.png%3Falt%3Dmedia%26token%3D8e5b2ecb-b8b7-4216-8ba9-137d80f11f37&w=1920&q=75",
        seat_count: 5,
        make_year: 2016,
        vehicle_no: "EFG1234",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: 6,
        make: "Toyota",
        model: "Prius Hybrid",
        power: "Hybrid",
        type: "Sedan",
        price_per_day: 82,
        image_url:
          "https://www.freshcars.sg/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffreshcars-backend01%2Fo%2Fgallery-new%252Ftoyota-prius-hybrid-4%252Fleft-1.jpg%3Falt%3Dmedia%26token%3Dc6000518-5602-4c8f-9e93-51b882f8072c&w=1920&q=75",
        seat_count: 5,
        make_year: 2016,
        vehicle_no: "FGH1234",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: 7,
        make: "Kia",
        model: "Carens",
        power: "Diesel",
        type: "MPV",
        price_per_day: 77,
        image_url:
          "https://www.freshcars.sg/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffreshcars-backend01%2Fo%2Fgallery-new%252Fkia-carens-3fl%252Fleft-1.jpg%3Falt%3Dmedia%26token%3D7494cb3b-18e4-48a8-949d-7d4f547e4b47&w=1920&q=75",
        seat_count: 7,
        make_year: 2016,
        vehicle_no: "GHI1234",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: 8,
        make: "Mazda",
        model: "Biante",
        power: "Petrol",
        type: "MPV",
        price_per_day: 100,
        image_url:
          "https://www.freshcars.sg/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffreshcars-backend01.appspot.com%2Fo%2Fgallery-new%252Fmazda-biante-empty%252Fimg-1718693712384-0.jpg%3Falt%3Dmedia%26token%3D2f282b9d-0dbc-4132-81fb-9d461b1f0c47&w=1920&q=75",
        seat_count: 7,
        make_year: 2015,
        vehicle_no: "HIJ1234",
        created_at: new Date(),
        updated_at: new Date(),
      },

      {
        id: 9,
        make: "Toyota",
        model: "CHR Hybrid",
        power: "Hybrid",
        type: "MPV",
        price_per_day: 82,
        image_url:
          "https://www.freshcars.sg/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Ffreshcars-backend01.appspot.com%2Fo%2Fgallery-new%252Ftoyota-chr%2520hybrid-empty%252Fimg-1718696323133-0.jpg%3Falt%3Dmedia%26token%3D1dc768b8-35f2-4105-ad3c-21c84a0d5bd6&w=1920&q=75",
        seat_count: 4,
        make_year: 2017,
        vehicle_no: "IJK1234",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cars", null, {});
  },
};
