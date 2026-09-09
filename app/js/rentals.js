(function () {
  'use strict';
  var storage = window.RentManagerSDDStorage;

  function listRentalsByPropertyId(propertyId) {
    return storage.getRentals().filter(function (rental) { return rental.propertyId === propertyId; });
  }

  function hasActiveContract(propertyId) {
    return listRentalsByPropertyId(propertyId).some(function (rental) { return rental.contractStatus === 'activo'; });
  }

  function validateRental(data) {
    var errors = [];
    ['propertyId', 'tenantId', 'startDate', 'endDate', 'rentAmount', 'contractStatus'].forEach(function (field) {
      if (!String(data[field] || '').trim()) errors.push(field);
    });
    var start = data.startDate ? new Date(data.startDate) : null;
    var end = data.endDate ? new Date(data.endDate) : null;
    if (!start || Number.isNaN(start.getTime())) errors.push('startDate');
    if (!end || Number.isNaN(end.getTime())) errors.push('endDate');
    if (start && end && end <= start) errors.push('endDate');
    if (!Number.isFinite(Number(data.rentAmount)) || Number(data.rentAmount) <= 0) errors.push('rentAmount');
    if (storage.CONTRACT_STATUSES.indexOf(data.contractStatus) === -1) errors.push('contractStatus');
    if (!window.RentManagerSDDProperties.getPropertyById(data.propertyId)) errors.push('propertyId');
    if (!window.RentManagerSDDTenants.getTenantById(data.tenantId)) errors.push('tenantId');
    return errors.filter(function (field, index, fields) { return fields.indexOf(field) === index; });
  }

  function createRental(data) {
    var normalized = Object.assign({ contractStatus: 'activo' }, data || {});
    var errors = validateRental(normalized);
    if (errors.length) return { rental: null, errors: errors };
    var rental = { id: 'rental-' + Date.now(), propertyId: normalized.propertyId, tenantId: normalized.tenantId, startDate: normalized.startDate, endDate: normalized.endDate, rentAmount: Number(normalized.rentAmount), contractStatus: normalized.contractStatus, createdAt: new Date().toISOString() };
    storage.saveRentals(storage.getRentals().concat(rental));
    if (rental.contractStatus === 'activo') window.RentManagerSDDProperties.updateProperty(rental.propertyId, { status: 'rentada' });
    return { rental: rental, errors: [] };
  }

  window.RentManagerSDDRentals = {
    createRental: createRental,
    listRentalsByPropertyId: listRentalsByPropertyId,
    hasActiveContract: hasActiveContract,
    validateRental: validateRental,
    all: function () { return storage.getRentals(); },
    validate: validateRental,
    save: function (data) { return createRental(data); }
  };
})();
