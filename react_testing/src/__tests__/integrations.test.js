import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from 'Root';
import App from 'components/App';

let wrapped;

beforeEach(() => {
  moxios.install();
  wrapped = mount(
    <Root>
      <App />
    </Root>
  );

})

afterEach(() => {
  moxios.uninstall();
  wrapped.unmount();
});

it('can fetch a list of comments and display them', (done) => {
  //Attempt to render the entire app
  moxios.wait(async() => {
    let request = moxios.requests.mostRecent()
    await request.respondWith({
      status: 200,
      response: [
        {name: 'Fetched #1'},
        {name: 'Fetched #2'}
      ]  
    })
    wrapped.update();
    expect(wrapped.find('li').length).toEqual(2);
    done();
  })
  wrapped.find('.fetch-comments').simulate('click')
})
