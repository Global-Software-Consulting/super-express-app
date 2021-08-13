class APIFeatures {
  constructor(model, queryString) {
    this.model = model;
    this.queryString = queryString;
    this.limit = 10;
    this.page = 1;
    this.sortOrder = 'DESC';
    this.sortBy = 'createdAt';
    this.fields = [];
    this.include = [];
    this.whereObject = null;
    this.order = [];
  }

  async query() {
    return this.model.findAll({
      where: this.whereObject ? this.whereObject : undefined,

      limit: this.limit,
      offset: this.offset,
      order: this.order.length ? this.order : [[this.sortBy, this.sortOrder]],
      attributes: this.fields.length > 0 ? this.fields : undefined,
      include: this.include ? this.include : [],
    });
  }

  async queryFindAndCount() {
    return this.model.findAndCountAll({
      where: this.whereObject ? this.whereObject : undefined,
      limit: this.limit,
      offset: this.offset,
      order: this.order.length ? this.order : [[this.sortBy, this.sortOrder]],
      attributes: this.fields.length > 0 ? this.fields : undefined,
      include: this.include ? this.include : [],
    });
  }

  sort() {
    const queryObj = { ...this.queryString };
    this.sortOrder = queryObj.sortOrder || 'DESC';
    this.sortBy = queryObj.sortBy || 'createdAt';

    return this;
  }

  setOrder(order) {
    this.order = order;
    return this;
  }

  limitFields() {
    this.fields = this.queryString.fields
      ? this.queryString.fields.split(',')
      : [];

    return this;
  }

  includeFields(include) {
    this.include = include;

    return this;
  }

  paginate() {
    const queryObj = { ...this.queryString };
    this.limit = parseInt(queryObj.limit * 1) || 10;
    this.page = parseInt(queryObj.page * 1) || 1;
    this.offset = this.limit * (this.page - 1);

    return this;
  }

  where(whereObject) {
    this.whereObject = whereObject;

    return this;
  }
}

module.exports = APIFeatures;
