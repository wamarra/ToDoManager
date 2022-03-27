import * as React from 'react';
import {
  View,
  SectionList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const TaskListView = ({tasks, navigation}) => {
  const renderSectionHeader = React.useCallback(sectionData => {
    return (
      <View style={styles.headerConteiner}>
        <View style={styles.headerTagConteiner}>
          <Text style={styles.headerTagText}>
            {sectionData.section.title.substr(0, 1)}
          </Text>
        </View>
        <Text style={styles.headerText}>{sectionData.section.title}</Text>
      </View>
    );
  }, []);

  const onClickTask = React.useCallback(
    task => {
      const {navigate} = navigation;
      navigate('Task', {task});
    },
    [navigation],
  );

  const renderItem = React.useCallback(
    itemData => {
      return (
        <TouchableOpacity onPress={() => onClickTask(itemData.item)}>
          <View style={styles.itemConteiner}>
            <Text style={styles.itemTextTitle}>{itemData.item.title}</Text>
            <Text style={styles.itemTextSubtitle}>{itemData.item.resume}</Text>
          </View>
        </TouchableOpacity>
      );
    },
    [onClickTask],
  );

  return (
    <SectionList
      renderSectionHeader={renderSectionHeader}
      sections={[
        {
          data: tasks.filter(data => {
            return data.priority;
          }),
          key: 'hightPriority',
          title: 'Hight Priority',
        },
        {
          data: tasks.filter(data => {
            return !data.priority;
          }),
          key: 'lowPriority',
          title: 'Low Priority',
        },
      ]}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerConteiner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bdcdd9',
    borderRadius: 25,
    marginTop: 10,
  },
  headerTagConteiner: {
    backgroundColor: '#7d91a4',
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  headerTagText: {
    color: '#FFF',
    fontSize: 22,
  },
  headerText: {
    color: '#6e7c88',
    fontSize: 16,
    marginLeft: 10,
  },
  itemConteiner: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eef2f7',
    marginTop: 5,
    padding: 10,
    height: 75,
  },
  itemTextTitle: {
    fontSize: 22,
    color: '#69757e',
  },
  itemTextSubtitle: {
    fontSize: 12,
    color: '#a0aebc',
  },
});

export default TaskListView;
