import config from '../../config'
import * as pathHelpers from 'path'
import yaml from 'js-yaml'
import { nunjucks } from 'gulp-nunjucks-render'
import marked from 'marked'
import fs from 'fs'
import { html as htmlBeautify } from 'js-beautify'
import hljs from 'highlight.js'
import envManager from './envManager'
import Vinyl from 'vinyl'

function safeLoadYml(yamlPath) {
  // Try to find this yaml file. Otherwise, it's just a plain dir.
  try {
    return yaml.safeLoad(fs.readFileSync(yamlPath))
  } catch (ex) {
    return ''
  }
}

/**
 * Doc task helper functions
 */
class docsHelpers {
  /**
   * Create nunjucks environment
   * @returns {Object} environment
   */
  static createEnvironment() {
    const paths = [
      config.docs.src.indexDir,
      config.docs.src.layoutDir,
      config.docs.src.components,
      config.html.src.layoutDir,
      config.html.src.componentsDir
    ]
    const loaders = paths.map(path => new nunjucks.FileSystemLoader(path))
    const environment = new nunjucks.Environment(loaders)
    envManager(environment)

    return environment
  }

  /**
   * Render component
   * @param {Buffer} content - File content
   * @param {File} file - File object
   * @returns {String} component - rendered component
   */
  static renderComponent(content, file) {
    // eslint-disable-line max-statements
    let sample = ''
    let sampleData = {}

    const environment = docsHelpers.createEnvironment()
    const yml = yaml.load(content)

    try {
      sampleData = JSON.parse(
        fs.readFileSync(file.path.replace('.yml', '.json'))
      )
    } catch (error) {
      sampleData = {}
    }

    try {
      sample = htmlBeautify(
        environment.render(file.path.replace('.yml', '.njk'), {
          ...sampleData,
          baseUri: config.html.baseUri
        }),
        config.docs.codeBeautifier
      )
      sample = hljs.highlight('html', sample).value
    } catch (error) {
      global.console.log(error)
    }

    const data = {
      title: yml.title,
      description: marked(yml.description || ''),
      implementation: marked(yml.implementation || '').replace(
        '<table',
        '<table class="table"'
      ),
      demo: file.path
        .split(pathHelpers.sep)
        .pop()
        .replace('.yml', '.demo.html'),
      sample
    }

    return environment.render(config.docs.src.component, data)
  }

  /**
   * Render component demo
   * @param {Buffer} content - File content
   * @param {File} file - File object
   * @returns {String} component - rendered component
   */
  static renderComponentDemo(content, file) {
    // eslint-disable-line max-statements
    let demo = ''
    let data = {}

    const environment = docsHelpers.createEnvironment()
    const yml = yaml.load(content)

    try {
      data = JSON.parse(fs.readFileSync(file.path.replace('.yml', '.json')))
    } catch (error) {
      data = {}
    }

    try {
      demo = environment.render(file.path.replace('.yml', '.njk'), {
        ...data,
        baseUri: config.html.baseUri
      })
      demo = (yml.demo || '{}').replace(/\{\}/g, demo)
    } catch (error) {
      global.console.log(error)
    }

    return environment.render(config.docs.src.preview, {
      baseUri: config.html.baseUri,
      demo
    })
  }

  /**
   * Get the template tree
   * @param {String} baseDir - dir containing the templates
   * @param {String} ext - file extension to look for
   * @param {String} baseUrl - base URL for templates
   * @returns {Array} tree - recursive list of item description objects with signature `{ name, url, branches }`
   */
  static getTemplateTree(baseDir, ext = '.njk', baseUrl = '/templates/') {
    const scandir = dir => {
      return (
        fs
          .readdirSync(dir)

          // Map to Vinyl objects
          .map(file => docsHelpers.toVinyl(`${dir}/${file}`, baseDir))

          // Add some metadata
          .map(file => {
            file._isLeaf = file.extname === ext

            return file
          })

          // Filter out non-dir and non-leaf nodes
          .filter(file => file.isDirectory() || file._isLeaf)

          // Map nodes to item description objects for use in templates
          .map(file => {
            const name = file.stem.replace(/[_-]/g, ' ')
            const url =
              file._isLeaf && baseUrl + file.relative.replace(ext, '.html')
            const branches = file.isDirectory() && scandir(file.path)

            return { name, url, branches }
          })
      )
    }

    return scandir(baseDir)
  }

  /**
   * Get the component tree
   * @param {String} baseDir - dir containing the components
   * @param {String} ext - file extension to look for
   * @param {String} baseUrl - base URL for components
   * @returns {Array} tree - recursive list of item description objects with signature `{ name, url, branches }`
   */
  static getComponentTree(
    baseDir,
    ext = '.yml',
    baseUrl = '/docs/components/'
  ) {
    const scandir = dir => {
      return (
        fs
          .readdirSync(dir)

          // Map to Vinyl objects
          .map(file => docsHelpers.toVinyl(`${dir}/${file}`, baseDir))

          // Filter out non-dir nodes
          .filter(file => file.isDirectory())

          // Map nodes to item description objects for use in templates
          .map(file => {
            // Components are defined by a yaml file, one per directory, with the file name equal to the component's directory name
            const yamlPath = `${dir}/${file.basename}/${file.basename}${ext}`
            const yml = safeLoadYml(yamlPath)

            const name = yml ? yml.title : file.basename.replace(/[_-]/g, ' ')
            const url =
              yml &&
              baseUrl +
                pathHelpers.relative(baseDir, yamlPath).replace(ext, '.html')

            // Subtree.
            const branches = scandir(file.path)

            // If the node doesn't have branches and also not a URL (no yaml file), we're dealing with an "anonymous" component; filter it out.
            if (!branches.length && !url) {
              return null
            }

            return { name, url, branches }
          })

          // Clean the array
          .filter(x => x)
      )
    }

    return scandir(baseDir)
  }

  /**
   * Check if a yaml file has content
   * @param {VinylObject} file -
   * @returns {Boolean} hasContent -
   */
  static hasContent(file) {
    return typeof yaml.safeLoad(file.contents) === 'object'
  }

  /**
   * Create a Vinyl object from a file path
   * @param {String} path - file path
   * @param {String} base - base path
   * @returns {Vinyl} - a Vinyl file object
   */
  static toVinyl(path, base) {
    const stat = fs.statSync(path)

    return new Vinyl({ base, path, stat })
  }
}

export default docsHelpers
