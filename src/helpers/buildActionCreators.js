import buildAction from './buildAction'

export default actions => Object
  .keys(actions)
  .reduce((memo, action) => ({
    ...memo,
    [action]: payload => buildAction(
      actions[action],
      typeof payload === 'object' && payload.persist ? null : payload
    ),
  }), {})
