import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLazyQuery } from "@apollo/client";
import { getCollectionByHandleFirst5 } from '../../shared/graphql/queries';
import GridItem from '../../pages/CollectionPage/GridItem';

const CollectionSection = (props) => {
    const [getCollectionQuery, { data: getCollectionData }] = useLazyQuery(getCollectionByHandleFirst5);

    useEffect(() => {
        if (props.currency && props.currency.currencyCode) {
            getCollectionQuery({
                variables: {
                    currencyCode: props.currency.currencyCode,
                    handle: props.collectionHandle,
                },
            });
        }

    }, [props.collectionHandle, getCollectionQuery, props.currency]);

    return (
        getCollectionData && getCollectionData.collectionByHandle ?
            (<div className="collection-section" >
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

export default connect(mapStateToProps)(CollectionSection);
