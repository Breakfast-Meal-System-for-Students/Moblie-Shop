import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Categories from '../components/Categories';
import ProductList from '../components/ProductList';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function ProductPage() {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [pageIndex, setPageIndex] = useState(1); // State for pagination
  const [totalPages, setTotalPages] = useState(0); // State for total pages

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= pageIndex - 1 && i <= pageIndex + 1)) {
        pages.push(
          <TouchableOpacity key={i} onPress={() => setPageIndex(i)} style={[styles.pageButton, pageIndex === i && styles.activePage]}>
            <Text style={pageIndex === i ? styles.activePageText : styles.pageText}>{i}</Text>
          </TouchableOpacity>
        );
      } else if (i === 2 || i === totalPages - 1) {
        pages.push(
          <Text key={i} style={styles.ellipsisText}>...</Text>
        );
      }
    }
    return pages;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
    

      {/* Title */}
      <Text style={styles.subTitle}>Whats New</Text>
      <Text style={styles.title}>From The Product</Text>
      <View style={styles.topBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons name="search" size={25} color="black" />
      </View>
      {/* Categories */}
      <View style={{marginTop: 20}}>
        <Categories />
      </View>

      {/* Products */}
      <ProductList searchQuery={searchQuery} pageIndex={pageIndex} setTotalPages={setTotalPages} />

      {/* Pagination Controls */}
      <View style={styles.pagination}>
        <TouchableOpacity onPress={() => setPageIndex(prev => Math.max(prev - 1, 1))}>
          <Ionicons name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.pageNumbers}>
          {renderPageNumbers()}
        </View>
        <TouchableOpacity onPress={() => setPageIndex(prev => Math.min(prev + 1, totalPages))}>
          <Ionicons name="chevron-forward" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: '#f9f9f9',
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  subTitle: {
    fontSize: 23,
    marginBottom: 10,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  pageNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageButton: {
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#007bff', // Màu viền
    borderRadius: 5,
  },
  activePage: {
    backgroundColor: '#007bff', // Màu nền cho trang hiện tại
  },
  pageText: {
    fontSize: 18,
    color: 'black',
  },
  activePageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Màu chữ cho trang hiện tại
  },
  ellipsisText: {
    fontSize: 18,
    color: 'black',
    marginHorizontal: 5,
  },
});
