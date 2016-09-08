import { assert } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import ComponentsList from '../src/runtime/components/SidePanel';

/*
  {
    filePath : string. File path, aka Webpack request to fetch component,
    name: name to be displayed in the list
  }
 */
const componentsFixtures = [
  {
    filePath: './foo/__docs__/index.js',
    name: 'foo',
  },
  {
    filePath: './bar/components/__docs__/index.js',
    name: 'bar/components',
  },
  {
    filePath: './bar/components/__docs__/Raphaello.js',
    name: 'bar/components/Raphaello',
  },
];

/* Fixture should result in :

foo (clickable)
bar (not clickable)
  components (clickable)
    Raphaello (clickable)
*/

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

    const wrapper = mount(<ComponentsList collapsed onCollapse={spy} components={componentsFixtures} onSelect={() => {}} />, { attachTo: document.getElementById('root')});

    // Clicking :
    wrapper.find('button').simulate('click');
    assert.ok(called);

    const wrapper2 = mount(<ComponentsList collapsed={false} components={componentsFixtures} onSelect={() => {}} />, { attachTo: document.getElementById('root')});

    assert.ok((wrapper2.find('ul').length > 1), 'component list should be displayed');

    const node = wrapper2.get(0);
    const width = ReactDOM.findDOMNode(node).clientWidth;
    // In case we suddenly decide that the collapsed list should be 69px wide, this test is intentionally not too specific :
    assert.ok(width > 100, 'list should not be collapsed');
  });

  it('displays the list of components', () => {
    // Test on components :
    const wrapper = mount(<ComponentsList collapsed={false} onCollapse={() => {}} components={componentsFixtures} onSelect={() => {}} />, {attachTo: document.getElementById('root')});

    const list = wrapper.find('ul li span[data-path]'); // <li> tags containing a clickable component name (not a title)
    const clickables = list.nodes.filter(n => n.getAttribute('data-path') !== 'false');
    assert.lengthOf(clickables, componentsFixtures.length, 'list of component fed through a fixture');

    // Test on titles (allows testing tree view) :
    const titles = wrapper.find('ul li');
    assert.lengthOf(titles, 4, 'fixtures list contains 4 folders');
  });

  it('allows selecting a component to see its doc', () => {
    let called = false;

    // Rudimentary spy :
    // XXX sinon ?
    const spy = (filePath) => {
      assert.equal(filePath, componentsFixtures[1].filePath, 'Clicked on the second item in the list');
      called = true;
    };

    const wrapper = mount(<ComponentsList collapsed={false} components={componentsFixtures} onSelect={spy} />, {attachTo: document.getElementById('root')});

    const componentsClickable = wrapper.find('ul li span[data-path]');

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

    simulateChange(textInput, 'foo');
    let list = wrapper.find('ul li');
    assert.lengthOf(list, 1, 'list has been filtered by "foo"');

    simulateChange(textInput, 'raph');
    list = wrapper.find('ul li');
    assert.lengthOf(list, 3, 'list has been filtered by "raph" (case insensitive)');

    simulateChange(textInput, 'stupid search');
    list = wrapper.find('ul li');
    const titles = wrapper.find('ul li');
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
