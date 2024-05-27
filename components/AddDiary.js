import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, Image } from 'react-native';
import { chat } from '../openai';
import axios from 'axios';
import MoodSelector from './MoodSelector'; // Import the MoodSelector component

const AddDiary = ({ entries, setEntries, goPage, profileImageUrl }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState(getDate());
    const [result, setResult] = useState('반가워~!');
    const [selectedMood, setSelectedMood] = useState(null); // Add state for selected mood

    function getDate() {
        const currentDate = new Date();
        return `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    }

    const handleAddDiary = async () => {
        try {
            await axios.post('https://expodiary-vuhiy.run.goorm.site/posts', { title, content, date, mood: selectedMood }); // Include mood in the post request

            const userPrompt = `당신은 사용자가 쓴 일기를 바탕으로 사용자에게 도움이 되는 내용을 한 줄로 간단하게 이야기해주는 챗봇입니다.
        (일기 제목과 내용을 보고 위로를 해준다거나 사용자가 필요로 할 만한 정보를 알려준다거나 추천해주는 듯한 내용을 작성해주세요.
        사용자의 일기 내용: 
        제목 : ${title} 
        내용 : ${content} 
        기분 : ${selectedMood})`; // Include mood in the prompt

            chat(userPrompt, (result) => setResult(result));

            const response = await axios.get('https://expodiary-vuhiy.run.goorm.site/posts');
            setEntries(response.data);

            setDate(getDate());
            Alert.alert('알림', `${title} 일기가 추가되었습니다.`, [{ text: '확인' }]);
        } catch (error) {
            console.error('Error adding diary entry:', error.message);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <Text>일기 추가</Text>
                    <TextInput style={styles.dateInput} value={date} onChangeText={(value) => setDate(value)} placeholder='날짜 (YYYY-MM-DD):' />
                </View>
                <TextInput style={styles.titleInput} onChangeText={(value) => setTitle(value)} value={title} placeholder='제목' />
                <ScrollView style={styles.contentInputContainer}>
                    <TextInput style={styles.contentInput} onChangeText={(value) => setContent(value)} value={content} placeholder='내용' multiline numberOfLines={10} />
                </ScrollView>
                <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
                {/* Integrate the MoodSelector component */}
                <TouchableOpacity style={styles.addButton} onPress={handleAddDiary}>
                    <Text style={{ color: 'white' }}>추가</Text>
                </TouchableOpacity>
                <View style={styles.profileContainer}>
                    <Image source={profileImageUrl ? { uri: profileImageUrl } : require('../assets/dog.jpeg')} style={styles.profileImage} />
                    <Text style={styles.resultText}>아바타의 한마디: {result}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 30,
        top: 60,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 10,
    },
    inputContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    dateInput: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    titleInput: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        fontSize: 18,
    },
    contentInputContainer: {
        height: 200,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    contentInput: {
        flex: 1,
        fontSize: 18,
    },
    resultText: {
        flex: 1,
        margin: 10,
    },
    addButton: {
        backgroundColor: 'tomato',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
});

export default AddDiary;
