(function () {
  'use strict';
  var storage = window.RentManagerSDDStorage;
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function listTenants(filters) {
    var tenants = storage.getTenants();
    var search = filters && filters.search ? String(filters.search).trim().toLowerCase() : '';
    return search ? tenants.filter(function (tenant) { return tenant.name.toLowerCase().indexOf(search) !== -1; }) : tenants;
  }

  function getTenantById(id) {
    return listTenants().filter(function (tenant) { return tenant.id === id; })[0] || null;
  }

  function findByDocumentId(documentId) {
    var normalized = String(documentId || '').trim().toLowerCase();
    return listTenants().filter(function (tenant) { return tenant.documentId.toLowerCase() === normalized; })[0] || null;
  }

  function validateTenant(data, currentId) {
    var errors = [];
    ['name', 'email', 'phone', 'documentId'].forEach(function (field) {
      if (!String(data[field] || '').trim()) errors.push(field);
    });
    if (data.email && !emailPattern.test(String(data.email).trim())) errors.push('email');
    var duplicate = findByDocumentId(data.documentId);
    if (duplicate && duplicate.id !== currentId) errors.push('documentId');
    return errors.filter(function (field, index, fields) { return fields.indexOf(field) === index; });
  }

  function createTenant(data) {
    var errors = validateTenant(data);
    if (errors.length) return { tenant: null, errors: errors };
    var tenant = storage.buildTenantRecord(data);
    storage.saveTenants(listTenants().concat(tenant));
    return { tenant: tenant, errors: [] };
  }

  function updateTenant(id, data) {
    var existing = getTenantById(id);
    var errors = validateTenant(data, id);
    if (!existing) errors.push('id');
    if (errors.length) return { tenant: null, errors: errors };
    var tenant = storage.buildTenantRecord(data, { id: id, createdAt: existing.createdAt });
    storage.saveTenants(listTenants().map(function (entry) { return entry.id === id ? tenant : entry; }));
    return { tenant: tenant, errors: [] };
  }

  window.RentManagerSDDTenants = {
    createTenant: createTenant,
    updateTenant: updateTenant,
    getTenantById: getTenantById,
    listTenants: listTenants,
    findByDocumentId: findByDocumentId,
    validateTenant: validateTenant,
    all: listTenants,
    find: getTenantById,
    validate: validateTenant,
    save: function (data, id) { return id ? updateTenant(id, data) : createTenant(data); }
  };
})();
