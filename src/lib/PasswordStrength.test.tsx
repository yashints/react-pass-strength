import React from 'react';
import { shallow, mount, render } from 'enzyme';
import PasswordStrength from './PasswordStrength';

jest.useFakeTimers();
jest.mock('./HIBPCaller');

describe('Password strength component should ', function() {
  it('renders without crashing',  function() {
    const component = shallow(<PasswordStrength passwordToCheck='test' onStrengthChanged={jest.fn} />);
    expect(component).toBeTruthy();
  });


  it('props should be set correctly',  function() {
    const component = mount(<PasswordStrength passwordToCheck='test' onStrengthChanged={jest.fn} />);
    expect(component.prop('passwordToCheck')).toBe('test');
  });

  it('return the strength',  async () => {
    const fn = jest.fn();
    const component = mount(
      <PasswordStrength passwordToCheck='' onStrengthChanged={fn} />
    );
    component.setProps({ passwordToCheck: 'test' });
    component.instance().forceUpdate();
    expect(fn).toHaveBeenCalledWith(17);
    
  });

  it('call the breach check',  async (done) => {
    const mockedFn = jest.fn();
    const component = mount(
      <PasswordStrength passwordToCheck='' onStrengthChanged={mockedFn} />
    );
    component.setProps({ passwordToCheck: 'test' });
    component.update();
    jest.runAllTimers();
    setImmediate(() => {
      component.update();
      const breachedDiv = component.find('.HIBP');
      expect(breachedDiv.length).toBeGreaterThan(0);
      done();
    });    
  });
});


