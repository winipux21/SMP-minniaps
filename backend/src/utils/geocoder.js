const axios = require("axios");

// Метод для получения координат по адресу
const getCoordinates = async (address) => {
  if (!process.env.YANDEX_API_KEY) {
    throw new Error("YANDEX_API_KEY не установлен в .env");
  }

  try {
    const fullAddress = address.includes("Нижегородская область")
      ? address
      : `${address}, Нижегородская область`;

    const response = await axios.get("https://geocode-maps.yandex.ru/1.x/", {
      params: {
        apikey: process.env.YANDEX_API_KEY,
        format: "json",
        geocode: fullAddress,
      },
    });

    const coordinates =
      response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
        " "
      );

    return {
      longitude: parseFloat(coordinates[0]),
      latitude: parseFloat(coordinates[1]),
    };
  } catch (error) {
    console.error("Ошибка при получении координат:", error);
    return null;
  }
};

module.exports = { getCoordinates };
