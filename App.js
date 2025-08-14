import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
// import { OPENWEATHER_API_KEY } from '@env'

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = ''; 

  const getWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY }&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('City not found!');
      setWeather(null);
    }
  };

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
      <Text style={styles.title}>🌤 Weather App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
        placeholderTextColor="#ccc"
      />

      <TouchableOpacity style={styles.button} onPress={getWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {weather && (
        <View style={styles.result}>
          <Text style={styles.city}>{weather.name}</Text>
          <Image
            style={styles.icon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
            }}
          />
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>
          <Text style={styles.extra}>💧 Humidity: {weather.main.humidity}%</Text>
          <Text style={styles.extra}>💨 Wind: {weather.wind.speed} m/s</Text>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 12,
    width: '100%',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4facfe',
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 15,
    width: '100%',
  },
  city: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  temp: {
    fontSize: 44,
    marginVertical: 10,
    color: '#fff',
  },
  desc: {
    fontSize: 20,
    textTransform: 'capitalize',
    color: '#fff',
  },
  extra: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  error: {
    marginTop: 10,
    color: 'red',
    fontSize: 16,
  },
  icon: {
    width: 100,
    height: 100,
  },
});
