import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, Image } from 'react-native';
import { chat } from '../openai';
import axios from 'axios';

import dog from '../assets/dog.jpeg';


const AddDiary = ({ entries, setEntries, goPage }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(getDate());
  const [result, setResult] = useState('반갑다 멍~🐾');

  function getDate() {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  }

  const handleAddDiary = async () => {
    try {
      await axios.post('https://expodiary-vuhiy.run.goorm.site/posts', { title, content, date });

      const userPrompt = `당신은 사용자가 쓴 일기를 바탕으로 사용자에게 도움이 되는 내용을 한 줄로 간단하게 이야기해주는는 강아지 챗봇입니다. 강아지가 말하는것같은 말투를 사용하면 좋습니다. 말끝마다 멍을 붙인다던지
        (일기제목과 내용을 보고 위로를 해준다거나 사용자가 필요로할 만한 정보를 알려준다거나 추천해주는듯한 내용을 작성해주세요.
        사용자의 일기 내용: 
        제목 : ${title} 
        내용 : ${content} )`;

      chat(userPrompt, (result) => setResult(result));

      const response = await axios.get('https://expodiary-vuhiy.run.goorm.site/posts');
      setEntries(response.data);

      setDate(getDate());
      Alert.alert('알림', `${title}일기가 추가되었습니다.`, [{ text: '확인' }]);
    } catch (error) {
      console.error('Error adding diary entry:', error.message);
    }
  };



  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text>일기 추가</Text>
          <TextInput
            style={styles.dateInput}
            value={date}
            onChangeText={(value) => setDate(value)}
            placeholder="날짜 (YYYY-MM-DD):"
          />
        </View>
        <TextInput
          style={styles.titleInput}
          onChangeText={(value) => setTitle(value)}
          value={title}
          placeholder="제목"
        />
        <ScrollView style={styles.contentInputContainer}>
          <TextInput
            style={styles.contentInput}
            onChangeText={(value) => setContent(value)}
            value={content}
            placeholder="내용"
            multiline
            numberOfLines={10}
          />
        </ScrollView>

        <TouchableOpacity style={styles.addButton} onPress={handleAddDiary}>
          <Text style={{ color: 'white' }}>추가</Text>
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Image source={dog} style={styles.profileImage}/>
          <Text style={styles.resultText}>땡칠이의 한마디: {result}</Text>
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
  },
  contentInputContainer: {
    height: 200,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  contentInput: {
    flex: 1,
  },
  resultText: {
    flex: 1, // 텍스트가 화면을 벗어나지 않도록 flex 속성 추가
    margin: 10,
  },
  // 추가 버튼의 스타일
  addButton: {
    backgroundColor: 'tomato',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
});

export default AddDiary;