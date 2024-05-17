import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, Linking } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText, getFilmTrailerFromApi } from '../API/TMDBApi'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchedText = "";
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      films: [],
      isLoading: false
    };
  }

  _searchTextInputChanged = (text) => {
    this.searchedText = text;
  }

  _searchFilms = () => {
    this.page = 0;
    this.totalPages = 0;
    this.setState({ films: [] }, this._loadFilms);
  }

  _loadFilms = () => {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page;
        this.totalPages = data.total_pages;
        this.setState({
          films: [...this.state.films, ...data.results],
          isLoading: false
        });
      });
    }
  }
  _getCinemasForFilm = (filmId) => {
    getCinemasForFilmFromApi(filmId).then(cinemas => {
      // Afficher les cinémas dans une manière appropriée, par exemple, en utilisant une boîte de dialogue ou une nouvelle vue.
      console.log('Cinemas for film:', cinemas);
    }).catch(error => {
      console.error('Error fetching cinemas:', error);
    });
  }
  _displayLoading = () => {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      );
    }
  }

  handlePressFilm = (filmId) => {
    getFilmTrailerFromApi(filmId).then(data => {
      const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        const youtubeUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
        Linking.openURL(youtubeUrl);
      } else {
        console.log('No trailer available');
      }
    });
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={this._searchTextInputChanged}
          onSubmitEditing={this._searchFilms}
        />
        <Button title='Rechercher' onPress={this._searchFilms}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item} onPress={this.handlePressFilm}/>}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
               this._loadFilms()
            }
          }}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Search;
