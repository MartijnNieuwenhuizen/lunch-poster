import includeData from 'nunjucks-includeData'
import { ComponentTag } from './nunjucks-extensions'

const classesFilter = config =>
  Object.keys(config)
    .map(key => (config[key] ? key : null))
    .filter(v => v)
    .join(' ')

module.exports = env => {
  // IncludeData plugin
  includeData.install(env)

  // Extensions
  env.addExtension('component', new ComponentTag(env))
  env.addFilter('classes', classesFilter)

  // Filters
  env.addFilter('isNumber', input => typeof input === 'number')
}
