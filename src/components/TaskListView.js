import * as React from 'react';
import {
  View,
  SectionList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const TaskListView = ({tasks}) => {
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

  const renderItem = React.useCallback(itemData => {
    return (
      <TouchableOpacity>
        <View style={styles.itemConteiner}>
          <Text style={styles.itemTextTitle}>{itemData.item.title}</Text>
          <Text>{itemData.item.resume}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

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
    backgroundColor: 'silver',
    borderRadius: 25,
    marginTop: 10,
  },
  headerTagConteiner: {
    backgroundColor: 'gray',
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
    fontSize: 16,
    marginLeft: 10,
  },
  itemConteiner: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F3F2F0',
    marginTop: 5,
    padding: 10,
    height: 75,
  },
  itemTextTitle: {
    fontSize: 22,
  },
});

export default TaskListView;
