import React, { useState, useEffect } from 'react';
import * as api from '../services/Server';

export const OfferContext = React.createContext();

export const OfferProvider = props => {
  const [product, setProduct] = useState(null)
  const [offer, setOffer] = useState(null)
  const [loading, setLoading] = useState(true)
  // const [currentOption, setCurrentOption] = useState(null)
  const [locationData, setLocationData] = useState(null)
  const [transaction, setTransaction] = useState(null)

  const fetchOffer = async (id) => {
    // let $ = await api.fetchOffer(id)
    // if ($) {
    //   setOffer($)
    //   setCurrentOption($.offers[0])
    //   setLoading(false)
    //   let localData = await api.googlePlaceSearch($.name, $.location);
    //   setLocationData(localData)
    // } else {
    //   setOffer(null)
    // }
  }

  const fetchProduct = async (product_id, transaction_id) => {
    let $ = await api.getProduct(product_id, transaction_id);
    if ($) {
      setProduct($.product)
      let O = $.transaction;
      setTransaction(O)
      setOffer([{ price: O.price, compareAtPrice: O.compareAtPrice, variant_title: O.variant_title, title: O.title }])
      let localData = await api.googlePlaceSearch($.product.businessName, $.product.coords)
      setLocationData(localData)
    }
  }

  const initiateStripeSession = async () => {
    // return await api.fakeStripeSession(offer.merchant_id, offer.stripe_id, currentOption)
    // return await api.inititateStripeSession(offer.merchant_id, offer.stripe_id)
  }

  const redeemTransaction = async (t_id, time, id, shop) => {
    let currTransaction = await api.redeemTransaction(t_id, time, id, shop);
    return currTransaction
  }

  const sendReview = (stars, text, t_id) => {
    api.sendReview(stars, text, t_id)
  }

  return (
    <OfferContext.Provider
      value={{
        product, offer, loading, locationData, transaction, redeemTransaction, sendReview,
        setProduct, fetchProduct, fetchOffer, initiateStripeSession, setOffer
      }}>
      {props.children}
    </OfferContext.Provider>
  )
}