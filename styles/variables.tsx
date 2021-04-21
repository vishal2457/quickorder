import {
    Dimensions,
    Platform
  } from 'react-native';
  
  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;
  
  // responsive
  const responsiveHeight = (h) => {
    return deviceHeight * (h/100);
  };
  const responsiveWidth = (w) => {
    return deviceWidth * (w/100);
  };
  
  const NAV_HEIGHT = responsiveHeight(6.6);
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 24;
  
  // button size
  const btnWidth = {
    normal: responsiveWidth(74.4),
    large: responsiveWidth(91.47)
  };
  let btnHeight = 48;
  let smallbtnHeight = 30;
  
  let scrollableTabHeight = 50;
  
  
  // input box height
  let inputHeight = 43;
  
  // marginHorizontal
  const marginHorizontal = {
    large: responsiveWidth(12.8), // margin = 48
    normal: responsiveWidth(8.5), // margin = 32
    semiSmall: responsiveWidth(6.4), // margin = 24 
    small: responsiveWidth(4.27), // margin = 16,
    extraSmall: responsiveWidth(2)
  }
  
  // margin or padding vertical
  const spaceVertical = {
    large: responsiveHeight(7.19), // space = 48
    normal: responsiveHeight(4.8), // space = 32
    semiSmall: responsiveHeight(3.6), // space = 24
    small: responsiveHeight(2.4), // space = 16
    extraSmall: responsiveHeight(1.5)
  }
  
  // colors
  const colors = {
    green: '#9ccb48',
    red: '#cb0026',
    irisBlue: '#00ADAE',
    blue: 'rgb(59,89,152)',
    white: '#fff',
    black: '#121314',
    darkGray: 'rgb(74,74,74)',
    gray: 'rgb(155,155,155)',
    lightGray: 'rgb(216,216,216)',
    primary: '#F5CA48',
    secondary: '#F26C68',
    background: '#F9F9FB',
    textDark: '#313234',
    price: '#E4723C',
    textLight: '#CDCDCD',
  };

  // font family
  const fontFamily = {
    // regular: 'SanRegular',
    // medium: 'SanMedium',
    // semiBold: 'SanSemibold',
    // bold: 'SanBold',
  
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
  
  };
  
  const LARGE_DEVICE_SCALE = 1.3;
  
  let fontSize: any = {
    extraSmall: 12,
    small: 14,
    normal: 16,
    medium: 18,
    semiLarge: 20,
    large: 24, 
    sizeGuideTxt:23,
    sizeTxt: 64,
    starIc: 18,
    tileHeader: 12,
    addIc: 22,
  };
  
  let lineHeight = {
    normal: 24,
    small: 16,
  };
  
  let borderRadius = {
    normal: 4,
    backNextBtn: 100,
    semiLarge: 10
  };
  
  // step indicator
  let stepIndicatorHeight = 407;
  let indicatorStyles: any = {
    stepIndicatorSize: 16,
    currentStepIndicatorSize: 16,
    stepStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: colors.black,
    stepStrokeFinishedColor: colors.black,
    stepStrokeUnFinishedColor: colors.lightGray,
    separatorStrokeWidth: 1,
    separatorFinishedColor: colors.black,
    separatorUnFinishedColor: colors.lightGray,
    stepIndicatorFinishedColor: colors.black,
    stepIndicatorUnFinishedColor: colors.white,
    stepIndicatorCurrentColor: colors.black,
    stepIndicatorLabelFontSize: 10,
    currentStepIndicatorLabelFontSize: 10,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent', 
    labelSize: 16,
    labelColor: 'rgb(200,200,200)',
    currentStepLabelColor: colors.black,
    subLabelColor: 'rgb(200,200,200)',
    currentStepSubLabelColor: colors.gray,
  };
  
  // login screen: bottom text
  let bottomTxtHeight = 19;
  
  if (deviceWidth >= 768) {
    fontSize = {
      extraSmall: 12 * LARGE_DEVICE_SCALE,
      small: 14 * LARGE_DEVICE_SCALE,
      normal: 16 * LARGE_DEVICE_SCALE,
      medium: 18 * LARGE_DEVICE_SCALE,
      semiLarge: 20 * LARGE_DEVICE_SCALE,
      large: 24 * LARGE_DEVICE_SCALE, 
      sizeGuideTxt: 64 * LARGE_DEVICE_SCALE,
      starIc: 18 * LARGE_DEVICE_SCALE,
      tileHeader: 19 * LARGE_DEVICE_SCALE,
      addIc: 22 * LARGE_DEVICE_SCALE,
    };
    lineHeight = {
      normal: 24 * LARGE_DEVICE_SCALE,
      small: 16 * LARGE_DEVICE_SCALE,
    }
    borderRadius = {
      normal: 4 * LARGE_DEVICE_SCALE,
      backNextBtn: 100 * LARGE_DEVICE_SCALE,
      semiLarge: 6 * LARGE_DEVICE_SCALE,
    };
    btnHeight = 48 * LARGE_DEVICE_SCALE;
    smallbtnHeight = 24 * LARGE_DEVICE_SCALE;
    inputHeight = 43 * LARGE_DEVICE_SCALE;
    scrollableTabHeight = 40 * LARGE_DEVICE_SCALE; 
    indicatorStyles = {
      stepIndicatorSize: 16 * LARGE_DEVICE_SCALE,
      currentStepIndicatorSize: 16 * LARGE_DEVICE_SCALE,
      stepStrokeWidth: 2 * LARGE_DEVICE_SCALE,
      currentStepStrokeWidth: 2 * LARGE_DEVICE_SCALE,
      stepStrokeCurrentColor: colors.black,
      stepStrokeFinishedColor: colors.black,
      stepStrokeUnFinishedColor: colors.lightGray,
      separatorStrokeWidth: 1,
      separatorFinishedColor: colors.black,
      stepIndicatorUnFinishedColor: colors.white,
      stepIndicatorCurrentColor: colors.black,
      stepIndicatorLabelFontSize: 10 * LARGE_DEVICE_SCALE,
      currentStepIndicatorLabelFontSize: 10 * LARGE_DEVICE_SCALE,
      stepIndicatorLabelCurrentColor: 'transparent',
      stepIndicatorLabelFinishedColor: 'transparent',
      stepIndicatorLabelUnFinishedColor: 'transparent', 
      labelSize: 16 * LARGE_DEVICE_SCALE,
      labelColor: 'rgb(200,200,200)',
      currentStepLabelColor: colors.black,
      subLabelColor: 'rgb(200,200,200)',
      currentStepSubLabelColor: colors.gray,
    };
    stepIndicatorHeight = 407 * LARGE_DEVICE_SCALE;
    bottomTxtHeight = 19 * LARGE_DEVICE_SCALE;
  }
  
  export {
    responsiveHeight,
    responsiveWidth,
    btnWidth,
    btnHeight,
    smallbtnHeight,
    inputHeight,
    marginHorizontal,
    spaceVertical,
    scrollableTabHeight,
    NAV_HEIGHT,
    STATUSBAR_HEIGHT,
    deviceHeight,
    deviceWidth,
    colors,
    fontSize,
    fontFamily,
    lineHeight,
    borderRadius,
  
    // step indicator
    indicatorStyles,
    stepIndicatorHeight,
  
    //bottom text of login screen
    bottomTxtHeight,
  };
  