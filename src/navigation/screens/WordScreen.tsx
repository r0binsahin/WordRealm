import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {RootStackParamList} from '../../utiles/RootStackParams';
import {RealmContext, Word} from '../../models/Word';

import Slider from '../../components/Slider';
import {StyleSheet, View} from 'react-native';

type propsType = NativeStackScreenProps<RootStackParamList, 'WordScreen'>;

export const WordScreen = (props: propsType) => {
  const {route} = props;
  const {selectedCategory, clickedWordId} = route.params;

  const {useQuery} = RealmContext;
  const filteredWords = useQuery(Word, words => {
    return words.filtered(`category == $0`, selectedCategory);
  });
  const clickedWord = filteredWords.find(
    word => word._id.toHexString() === clickedWordId,
  );
  //@ts-ignore
  const reorderedWords: Word[] = [
    clickedWord,
    ...filteredWords.filter(word => word !== clickedWord),
  ].filter(
    (item, index, self) =>
      index === self.findIndex(t => t?.word === item?.word),
  );

  return (
    <View style={{flex: 1}}>
      <Slider words={reorderedWords} />
    </View>
  );
};

const styles = StyleSheet.create({});