import useEditorStore from '@/store/editor';
import StyleVars from '@/styles/styleVars';
import { Field as FieldType } from '@/utils/types';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { CurvedTransition, Easing, FadeIn, FadeOut, LayoutAnimationConfig } from 'react-native-reanimated';
import Field from './Field';
import Integration from './Integration';

const Credentials = () => {
  const draftPassword = useEditorStore((st) => st.draftPassword);
  const fieldAnimation = useMemo(
    () => ({
      entering: FadeIn.duration(StyleVars.animationDuration).easing(Easing.inOut(Easing.ease)),
      exiting: FadeOut.duration(StyleVars.animationDuration).easing(Easing.inOut(Easing.ease)),
      layout: CurvedTransition.duration(StyleVars.animationDuration).easingY(Easing.inOut(Easing.ease)),
    }),
    []
  );
  const websiteField: FieldType = useMemo(
    () => ({ _id: 'website-field', title: 'Website', value: draftPassword?.website ?? '', isPassword: false }),
    [draftPassword?.website]
  );

  if (!draftPassword) {
    return null;
  }

  return (
    <LayoutAnimationConfig skipEntering>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.container}>
        {[...(draftPassword.credentials.fields ?? []), websiteField].map((item, index) => (
          <Animated.View
            key={item._id}
            entering={fieldAnimation.entering}
            exiting={fieldAnimation.exiting}
            layout={fieldAnimation.layout}
          >
            <Field field={item} isWebsite={index === draftPassword.credentials.fields?.length} />
          </Animated.View>
        ))}
        {!!draftPassword.credentials.integration && (
          <Animated.View
            key={draftPassword.credentials.integration._id}
            entering={fieldAnimation.entering}
            exiting={fieldAnimation.exiting}
            layout={fieldAnimation.layout}
          >
            <Integration />
          </Animated.View>
        )}
      </ScrollView>
    </LayoutAnimationConfig>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  container: {
    flexGrow: 1,
    gap: 40,
  },
});

export default Credentials;
