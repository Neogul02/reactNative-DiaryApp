import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DiaryList from './components/DiaryList';
import AddDiary from './components/AddDiary';
import ReadDiary from './components/ReadDiary';
import Main from './components/Main';
import { EvilIcons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

export default function App() {
    const [[page, param], setCurrent] = useState(['Main', {}]); // 현재 페이지
    const [entries, setEntries] = useState([]); // DB
    const [profileImageUrl, setProfileImageUrl] = useState(''); // Profile Image URL State

    useEffect(() => {
        getEntries();
    }, []);

    const getEntries = async () => {
        try {
            const response = await axios.get('https://expodiary-vuhiy.run.goorm.site/posts');
            setEntries(response.data); // DB 불러오기
        } catch (error) {
            console.error('Error fetching entries:', error.message);
        }
    };

    const goPage = (page, param = {}) => {
        setCurrent([page, param]);
    };

    return (
        <View style={{ flex: 1 }}>
            {page === 'Main' && <Main goPage={goPage} setProfileImageUrl={setProfileImageUrl} />}
            {page === 'List' && <DiaryList entries={entries} setEntries={setEntries} goPage={goPage} />}
            {page === 'Diary' && <AddDiary entries={entries} setEntries={setEntries} goPage={goPage} profileImageUrl={profileImageUrl} />}
            {page === 'Read' && param.id && <ReadDiary entry={entries.find((entry) => entry.id === param.id)} profileImageUrl={profileImageUrl} />}

            <View style={styles.header}>
                <Text style={styles.headerText}>{page}</Text>
                <TouchableOpacity onPress={getEntries} style={styles.refreshButton}>
                    <EvilIcons name='refresh' size={30} color='white' />
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <View style={styles.footerContent}>
                    <TouchableOpacity onPress={() => goPage('Main')} style={styles.footerButton}>
                        <AntDesign name='home' size={24} color='tomato' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goPage('Diary', { profileImageUrl })} style={styles.footerButton}>
                        <MaterialCommunityIcons name='book-edit-outline' size={24} color='tomato' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goPage('List')} style={styles.footerButton}>
                        <AntDesign name='calendar' size={24} color='tomato' />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'tomato',
        paddingTop: 50,
        paddingBottom: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    headerText: {
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    refreshButton: {
        position: 'absolute',
        right: 0,
        top: 50,
    },
    footer: {
        backgroundColor: 'white',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderTopColor: 'lightgrey',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
    },
    footerContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    footerButton: {
        padding: 10,
    },
});
