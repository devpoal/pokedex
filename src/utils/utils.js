export function getColorByType(type) {
	switch (type) {
		case 'normal':
			return '#9a9a9a';
		case 'fighting':
			return '#2b44d8';
		case 'flying':
			return '#7bd8ea';
		case 'poison':
			return '#afc741';
		case 'ground':
			return '#382929';
		case 'rock':
			return '#545454';
		case 'bug':
			return '#000000';
		case 'ghost':
			return '#8c9ca5';
		case 'steel':
			return '#8395ff';
		case 'fire':
			return '#f9414d'; 
		case 'water':
			return '#1180bb';
		case 'grass':
			return '#2a5f2f';
		case 'electric':
			return '#eccd30';
		case 'psychic':
			return '#f049ff';
		case 'ice':
			return '#0099fd';
		case 'dragon':
			return '#de4e01';
		case 'dark':
			return '#313131';
		case 'fairy':
			return '#6e2ede';
		case 'unknown':
			return '#000000';
		case 'shadow':
			return '#ffbfc9';
		default:
			return '#ffffff'
	}
};