import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './CollectionPage.scss';
import { useLazyQuery } from "@apollo/client";
import { getCollectionByHandle } from '../../shared/graphql/queries';
import GridItem from './GridItem';

const Collection = (props) => {
    const [getCollectionQuery, { data: getCollectionData }] = useLazyQuery(getCollectionByHandle);
    
    useEffect(() => {
        if (props.currency && props.currency.currencyCode) {
            getCollectionQuery({
                variables: {
                    currencyCode: props.currency.currencyCode,
                    handle: props.match.params.handle,
                },
            });
        }
    }, [props.match.params.handle, getCollectionQuery, props.currency]);

    return (
        getCollectionData && getCollectionData.collectionByHandle ?
            (<div className="collection-page" >
                <h1 className="title">Collection: {getCollectionData.collectionByHandle.title}</h1>
                {getCollectionData.collectionByHandle.products && getCollectionData.collectionByHandle.products.edges.map((product, index) => {
                    return (<GridItem key={index} product={product.node} />);
                })
                }
            </div >
            ) : null
    );
};

const mapStateToProps = (state) => ({
    checkout: state.checkout,
    currency: state.currency,
});

export default connect(mapStateToProps)(Collection);
