const query = `
query GetCategoryById($categoryId: ID!) {
  category(id: $categoryId) {
    data {
      attributes {
        Title
        posts {
          data {
            id
            attributes {
              Title
              Description
              createdAt
              categories {
                data {
                  attributes {
                    Title
                  }
                }
              }
              Image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export default query;