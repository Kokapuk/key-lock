import { FadeInDown, FadeOutDown } from '@/styles/layoutAnimations';
import StyleVars from '@/styles/styleVars';
import { EventArg, NavigationProp, useNavigation } from '@react-navigation/native';
import React, { ReactNode, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Portal } from 'react-native-paper';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  open: boolean;
  onClose(): void;
  title: string;
  children: ReactNode;
}

const Modal = ({ open, onClose, title, children }: Props) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const offset = useSharedValue(0);
  const { bottom } = useSafeAreaInsets();
  const [modalHeight, setModalHeight] = useState(0);
  const [closingWithGesture, setClosingWithGesture] = useState(false);

  useEffect(() => {
    if (open) {
      setClosingWithGesture(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleRemove = (
      event: EventArg<
        'beforeRemove',
        true,
        {
          action: Readonly<{
            type: string;
            payload?: object | undefined;
            source?: string | undefined;
            target?: string | undefined;
          }>;
        }
      >
    ) => {
      event.preventDefault();
      onClose();
    };

    navigation.addListener('beforeRemove', handleRemove);

    return () => navigation.removeListener('beforeRemove', handleRemove);
  }, [open]);

  const handleClose = () => {
    onClose();
    offset.value = 0;
  };

  const handleCloseGesture = () => {
    setClosingWithGesture(true);
    handleClose();
  };

  const gesture = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;
      offset.value = offsetDelta > 0 ? offsetDelta : 0;
    })
    .onFinalize((event) => {
      if (offset.value < 75 && event.velocityY < 350) {
        offset.value = withTiming(0, { duration: StyleVars.animationDuration, easing: Easing.inOut(Easing.ease) });
        return;
      }

      offset.value = withTiming(modalHeight, {
        duration: StyleVars.animationDuration,
        easing: Easing.out(Easing.ease),
      });
      runOnJS(handleCloseGesture)();
    });

  const animatedSheetStyle = useAnimatedStyle(() => ({ transform: [{ translateY: offset.value }] }));

  return (
    <Portal>
      {open && (
        <>
          <AnimatedPressable
            style={styles.background}
            onPress={handleClose}
            entering={FadeIn.duration(StyleVars.animationDuration).easing(Easing.out(Easing.ease))}
            exiting={FadeOut.duration(StyleVars.animationDuration).easing(Easing.in(Easing.ease))}
          />
          <GestureDetector gesture={gesture}>
            <Animated.View
              key={closingWithGesture ? 'gesture' : 'animation'}
              onLayout={(e) => setModalHeight(e.nativeEvent.layout.height)}
              style={[styles.sheet, { paddingBottom: bottom }, animatedSheetStyle]}
              entering={FadeInDown}
              exiting={closingWithGesture ? undefined : FadeOutDown}
            >
              <View style={styles.header}>
                <View style={styles.handle} />
                <Text style={styles.title}>{title}</Text>
              </View>
              <View style={styles.contentContainer}>{children}</View>
            </Animated.View>
          </GestureDetector>
        </>
      )}
    </Portal>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, .35)',
  },
  sheet: {
    backgroundColor: StyleVars.bg,
    borderTopStartRadius: StyleVars.borderRadiusLarge,
    borderTopEndRadius: StyleVars.borderRadiusLarge,
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
  },
  header: {
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
    marginBottom: 15,
  },
  handle: {
    height: 5,
    borderRadius: 3.5,
    width: 40,
    backgroundColor: StyleVars.bgLight,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  contentContainer: {
    marginBottom: 15,
    marginHorizontal: 20,
  },
});

export default Modal;
