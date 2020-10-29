import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../shared/image';

const GridItem = (props) => {
    return (
        props.product ? (
            <div className="grid-item">
                {props.product.images && props.product.images.edges && props.product.images.edges[0] && props.product.images.edges[0].node && props.product.images.edges[0].node ? (
                    <Link to={'/products/' + props.product.handle}>
                        <Image src={props.product.images.edges[0].node.originalSrc} altText={props.product.images.edges[0].node.altText} />
                    </Link>
                ) : null}
                <Link to={'/products/' + props.product.handle}>{props.product.title}</Link>
            </div>
        ) : null

    );
};

export default GridItem;
