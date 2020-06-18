import { Card, ResourceList, Stack, TextStyle, Thumbnail, Button, Form } from '@shopify/polaris';
import store from 'store-js';
import axios from 'axios';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

class ResourceListWithProducts extends React.Component {
    state = {
        updating: {},
    }
    static contextType = Context;
    handleUpload = (id, index) => {
        let updating = this.state.updating;
        updating[id] = true
        this.setState({ updating: updating })
    }
    render() {
        const app = this.context;
        const redirectToProduct = () => {
            const redirect = Redirect.create(app);
            redirect.dispatch(
                Redirect.Action.APP,
                '/edit-products',
            )
        }
        return (
            <Card>
                <ResourceList showHeader resourceName={{ singular: 'Product', plural: 'Products' }}
                    items={this.props.products}
                    renderItem={(item, _, indx) => {
                        let complete = false;
                        if (item.streetAddress && item.city && item.email && item.zipCode
                            && item.state && item.businessName && item.merchantDescription) {
                            complete = true
                        }
                        const media = (
                            <Thumbnail
                                source={item.images[0] ? item.images[0].originalSrc : ''}
                                alt={item.images[0] ? item.images[0].altText : ''} />
                        );
                        return (
                            <ResourceList.Item id={item.id} media={media}
                                accessibilityLabel={`View details for ${item.title}`}
                                onClick={() => { }}>
                                <Stack>
                                    <Stack.Item fill>
                                        <h3> <TextStyle variation="strong"> {item.title} </TextStyle> </h3>
                                    </Stack.Item>
                                    <Stack.Item>
                                        {this.state.updating[item.id] ?
                                            <Query query={GET_PRODUCT_BY_ID} variables={{ id: [item.id] }}>
                                                {({ data, loading, error }) => {
                                                    if (error) return <TextStyle>{error.message}</TextStyle>
                                                    if (data) this.postProductToDB(data.nodes[0])
                                                    return <Button loading={this.state.updating[item.id]} primary>Update Item</Button>
                                                }}
                                            </Query>
                                            :
                                            <Form onSubmit={() => this.handleUpload(item.id, indx)} preventDefault={true}>
                                                <Button loading={false} submit primary>Update Item</Button>
                                            </Form>
                                        }
                                    </Stack.Item>
                                    <Stack.Item>
                                        &nbsp; {item.redeemedTotal}/{item.transactionTotal} &nbsp;
                                    </Stack.Item>
                                    <Stack.Item>
                                        <div style={{ color: complete ? "green" : "red" }}>
                                            <Button monochrome outline onClick={() => {
                                                store.set('product', item); redirectToProduct();
                                            }}>{complete ? " Complete " : "Incomplete"} </Button>
                                        </div>
                                    </Stack.Item>
                                </Stack>
                            </ResourceList.Item>
                        );
                    }}
                />
            </Card>
        );
    }
    postProductToDB = (product) => {
        axios.patch('/api/products', { product }, {
            headers: { "Content-Type": "application/json" }
        }).then(async res => {
            this.setState({ updating: {} })
            await this.props.fetchProducts()
        }).catch(err => {
            alert("Something went wrong, please refresh page.", err)
        })
    }
}

export default ResourceListWithProducts;

const GET_PRODUCT_BY_ID = gql`
  query getProducts($id: [ID!]!) {
    nodes(ids: $id) {
      ... on Product {
        title
        descriptionHtml
        id
        variants(first:4){
          edges{
            node{
              compareAtPrice
              price
              title
            }
          }
        }
        images(first: 10) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
      }
    }
  }
`;