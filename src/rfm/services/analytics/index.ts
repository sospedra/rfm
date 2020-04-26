import mixpanel from 'mixpanel-browser'

mixpanel.init('e584fa40e066890465612b19042dddd1')

export const track: typeof mixpanel.track = (...args) => {
  mixpanel.track(...args)
}
