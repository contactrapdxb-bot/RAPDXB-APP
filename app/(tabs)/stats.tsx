import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleBack = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.replace('/(tabs)/home');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.6}
        >
          <ArrowLeft color="#ffffff" size={24} strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>Stats</Text>
        <View style={styles.placeholder} />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ffffff"
            colors={['#ffffff']}
          />
        }>
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Activity</Text>
          <View style={styles.chartContainer}>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '65%' }]} />
              </View>
              <Text style={styles.barLabel}>Sep</Text>
            </View>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '82%' }]} />
              </View>
              <Text style={styles.barLabel}>Oct</Text>
            </View>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '48%' }]} />
              </View>
              <Text style={styles.barLabel}>Nov</Text>
            </View>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '91%' }]} />
              </View>
              <Text style={styles.barLabel}>Dec</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Engagement</Text>
          <View style={styles.chartContainer}>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '72%', backgroundColor: '#10b981' }]} />
              </View>
              <Text style={styles.barLabel}>Sep</Text>
            </View>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '58%', backgroundColor: '#10b981' }]} />
              </View>
              <Text style={styles.barLabel}>Oct</Text>
            </View>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '85%', backgroundColor: '#10b981' }]} />
              </View>
              <Text style={styles.barLabel}>Nov</Text>
            </View>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '78%', backgroundColor: '#10b981' }]} />
              </View>
              <Text style={styles.barLabel}>Dec</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Growth</Text>
          <View style={styles.chartContainer}>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '55%', backgroundColor: '#f59e0b' }]} />
              </View>
              <Text style={styles.barLabel}>Sep</Text>
            </View>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '68%', backgroundColor: '#f59e0b' }]} />
              </View>
              <Text style={styles.barLabel}>Oct</Text>
            </View>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '73%', backgroundColor: '#f59e0b' }]} />
              </View>
              <Text style={styles.barLabel}>Nov</Text>
            </View>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '88%', backgroundColor: '#f59e0b' }]} />
              </View>
              <Text style={styles.barLabel}>Dec</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Performance</Text>
          <View style={styles.chartContainer}>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '62%', backgroundColor: '#ef4444' }]} />
              </View>
              <Text style={styles.barLabel}>Sep</Text>
            </View>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '75%', backgroundColor: '#ef4444' }]} />
              </View>
              <Text style={styles.barLabel}>Oct</Text>
            </View>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '81%', backgroundColor: '#ef4444' }]} />
              </View>
              <Text style={styles.barLabel}>Nov</Text>
            </View>
            <View style={styles.barGroup}>
              <View style={styles.barContainer}>
                <View style={[styles.barFill, { height: '69%', backgroundColor: '#ef4444' }]} />
              </View>
              <Text style={styles.barLabel}>Dec</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'Archivo-Bold',
    letterSpacing: -0.5,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  chartSection: {
    marginBottom: 56,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Archivo-Bold',
    marginBottom: 24,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    gap: 16,
  },
  barGroup: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  barContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  barFill: {
    width: '100%',
    backgroundColor: '#3b82f6',
    borderBottomLeftRadius: 11,
    borderBottomRightRadius: 11,
  },
  barLabel: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 11,
    fontFamily: 'Inter-Regular',
    letterSpacing: 0.3,
  },
});
