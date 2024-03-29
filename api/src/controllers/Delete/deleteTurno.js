const { Turnos } = require('../../db');

const deleteTurno = async (req, res) => {
    const { id } = req.params;

        const turno = await Turnos.findOne({
            where: {
                id: id
            }
        });
        
        if (!turno) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }

    await turno.destroy();
};

module.exports = deleteTurno

