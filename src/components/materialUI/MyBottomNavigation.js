import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconWhatsHot from 'material-ui/svg-icons/social/whatshot';
import IconShare from 'material-ui/svg-icons/social/share';

const hot = <IconWhatsHot/>;
const share = <IconShare/>;
const twitterIcon = <FontAwesome name='twitter' style={{ color: '#888', fontSize: '28px' }} />

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class MyBottomNavigation extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Share"
            icon={share}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="What's hot"
            icon={hot}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Twitter"
            icon={twitterIcon}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default MyBottomNavigation;