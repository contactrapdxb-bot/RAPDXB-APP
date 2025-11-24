import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Lock, User } from 'lucide-react-native';

export default function SignInScreen() {
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const float1 = useRef(new Animated.Value(0)).current;
  const float2 = useRef(new Animated.Value(0)).current;
  const float3 = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(float1, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(float1, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(float2, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(float2, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(float3, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
        Animated.timing(float3, {
          toValue: 0,
          duration: 5000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleSignIn = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
    router.replace('/(tabs)/home');
  };

  const float1Y = float1.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const float2Y = float2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });

  const float3Y = float3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#000000', '#0f0f0f', '#000000']}
        style={styles.background}
      />

      <Animated.View style={[styles.floatingOrb1, { transform: [{ translateY: float1Y }] }]}>
        <LinearGradient
          colors={['#3b82f6', '#2563eb']}
          style={styles.orb}
        />
      </Animated.View>

      <Animated.View style={[styles.floatingOrb2, { transform: [{ translateY: float2Y }] }]}>
        <LinearGradient
          colors={['#a3e635', '#84cc16']}
          style={styles.orb}
        />
      </Animated.View>

      <Animated.View style={[styles.floatingOrb3, { transform: [{ translateY: float3Y }] }]}>
        <LinearGradient
          colors={['#fbbf24', '#f59e0b']}
          style={styles.orb}
        />
      </Animated.View>

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={['#3b82f6', '#2563eb']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoCircle}
            >
              <Text style={styles.logoText}>W</Text>
            </LinearGradient>
          </View>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.brandName}>WRAPDXP</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>

        <View style={styles.formSection}>
          <LinearGradient
            colors={['rgba(59, 130, 246, 0.1)', 'rgba(37, 99, 235, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.inputCard}
          >
            <View style={styles.inputGroup}>
              <View style={styles.inputIconWrapper}>
                <User color="rgba(255, 255, 255, 0.6)" size={20} strokeWidth={2} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </LinearGradient>

          <LinearGradient
            colors={['rgba(163, 230, 53, 0.1)', 'rgba(132, 204, 22, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.inputCard}
          >
            <View style={styles.inputGroup}>
              <View style={styles.inputIconWrapper}>
                <Lock color="rgba(255, 255, 255, 0.6)" size={20} strokeWidth={2} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </LinearGradient>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSignIn}
            style={styles.signInButtonWrapper}
          >
            <LinearGradient
              colors={['#3b82f6', '#2563eb', '#1d4ed8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.signInButton}
            >
              <Text style={styles.signInButtonText}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.divider} />
          <Text style={styles.footerText}>Powered by WRAPDXP</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingOrb1: {
    position: 'absolute',
    top: 100,
    right: -50,
    opacity: 0.15,
  },
  floatingOrb2: {
    position: 'absolute',
    bottom: 150,
    left: -60,
    opacity: 0.12,
  },
  floatingOrb3: {
    position: 'absolute',
    top: '45%',
    right: -40,
    opacity: 0.1,
  },
  orb: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  headerSection: {
    marginBottom: 56,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  logoText: {
    fontSize: 42,
    fontFamily: 'Archivo-Bold',
    color: '#ffffff',
    letterSpacing: -1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Archivo-Regular',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  brandName: {
    fontSize: 48,
    fontFamily: 'Archivo-Bold',
    color: '#ffffff',
    marginBottom: 12,
    letterSpacing: -2,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'Archivo-Regular',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: -0.2,
  },
  formSection: {
    gap: 16,
  },
  inputCard: {
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  inputIconWrapper: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    fontSize: 17,
    fontFamily: 'Archivo-Medium',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  signInButtonWrapper: {
    marginTop: 16,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 10,
  },
  signInButton: {
    borderRadius: 20,
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButtonText: {
    fontSize: 19,
    fontFamily: 'Archivo-Bold',
    color: '#ffffff',
    letterSpacing: -0.5,
    textTransform: 'uppercase',
  },
  footer: {
    marginTop: 48,
    alignItems: 'center',
    gap: 16,
  },
  divider: {
    width: 60,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 1,
  },
  footerText: {
    fontSize: 13,
    fontFamily: 'Archivo-Medium',
    color: 'rgba(255, 255, 255, 0.3)',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
