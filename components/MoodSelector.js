// components/MoodSelector.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const moods = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😢', label: 'Sad' },
    { emoji: '😡', label: 'Angry' },
    { emoji: '😱', label: 'Shocked' },
    { emoji: '😍', label: 'Love' },
];

export default function MoodSelector({ selectedMood, setSelectedMood }) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select your mood:</Text>
            <View style={styles.moodContainer}>
                {moods.map((mood) => (
                    <TouchableOpacity key={mood.label} style={[styles.moodButton, selectedMood === mood.emoji && styles.selectedMoodButton]} onPress={() => setSelectedMood(mood.emoji)}>
                        <Text style={styles.emoji}>{mood.emoji}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    moodContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    moodButton: {
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightgrey',
    },
    selectedMoodButton: {
        backgroundColor: 'lightblue',
    },
    emoji: {
        fontSize: 24,
    },
});
