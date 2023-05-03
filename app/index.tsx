import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { MainSection } from '../components/MainSection';
import { SidePanel } from '../components/SidePanel';

const Index: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <MainSection />
      <SidePanel />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 32,
    backgroundColor: '#111',
    height: '100%',
  },
});

export default Index;
