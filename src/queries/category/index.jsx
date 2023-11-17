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

const category_id = `
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


const CATEGORY_TITLE = `
query{
  categories{
   data{
     id
     attributes{
       Title
     }
   }
 }
}
`;

export {query, category_id, CATEGORY_TITLE}