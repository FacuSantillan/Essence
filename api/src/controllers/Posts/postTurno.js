const { Turnos } = require('../../db');

const createTurno = async (turnoData) => {
    const { fecha, hora, servicio } = turnoData;
    const adminId = "a2eb9512-bcd3-4478-ac95-3b8cb8e476ad";

    const newTurno = await Turnos.create({
        fecha,
        hora,
        servicio,
        AdminId: adminId,
    });

    const result = await Turnos.findOne({
        where: {
            id: newTurno.id,
        },
        attributes: ['id', 'fecha', 'hora', 'servicio'],
    });

    return result;
};

module.exports = {
    createTurno,
};
