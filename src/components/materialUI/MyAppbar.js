import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

function handleTouchTap() {
  alert('onTouchTap triggered on the title component');
}

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const MyAppbar = () => (
	<AppBar
		title={<span style={styles.title}>Entbox</span>}
		onTitleTouchTap={handleTouchTap}
		iconElementRight={
			<IconMenu
				iconButtonElement={
					<IconButton><MoreVertIcon /></IconButton>
			}
			targetOrigin={{horizontal: 'right', vertical: 'top'}}
			anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			>
			<MenuItem primaryText="About" />
			<MenuItem primaryText="Terms" />
			<MenuItem primaryText="Charity" />
		</IconMenu>
		}
	/>
);
export default MyAppbar;