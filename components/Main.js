import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Main({ goPage, setProfileImageUrl }) {
    const [profileImageUrl, setLocalProfileImageUrl] = useState('');

    const handleUrlChange = (url) => {
        setLocalProfileImageUrl(url);
        setProfileImageUrl(url);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcons name='book' size={94} color='tomato' style={styles.icon} />
            </View>
            
            <View style={styles.section1}>
                <Text style={styles.centerText}>이 프로그램은 일기를 작성하고</Text>
                <Text style={styles.centerText}>일기 내용을 기반으로 원하는 카테고리를 골라</Text>
                <Text style={styles.centerText}>일기내용에 알맞게 추천 받는 프로그램입니다.</Text>
                <Text></Text>
                <TextInput
                    style={styles.urlInput}
                    placeholder="이미지 URL을 입력하세요"
                    value={profileImageUrl}
                    onChangeText={handleUrlChange}
                />
                <Text style={styles.centerText}>원하는 아바타의 이미지 URL을 입력해보세요!</Text>
            </View>

            <View style={styles.section2}>
                <Text style={styles.centerText}>일기를 작성하고 추가 버튼을 누르면</Text>
                <Text style={styles.centerText}>아바타가 일기 내용을 보고 대답해줍니다</Text>
                <TouchableOpacity onPress={() => goPage('Diary', { profileImageUrl })} style={styles.button}>
                    <Text style={styles.buttonText}>일기 쓰러가기</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section3}>
                <Text style={styles.centerText}> 자신이 썼던 일기는 달력에 가서</Text>
                <Text style={styles.centerText}> 원하는 날짜를 선택해 확인이 가능합니다</Text>
                <Text style={styles.centerText}> 일기 확인하는 창에는 카테고리가 3개 있습니다</Text>
                <TouchableOpacity onPress={() => goPage('List')} style={styles.button}>
                    <Text style={styles.buttonText}>일기 확인하러 가기 </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section4}>
                <Text>카테고리에는 음식, 음악, 영화가 있습니다</Text>
                <Text>카테고리가 써진 각 버튼을 누르면 </Text>
                <Text>아바타가 카테고리에 맞춰 추천해줍니다</Text>
            </View>

            <View style={styles.section5}>
                <Text> 일기를 쓰고 아바타와 함께</Text>
                <Text> 더 나은 하루를 보내시길 바랍니다!</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        top: 90,
    },
    header: {
        top: 0,
        backgroundColor: 'rgba(233,1,1,1)',
    },
    icon: {
        padding: 0,
        position: 'absolute',
        left: '37%',
    },
    section1: {
        padding: 20,
        backgroundColor: 'rgba(232,1,180,0.4)',
        top: 100,
    },
    section2: {
        padding: 20,
        backgroundColor: 'rgba(200,10,90,0.5)',
        top: 100,
    },
    section3: {
        backgroundColor: 'rgba(250,100,90,0.5)',
        padding: 20,
        top: 100,
    },
    section4: {
        backgroundColor: 'rgba(255,180,0,0.7)',
        padding: 20,
        top: 100,
    },
    section5: {
        backgroundColor: 'rgba(255,210,50,0.5)',
        padding: 20,
        top: 100,
    },
    centerText: {
        textAlign: 'center',
    },
    button: {
        textAlign: 'center',
        backgroundColor: 'tomato',
        marginTop: 10,
        padding: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    urlInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
    },
});
