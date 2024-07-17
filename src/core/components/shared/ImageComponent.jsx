import React from 'react';
import ReactDOM from 'react-dom';
import atob from 'atob';
import btoa from 'btoa';

class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
    };
  }

  componentDidMount() {
    // Decodificar la cadena Base64 (omitir este paso si la cadena ya está decodificada)
    const decodedImage = atob(this.props.base64String);

    // Crear un arreglo de bytes a partir de la cadena decodificada
    const byteNumbers = new Array(decodedImage.length);
    for (let i = 0; i < decodedImage.length; i++) {
      byteNumbers[i] = decodedImage.charCodeAt(i);
    }

    // Crear el objeto Blob a partir del arreglo de bytes
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    // Crear una URL para el objeto Blob y establecerlo como la imagen del estado
    const imageUrl = URL.createObjectURL(blob);
    this.setState({ imageUrl });
  }

  componentWillUnmount() {
    // Liberar la URL de la imagen al desmontar el componente
    URL.revokeObjectURL(this.state.imageUrl);
  }

  render() {
    return <img src={this.state.imageUrl} alt="Decoded Image" style={{width:'100px'}}/>;
  }
}

export default ImageComponent;