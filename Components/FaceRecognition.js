import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera'; // Importez RNCamera correctement

class FaceRecognition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdult: false, // état initial : par défaut, la personne n'est pas considérée comme adulte
    };
  }

  // Fonction appelée lorsque la capture est réussie
  onFacesDetected = ({ faces }) => {
    // Vérifiez si des visages sont détectés
    if (faces.length > 0) {
      // Vous pouvez implémenter ici la logique de détermination de l'âge
      // Pour cet exemple, nous supposons que la personne est adulte si un visage est détecté
      this.setState({ isAdult: true });
    } else {
      this.setState({ isAdult: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.front} // Utilisez la caméra frontale pour la reconnaissance faciale
          onFacesDetected={this.onFacesDetected} // Fonction appelée lors de la détection de visages
          faceDetectionClassifications={RNCamera.Constants.FaceDetection.Classifications.all}
          faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
          faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: this.state.isAdult ? 'green' : 'red' }]}
            onPress={() => {
              // Vérifiez si la personne est adulte avant d'accéder à la liste des films
              if (this.state.isAdult) {
                // Naviguez vers la liste des films ou effectuez une autre action
                console.log('Accès autorisé à la liste des films');
              } else {
                console.log('Accès refusé : la personne n\'est pas adulte');
              }
            }}
          >
            <Text style={styles.buttonText}>Accéder à la liste des films</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 0.1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default FaceRecognition;
