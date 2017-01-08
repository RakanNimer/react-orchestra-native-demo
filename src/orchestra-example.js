import React from 'react';
import { ScrollView, Dimensions, View, Text, TouchableHighlight, Button } from 'react-native';

import { Orchestra } from 'react-orchestra/native';
import randomcolor from 'randomcolor';

import SvgShape from './SvgShape';

// const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/Mr+robot+main+theme+practice+1.mid';
const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/Mr.+Robot+Main+Theme+midi.mid';
// const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/beet1track-medium-fast.mid';
// const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/single-track-test-tempo-10.mid'
// const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/Beethoven+Fur+Elise+Easy+t30.mid';
// const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/Beethoven+Fur+Elise+Easy.mid';
// const midiURL = 'https://s3-eu-west-1.amazonaws.com/ut-music-player/assets/midis/soundsofsilence-t40.mid';

const playingFillColor = randomcolor({ seed: 1, hue: 'blue', luminosity: 'bright' });
const fillColor = randomcolor({ seed: 9, hue: 'blue' });
const playingStrokeColor = randomcolor({ seed: 3, hue: 'blue', luminosity: 'bright' });
const strokeColor = randomcolor({ seed: 4, hue: 'blue' });
const buttonColor = randomcolor({ seed: 5, hue: 'blue' });

class OrchestraExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      playingNotes: {
        inexistingNoteName: true,
      },
      instrumentLoaded: false,
    };
    this.onMidiLoaded = this.onMidiLoaded.bind(this);
    this.onInstrumentsReady = this.onInstrumentsReady.bind(this);
    this.togglePlayback = this.togglePlayback.bind(this);
    this.renderNote = this.renderNote.bind(this);
    this.onNotePlayed = this.onNotePlayed.bind(this);
    this.onNoteStopPlaying = this.onNoteStopPlaying.bind(this);
  }
  //eslint-disable-next-line
  componentDidMount() {
  }
  //eslint-disable-next-line
  onMidiLoaded(parsedMidi) {
    console.warn(`Midi loaded ${JSON.stringify(parsedMidi, 2, 2)}. Loading instruments now ...`);
    return parsedMidi;
  }
  onInstrumentsReady(instruments) {
    this.setState({
      instrumentLoaded: true,
    });
    return instruments;
  }
  onNotePlayed(instrumentName, noteName) {
    if (!this.state.instrumentLoaded) return;
    this.setState(
      {
        playingNotes: {
          [instrumentName + noteName]: true,
        },
      },
    );
    // console.warn(`Note ${noteName} was played, optionally handle this event`);
  }
  onNoteStopPlaying(instrumentName, noteName) {
    const playingNotes = Object.assign({}, this.state.playingNotes);
    delete playingNotes[instrumentName + noteName]; // -= 1;
    this.setState({ playingNotes });
    // console.warn(`Note ${noteName} stopped playing, optionally handle this event`);
  }
  togglePlayback() {
    this.setState({ play: !this.state.play });
  }
  renderNote(instrumentName, noteName) {
    const isPlaying = (instrumentName + noteName) in this.state.playingNotes; //  ? this.state.playingNotes[instrumentName + noteName] : 0;
    const width = 100;
    const height = 100;
    const noteStyle = { width, height, marginHorizontal: 10 };
    const noteFillColor = isPlaying ? playingFillColor : fillColor;
    const noteStrokecolor = isPlaying ? playingStrokeColor : strokeColor;
    return (
      <View style={noteStyle}>
        <SvgShape
          width={width}
          height={height}
          text={noteName}
          animate={isPlaying}
          fillColor={noteFillColor}
          strokeColor={noteStrokecolor}
        />
      </View>
    );
  }
  render() {
    const { height, width } = Dimensions.get('window');
    const footerHeight = 80;
    const instrumentHeight = height - footerHeight;
    return (
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
        <ScrollView style={{ width, height: instrumentHeight }}>
          <View >
            <Orchestra
              midiURL={midiURL}
              onMidiLoaded={this.onMidiLoaded}
              onInstrumentsReady={this.onInstrumentsReady}
              play={this.state.play}
              selectedTracks={[0]}
              onNotePlayed={this.onNotePlayed}
              onNoteStopPlaying={this.onNoteStopPlaying}
              renderNote={this.renderNote}
              instrumentName={'alto_sax'}
              instrumentStyle={{ marginTop: 80, flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}
            />
          </View>
        </ScrollView>
        <View style={{ width, height: footerHeight }}>
          <TouchableHighlight
            onPress={this.togglePlayback}
            underlayColor={randomcolor()}
          >
            <View
              style={{ height: footerHeight, backgroundColor: buttonColor, alignItems: 'center' }}
            >
              <Text
                style={{ lineHeight: footerHeight, color: 'white', fontWeight: 'bold' }}
              >
                {
                this.state.play ? 'Stop Playing' : 'Start Playing'
              }
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default OrchestraExample;
