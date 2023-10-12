import * as React from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [input, setInput] = React.useState('');
  const [image, setImage] = React.useState();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(input);
  };

  const fetchCopiedText = async () => {
    setInput(await Clipboard.getStringAsync());
  };

  const copyImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true
    });
    await Clipboard.setImageAsync(result.base64);
  }

  const getImage = async () => {
    const copiedImage = await Clipboard.getImageAsync({ format: 'png' });
    setImage(copiedImage);
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} onChangeText={(val) => setInput(val)}
        value={input}
        placeholder="Escribí algo"
      ></TextInput>
      <Button title="copy text to Clipboard" onPress={copyToClipboard} />
      <Button title="paste text from clipboard" onPress={fetchCopiedText} />  
      <Button title="copy image to clipboard" onPress={copyImage} />
      <Button title="show copied image" onPress={getImage} />
      {image != undefined ? (
        <Image source={{ uri: image?.data }} style={{ width: 200, height: 200 }} />
      ):(
        <></>
      )}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copiedText: {
    marginTop: 10,
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    height: 100,
    width: '80%',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 20
  }
});

