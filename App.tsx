import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Course = 'Starter' | 'Main Course' | 'Dessert';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: Course;
  price: number;
};

const courses: Course[] = ['Starter', 'Main Course', 'Dessert'];

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Spring Rolls',
      description: 'Shrimp spring rolls served with a sweet chilli dipping sauce.',
      course: 'Starter',
      price: 60.00,
    },
    {
      id: '2',
      name: 'Chicken Srir-Fry',
      description: 'Tender chicken breast with a sweet soy sauce and vegetables.',
      course: 'Main Course',
      price: 130.00,
    },
    {
      id: '3',
      name: 'Tiramisu',
      description: 'Layered treat with coffee soaked ladyfingers, cocoa powder and mascarpone cream.',
      course: 'Dessert',
      price: 90.00,
    },
  ]);


  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Course>('Starter');
  const [price, setPrice] = useState('');

  const addMenuItem = () => {
    if (!name.trim() || !description.trim || !price.trim()) {
      Alert.alert('Missing information', 'Please complete all fields.');
      return;
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice <=0) {
      Alert.alert('Invalid Price, Enter a price greater than zero.');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      course,
      price: numericPrice,
    };

    setMenuItems((currentItems) => [...currentItems, newItem]);

    setName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
    setShowForm(false);

    Alert.alert('Success', 'Menu item added successfully!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#F7F8FC" />
      
      <ScrollView contentContainerStyle={styles.content}>
        {!showForm ? (
          <>
          <Text style={styles.title}>Restaurant Menu</Text>
          <Text style={styles.subtitle}>Manage your dishes</Text>

            <TextInput
            style={styles.input}
            placeholder="Search menu items..."
            editable={false}
          />

          <Text style={styles.sectionTitle}>Course Filter</Text>

          <View style={styles.filterBox}>
            <Text style={styles.filterText}>All courses</Text>
          </View>

          <Text style={styles.sectionTitle}>Menu Items</Text>

          {menuItems.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>No menu items yet</Text>
              <Text style={styles.muted}>
                Add your first dish to get started.
              </Text>
            </View>
          ) : (
            menuItems.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.muted}>{item.course}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>
                  R {item.price.toFixed(2)}
                </Text>
              </View>
            ))
          )}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setShowForm(true)}
            >
              <Text style={styles.primaryButtonText}>+Add Menu Item</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => 
                Alert.alert(
                  'Coming later',
                  'Menu statistics will be in the final POE.',
                )
              }
            >
              <Text style={styles.secondaryButtonText}>
                View Statistics
              </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Add Menu Item</Text>
          <Text style={styles.subtitle}>Enter details of the new dish</Text>

          <Text style={styles.label}>Dish Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Item name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder="Describe the dish"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />

          <Text style={styles.label}>Course</Text>

          <View style={styles.courseOptions}>
            {courses.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.courseButton,
                  course === option && styles.courseSelected,
                ]}
                onPress={() => setCourse(option)}
                >
                  <Text
                    style={[
                      styles.courseText,
                      course === option && styles.courseTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Price (R)</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
          />

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={addMenuItem}
          >
            <Text style={styles.primaryButtonText}>
              Save Menu Item
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setShowForm(false)}
          >
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
    </SafeAreaView>
  );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7F8FC',
    },
    content: {
      paddingBottom: 40,
      padding: 22,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 30,
      color: '#172033',
    },
    subtitle: {
      fontSize: 15,
      marginTop: 5,
      marginBottom: 24,
      color: '#858B9A',
    },
    sectionTitle: {
      fontWeight: 'bold',
      fontSize: 19,
      color: '#172033',
      marginTop: 24,
      marginBottom: 12,
    },
    input: {
      borderWidth: 1,
      backgroundColor: '#DDE2EC',
      borderRadius: 12,
      fontSize: 15,
      padding: 14,
      color: '#172033',
    },
    filterBox: {
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      borderColor: '#E2E5ED',
      padding: 14,
      borderRadius: 12,
    },
    filterText: {
      fontSize: 15,
      color: '#172033',
    },
    muted: {
      color: '#858B9A',
      fontSize: 13,
      marginTop: 5,
    },
    emptyCard: {
      padding: 24,
      backgroundColor: '#FFFFFF',
      borderRadius: 14,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#E7EAF1',
    },
    emptyTitle: {
      fontWeight: '600',
      fontSize: 16,
      color: '#172033',
    },
    itemCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 14,
      padding: 16,
      borderWidth: 1,
      borderColor: '#E7EAF1',
      marginBottom: 12,
    },
    itemName: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#172033',
    },
    description: {
      fontSize: 14,
      color: '#737B8C',
      marginTop: 8,
    },
    price: {
      fontSize: 17,
      fontWeight: 'bold',
      marginTop: 12,
      color: '#2864E8',
    },
    primaryButton: {
      padding: 16,
      backgroundColor: '#2864E8',
      borderRadius: 12,
      marginTop: 20,
      alignItems: 'center',
    },
    primaryButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    secondaryButton: {
      padding: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 12,
      backgroundColor: '#E9EDF5',
    },
    secondaryButtonText: {
      fontSize: 15,
      color: '#344054',
      fontWeight: '600',
    },
    label: {
      color: '#172033',
      marginBottom: 8,
      marginTop: 16,
      fontSize: 15,
      fontWeight: '600',
    },
    multiline: {
      minHeight: 100,
    },
    courseOptions: {
      gap: 8,
    },
    courseButton: {
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      borderColor: '#DDE2EC',
      borderRadius: 10,
      padding: 12,
    },
    courseSelected: {
      borderColor: '#2864E8',
      backgroundColor: '#E8EFFF',
    },
    courseText: {
      color: '#344054',
    },
    courseTextSelected: {
      color: '#2864E8',
      fontWeight: 'bold',
    },
  });
