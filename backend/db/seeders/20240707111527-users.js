"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        email: "lyp2726@outlook.com",
        name: "Ryan Ler",
        profile_pic_url: "https://i0.wp.com/cdn.auth0.com/avatars/ly.png?ssl=1",
        contact_no: "12345678",
        is_admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        email: "lyp2726@gmail.com",
        name: "Alan Tan",
        contact_no: "23456789",
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
