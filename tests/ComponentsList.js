import ComponentsList from '../src/runtime/components/SidePanel';
const assert = require('chai').assert;
const React = require('react');
const ReactDOM = require('react-dom');
const { mount } = require('enzyme');

/*
  {
    filePath : string. File path, aka Webpack request to fetch component,
    name: name to be displayed in the list
  }
 */
const componentsFixtures = [
  {
    filePath: './yolo/__docs__/Component.js',
    name: 'yolo/Component',
  },
  {
    filePath: './qsdf/MySuperDuperComponent/index.js',
    name: 'qsdf/MySuperDuperComponent',
  },
  {
    filePath: './qsdf/MySuperDuperComponent/ElComponento.js',
    name: 'qsdf/MySuperDuperComponent:ElComponento',
  },
  {
    filePath: './feature/MySuperDuperComponent/SuperDuperWrapper.js',
    name: 'feature/MySuperDuperComponent:SuperDuperWrapper',
  },
  {
    filePath: './feature/MySuperDuperComponent/SuperDuperUberWrapper.js',
    name: 'feature/MySuperDuperComponent:SuperDuperUberWrapper',
  },
];

describe('List of components exposing a doc', () => {
  function inputEvent(input, value) {
    // We want to simulate a realistic event with a real DOM target
    // But we want to fake the "value" field of that element by using a Proxy
    return {
      target: new Proxy(input, {
        get: (target, name) => name === 'value' ? value : target[name],
      }),
    };
  }

  function simulateChange(wrapper, value: string) {
    wrapper.simulate('change', inputEvent(wrapper.node, value));
  }

  it('is collapsed when mounting', () => {
    const node = ReactDOM.render(<ComponentsList collapsed={true} components={componentsFixtures} onSelect={() => {}} />, document.getElementById('root')); // eslint-disable-line
    const width = ReactDOM.findDOMNode(node).clientWidth; // eslint-disable-line
    // In case we suddenly decide that the list should be 327px wide, this test is intentionally not too specific :
    assert.ok(width < 200, 'width should be under 200px');
  });

  it('is collapsible', () => {
    let called = false;

    // Rudimentary spy :
    // XXX sinon ?
    const spy = () => { called = true; };

    const wrapper = mount(<ComponentsList collapsed={true} onCollapse={spy} components={componentsFixtures} onSelect={() => {}} />, { attachTo: document.getElementById('root')}); // eslint-disable-line

    // Clicking :
    wrapper.find('button').simulate('click');

    assert.ok(called);

    const wrapper2 = mount(<ComponentsList collapsed={false} components={componentsFixtures} onSelect={() => {}} />, { attachTo: document.getElementById('root')}); // eslint-disable-line
    assert.lengthOf(wrapper2.find('.components-list'), 1, 'component list should be displayed');

    const node = wrapper2.get(0);
    const width = ReactDOM.findDOMNode(node).clientWidth;
    // In case we suddenly decide that the collapsed list should be 69px wide, this test is intentionally not too specific :
    assert.ok(width > 100, 'list should not be collapsed');
  });

  it('displays the list of components', () => {
    // Test on components :
    const wrapper = mount(<ComponentsList components={componentsFixtures} onSelect={() => {}} />, {attachTo: document.getElementById('root')});

    // Uncollapsing :
    wrapper.find('button').simulate('click');

    const list = wrapper.find('.components-list li[data-path]'); // <li> tags containing a clickable component name (not a title)
    assert.lengthOf(list, componentsFixtures.length, 'list of component fed through a fixture');

    // Test on titles (allows lightly testing tree view) :
    const titles = wrapper.find('.components-list .components-folder');
    assert.lengthOf(titles, 3, 'features list contains three folders');
  });

  it('allows selecting a component to see its doc', () => {
    let called = false;

    // Rudimentary spy :
    // XXX sinon ?
    const spy = (filePath) => {
      assert.equal(filePath, componentsFixtures[1].filePath, 'Clicked on the second item in the list');
      called = true;
    };

    const wrapper = mount(<ComponentsList components={componentsFixtures} onSelect={spy} />, {attachTo: document.getElementById('root')});

    // Uncollapsing :
    wrapper.find('button').simulate('click');

    const componentsClickable = wrapper.find('.components-list li[data-path]');

    // Find the link corresponding to the second fixture, and click on it :
    const clickedLink = componentsClickable.findWhere(node => {
      return node.get(0).getAttribute('data-path') === componentsFixtures[1].filePath;
    });
    clickedLink.simulate('click');

    // Assert spy was called (spy contains an assertion on the path argument) :
    assert.isOk(called);
  });

  it('allows filtering', () => {
    const wrapper = mount(<ComponentsList components={componentsFixtures} onSelect={() => {}} />, {attachTo: document.getElementById('root')});

    // Uncollapsing :
    wrapper.find('button').simulate('click');

    const textInput = wrapper.find('input');

    simulateChange(textInput, 'feature');
    let list = wrapper.find('.components-list li[data-path]');
    assert.lengthOf(list, 2, 'list has been filtered by "feature"');

    simulateChange(textInput, 'uber');
    list = wrapper.find('.components-list li[data-path]');
    assert.lengthOf(list, 1, 'list has been filtered by "Uber" (case insensitive)');

    simulateChange(textInput, 'featureyolo');
    list = wrapper.find('.components-list li[data-path]');
    const titles = wrapper.find('.components-list h5');
    assert.lengthOf(list, 0, 'searching for a non-present item displays an empty list');
    assert.lengthOf(titles, 0, 'searching for a non-present item displays no titles');
  });

  it('allows to refresh', () => {
    const wrapper = mount(<ComponentsList components={componentsFixtures} onSelect={() => {}}/>, {attachTo: document.getElementById('root')});
    const link = wrapper.find('.refreshLink').get(0);
    assert.ok(link.getAttribute('href') === '?' || link.getAttribute('href') === '.', 'All refresh links should refresh the page');

    wrapper.find('button').simulate('click');
    const linkCollapsed = wrapper.find('.refreshLink').get(0);
    assert.ok(linkCollapsed.getAttribute('href') === '?' || linkCollapsed.getAttribute('href') === '.', 'All refresh links should refresh the page');
  });
});
