import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, Linking, TextInput, Keyboard, StyleSheet } from 'react-native';
import { chat } from '../openai';

import dog from '../assets/dog.jpeg';

const ReadDiary = ({ entry, profileImageUrl }) => {
    const [result, setResult] = useState('무슨내용을 추천받고 싶어?'); // 처음 대화
    const [category, setCategory] = useState('');
    const [titles, setTitles] = useState([]);

    const handleReadDiary = (selectedCategory) => {
        setCategory(selectedCategory);

        const userPrompt = `당신은 사용자가 쓴 일기의 내용을 바탕으로 사용자에게 도움이 되는 내용을 "간단히" 추천 해주는 챗봇입니다.
    (사용자가 원하는 추천내용과, 사용자의 상황에 맞는 명언이나 격언 같은것을 제시하며 충고의 느낌으로 가면 더욱 좋습니다.

    (예를들어, 사용자가 음식을 추천받기를 원하면 
    '그렇다면 맛있는 '음식제목1', '음식제목2', '음식제목3'이 어떨까요? 🍖'
    또, 음악을 추천받기를 원하면 
    '음악을 듣고 싶다구요? 그럼 '노래제목1', '노래제목2', '노래제목3'을 틀어보세요! 🎶'
    또, 영화를 추천받기를 원하면 
    '영화제목1', '영화제목2', '영화제목3'은 정말 재밌어요! 꼭 봐보세요!🍿'
    반드시 추천한 제목들은 '로 감싸서 추천해줍니다. )
    답변은 누락되는 내용없이 최대 400자로 제한합니다.
대답은 반드시 한국어로 번역해서 제공합니다.)

      사용자의 일기 내용: 
      일기 제목 : ${entry.title} 
      일기 내용 : ${entry.content} 
      사용자가 원하는 추천 : ${selectedCategory}`;

        chat(userPrompt, (result) => {
            setResult(result);

            // 영화, 음악, 음식 등의 추천 결과에서 ''로 감싸진 제목들을 정규표현식으로 추출, 배열에 저장
            const resultTitle = result.match(/'([^']+)'/g);
            if (resultTitle) {
                setTitles(resultTitle.map((title) => title.slice(1, -1))); // '' 제거
            }
        });
    };

    const openDaumMoviePage = (title) => {
        const daumMovieSearchURL = `https://movie.daum.net/search?q=${encodeURIComponent(title)}`;
        Linking.openURL(daumMovieSearchURL);
    };

    const searchYouTube = (query) => {
        const youTubeSearchURL = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        Linking.openURL(youTubeSearchURL);
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text>제목: {entry.title}</Text>
                <Text>날짜: {entry.date}</Text>
                <Text>내용: {entry.content}</Text>
                {entry.mood && <Text>기분: {entry.mood}</Text>}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: 'lightblue' }]}
                        onPress={() => {
                            setResult('음식을 추천받고 싶구나!'); // 임시 결과
                            handleReadDiary('음식');
                        }}
                    >
                        <Text>음식</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: 'lightgreen' }]}
                        onPress={() => {
                            setResult('음악을 추천받고 싶구나!');
                            handleReadDiary('음악');
                        }}
                    >
                        <Text>음악</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: 'lightcoral' }]}
                        onPress={() => {
                            setResult('영화를 추천받고 싶구나!');
                            handleReadDiary('영화');
                        }}
                    >
                        <Text>영화</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder='아바타에게 추천받고 싶은 것을 입력하세요' style={styles.textInput} onChangeText={(text) => setCategory(text)} />
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: 'lightblue' }]}
                        onPress={() => {
                            setResult(`${category}을 추천받고 싶구나!`);
                            handleReadDiary(category);
                        }}
                    >
                        <Text>전송</Text>
                    </TouchableOpacity>
                </View>

                <Image source={profileImageUrl ? { uri: profileImageUrl } : dog} style={styles.profileImage} />
                <Text style={styles.avatarText}>아바타의 한마디: </Text>
                <Text>{result}</Text>

                {titles.length > 0 && category === '음식' && (
                    <View style={styles.linkContainer}>
                        <Text style={styles.linkTitle}>추천된 음식 링크:</Text>
                        {titles.map((title, index) => (
                            <TouchableOpacity key={index} onPress={() => searchYouTube(title)}>
                                <Text style={[styles.link, { color: 'red' }]}>{title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {titles.length > 0 && category === '음악' && (
                    <View style={styles.linkContainer}>
                        <Text style={styles.linkTitle}>추천된 음악 링크:</Text>
                        {titles.map((title, index) => (
                            <TouchableOpacity key={index} onPress={() => searchYouTube(title)}>
                                <Text style={[styles.link, { color: 'green' }]}>{title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                {titles.length > 0 && category === '영화' && (
                    <View style={styles.linkContainer}>
                        <Text style={styles.linkTitle}>추천된 영화 링크:</Text>
                        {titles.map((title, index) => (
                            <TouchableOpacity key={index} onPress={() => openDaumMoviePage(title)}>
                                <Text style={[styles.link, { color: 'blue' }]}>{title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 15,
        top: 70,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        padding: 10,
        marginRight: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        marginRight: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 10,
    },
    avatarText: {
        marginTop: 10,
        fontSize: 18,
    },
    linkContainer: {
        marginTop: 10,
    },
    linkTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: {
        textDecorationLine: 'underline',
        margin: 8,
    },
});

export default ReadDiary;
