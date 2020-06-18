import { Card, Form, FormLayout, Frame, Layout, Page, Subheading, TextStyle, TextField, Toast } from '@shopify/polaris';
import store from 'store-js';
import axios from 'axios';
import { Redirect } from '@shopify/app-bridge/actions';
import { Context } from '@shopify/app-bridge-react';

class EditProduct extends React.Component {
   state = {
      businessName: '',
      streetAddress: '',
      city: '',
      zipCode: '',
      state: '',
      merchantDescription: '',
      email: '',
      errorCheck: false,
      primaryLoad: false,
      secondaryLoad: false,
      showToast: false,
      status: true
   };

   static contextType = Context;

   componentDidMount() {
      let product = store.get('product')
      this.setState({
         businessName: product.businessName ? product.businessName : '',
         streetAddress: product.streetAddress ? product.streetAddress : '',
         city: product.city ? product.city : '',
         zipCode: product.zipCode ? product.zipCode : '',
         state: product.state ? product.state : '',
         merchantDescription: product.merchantDescription ? product.merchantDescription : '',
         email: product.email ? product.email : ''
      })
   }

   render() {
      const app = this.context;
      let { errorCheck, businessName, streetAddress, city, zipCode, status,
         state, merchantDescription, email, primaryLoad, secondaryLoad, showToast } = this.state;
      businessName = businessName.trim(); streetAddress = streetAddress.trim(); email = email.trim();
      merchantDescription = merchantDescription.trim(); city = city.trim(); state = state.trim();
      const product = store.get('product');
      const redirectToHome = () => {
         this.setState({ secondaryLoad: true })
         const redirect = Redirect.create(app);
         redirect.dispatch(Redirect.Action.APP, '/index');
      }
      return (
         <Frame>
            <Page>
               <Frame>
                  <Layout>
                     <Layout.Section>
                        {showToast && (
                           <Toast content={status ? "Successfully uploaded." : "Failed To Upload, Please Try Again."}
                              onDismiss={() => this.setState({ showToast: false })} />
                        )}
                        <Form preventDefault={true}>
                           <Card sectioned title={`Voucher Display Form: ${product ? product.title : ''}`}
                              secondaryFooterActions={[{ content: 'Return To List', onAction: () => { redirectToHome() }, loading: secondaryLoad }]}
                              primaryFooterAction={{ content: 'Save', onAction: () => { this.handleSubmit(product) }, loading: primaryLoad }} >
                              <TextStyle variation="subdued">Fill in the data below for the merchant corresponding to this product.</TextStyle> <br /><br />
                              <FormLayout>
                                 <TextField autoFocus={true} prefix="" value={this.state.businessName} onChange={this.handleChange('businessName')}
                                    label="Merchant's Name – As displayed in Google Maps" type="text" placeholder="Bob's Burger Shack" maxLength={150}
                                    error={errorCheck && !businessName.length ? "Merchant's name is required." : null} />
                                 <TextField error={errorCheck && !merchantDescription.length ? "Merchant description is required." : null} prefix="" value={this.state.merchantDescription}
                                    onChange={this.handleChange('merchantDescription')} label="Merchant Description" type="text" maxLength={800}
                                    showCharacterCount={true} spellCheck={true} multiline={true}
                                    placeholder="Bob's Burger Shack is a gourmet dine-in restaurant located in the Financial District of Downtown Seattle. They're known for..." />
                                 <TextField error={errorCheck && !email.length ? "Email to customer is required." : null} prefix="" value={this.state.email}
                                    onChange={this.handleChange('email')} label="Email" type="text" maxLength={800} showCharacterCount={true} spellCheck={true} multiline={true} placeholder="Thank you for your purchase! Enjoy!" />
                                 <Subheading>Address</Subheading>
                                 <FormLayout.Group condensed>
                                    <TextField error={errorCheck && !streetAddress.length ? "Street address is required." : null} maxLength={75} prefix="" value={this.state.streetAddress} onChange={this.handleChange('streetAddress')}
                                       label="Street Address" type="text" placeholder="48185 Washington Blvd." />
                                    <TextField error={errorCheck && !city.length ? "City name is required." : null} maxLength={50} prefix="" value={this.state.city} onChange={this.handleChange('city')}
                                       label="City" type="text" label="City" placeholder="Seattle" />
                                    <TextField error={errorCheck && !zipCode ? "Zip code is required." : null} maxLength={5} prefix="" label="Zip Code" value={this.state.zipCode} onChange={this.handleChange('zipCode')}
                                       placeholder="90210" type="number" />
                                    <TextField error={errorCheck && !state.length ? "State is required." : null} maxLength={2} prefix="" label="State" value={this.state.state} onChange={this.handleChange('state')}
                                       placeholder="WA" />
                                 </FormLayout.Group>
                              </FormLayout>
                           </Card>
                        </Form>
                     </Layout.Section>
                  </Layout>
               </Frame>
            </Page>
         </Frame>
      );
   }

   handleChange = (field) => {
      return (value) => this.setState({ [field]: value });
   }
   handleSubmit = async (product) => {
      this.setState({ errorCheck: true });
      let { businessName, streetAddress, city, zipCode, state, merchantDescription, email } = this.state;
      businessName = businessName.trim(); streetAddress = streetAddress.trim();
      merchantDescription = merchantDescription.trim(); city = city.trim(); state = state.trim();
      if (businessName.length && streetAddress.length && city.length &&
         state.length && merchantDescription.length && zipCode && email.length) {
         this.setState({ primaryLoad: true });
         axios.post('/api/map', { streetAddress, city, zipCode, state })
            .then(res => {
               let { lat, lng } = res.data.coords;
               if (!lat && !lng) {
                  alert("Address did not return a lat/lng. Please edit the addess format.");
                  this.setState({ primaryLoad: false });
                  return
               }
               let updatedProduct = { ...product, businessName, streetAddress, merchantDescription, city, state, zipCode, email, coords: { lat, lng } }
               axios.put('/api/products', { product: updatedProduct })
                  .then(res => {
                     this.setState({ showToast: true, status: true })
                     let redirect = Redirect.create(this.context)
                     redirect.dispatch(Redirect.Action.APP, '/index')
                  }).catch(err => {
                     this.setState({ showToast: true, status: false, primaryLoad: false })
                  })
            })
            .catch(err => {
               alert("Address did not return a lat/lng. Please edit the addess format.");
               return
            })
      }
   }
}

export default EditProduct;
