import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import 'jest-localstorage-mock'
// NOTE: Dec-30-2018, ajw
// For more info, see https://www.npmjs.com/package/jest-localstorage-mock

configure({ adapter: new Adapter() })
