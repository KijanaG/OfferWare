import { Page, Layout, TextStyle, EmptyState, Spinner } from '@shopify/polaris';
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import axios from 'axios';
import store from 'store-js';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ResourceListWithProducts from '../components/ResourceList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

class Index extends React.Component {
    state = { open: false, loadingDB: true, products: [], productIDs: null };

    async componentDidMount() {
        this.fetchProducts();
    }

    render() {
        const emptyState = this.state.products.length === 0;
        const { loadingDB, productIDs } = this.state;
        if (loadingDB) { //Fetching Products from Database 
            return (<Page>
                <Layout>
                    <EmptyState centeredLayout heading={'Fetching Products from Database...'}>
                        <Spinner accessibilityLabel="Spinner" size="large" color="inkLightest" />
                    </EmptyState>
                </Layout>
            </Page>
            )
        }
        if (productIDs) {
            return ( //If exists, user gave Voucher functionality to these products
                <Page>
                    <Layout>
                        <EmptyState centeredLayout heading={'Adding Specified Products to Database...'}>
                            <Query query={GET_PRODUCTS_BY_ID} variables={{ ids: productIDs }}>
                                {({ data, loading, error }) => {
                                    if (loading) return <Spinner accessibilityLabel="Spinner" size="large" color="inkLightest" />;
                                    if (error) return <div>{error.message}</div>
                                    else {
                                        this.postNewProductsToDB(data);
                                        return <Spinner accessibilityLabel="Spinner" size="large" color="inkLightest" />;
                                    }
                                }}
                            </Query>
                        </EmptyState>
                    </Layout>
                </Page>
            )
        }
        return (
            <Page>
                <TitleBar
                    primaryAction={{
                        content: 'Select services',
                        onAction: () => this.setState({ open: true })
                    }} />
                <ResourcePicker
                    resourceType="Product"
                    showVariants={false}
                    open={this.state.open}
                    onSelection={(resources) => this.handleSelection(resources)}
                    onCancel={() => this.setState({ open: false })}
                />
                {emptyState ? (
                    <Layout>
                        <EmptyState
                            heading="Send Vouchers to your customers to be redeemed in-store."
                            action={{
                                content: 'Select Services',
                                onAction: () => this.setState({ open: true })
                            }}
                            image={img} >
                            <p>Select products/services for which to send vouchers to customers via email.</p>
                        </EmptyState>
                    </Layout>
                ) : (
                        <ResourceListWithProducts fetchProducts={this.fetchProducts} products={this.state.products} />
                    )}
            </Page>
        );
    }

    postNewProductsToDB = (products) => {
        axios.post('/api/products', { products: products.nodes }, {
            headers: { "Content-Type": "application/json" }
        }).then(async res => {
            await this.fetchProducts();
            this.setState({ productIDs: null })
        }).catch(err => {
            alert("Failed To Update Database, Please Try Again.")
        })
    }
    handleSelection = async (resources) => {
        const idsFromResources = resources.selection.map((product) => product.id)
        this.setState({ open: false, productIDs: idsFromResources })
    }
    fetchProducts = async () => {
        return await fetch('/api/products')
            .then(res => res.json())
            .then(response => {
                this.setState({ products: response.data, loadingDB: false })
                return true
            })
            .catch(err => {
                alert(err)
                return null
            })
    }
}

export default Index;

const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
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
