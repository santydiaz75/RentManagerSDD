(function () {
  'use strict';
  var storage = window.RentManagerSDDStorage;

  function listProperties(filters) {
    var properties = storage.getProperties();
    return filters && filters.status ? properties.filter(function (property) { return property.status === filters.status; }) : properties;
  }

  function getPropertyById(id) {
    return listProperties().filter(function (property) { return property.id === id; })[0] || null;
  }

  function validateProperty(data) {
    var errors = [];
    ['title', 'address', 'description', 'status'].forEach(function (field) {
      if (!String(data[field] || '').trim()) errors.push(field);
    });
    if (!Number.isFinite(Number(data.price)) || Number(data.price) <= 0) errors.push('price');
    if (!Number.isFinite(Number(data.bedrooms)) || Number(data.bedrooms) <= 0) errors.push('bedrooms');
    if (!Number.isFinite(Number(data.bathrooms)) || Number(data.bathrooms) <= 0) errors.push('bathrooms');
    if (storage.PROPERTY_STATUSES.indexOf(data.status) === -1) errors.push('status');
    return errors.filter(function (field, index, fields) { return fields.indexOf(field) === index; });
  }

  function normalize(data, id, existing) {
    var propertyId = id || 'prop-' + Date.now();
    var timestamp = new Date().toISOString();
    return Object.assign({}, existing || {}, {
      id: propertyId,
      title: String(data.title || '').trim(),
      address: String(data.address || '').trim(),
      price: Number(data.price),
      description: String(data.description || '').trim(),
      status: data.status,
      bedrooms: Number(data.bedrooms),
      bathrooms: Number(data.bathrooms),
      image: String(data.image || '').trim() || storage.createSeedPhotoUrl(propertyId),
      createdAt: existing ? existing.createdAt : timestamp,
      updatedAt: timestamp
    });
  }

  function createProperty(data) {
    var errors = validateProperty(data);
    if (errors.length) return { property: null, errors: errors };
    var property = normalize(data);
    storage.saveProperties(listProperties().concat(property));
    return { property: property, errors: [] };
  }

  function updateProperty(id, data) {
    var existing = getPropertyById(id);
    var merged = Object.assign({}, existing || {}, data || {});
    var errors = validateProperty(merged);
    if (!existing) errors.push('id');
    if (errors.length) return { property: null, errors: errors };
    var property = normalize(merged, id, existing);
    storage.saveProperties(listProperties().map(function (entry) { return entry.id === id ? property : entry; }));
    return { property: property, errors: [] };
  }

  window.RentManagerSDDProperties = {
    createProperty: createProperty,
    updateProperty: updateProperty,
    getPropertyById: getPropertyById,
    listProperties: listProperties,
    validateProperty: validateProperty,
    all: listProperties,
    find: getPropertyById,
    validate: validateProperty,
    save: function (data, id) { return id ? updateProperty(id, data) : createProperty(data); }
  };
})();
