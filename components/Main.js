import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Introduce({ goPage }) {
  return (
    <View style={{ top: 90 }}>
      <View style={{ top: 0, backgroundColor: 'rgba(233,1,1,1)' }}>
        <MaterialCommunityIcons name="book" size={94} padding={0} color="tomato" style={{ padding: 0, position: 'absolute', left: '37%' }} />
      </View>
      <View style={{ padding: 20, backgroundColor: 'rgba(232,1,180,0.4)', top: 100 }}>
        <Text style={{ textAlign: 'center' }}>이 프로그램은 일기를 작성하고</Text>

        <Text style={{ textAlign: 'center' }}>일기 내용을 기반으로 원하는 카테고리를 골라</Text>

        <Text style={{ textAlign: 'center' }}>일기내용에 알맞게 추천 받는 프로그램입니다.</Text>
      </View>

      <View style={{ padding: 20, backgroundColor: 'rgba(200,10,90,0.5)', top: 100 }}>
        <Text style={{ textAlign: 'center' }}>일기를 작성하고 추가 버튼을 누르면</Text>
        <Text style={{ textAlign: 'center' }}>인공지능이 일기 내용을 보고 대답해줍니다</Text>

        <TouchableOpacity onPress={() => goPage('Diary')} style={{ textAlign: 'center' }}>
          <Text style={{ color: '#000000', backgroundColor: 'rgba(243, 122, 32, 0.45)', textAlign: 'center', top: 10, padding: 10 }}>
            일기 쓰러가기
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: 'rgba(250,100,90,0.5)', padding: 20, top: 100 }}>
        <Text style={{ textAlign: 'center' }}> 자신이 썼던 일기는 달력에 가서</Text>
        <Text style={{ textAlign: 'center' }}> 원하는 날짜를 선택해 확인이 가능합니다</Text>
        <Text style={{ textAlign: 'center' }}> 일기 확인하는 창에는 카테고리가 3개 있습니다</Text>
        <TouchableOpacity onPress={() => goPage('List')} style={{ backgroundColor: 'rgba(243, 122, 32, 0.45)', top: 8 }}>
          <Text style={{ padding: 10, textAlign: 'center' }}>일기 확인하러 가기 </Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: 'rgba(255,180,0,0.7)', padding: 20, top: 100 }}>
        <Text>카테고리에는 음식, 음악, 영화가 있습니다</Text>
        <Text>카테고리가 써진 각 버튼을 누르면 </Text>
        <Text>인공지능이 카테고리에 맞춰 추천해줍니다</Text>
      </View>

      <View style={{ backgroundColor: 'rgba(255,210,50,0.5)', padding: 20, top: 100 }}>
        <Text> 일기를 쓰고 땡칠이와 함께</Text>
        <Text> 더 나은 하루를 보내시길 바랍니다!</Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
        <Text> </Text>
      </View>
    </View>
  );
}
