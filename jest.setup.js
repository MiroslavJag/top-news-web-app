import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})

// Disable console.warn, console.info & console.debug in jest tests
global.console = {
  log: console.log,
  error: console.error,
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
}
