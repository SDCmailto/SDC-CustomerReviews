
module.exports = {
  labels: ['Review'],
  id: {
    primary: true,
    type: 'int',
    required: true
  },
  title: {
    type: 'string'
  },
  abuseReported: {
      type: 'boolean'
  },
  rating: {
    type: 'number'
  },
  location_: {
    type: 'string'
  },
  userId: {
    type: 'number',
    index: true,
  },
  productId: {
    type: 'number',
    index: true,
  },
  reviewDate: {
    type: 'string',
    index: true,
  },
  reviewBody: {
    type: 'string'
  },
  helpfulCount: {
    type: 'number'
  },
  written_by: {
    type: "relationship",
    target: "User",
    relationship: "written_by",
    direction: "out",
    properties: {
        name: "string"
    }
  }
};
