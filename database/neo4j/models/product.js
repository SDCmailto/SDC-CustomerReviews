module.exports = {
  labels: ['Product'],
  product_id: {
    primary: true,
    type: 'int',
    required: true
  },
  avgRating: {
      type: 'number'
  },
  totalReviews: {
      type: 'number'
  },
  reviewed_by: {
    type: "relationship",
    target: "User",
    relationship: "reviewed_by",
    direction: "out",
    properties: {
        name: "string"
    }
}
};

