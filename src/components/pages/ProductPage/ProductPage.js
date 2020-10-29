import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './ProductPage.scss';
import { useLazyQuery } from "@apollo/client";
import { getProductByHandle } from '../../shared/graphql/queries';
import { Button, Dropdown } from 'react-bootstrap';
import Image from '../../shared/image';
import { addToCart } from '../CartPage/CartHelpers';

const Product = (props) => {
    const [getProductQuery, { data: getProductData, error: getProductError }] = useLazyQuery(getProductByHandle);
    const [product, setProduct] = useState();
    const [variant, setVariant] = useState();

    useEffect(() => {
        if (props.currency && props.currency.currencyCode) {
            getProductQuery({
                variables: {
                    currencyCode: props.currency.currencyCode,
                    handle: props.match.params.handle
                },
            });
        }

    }, [props.match.params.handle, getProductQuery, props.currency]);

    useEffect(() => {
        if (getProductError) {
            console.log(getProductError);
        }
        else if (getProductData) {
            if (getProductData && getProductData.productByHandle) {
                setProduct(getProductData.productByHandle);
                if (getProductData.productByHandle.variants
                    && getProductData.productByHandle.variants.edges
                    && getProductData.productByHandle.variants.edges[0]
                    && getProductData.productByHandle.variants.edges[0].node
                ) {
                    setVariant(getProductData.productByHandle.variants.edges[0].node);
                }
            }
        }

    }, [getProductData, getProductError]);
    return (
        product ? (
            <div className="product-page">
                {product.images && product.images.edges && product.images.edges[0] && product.images.edges[0].node ? (
                    <Image src={product.images.edges[0].node.originalSrc} altText={product.images.edges[0].node.altText} />
                ) : null}
                <div className="product-form">
                    <h1>{product.title}</h1>
                    <h3>{props.currency.currencySymbol}{variant.presentmentPrices
                        && variant.presentmentPrices.edges
                        && variant.presentmentPrices.edges[0]
                        && variant.presentmentPrices.edges[0].node
                        && variant.presentmentPrices.edges[0].node.price
                        && variant.presentmentPrices.edges[0].node.price.amount}</h3>
                    <div className="size">
                        Size:
                    <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic">{variant && variant.title}</Dropdown.Toggle>

                            <Dropdown.Menu>
                                {product.variants && product.variants.edges && product.variants.edges.map((variantEdge, index) => {
                                    if (variantEdge && variantEdge.node) {
                                        return (<Dropdown.Item key={index} onClick={() => { setVariant(variantEdge.node) }}>{variantEdge.node.title}</Dropdown.Item>);
                                    }
                                    return null;
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Button variant="dark" block onClick={() => { addToCart(variant) }}>Add to Cart</Button>
                </div>
            </div>
        ) : null
    );
};

const mapStateToProps = (state) => ({
    checkout: state.checkout,
    currency: state.currency,
});

export default connect(mapStateToProps)(Product);
