import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import DiaryList from './components/DiaryList';
import AddDiary from './components/AddDiary';
import ReadDiary from './components/ReadDiary';
import Main from './components/Main'
import { EvilIcons ,AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'; 


import axios from 'axios';

export default function App() {
  const [[page, param], setCurrent] = useState(['Main', {}]);
  const [entries, setEntries] = useState([]);

  const [currentTab, setCurrentTab] = useState('Diary');
  useEffect(() => {
    getEntries();
  }, []);

  const getEntries = async () => {
    try {
      const response = await axios.get('https://expodiary-vuhiy.run.goorm.site/posts');
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error.message);
    }
  };

  const goPage = (page, param = {}) => {
    setCurrent([page, param]);
    setCurrentTab(page);
  };

  return (
    <View style={{ flex: 1 }}>
      {page === 'List' && <DiaryList entries={entries} setEntries={setEntries} goPage={goPage} />}
      {page === 'Diary' && <AddDiary entries={entries} setEntries={setEntries} goPage={goPage} />}
      {page === 'Read' && param.id && <ReadDiary entry={entries.find((entry) => entry.id === param.id)} />}
      {page === 'Main' && <Main goPage={goPage} />}
      

      <View style={{ backgroundColor: 'tomato', paddingTop: 50, paddingBottom: 10, position: 'absolute', top: 0, left: 0, right: 0 }}>
        <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>{currentTab}</Text>
        <TouchableOpacity
        onPress={getEntries}
        style={{position: 'absolute', right:0, top:50}}>
        <EvilIcons name="refresh" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={{ backgroundColor: 'white', padding: 10, position: 'absolute', bottom: 0, left: 0, right: 0, borderTopWidth: 1, borderTopColor: 'lightgrey', borderTopLeftRadius: 20, borderTopRightRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 5, elevation: 5 }}>
      
  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

    <TouchableOpacity onPress={() => goPage('Main')} style={{ padding: 10}}>
      <AntDesign name="home" size={24} color="tomato" />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => goPage('Diary')} style={{ padding: 10 }}>
      <MaterialCommunityIcons name="book-edit-outline" size={24} color="tomato" />
    </TouchableOpacity>
      
    <TouchableOpacity onPress={() => goPage('List')} style={{ padding: 10 }}>
      <AntDesign name="calendar" size={24} color="tomato" />
    </TouchableOpacity>
  </View>
</View>
    </View>
  );
}
