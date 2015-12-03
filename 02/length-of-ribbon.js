import around from './length-of-ribbon-around';
import bow from './length-of-ribbon-bow';

export default (...sides) => around(...sides) + bow(...sides);