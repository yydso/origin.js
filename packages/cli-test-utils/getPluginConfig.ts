import {
  globalStyleOption,
  componentsOption,
  contentOption,
  pagesOption,
  markdownOption,
  federationOption,
  PluginChoiceOption,
} from '../cli/src/config/plugins'

export const defaultOptions: any = {
  name: '',
  version: '1.0.0',
  license: 'ISC',
  plugins: [],
  test: 'none',
  // NOTE: the default value of federationType is only used in test
  federationType: 'Host',
  pagesPluginImported: false,
  globalStylePluginImported: false,
  componentsPluginImported: false,
  contentPluginImported: false,
  markdownPluginImported: false,
  federationPluginImported: false,
}

const TO_BE_ADDED_PLUGINS: PluginChoiceOption[] = [
  globalStyleOption,
  componentsOption,
  contentOption,
  pagesOption,
  markdownOption,
  federationOption,
]

function getPluginCompositions(): Array<PluginChoiceOption[]> {
  let compositions: Array<PluginChoiceOption[]> = []
  TO_BE_ADDED_PLUGINS.forEach(pluginOption => {
    compositions = [
      ...compositions,
      ...compositions.map(c => [...c, pluginOption]),
      [pluginOption],
    ]
  })
  return compositions
}

const pluginCompositions: Array<PluginChoiceOption[]> = getPluginCompositions()

export function getConfigs(includes?: string[], excludes?: string[]): any[] {
  const resultConfigs: any[] = []
  pluginCompositions.forEach((composition, index) => {
    const config: any = Object.assign({}, defaultOptions)
    config.name = `test_plugins_${index + 1}`
    config.plugins = composition
    config.plugins.forEach((plugin: PluginChoiceOption) => {
      config[`${plugin.name}PluginImported`] = true
    })
    if (includes) {
      for (const pluginName of includes) {
        const value = config[`${pluginName}PluginImported`]
        if (!value) {
          return false
        }
      }
    }
    if (excludes) {
      for (const pluginName of excludes) {
        const value = config[`${pluginName}PluginImported`]
        if (value) {
          return false
        }
      }
    }
    resultConfigs.push(config)
  })
  return resultConfigs
}
