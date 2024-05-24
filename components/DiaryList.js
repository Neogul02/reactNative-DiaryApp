import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

const DiaryList = ({ entries, setEntries, goPage }) => {
    const [selectedDate, setSelectedDate] = useState(getTodayDate());
    const [diariesForSelectedDate, setDiariesForSelectedDate] = useState([]);

    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        // 컴포넌트가 처음 렌더링될 때 오늘 날짜에 해당하는 일기를 가져옴
        const today = new Date();
        const todayDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
        const todayDiaries = entries.filter((entry) => entry.date === todayDate);
        setDiariesForSelectedDate(todayDiaries);
        setSelectedDate(todayDate);
    }, [entries]); // entries가 업데이트될 때마다 실행

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
        // 해당 날짜에 해당하는 모든 일기를 찾아서 불러올 수 있음
        const diariesForSelectedDate = entries.filter((entry) => entry.date === day.dateString);
        setDiariesForSelectedDate(diariesForSelectedDate);
    };

    const deleteDiary = async (id) => {
        try {
            // 서버에서 해당 ID의 일기 삭제
            await axios.delete(`https://expodiary-vuhiy.run.goorm.site/posts/${id}`);

            // 삭제한 일기를 state에서 제거
            setDiariesForSelectedDate((prevDiaries) => prevDiaries.filter((diary) => diary.id !== id));

            // 삭제 후 서버에서 업데이트된 데이터를 다시 가져와서 state를 업데이트
            const updatedData = await axios.get('https://expodiary-vuhiy.run.goorm.site/posts');
            setEntries(updatedData.data);
        } catch (error) {
            console.error('Error deleting diary:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.calendarContainer}>
                <Calendar
                    theme={{
                        arrowColor: 'tomato',
                        todayTextColor: 'orange',
                        selectedDayBackgroundColor: 'blue',
                    }}
                    onDayPress={onDayPress}
                />
                <View style={styles.diaryListContainer}>
                    <Text style={styles.dateText}>{selectedDate}의 일기</Text>
                    {/* 클릭한 캘린더날짜의 리스트 */}
                    {diariesForSelectedDate.map((diary) => (
                        <View style={styles.diaryItem} key={diary.id}>
                            <Text style={styles.diaryTitle}>{diary.title}</Text>
                            <TouchableOpacity onPress={() => goPage('Read', { id: diary.id })} style={styles.readButton}>
                                <Text style={styles.readButtonText}>Read</Text>
                            </TouchableOpacity>
                            {/* 삭제 버튼 추가 */}
                            <TouchableOpacity onPress={() => deleteDiary(diary.id)} style={styles.deleteButton}>
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                <View style={styles.inputContainer}></View>

                {/* 전체 목록 보여주는 코드 */}
                <Text style={styles.allEntriesText}>전체목록</Text>
                {entries.map((entry) => (
                    <View style={styles.entryItem} key={entry.id}>
                        <Text>{entry.title}</Text>
                        <TouchableOpacity onPress={() => goPage('Read', { id: entry.id })} style={styles.readButton}>
                            <Text style={styles.readButtonText}>Read</Text>
                        </TouchableOpacity>
                        {/* 삭제 버튼 추가 */}
                        <TouchableOpacity onPress={() => deleteDiary(entry.id)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <View style={styles.bottomSpacing}></View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
    },
    calendarContainer: {
        top: 70,
    },
    diaryListContainer: {
        margin: 5,
        top: 30,
    },
    dateText: {
        fontSize: 18,
    },
    diaryItem: {
        flexDirection: 'row',
    },
    diaryTitle: {
        fontSize: 18,
        margin: 10,
    },
    readButton: {
        marginLeft: 10,
        marginTop: 13,
    },
    readButtonText: {
        color: 'tomato',
    },
    deleteButton: {
        marginLeft: 10,
        marginTop: 13,
    },
    deleteButtonText: {
        color: 'red',
    },
    inputContainer: {
        top: 20,
        marginBottom: 30,
        borderBottomWidth: 1, // 아래 선
        paddingBottom: 10,
    },
    allEntriesText: {
        margin: 5,
        fontSize: 18,
    },
    entryItem: {
        flexDirection: 'row',
        margin: 10,
    },
    bottomSpacing: {
        height: 150,
    },
});

export default DiaryList;
