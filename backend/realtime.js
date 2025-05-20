// realtime.js
const { Server } = require('socket.io');
const events     = require('./events');

module.exports = function attachRealtime(server) {
  const io = new Server(server, {
    cors: { origin: '*' }
  });

  io.on('connection', socket => {
    console.log('🖥️  Client connected:', socket.id);

    // Reservations
    events.on('reservation:created',  data => socket.emit('reservationCreated',  data));
    events.on('reservation:updated',  data => socket.emit('reservationUpdated',  data));
    events.on('reservation:deleted',  data => socket.emit('reservationDeleted',  data));

    // Orders
    events.on('order:created',        data => socket.emit('orderCreated',        data));
    events.on('order:updated',        data => socket.emit('orderUpdated',        data));
    events.on('order:deleted',        data => socket.emit('orderDeleted',        data));

    // Inventory
    events.on('inventory:created',    data => socket.emit('inventoryCreated',    data));
    events.on('inventory:updated',    data => socket.emit('inventoryUpdated',    data));
    events.on('inventory:deleted',    data => socket.emit('inventoryDeleted',    data));

    // StaffSchedules
    events.on('staffSchedule:created',data => socket.emit('staffScheduleCreated',data));
    events.on('staffSchedule:updated',data => socket.emit('staffScheduleUpdated',data));
    events.on('staffSchedule:deleted',data => socket.emit('staffScheduleDeleted',data));

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });
};
