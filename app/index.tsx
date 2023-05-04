import React, { FunctionComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { useMediaQuery } from 'react-responsive';
import { MainSection } from '../components/layout/MainSection';
import { SidePanel } from '../components/layout/SidePanel';

const Index: FunctionComponent = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 }); // Define breakpoint for small screens

  const styles = getStyles(isSmallScreen);

  return (
    <View style={styles.container}>
      <MainSection style={styles.mainSection} />
      <SidePanel style={styles.sidePanel} />
    </View>
  );
};

const getStyles = (isSmallScreen: boolean) => {
  return StyleSheet.create({
    container: {
      flexDirection: isSmallScreen ? 'column' : 'row', // Use column layout for small screens and row layout for large screens
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: isSmallScreen ? 16 : 32, // Use smaller padding for small screens
      backgroundColor: '#111',
      height: '100%',
      overflowX: 'hidden',
      zIndex: 0,
    },
    mainSection: {
      flex: 1,
      marginRight: isSmallScreen ? 0 : 16, // Add space between MainSection and SidePanel for large screens
    },
    sidePanel: {
      width: isSmallScreen ? '100%' : 350, // Set SidePanel width to 300 for large screens
      marginTop: isSmallScreen ? 16 : 0, // Add space above SidePanel for small screens
    },
  });
};

export default Index;
