import StyleVars from '@/styles/styleVars';
import { EventArg, NavigationProp, useNavigation } from '@react-navigation/native';
import React, { ReactNode, useEffect, useMemo } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Portal } from 'react-native-paper';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
  open: boolean;
  onClose?(): void;
  title: string;
  children: ReactNode;
  sheetStyle?: StyleProp<ViewStyle>;
  sheetContentStyle?: StyleProp<ViewStyle>;
}

const Modal = ({ open, onClose, title, children, sheetStyle, sheetContentStyle }: Props) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const offset = useSharedValue(0);
  const { bottom } = useSafeAreaInsets();

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
      onClose?.();
    };

    navigation.addListener('beforeRemove', handleRemove);

    return () => navigation.removeListener('beforeRemove', handleRemove);
  }, [open]);

  const handleClose = () => {
    onClose?.();
    offset.value = 0;
  };

  const closingGesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(!!onClose)
        .onChange((event) => {
          const offsetDelta = event.changeY + offset.value;
          offset.value = offsetDelta > 0 ? offsetDelta : 0;
        })
        .onFinalize((event) => {
          if (offset.value < 75 && event.velocityY < 350) {
            offset.value = withTiming(0, { duration: StyleVars.animationDuration, easing: Easing.inOut(Easing.ease) });
            return;
          }

          runOnJS(handleClose)();
        }),
    [onClose, offset.value]
  );

  const animatedSheetStyle = useAnimatedStyle(() => ({ transform: [{ translateY: offset.value }] }));

  return (
    <Portal>
      {open && (
        <>
          <AnimatedPressable
            style={styles.background}
            onPress={!!onClose ? handleClose : undefined}
            entering={FadeIn.duration(StyleVars.animationDurationLong).easing(Easing.out(Easing.ease))}
            exiting={FadeOut.duration(StyleVars.animationDurationLong).easing(Easing.in(Easing.ease))}
          />
          <GestureDetector gesture={closingGesture}>
            <Animated.View
              style={[styles.sheet, { paddingBottom: bottom }, animatedSheetStyle, sheetStyle]}
              entering={SlideInDown.duration(StyleVars.animationDurationLong).easing(Easing.out(Easing.ease))}
              exiting={SlideOutDown.duration(StyleVars.animationDurationLong).easing(Easing.in(Easing.ease))}
            >
              <View style={styles.header}>
                {!!onClose && <View style={styles.handle} />}
                <Text style={styles.title}>{title}</Text>
              </View>
              <View style={[styles.contentContainer, sheetContentStyle]}>{children}</View>
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
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 15,
    marginHorizontal: 20,
  },
});

export default Modal;
