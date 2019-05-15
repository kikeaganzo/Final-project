import React, { Component } from 'react';
import ZoomableImage from 'react-zoomable-image';

class Zoom extends Component {
    render() {
        return (
            <ZoomableImage
                baseImage={{
                    alt: 'An image',
                    src: 'http://via.placeholder.com/350x550',
                    width: 350,
                    height: 550
                }}
                largeImage={{
                    alt: 'A large image',
                    src: 'http://via.placeholder.com/450x707',
                    width: 450,
                    height: 707
                }}
                thumbnailImage={{
                    alt: 'A small image',
                    src: 'http://via.placeholder.com/70x110'
                }}
            />
        );
    }
}
