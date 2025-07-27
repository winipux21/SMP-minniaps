const Request = require("../models/Request");

// Получение заявок для карты с фильтрацией по типу
const getMapMarkers = async (req, res) => {
  const { type } = req.query; // Тип: human или pet

  try {
    const markers = await Request.find({
      type,
      status: "approved", // Только одобренные заявки
      $or: [
        {
          "details.missingPerson.locationPerson.coordinates": { $exists: true },
        },
        { "details.missingPet.locationPet.coordinates": { $exists: true } },
      ],
    });

    const formattedMarkers = markers.map((marker) => {
      if (marker.type === "human") {
        return {
          id: marker._id,
          type: "human",
          name: marker.details.missingPerson.fullName,
          address: marker.details.missingPerson.locationPerson.address,
          coordinates: marker.details.missingPerson.locationPerson.coordinates,
        };
      } else if (marker.type === "pet") {
        return {
          id: marker._id,
          type: "pet",
          name: marker.details.missingPet.name,
          address: marker.details.missingPet.locationPet.address,
          coordinates: marker.details.missingPet.locationPet.coordinates,
        };
      }
    });

    res.json(formattedMarkers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Обновление координат маркера
const updateMarkerCoordinates = async (req, res) => {
  const { id } = req.params;
  const { latitude, longitude } = req.body;

  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { "location.coordinates": { latitude, longitude } },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Заявка не найдена" });
    }

    res.json({ message: "Координаты обновлены", data: updatedRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMapMarkers, updateMarkerCoordinates };
