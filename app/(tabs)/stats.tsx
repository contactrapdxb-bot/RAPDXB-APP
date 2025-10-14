import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function StatsScreen() {
  const insets = useSafeAreaInsets();

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
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Monthly Overview</Text>
          <View style={styles.chartContainer}>
            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '65%' }]} />
                </View>
              </View>
              <Text style={styles.barLabel}>Sep</Text>
            </View>

            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '82%' }]} />
                </View>
              </View>
              <Text style={styles.barLabel}>Oct</Text>
            </View>

            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '48%' }]} />
                </View>
              </View>
              <Text style={styles.barLabel}>Nov</Text>
            </View>

            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '91%' }]} />
                </View>
              </View>
              <Text style={styles.barLabel}>Dec</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Engagement Rate</Text>
          <View style={styles.chartContainer}>
            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '72%', backgroundColor: '#10b981' }]} />
                </View>
              </View>
              <Text style={styles.barLabel}>Sep</Text>
            </View>

            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '58%', backgroundColor: '#10b981' }]} />
                </View>
              </View>
              <Text style={styles.barLabel}>Oct</Text>
            </View>

            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '85%', backgroundColor: '#10b981' }]} />
                </View>
              </View>
              <Text style={styles.barLabel}>Nov</Text>
            </View>

            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '78%', backgroundColor: '#10b981' }]} />
                </View>
              </View>
              <Text style={styles.barLabel}>Dec</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Growth Trends</Text>
          <View style={styles.chartContainer}>
            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '55%', backgroundColor: '#f59e0b' }]} />
                </View>
              </View>
              <Text style={styles.barLabel}>Sep</Text>
            </View>

            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '68%', backgroundColor: '#f59e0b' }]} />
                </View>
              </View>
              <Text style={styles.barLabel}>Oct</Text>
            </View>

            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '73%', backgroundColor: '#f59e0b' }]} />
                </View>
              </View>
              <Text style={styles.barLabel}>Nov</Text>
            </View>

            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '88%', backgroundColor: '#f59e0b' }]} />
                </View>
              </View>
              <Text style={styles.barLabel}>Dec</Text>
            </View>
          </View>
        </View>

        <View style={styles.chartSection}>
          <Text style={styles.sectionTitle}>Performance Score</Text>
          <View style={styles.chartContainer}>
            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '62%', backgroundColor: '#ef4444' }]} />
                </View>
              </View>
              <Text style={styles.barLabel}>Sep</Text>
            </View>

            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '75%', backgroundColor: '#ef4444' }]} />
                </View>
              </View>
              <Text style={styles.barLabel}>Oct</Text>
            </View>

            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '81%', backgroundColor: '#ef4444' }]} />
                </View>
              </View>
              <Text style={styles.barLabel}>Nov</Text>
            </View>

            <View style={styles.barGroup}>
              <View style={styles.barWrapper}>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { height: '69%', backgroundColor: '#ef4444' }]} />
                </View>
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
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  chartSection: {
    marginBottom: 40,
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Archivo-Bold',
    marginBottom: 20,
    letterSpacing: -0.3,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
    paddingHorizontal: 8,
  },
  barGroup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 6,
  },
  barWrapper: {
    width: '100%',
    height: 140,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  barBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  barFill: {
    width: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    position: 'absolute',
    bottom: 0,
  },
  barLabel: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
});
