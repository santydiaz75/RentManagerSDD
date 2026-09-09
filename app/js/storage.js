(function () {
  'use strict';

  var KEYS = {
    properties: 'RentManagerSDD.properties',
    tenants: 'RentManagerSDD.tenants',
    rentals: 'RentManagerSDD.rentals',
    flash: 'RentManagerSDD.flash'
  };
  var PROPERTY_STATUSES = ['disponible', 'rentada', 'en mantenimiento'];
  var CONTRACT_STATUSES = ['activo', 'pendiente', 'finalizado'];

  function createSeedPhotoUrl(id) {
    return 'https://picsum.photos/seed/' + id + '/800/500';
  }

  function read(key, fallback) {
    try {
      var value = window.localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  function write(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

  function buildTenantRecord(data, overrides) {
    var timestamp = new Date().toISOString();
    return Object.assign({
      id: 'tenant-' + Date.now(),
      name: String(data.name || '').trim(),
      email: String(data.email || '').trim(),
      phone: String(data.phone || '').trim(),
      documentId: String(data.documentId || '').trim(),
      notes: String(data.notes || '').trim(),
      createdAt: timestamp,
      updatedAt: timestamp
    }, overrides || {});
  }

  function seed() {
    if (!window.localStorage.getItem(KEYS.properties)) {
      var source = [
        ['prop-001', 'Casa Limon', 'Av. Reforma 142, Ciudad de Mexico', 18500, 'Casa luminosa con patio y cocina renovada.', 'disponible', 3, 2],
        ['prop-002', 'Loft Roma Norte', 'Colima 88, Roma Norte', 14800, 'Loft amueblado cerca de restaurantes y parques.', 'rentada', 1, 1],
        ['prop-003', 'Departamento Coyoacan', 'Miguel Angel de Quevedo 410, Coyoacan', 12600, 'Departamento tranquilo con balcon y mucha luz.', 'disponible', 2, 2],
        ['prop-004', 'Casa del Parque', 'Paseo del Parque 27, Polanco', 32000, 'Residencia amplia junto a areas verdes.', 'en mantenimiento', 4, 3],
        ['prop-005', 'Estudio Condesa', 'Amsterdam 205, Condesa', 11200, 'Estudio funcional con excelente ubicacion.', 'rentada', 1, 1],
        ['prop-006', 'Villa del Lago', 'Lago Zurich 61, Nuevo Polanco', 27500, 'Villa moderna con terraza y estacionamiento.', 'disponible', 3, 2]
      ];
      write(KEYS.properties, source.map(function (item, index) {
        var timestamp = new Date(Date.now() - index * 86400000).toISOString();
        return { id: item[0], title: item[1], address: item[2], price: item[3], description: item[4], status: item[5], bedrooms: item[6], bathrooms: item[7], image: createSeedPhotoUrl(item[0]), createdAt: timestamp, updatedAt: timestamp };
      }));
    }
    if (!window.localStorage.getItem(KEYS.tenants)) {
      var now = new Date().toISOString();
      write(KEYS.tenants, [
        { id: 'tenant-001', name: 'Valeria Mendoza', email: 'valeria.mendoza@example.com', phone: '55 1234 5678', documentId: 'MEMV900214', notes: 'Prefiere comunicacion por correo.', createdAt: now, updatedAt: now },
        { id: 'tenant-002', name: 'Diego Ramirez', email: 'diego.ramirez@example.com', phone: '55 2345 6789', documentId: 'RADG880921', notes: 'Contrato corporativo.', createdAt: now, updatedAt: now },
        { id: 'tenant-003', name: 'Sofia Herrera', email: 'sofia.herrera@example.com', phone: '55 3456 7890', documentId: 'HERS950706', notes: 'Contacto de emergencia registrado.', createdAt: now, updatedAt: now }
      ]);
    }
    if (!window.localStorage.getItem(KEYS.rentals)) {
      write(KEYS.rentals, [
        { id: 'rental-001', propertyId: 'prop-002', tenantId: 'tenant-002', startDate: '2026-01-15', endDate: '2027-01-14', rentAmount: 14800, contractStatus: 'activo', createdAt: new Date().toISOString() },
        { id: 'rental-002', propertyId: 'prop-005', tenantId: 'tenant-001', startDate: '2025-08-01', endDate: '2026-07-31', rentAmount: 11200, contractStatus: 'pendiente', createdAt: new Date().toISOString() }
      ]);
    }
  }

  window.RentManagerSDDStorage = {
    KEYS: KEYS,
    PROPERTY_STATUSES: PROPERTY_STATUSES,
    CONTRACT_STATUSES: CONTRACT_STATUSES,
    createSeedPhotoUrl: createSeedPhotoUrl,
    buildTenantRecord: buildTenantRecord,
    getProperties: function () { return read(KEYS.properties, []); },
    saveProperties: function (items) { return write(KEYS.properties, items); },
    getTenants: function () { return read(KEYS.tenants, []); },
    saveTenants: function (items) { return write(KEYS.tenants, items); },
    getRentals: function () { return read(KEYS.rentals, []); },
    saveRentals: function (items) { return write(KEYS.rentals, items); },
    setFlash: function (type, message) { return write(KEYS.flash, { type: type, message: message }); },
    consumeFlash: function () { var flash = read(KEYS.flash, null); window.localStorage.removeItem(KEYS.flash); return flash; },
    seed: seed
  };
})();
