 const query = `
  query {
    categories {
      data {
        id
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