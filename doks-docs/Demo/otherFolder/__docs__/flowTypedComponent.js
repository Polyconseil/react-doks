export const source = require('!!raw!../flowTypedComponent');

export const overview = `
# Flow typed component

This is the same component as components/WonderfulComponent. However, this one has its propsTypes described with flow :

\`\`\`

type Props = {
  /**
   * The title to display
   * @examples "Wonderful title", "Hello world"
   */
  title: string,
    /** The text inside the box */
  text: string,
  /** The container's width, in px */
  width: ?number,
  /** Toggles the dark background with white text */
  negative: bool,
};

export default class WonderfulComponent extends Component {
  props: Props;

  static defaultProps = {
    negative: false,
    width: 400,
  }

  render() {
    // ...
  }
}

\`\`\`

`;
